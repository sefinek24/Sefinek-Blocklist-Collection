const { readdir, readFile, writeFile } = require('node:fs/promises');
const { resolve, join } = require('node:path');

async function getAllTxtFiles(dir) {
	const dirents = await readdir(dir, { withFileTypes: true });
	const filesPromise = await Promise.all(
		dirents.map(dirent => {
			const res = resolve(dir, dirent.name);

			return dirent.isDirectory() ? getAllTxtFiles(res) : res;
		}),
	);
	return Array.prototype.concat(...filesPromise).filter((file) => {
		return file.endsWith('.txt') && file.includes('blocklist');
	});
}

(async () => {
	const blockListDir = join(__dirname, '..', 'blocklist', 'generated');
	const files = await getAllTxtFiles(blockListDir);

	await Promise.all(files.map(async file => {
		const existingDomains = new Set();

		const fileContents = await readFile(join(__dirname, '..', file), 'utf8');

		fileContents.split('\n').forEach((line) => {
			if (line.startsWith('0.0.0.0 ')) {
				existingDomains.add(line.replace('0.0.0.0 ', ''));
			}
		});

		await writeFile(join(__dirname, '..', file), fileContents.replace(/^# Total number of network filters: ?(\d*)$/gmu, `# Total number of network filters: ${existingDomains.size}`), 'utf8');
	}));
})();
