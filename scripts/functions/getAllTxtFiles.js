const { readdir } = require('node:fs/promises');
const { resolve } = require('node:path');

async function getAllTxtFilesRecursively(directoryPath) {
	const dirents = await readdir(directoryPath, { withFileTypes: true });
	const files = await Promise.all(
		dirents.map(async dirent => {
			const filePath = resolve(directoryPath, dirent.name);

			if (dirent.isDirectory()) {
				return getAllTxtFilesRecursively(filePath);
			} else {
				return filePath;
			}
		}),
	);

	return files.flat().filter(file => file.endsWith('.txt'));
}

module.exports = getAllTxtFilesRecursively;