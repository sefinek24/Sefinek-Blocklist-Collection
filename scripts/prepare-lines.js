const { isPrivate } = require('ip');
const validator = require('validator');
const { mkdir, readdir, readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');

const processDirectory = async dirPath => {
	try {
		await mkdir(dirPath, { recursive: true });

		const fileNames = await readdir(dirPath);
		const txtFiles = fileNames.filter(fileName => fileName.endsWith('.txt'));

		for (const fileName of txtFiles) {
			const filePath = join(dirPath, fileName);
			let fileContents = await readFile(filePath, 'utf8');

			const existingDomains = new Set();
			let duplicatesRemoved = 0;
			let emptyLinesRemoved = 0;
			let uselessCommentsRemoved = 0;
			let invalidDomainsRemoved = 0;

			const lines = fileContents.split('\n').map(line => line.trim()).filter(line => line !== '');
			fileContents = lines.filter(line => {
				if (line === '') {
					emptyLinesRemoved++;
					return false;
				}

				if (line.startsWith('# [')) {
					uselessCommentsRemoved++;
					return false;
				}

				if (line.startsWith('##') || line.startsWith('#') || line.startsWith('!') || line === '0.0.0.0 localhost' || line === '::1 localhost') return true;

				const [ip, domain] = line.split(/\s+/);
				try {
					if ((ip !== '' && ip) && isPrivate(ip)) {
						return true;
					}
				} catch (err) {
					console.log(`⚠️ isPrivate (${ip}): ${err.message}`);
				}

				try {
					if ((ip !== '' && ip) && !validator.isURL(domain, { require_valid_protocol: false, allow_underscores: true })) {
						invalidDomainsRemoved++;
						return false;
					}
				} catch (err) {
					console.log(`⚠️ validator.isURL (${domain}): ${err.message}`);
				}

				if (existingDomains.has(domain)) {
					duplicatesRemoved++;
					return false;
				} else {
					existingDomains.add(domain);
					return true;
				}
			}).join('\n');

			await writeFile(filePath, fileContents, 'utf8');

			if (duplicatesRemoved > 0) {
				console.log(`✔️ ${duplicatesRemoved} ${duplicatesRemoved === 1 ? 'duplicate' : 'duplicates'} removed from ${filePath}`);
			}

			if (emptyLinesRemoved > 0) {
				console.log(`✔️ ${emptyLinesRemoved} ${emptyLinesRemoved === 1 ? 'empty line' : 'empty lines'} removed from ${filePath}`);
			}

			if (uselessCommentsRemoved > 0) {
				console.log(`✔️️ ${uselessCommentsRemoved} ${uselessCommentsRemoved === 1 ? 'useless comment' : 'useless comments'} removed from ${filePath}`);
			}

			if (invalidDomainsRemoved > 0) {
				console.log(`✔️ ${invalidDomainsRemoved} ${invalidDomainsRemoved === 1 ? 'invalid domain' : 'invalid domains'} removed from ${filePath}`);
			}
		}

		const allFiles = await readdir(dirPath, { withFileTypes: true });
		const subdirectories = allFiles
			.filter(file => file.isDirectory())
			.map(file => join(dirPath, file.name));

		for (const subdirectory of subdirectories) {
			await processDirectory(subdirectory);
		}
	} catch (err) {
		console.error(err);
	}
};

const run = async () => {
	try {
		console.log('🔍 Searching for duplicates in blocklists/template directory...');
		await processDirectory(join(__dirname, '..', 'blocklists', 'templates'));

		// console.log('🔍 Searching for duplicates in blocklists/generated directory...');
		// await processDirectory(join(__dirname, '..', 'blocklists', 'generated'));
	} catch (error) {
		console.error(error);
	}
};

(async () => await run())();

module.exports = run;