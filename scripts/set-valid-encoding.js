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
			const originalContents = fileContents;
			fileContents = fileContents.replace(/\r?\n/g, '\r\n');

			await writeFile(filePath, fileContents, 'utf8');
			if (originalContents !== fileContents) {
				console.log(`🔄 Modified ${filePath}: Line endings were changed`);
			} else {
				console.log(`🔍 Checked ${filePath}: No changes were necessary`);
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
		await processDirectory(join(__dirname, '..', 'blocklists', 'templates'));
	} catch (error) {
		console.error(error);
	}
};

(async () => await run())();

module.exports = run;
