const { promises: fs } = require('node:fs');
const path = require('node:path');
const date = require('../functions/date.js');
const sha256 = require('../functions/sha512.js');
const txtFilter = require('../functions/txtFilter.js');
const process = require('../functions/process.js');

const convert = async (folderPath = path.join(__dirname, '../../blocklists/templates'), relativePath = '') => {
	const { format, allFiles, txtFiles, generatedPath } = await txtFilter('rpz', path, fs, relativePath, folderPath);

	await Promise.all(txtFiles.map(async file => {
		const thisFileName = path.join(folderPath, file.name);

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
					const domainParts = domain.split('.');

					if (domainParts.length > 2 && !acc.seenDomains.has(domain)) {
						acc.seenDomains.add(domain);
						acc.output.push(`${domain} CNAME .\n*.${domain} CNAME .`);
					}
				}
				return acc;
			}, { seenDomains: new Set(), output: [] });

		const replacedFile = outputLines.output.join('\n')
			.replaceAll(/#(?: ?127\.0\.0\.1| ?0\.0\.0\.0) |:: /gmu, '; ')
			.replaceAll(/#/gmu, ';')
			.replace(/〢 /g, '')
			.replace(/<Release>/gim, 'RPZ')
			.replace(/<Version>/gim, date.timestamp)
			.replace(/<LastUpdate>/gim, `${date.full} | ${date.now}`);

		const fullNewFile = path.join(generatedPath, file.name);
		await fs.writeFile(
			fullNewFile,
			`$TTL 300\n@ SOA localhost. root.localhost. ${date.timestamp} 43200 3600 259200 300\n  NS  localhost.\n;\n${replacedFile}`
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