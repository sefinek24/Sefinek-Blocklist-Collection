const { promises: fs } = require('node:fs');
const path = require('node:path');
const { splitFile, MAX_MB, MAX_FILE_SIZE } = require('./file-processor/split.js');
const getDate = require('../functions/date.js');
const sha256 = require('../functions/sha512.js');
const txtFilter = require('../functions/txtFilter.js');
const process = require('../functions/process.js');

const convert = async (folderPath = path.join(__dirname, '../../blocklists/templates'), relativePath = '') => {
	const { format, allFiles, txtFiles, generatedPath } = await txtFilter('unbound', path, fs, relativePath, folderPath);

	await Promise.all(txtFiles.map(async file => {
		// Cache
		const thisFileName = path.join(folderPath, file.name);
		const { cacheHash, stop } = await sha256(thisFileName, format, file);
		if (stop) return;

		// Content
		const fileContent = await fs.readFile(thisFileName, 'utf8');

		const date = getDate();
		const replacedFile = fileContent
			.replace(/^(?:127\.0\.0\.1|0\.0\.0\.0) (\S+)/, 'local-zone: "$1." always_nxdomain')
			.replace(/<Release>/, 'Unbound')
			.replace(/<Version>/, date.timestamp)
			.replace(/<LastUpdate>/, `${date.full} | ${date.now}`);

		const fullNewFile = path.join(generatedPath, file.name.replace('.txt', '.conf'));
		const header = 'server:\n';
		await fs.writeFile(fullNewFile, header + replacedFile);

		const fileStats = await fs.stat(fullNewFile);
		if (fileStats.size > MAX_FILE_SIZE) {
			const mainContent = replacedFile.slice(0, MAX_FILE_SIZE) + `\n; This file has a second part: ${file.name.replace('.conf', '_2.conf')}`;
			await fs.writeFile(fullNewFile, header + mainContent, 'utf8');
			console.log(`📑 File trimmed to ${MAX_MB}MB and updated: ${fullNewFile}`);
			await splitFile(fullNewFile, replacedFile, header);
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