const { readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');
const kleur = require('kleur');
const getAllTxtFiles = require('./functions/getAllTxtFiles.js');

(async () => {
	console.warn(kleur.yellow('[WARN]:'), 'THIS PROCEDURE DEMANDS A SIGNIFICANT AMOUNT OF RAM!\n');

	const blockListDir = join(__dirname, '..', 'blocklist', 'generated');
	console.warn(kleur.blue('[INFO]:'), `Path: ${blockListDir}`);

	console.warn(kleur.blue('[INFO]:'), 'Searching txt files...');
	const files = await getAllTxtFiles(blockListDir);

	console.warn(kleur.blue('[INFO]:'), 'Promise.all()');
	console.warn(kleur.yellow('[WARN]:'), 'This may take a while. Your computer may become unresponsive for a moment.');
	await Promise.all(files.map(async file => {
		console.warn(kleur.green('[INFO]:'), `Counting domains in the file: ${file}`);

		const existingDomains = new Set();
		const fileContents = await readFile(file, 'utf8');
		fileContents.split('\n').forEach(line => {
			if (line.startsWith('0.0.0.0 ') || line.startsWith('127.0.0.1 ') || line.startsWith('server=/') || line.startsWith('||')) {
				const domain = line.replace(/^(0\.0\.0\.0|127\.0\.0\.1|server=\/|^\|\|)\s+/g, '');
				existingDomains.add(domain);
			}
		});

		try {
			console.warn(kleur.green('[INFO]:'), `Saving the file: ${file}`);

			await writeFile(
				file,

				fileContents
					.replace(/^# Total number of network filters: ?(\d*)$/gmu, `# Total number of network filters: ${existingDomains.size}`)
					.replace('# Count       : N/A', `# Count       : ${existingDomains.size}`),

				'utf8',
			);
		} catch (err) {
			console.warn(kleur.red('[ERROR]:'), err.stack);
		}
	}));
})();
