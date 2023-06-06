const { mkdir, readdir, readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');

const processDirectory = async (dirPath) => {
	try {
		await mkdir(dirPath, { recursive: true });

		const fileNames = await readdir(dirPath);
		const txtFiles = fileNames.filter((fileName) => fileName.endsWith('.txt'));

		await Promise.allSettled(
			txtFiles.map(async (fileName) => {
				const filePath = join(dirPath, fileName);
				let fileContents = await readFile(filePath, 'utf8');

				const existingDomains = new Set();
				let duplicatesRemoved = 0;

				const lines = fileContents.split('\n').map((line) => line.trim()).filter((line) => line !== '');
				fileContents = lines.filter((line) => {
					if (line.startsWith('##') || line.startsWith('#') || line.startsWith('!')) {
						return true;
					}

					const domain = line.replace('0.0.0.0 ', '').replace('127.0.0.1 ', '');

					if (existingDomains.has(domain)) {
						duplicatesRemoved++;
						return false;
					} else {
						existingDomains.add(domain);
						return true;
					}
				}).join('\n');

				if (duplicatesRemoved > 0) {
					await writeFile(filePath, fileContents, 'utf8');
					console.log(`🗑️ ${duplicatesRemoved} ${duplicatesRemoved === 1 ? 'duplicate' : 'duplicates'} removed from ${filePath}`);
				}
			}),
		);

		await readdir(dirPath, { withFileTypes: true });
	} catch (err) {
		console.error(err);
	}
};

const run = async () => {
	try {
		console.log('🔍 Searching for .txt files in blocklist/template directory...');
		await processDirectory(join(__dirname, '..', 'blocklist', 'template'));

		console.log('🔍 Searching for .txt files in blocklist/generated directory...');
		await processDirectory(join(__dirname, '..', 'blocklist', 'generated'));
	} catch (error) {
		console.error(error);
	}
};

(async () => await run())();

module.exports = () => run;