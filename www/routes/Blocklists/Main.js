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

const TITLE_REGEX = /#\s(.+)/;
const DESC_REGEX = /<!--\s*desc:\s*(.+?)\s*-->/;
const TAGS_REGEX = /<!--\s*tags:\s*(.+?)\s*-->/;
const CANONICAL_REGEX = /<!--\s*canonical:\s*(.+?)\s*-->/;

const formatFileSize = bytes => {
	if (bytes === 0) return 'Empty';
	const factor = Math.floor(Math.log10(bytes) / 3) || 0;
	return (bytes / Math.pow(1000, factor)).toFixed(2) + ' ' + SIZES[factor];
};

const getFileIcon = (fileName, isDirectory) => {
	if (isDirectory) return 'open-folder.png';
	const ext = path.extname(fileName).toLowerCase();
	return TEXT_FILE_EXTENSIONS.has(ext) ? 'word.png' : 'unknown-mail.png';
};

const getDirectorySize = async dirPath => {
	const files = await fs.readdir(dirPath, { withFileTypes: true });
	const sizes = await Promise.all(files.map(async file => {
		const filePath = path.join(dirPath, file.name);
		const stats = await fs.stat(filePath);
		return stats.isDirectory() ? getDirectorySize(filePath) : stats.size;
	}));
	return sizes.reduce((total, size) => total + size, 0);
};

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
			formattedSize: formatFileSize(size)
		};
	}));

	const sortedFileList = fileList.sort((a, b) => a.isDirectory === b.isDirectory ? a.name.localeCompare(b.name) : a.isDirectory ? -1 : 1);
	CACHE_MAP.set(dirPath, { data: sortedFileList, timestamp: Date.now() });
	return sortedFileList;
};

const sendFileOrNotFound = (filePath, res, req) => res.sendFile(filePath, err => err && notFound(req, res));
const extractMatch = (regex, content) => regex.exec(content)?.[1] ?? null;

const handleRequest = async (req, res, baseDir, basePath, validExtensions, template) => {
	const relativePath = (req.params[0] || '').replace(/\/$/, '');
	const currentPath = path.join(basePath, relativePath).replace(/\\/g, '/');
	const filePath = path.join(baseDir, relativePath);

	if (validExtensions.some(ext => relativePath.endsWith(ext))) {
		if (relativePath.endsWith('.md')) {
			try {
				const mdFile = await fs.readFile(filePath, 'utf-8');
				return res.render('markdown-viewer.ejs', {
					html: Marked.parse(mdFile),
					title: extractMatch(TITLE_REGEX, mdFile),
					desc: extractMatch(DESC_REGEX, mdFile),
					tags: extractMatch(TAGS_REGEX, mdFile),
					canonical: extractMatch(CANONICAL_REGEX, mdFile)
				});
			} catch {
				return notFound(req, res);
			}
		} else {
			return sendFileOrNotFound(filePath, res, req);
		}
	}

	try {
		const stats = await fs.stat(filePath);
		if (stats.isDirectory()) {
			const files = await getCachedFiles(filePath);
			return res.render(template, { files, currentPath });
		} else {
			return sendFileOrNotFound(filePath, res, req);
		}
	} catch {
		return notFound(req, res);
	}
};

router.get(/^\/logs\/v1(.*)$/, (req, res) => handleRequest(req, res, LOGS_PATH, '/logs/v1', ['.log'], 'explorer/log.ejs'));
router.get(/^\/generated\/v1(.*)$/, (req, res) => handleRequest(req, res, GENERATED_PATH, '/generated/v1', [], 'explorer/file.ejs'));
router.get(/^\/markdown(.*)$/, (req, res) => handleRequest(req, res, DOCS_PATH, '/markdown', ['.md'], 'explorer/markdown.ejs'));

module.exports = router;