const { readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');
const getAllTxtFiles = require('./functions/getAllTxtFiles.js');

(async () => {
	const blockListDir = join(__dirname, '..', 'blocklist', 'generated');
	const files = await getAllTxtFiles(blockListDir);

	await Promise.all(files.map(async file => {
		const existingDomains = new Set();
		const fileContents = await readFile(file, 'utf8');

		fileContents.split('\n').forEach(line => {
			if (line.startsWith('0.0.0.0 ')) {
				const domain = line.replace(/^0\.0\.0\.0\s+/g, '');
				existingDomains.add(domain);
			}
		});

		await writeFile(
			file,

			fileContents
				.replace(/^# Total number of network filters: ?(\d*)$/gmu, `# Total number of network filters: ${existingDomains.size}`)
				.replace('# Count       : N/A', `# Count       : ${existingDomains.size}`),

			'utf8',
		);
	}));
})();
