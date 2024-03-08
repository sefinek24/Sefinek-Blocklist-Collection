const { promises: fs } = require('node:fs');
const path = require('node:path');
const date = require('../functions/date.js');
const sha256 = require('../functions/sha512.js');
const process = require('../functions/process.js');

const format = '0.0.0.0';

const convert = async (folderPath = path.join(__dirname, '../../blocklist/template'), relativePath = '') => {
	const generatedPath = path.join(__dirname, `../../blocklist/generated/${format}`, relativePath);
	try {
		await fs.access(generatedPath);
	} catch (err) {
		await fs.mkdir(generatedPath, { recursive: true });
	}

	const files = await fs.readdir(folderPath, { withFileTypes: true });
	const txtFiles = files.filter(file => file.isFile() && file.name.endsWith('.txt'));

	await Promise.all(txtFiles.map(async file => {
		const thisFileName = path.join(folderPath, file.name);

		// Cache
		const { cacheHash, stop } = await sha256(thisFileName, format, file);
		if (stop) return;

		// Content
		const fileContent = await fs.readFile(thisFileName, 'utf8');
		const replacedFile = fileContent
			.replaceAll(/^(?:127\.0\.0\.1|0\.0\.0\.0) /gmu, '0.0.0.0 ')
			.replaceAll(/#(?: ?127\.0\.0\.1| ?0\.0\.0\.0) |:: /gmu, '# 0.0.0.0 ')
			.replace(/<Release>/gim, '0.0.0.0 before each domain')
			.replace(/<Version>/gim, date.timestamp)
			.replace(/<LastUpdate>/gim, `${date.full} | ${date.now} | ${date.timezone}`);

		const fullNewFile = path.join(generatedPath, file.name);
		await fs.writeFile(fullNewFile, replacedFile);

		console.log(`✔️ ${cacheHash || file.name} ++ ${fullNewFile}`);
	}));

	await process(convert, files, relativePath, folderPath);
};

const run = async () => {
	await convert();
	console.log('\n');
};

(async () => await run())();

module.exports = run;