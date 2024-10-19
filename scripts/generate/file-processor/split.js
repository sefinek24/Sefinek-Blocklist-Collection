const { promises: fs } = require('node:fs');
const path = require('node:path');

const MAX_MB = 99;
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024;

module.exports = async (fullNewFile, replacedFile, header = '') => {
	const fileStats = await fs.stat(fullNewFile);
	if (fileStats.size > MAX_FILE_SIZE) {
		const trimmedContent = header + replacedFile.slice(0, MAX_FILE_SIZE);
		await fs.writeFile(fullNewFile, trimmedContent, 'utf8');
		console.log(`📑 File trimmed to ${MAX_MB}MB and updated: ${fullNewFile}`);
	}

	let part = 2;
	const { dir, name, ext } = path.parse(fullNewFile);
	for (let start = MAX_FILE_SIZE; start < replacedFile.length; start += MAX_FILE_SIZE) {
		const partContent = header + replacedFile.slice(start, start + MAX_FILE_SIZE);
		const partFilePath = path.join(dir, `${name}_${part}${ext}`);

		await fs.writeFile(partFilePath, partContent, 'utf8');
		console.log(`✔️ Created part ${part}: ${partFilePath}`);

		part++;
	}

	return replacedFile.length > MAX_FILE_SIZE;
};