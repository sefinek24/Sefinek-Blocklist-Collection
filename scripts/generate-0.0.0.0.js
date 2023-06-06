const { promises: fs } = require('node:fs');
const path = require('node:path');
const date = require('./functions/date.js');
const sha256 = require('./functions/sha256.js');

const convert = async (folderPath = path.join(__dirname, '../blocklist/template')) => {
	const generatedPath = path.join(__dirname, '../blocklist/generated/0.0.0.0');
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
		const { cacheHash, stop } = await sha256(thisFileName, '0.0.0.0', file);
		if (stop) return;

		// Content
		const fileContent = await fs.readFile(thisFileName, 'utf8');
		const replacedFile = fileContent
			.replaceAll(/^(?:127\.0\.0\.1|0\.0\.0\.0) /gmu, '0.0.0.0 ')
			// grex "#0.0.0.0 " "#127.0.0.1 " "# 0.0.0.0 " "# 127.0.0.1 " ":: "
			.replaceAll(/#(?: ?127\.0\.0\.1| ?0\.0\.0\.0) |:: /gmu, '# 0.0.0.0 ')
			.replace(/<Release>/gim, '0.0.0.0 before each domain')
			.replace(/<Version>/gim, date.timestamp.toString())
			.replace(/<LastUpdate>/gim, `${date.hours}:${date.minutes}:${date.seconds}.${date.milliseconds}, ${date.day}.${date.month}.${date.year} [GMT+2 HH:MM:SS.MS, DD.MM.YYYY]`);

		const subFolderName = path.basename(path.dirname(thisFileName));
		const categoryPath = subFolderName === 'template' ? generatedPath : path.join(generatedPath, subFolderName);
		const fullNewFile = path.join(categoryPath, file.name);

		try {
			await fs.access(categoryPath);
		} catch (err) {
			await fs.mkdir(categoryPath, { recursive: true });
		}

		await fs.writeFile(fullNewFile, replacedFile);
		console.log(`✔️ ${cacheHash || file.name} saved in ${thisFileName}`);
	}));

	try {
		const subdirectories = files.filter(file => file.isDirectory());
		await Promise.all(subdirectories.map(async subdirectory => {
			await convert(path.join(folderPath, subdirectory.name));
		}));
	} catch (err) {
		console.error(`❌ ${folderPath}:`, err);
	}
};

const run = async () => {
	await convert();
	console.log('\n');
};

(async () => await run())();

module.exports = () => run;