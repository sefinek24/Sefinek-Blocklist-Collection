const { promises: fs } = require('node:fs');
const path = require('node:path');
const getDate = require('../functions/date.js');
const sha256 = require('../functions/sha512.js');
const txtFilter = require('../functions/txtFilter.js');
const process = require('../functions/process.js');

// const SKIPPED_FILES = ['gambling-indonesia.fork.txt', 'pi-blocklist-porn-all.fork.txt'];

const convert = async (folderPath = path.join(__dirname, '../../blocklists/templates'), relativePath = '') => {
	const { format, allFiles, txtFiles, generatedPath } = await txtFilter('rpz', path, fs, relativePath, folderPath);

	await Promise.all(txtFiles.map(async file => {
		const thisFileName = path.join(folderPath, file.name);
		// if (SKIPPED_FILES.includes(file.name)) return console.log(`🍅 Skipped ${thisFileName}`);

		// Cache
		const { cacheHash, stop } = await sha256(thisFileName, format, file);
		if (stop) return;

		// Content
		const fileContent = await fs.readFile(thisFileName, 'utf8');

		const outputLines = fileContent
			.split('\n')
			.reduce((acc, line) => {
				const match = line.match(/^(?:127\.0\.0\.1|0\.0\.0\.0) (\S+)/);
				if (match) {
					const domain = match[1];
					if (!acc.seenDomains.has(domain)) {
						acc.seenDomains.add(domain);
						if (domain.startsWith('www.')) {
							acc.output.push(`*.${domain.slice(4)} CNAME .`);
						} else {
							acc.output.push(`${domain} CNAME .\n*.${domain} CNAME .`);
						}
					}
				}
				return acc;
			}, { seenDomains: new Set(), output: [] });

		const date = getDate();
		const replacedFile = outputLines.output.join('\n')
			.replaceAll(/#(?: ?127\.0\.0\.1| ?0\.0\.0\.0) |:: /gmu, '; ')
			.replaceAll(/#/gmu, ';')
			.replace(/〢 /g, '')
			.replace(/<Release>/i, 'RPZ')
			.replace(/<Version>/i, date.timestamp)
			.replace(/<LastUpdate>/i, `${date.full} | ${date.now}`);

		const fullNewFile = path.join(generatedPath, file.name);
		await fs.writeFile(
			fullNewFile,
			`$TTL 300\n@ SOA localhost. root.localhost. ${date.serialNumber} 43200 3600 259200 300\n  NS  localhost.\n${replacedFile}`
		);

		console.log(`✔️ ${cacheHash || file.name} ++ ${fullNewFile}`);
	}));

	await process(convert, allFiles, path, relativePath, folderPath);
};

const run = async () => {
	await convert();
	console.log('\n');
};

(async () => await run())();

module.exports = run;