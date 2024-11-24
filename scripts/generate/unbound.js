const { promises: fs } = require('node:fs');
const path = require('node:path');
const splitFile = require('./file-processor/split.js');
const getDate = require('../utils/date.js');
const sha256 = require('../utils/sha512.js');
const txtFilter = require('../utils/txtFilter.js');
const process = require('../utils/process.js');

const convert = async (folderPath = path.join(__dirname, '../../blocklists/templates'), relativePath = '') => {
	const { format, allFiles, txtFiles, generatedPath } = await txtFilter('unbound', path, fs, relativePath, folderPath);

	await Promise.all(txtFiles.map(async file => {
		const thisFileName = path.join(folderPath, file.name);

		// Cache
		const { cacheHash, stop } = await sha256(thisFileName, format, file);
		if (stop) return;

		// Content
		const fileContent = await fs.readFile(thisFileName, 'utf8');

		const date = getDate();
		const replacedFile = fileContent
			.replace(/(?:127\.0\.0\.1|0\.0\.0\.0) (\S+)/gm, 'local-zone: "$1." always_nxdomain')
			.replace('<Release>', 'Unbound')
			.replace('<LastUpdate>', `${date.full} | ${date.now}`);

		const fullNewFile = path.join(generatedPath, file.name.replace('.txt', '.conf'));
		const header = 'server:\n';
		await fs.writeFile(fullNewFile, header + replacedFile);

		const isSplit = await splitFile(fullNewFile, replacedFile, '#', header);
		if (!isSplit) console.log(`✔️ ${cacheHash || file.name} ++ ${fullNewFile}`);
	}));

	await process(convert, allFiles, path, relativePath, folderPath);
};

const run = async () => {
	await convert();
	console.log('\n');
};

(async () => await run())();

module.exports = run;