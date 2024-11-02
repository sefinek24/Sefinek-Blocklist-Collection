const express = require('express');
const Marked = require('marked');
const fs = require('node:fs/promises');
const path = require('node:path');
const { notFound } = require('../../middlewares/other/errors.js');
const router = express.Router();

const GENERATED_PATH = path.join(__dirname, '..', '..', '..', 'blocklists', 'generated');
const LOGS_PATH = path.join(__dirname, '..', '..', 'public', 'logs');
const DOCS_PATH = path.join(__dirname, '..', '..', '..', 'docs');

const CACHE_MAP = new Map();
const CACHE_EXPIRATION = 6 * 60 * 60 * 1000;

const SIZES = ['B', 'KB', 'MB'];
const TEXT_FILE_EXTENSIONS = new Set(['.txt', '.conf', '.log', '.md']);

const formatFileSize = bytes => bytes === 0 ? 'Empty' : (bytes / Math.pow(1000, Math.floor(Math.log10(bytes) / 3) || 0)).toFixed(2) + ' ' + SIZES[Math.floor(Math.log10(bytes) / 3) || 0];

const getFileIcon = (fileName, isDirectory) => isDirectory ? 'open-folder.png' : TEXT_FILE_EXTENSIONS.has(path.extname(fileName).toLowerCase()) ? 'word.png' : 'unknown-mail.png';

const getDirectorySize = async dirPath => (await Promise.all((await fs.readdir(dirPath, { withFileTypes: true })).map(async file => {
	const stats = await fs.stat(path.join(dirPath, file.name));
	return stats.isDirectory() ? await getDirectorySize(path.join(dirPath, file.name)) : stats.size;
}))).reduce((a, b) => a + b, 0);

const getCachedFiles = async dirPath => {
	const cacheEntry = CACHE_MAP.get(dirPath);
	if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_EXPIRATION) return cacheEntry.data;

	const files = await fs.readdir(dirPath, { withFileTypes: true });
	const fileList = await Promise.all(files.map(async file => {
		const filePath = path.join(dirPath, file.name);
		const stats = await fs.stat(filePath);
		const size = file.isDirectory() ? await getDirectorySize(filePath) : stats.size;

		return {
			name: file.name,
			isDirectory: file.isDirectory(),
			size,
			lastModified: stats.mtime.getTime(),
			icon: getFileIcon(file.name, file.isDirectory()),
			formattedSize: formatFileSize(size),
		};
	}));

	fileList.sort((a, b) => a.isDirectory === b.isDirectory ? a.name.localeCompare(b.name) : a.isDirectory ? -1 : 1);
	CACHE_MAP.set(dirPath, { data: fileList, timestamp: Date.now() });
	return fileList;
};

const extractMatch = (regex, content) => regex.exec(content)?.[1] ?? null;

const handleRequest = async (req, res, baseDir, basePath, validExtensions, template) => {
	const relativePath = (req.params[0] || '').replace(/\/$/, '');
	const filePath = path.join(baseDir, relativePath);

	try {
		// Blocklists
		if (validExtensions.some(ext => relativePath.endsWith(ext))) return res.sendFile(filePath);

		// Folders
		const stats = await fs.stat(filePath);
		if (stats.isDirectory()) {
			const currentPath = path.join(basePath, relativePath).replace(/\\/g, '/');
			const files = await getCachedFiles(filePath);
			return res.render(template, { files, currentPath });
		}

		// Markdown
		if (validExtensions.some(ext => relativePath.endsWith(ext))) {
			if (!relativePath.endsWith('.md')) return res.sendFile(filePath);

			const mdFile = await fs.readFile(filePath, 'utf-8');
			return res.render('markdown-viewer.ejs', {
				html: Marked.parse(mdFile),
				title: extractMatch(/#\s(.+)/, mdFile),
				desc: extractMatch(/<!--\s*desc:\s*(.+?)\s*-->/, mdFile),
				tags: extractMatch(/<!--\s*tags:\s*(.+?)\s*-->/, mdFile),
				canonical: extractMatch(/<!--\s*canonical:\s*(.+?)\s*-->/, mdFile),
			});
		}

		res.sendStatus(404);
	} catch {
		res.status(404).end();
	}
};

router.get(/^\/generated\/v1(.*)$/, (req, res) => handleRequest(req, res, GENERATED_PATH, '/generated/v1', ['.txt', '.conf'], 'explorer/file.ejs'));
router.get(/^\/logs\/v1(.*)$/, (req, res) => handleRequest(req, res, LOGS_PATH, '/logs/v1', ['.log'], 'explorer/log.ejs'));
router.get(/^\/markdown(.*)$/, (req, res) => handleRequest(req, res, DOCS_PATH, '/markdown', ['.md', '.txt'], 'explorer/markdown.ejs'));

module.exports = router;