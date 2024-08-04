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
			const comments = [];
			let domains = [];

			const lines = fileContents.split('\n');
			fileContents = lines.map((line) => line.trim()).filter((line) => line !== '').map((line) => {
				if (line.startsWith('#@ <<<<<<<< ') || line.startsWith('#@ >>>>>>>> ') || line.startsWith('# Blogspot') || line.startsWith('# Dodatki hosts')) {
					return null;
				}
				if (line.startsWith('#')) {
					comments.push(line);
					return null;
				}

				const parts = line.split(/\s+/);
				if (parts.length > 1 && (parts[0] === '0.0.0.0' || parts[0] === '127.0.0.1')) {
					const domain = parts[1];
					if (!existingDomains.has(domain)) {
						existingDomains.add(domain);
						domains.push(line);
						return null;
					}
				}
				return line;
			}).filter(line => line !== null);

			domains = domains.sort((a, b) => {
				return a.split(/\s+/)[1].localeCompare(b.split(/\s+/)[1]);
			});

			fileContents = [...comments, ...domains, ...fileContents].join('\n');

			await writeFile(filePath, fileContents, 'utf8');
			console.log(`✅ Processed ${filePath}`);
		}

		const allFiles = await readdir(dirPath, { withFileTypes: true });
		const subdirectories = allFiles
			.filter((file) => file.isDirectory())
			.map((file) => join(dirPath, file.name));

		for (const subdirectory of subdirectories) {
			await processDirectory(subdirectory);
		}
	} catch (err) {
		console.error(err);
	}
};

const run = async () => {
	try {
		console.log('🔍 Searching for and sorting domains in blocklists/template directory...');
		await processDirectory(join(__dirname, '..', 'blocklists', 'templates'));
	} catch (error) {
		console.error(error);
	}
};

(async () => await run())();

module.exports = run;
