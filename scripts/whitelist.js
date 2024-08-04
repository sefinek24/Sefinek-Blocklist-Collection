const { readdir, readFile, writeFile } = require('node:fs/promises');
const { join, relative } = require('node:path');

const loadWhitelist = async whitelistPath => {
	const whitelistContent = await readFile(whitelistPath, 'utf8');
	const whitelistMap = new Map();
	const globalWhitelist = new Set();

	whitelistContent.split('\n').forEach(line => {
		if (!line.trim() || line.startsWith('#')) return;

		const [domain, file] = line.split(' ').map(part => part.trim());
		if (domain) {
			if (file) {
				const key = file.replace(/\\/g, '/');
				const targetSet = whitelistMap.has(key) ? whitelistMap.get(key) : new Set();
				targetSet.add(domain);
				whitelistMap.set(key, targetSet);
			} else {
				globalWhitelist.add(domain);
			}
		}
	});

	if (globalWhitelist.size > 0) {
		whitelistMap.set('*', globalWhitelist);
	}

	console.log(whitelistMap);
	return whitelistMap;
};

const processDirectory = async (dirPath, whitelist, basePath) => {
	const fileNames = await readdir(dirPath);
	const txtFiles = fileNames.filter(fileName => fileName.endsWith('.txt'));

	for (const fileName of txtFiles) {
		const filePath = join(dirPath, fileName);
		const relativePath = relative(basePath, filePath).replace(/\\/g, '/').replace('templates/', '');
		const fileContents = await readFile(filePath, 'utf8');
		let domainsRemoved = 0;
		const existingDomains = new Set();

		const lines = fileContents.split('\n').map(line => line.trim());
		const filteredLines = lines.filter(line => {
			if (line.startsWith('##') || line.startsWith('#') || line.startsWith('!') || line === '') {
				return true;
			}

			const cleanLine = line.split('#')[0].trim();
			const domain = cleanLine.replace(/^(0\.0\.0\.0|127\.0\.0\.1)\s+/, '');

			if (!existingDomains.has(domain)) {
				existingDomains.add(domain);
				if (whitelist.has('*') && whitelist.get('*').has(domain) ||
					whitelist.has(relativePath) && whitelist.get(relativePath).has(domain)) {
					domainsRemoved++;
					return false;
				}
				return true;
			}
			return false;
		});

		if (domainsRemoved > 0) {
			await writeFile(filePath, filteredLines.join('\n'), 'utf8');
			console.log(`🗑️ ${domainsRemoved} domains removed from ${filePath}`);
		}
	}

	const allFiles = await readdir(dirPath, { withFileTypes: true });
	const subdirectories = allFiles.filter(file => file.isDirectory()).map(file => join(dirPath, file.name));

	for (const subdirectory of subdirectories) {
		await processDirectory(subdirectory, whitelist, basePath);
	}
};

const run = async () => {
	try {
		const basePath = join(__dirname, '..', 'blocklists');
		const whitelist = await loadWhitelist(join(__dirname, '..', 'whitelists', 'main.txt'));
		await processDirectory(join(basePath, 'templates'), whitelist, basePath);
	} catch (error) {
		console.error(error);
	}
};

(async () => await run())();

module.exports = run;
