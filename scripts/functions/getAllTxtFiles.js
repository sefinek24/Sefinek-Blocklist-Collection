const { readdir } = require('node:fs/promises');
const { resolve } = require('node:path');

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

module.exports = getAllTxtFiles;