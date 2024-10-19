const { promises: fs } = require('node:fs');
const path = require('node:path');
const { splitFile, MAX_MB, MAX_FILE_SIZE } = require('./file-processor/split.js');
const getDate = require('../functions/date.js');
const sha256 = require('../functions/sha512.js');
const txtFilter = require('../functions/txtFilter.js');
const process = require('../functions/process.js');

const convert = async (folderPath = path.join(__dirname, '../../blocklists/templates'), relativePath = '') => {
	const { format, allFiles, txtFiles, generatedPath } = await txtFilter('rpz', path, fs, relativePath, folderPath);

	await Promise.all(txtFiles.map(async file => {
		// Cache
		const thisFileName = path.join(folderPath, file.name);
		const { cacheHash, stop } = await sha256(thisFileName, format, file);
		if (stop) return;

		// Content
		const fileContent = await fs.readFile(thisFileName, 'utf8');

		const seenDomains = new Set();
		const outputLines = [];

		fileContent.split('\n').forEach(line => {
			const match = line.match(/^(?:127\.0\.0\.1|0\.0\.0\.0) (\S+)/);
			if (match) {
				const domain = match[1];
				if (!seenDomains.has(domain)) {
					seenDomains.add(domain);
					if (domain.startsWith('www.')) {
						outputLines.push(`*.${domain.slice(4)} CNAME .`);
					} else {
						outputLines.push(`${domain} CNAME .`, `*.${domain} CNAME .`);
					}
				}
			}
		});

		const date = getDate();
		const replacedFile = outputLines.join('\n')
			.replace(/#(?: ?127\.0\.0\.1| ?0\.0\.0\.0) |:: /gm, '; ')
			.replace(/#/gm, ';')
			.replace('<Release>', 'RPZ')
			.replace('<Version>', date.timestamp)
			.replace('<LastUpdate>', `${date.full} | ${date.now}`);

		const fullNewFile = path.join(generatedPath, file.name);
		const header = `$TTL 300\n@ SOA localhost. root.localhost. ${date.serialNumber} 43200 3600 259200 300\n  NS  localhost.\n`;

		await fs.writeFile(fullNewFile, header + replacedFile);

		const fileStats = await fs.stat(fullNewFile);
		if (fileStats.size > MAX_FILE_SIZE) {
			const mainContent = (header + replacedFile).slice(0, MAX_FILE_SIZE) + `\n; This file has a second part: ${file.name.replace('.txt', '_2.txt')}`;
			await fs.writeFile(fullNewFile, mainContent, 'utf8');
			console.log(`📑 File trimmed to ${MAX_MB}MB and updated: ${fullNewFile}`);
			await splitFile(fullNewFile, header + replacedFile, header);
		} else {
			console.log(`✔️ ${cacheHash || file.name} ++ ${fullNewFile}`);
		}
	}));

	await process(convert, allFiles, path, relativePath, folderPath);
};

const run = async () => {
	await convert();
	console.log('\n');
};

(async () => await run())();

module.exports = run;