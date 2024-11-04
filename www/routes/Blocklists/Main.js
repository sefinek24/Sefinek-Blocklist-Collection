const express = require('express');
const marked = require('marked');
const fs = require('node:fs/promises');
const path = require('node:path');
const router = express.Router();

const GENERATED_DIR_PATH = path.join(__dirname, '..', '..', '..', 'blocklists', 'generated');
const LOGS_DIR_PATH = path.join(__dirname, '..', '..', 'public', 'logs');
const DOCUMENTATION_DIR_PATH = path.join(__dirname, '..', '..', '..', 'docs');

const FILE_CACHE = new Map();
const FILE_EXISTENCE_CACHE = new Map();
const CACHE_EXPIRATION_TIME = 5 * 60 * 60 * 1000;

const SIZE_UNITS = ['B', 'KB', 'MB'];
const TEXT_FILE_EXTENSIONS = new Set(['.txt', '.conf', '.log', '.md']);

const formatFileSize = bytes =>
	bytes === 0 ? 'Empty' : (bytes / Math.pow(1000, Math.floor(Math.log10(bytes) / 3) || 0)).toFixed(2) + ' ' + SIZE_UNITS[Math.floor(Math.log10(bytes) / 3) || 0];

const getFileIcon = (fileName, isDirectory) =>
	isDirectory ? 'open-folder.png' : TEXT_FILE_EXTENSIONS.has(path.extname(fileName).toLowerCase()) ? 'word.png' : 'unknown-file.png';

const getDirectorySize = async directoryPath => (await Promise.all((await fs.readdir(directoryPath, { withFileTypes: true })).map(async file => {
	const fileStats = await fs.stat(path.join(directoryPath, file.name));
	return fileStats.isDirectory() ? await getDirectorySize(path.join(directoryPath, file.name)) : fileStats.size;
}))).reduce((totalSize, currentSize) => totalSize + currentSize, 0);

const getCachedFiles = async directoryPath => {
	const cacheEntry = FILE_CACHE.get(directoryPath);
	if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_EXPIRATION_TIME) return cacheEntry.data;

	const files = await fs.readdir(directoryPath, { withFileTypes: true });
	const fileList = await Promise.all(files.map(async file => {
		const filePath = path.join(directoryPath, file.name);
		const fileStats = await fs.stat(filePath);
		const fileSize = file.isDirectory() ? await getDirectorySize(filePath) : fileStats.size;

		return {
			name: file.name,
			isDirectory: file.isDirectory(),
			size: fileSize,
			lastModified: fileStats.mtime.getTime(),
			icon: getFileIcon(file.name, file.isDirectory()),
			formattedSize: formatFileSize(fileSize),
		};
	}));

	fileList.sort((a, b) => a.isDirectory === b.isDirectory ? a.name.localeCompare(b.name) : a.isDirectory ? -1 : 1);
	FILE_CACHE.set(directoryPath, { data: fileList, timestamp: Date.now() });
	return fileList;
};

const extractMatch = (regex, content) => regex.exec(content)?.[1] ?? null;

const handleRequest = async (req, res, baseDir, basePath, validExtensions, template) => {
	const relativePath = (req.params[0] || '').replace(/\/$/, '');
	const requestedFilePath = path.join(baseDir, relativePath);

	try {
		// Cache Handling
		const cachedData = FILE_EXISTENCE_CACHE.get(requestedFilePath);
		let fileStats;
		if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_EXPIRATION_TIME) {
			fileStats = cachedData.stats;
		} else {
			fileStats = await fs.stat(requestedFilePath);
			FILE_EXISTENCE_CACHE.set(requestedFilePath, { stats: fileStats, timestamp: Date.now() });
		}

		// Blocklists
		if (validExtensions.includes(relativePath) && fileStats.isFile()) return res.sendFile(requestedFilePath);

		// Handle Directory Requests
		if (fileStats.isDirectory()) {
			const currentPath = path.join(basePath, relativePath).replace(/\\/g, '/');
			const files = await getCachedFiles(requestedFilePath);
			return res.render(template, { files, currentPath });
		}

		// Handle Markdown Files
		if (relativePath.endsWith('.md')) {
			const markdownContent = await fs.readFile(requestedFilePath, 'utf-8');
			return res.render('markdown-viewer.ejs', {
				html: marked.parse(markdownContent),
				title: extractMatch(/#\s(.+)/, markdownContent),
				desc: extractMatch(/<!--\s*desc:\s*(.+?)\s*-->/, markdownContent),
				tags: extractMatch(/<!--\s*tags:\s*(.+?)\s*-->/, markdownContent),
				canonical: extractMatch(/<!--\s*canonical:\s*(.+?)\s*-->/, markdownContent),
			});
		}

		res.sendFile(requestedFilePath);
	} catch (err) {
		res.status(err.code === 'ENOENT' ? 404 : 500).end();
	}
};

router.get(/^\/generated\/v1(.*)$/, (req, res) => handleRequest(req, res, GENERATED_DIR_PATH, '/generated/v1', ['.txt', '.conf'], 'explorer/file.ejs'));
router.get(/^\/logs\/v1(.*)$/, (req, res) => handleRequest(req, res, LOGS_DIR_PATH, '/logs/v1', ['.log'], 'explorer/log.ejs'));
router.get(/^\/markdown(.*)$/, (req, res) => handleRequest(req, res, DOCUMENTATION_DIR_PATH, '/markdown', ['.md'], 'explorer/markdown.ejs'));

module.exports = router;