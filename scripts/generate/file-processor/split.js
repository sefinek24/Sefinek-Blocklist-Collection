const { promises: fs } = require('node:fs');
const path = require('node:path');

const MAX_MB = 99;
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024;

const splitFile = async (filePath, content, header = '') => {
	let part = 2;
	const { dir, name, ext } = path.parse(filePath);

	for (let start = MAX_FILE_SIZE; start < content.length; start += MAX_FILE_SIZE) {
		const partContent = header + content.slice(start, start + MAX_FILE_SIZE);
		const partFilePath = path.join(dir, `${name}_${part}${ext}`);

		await fs.writeFile(partFilePath, partContent, 'utf8');
		console.log(`✔️ Created part ${part}: ${partFilePath}`);

		part++;
	}
};

module.exports = { splitFile, MAX_MB, MAX_FILE_SIZE };