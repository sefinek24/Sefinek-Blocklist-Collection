const { writeFile } = require('node:fs/promises');
const { createReadStream } = require('node:fs');
const { red, blue, green } = require('kleur');
const readline = require('readline');
const { join } = require('node:path');
const getAllTxtFiles = require('./utils/getAllTxtFiles.js');

const createUpdatedContents = (lines, domainCount) => {
	const countText = domainCount?.toLocaleString('en-US') || 'Unknown';
	return lines.join('\n')
		.replace(
			/^(#\s*)(Domains|Count|Entries|Number of entries|Number of unique domains|Total number of network filters)(:\s*)(\d*[\d,]*)$/im,
			(_, prefix, key, separator) => `${prefix}${key}${separator}${countText}`
		);
	// .replace(/^# last updated:.*GMT.*$/im, (match) => match + ` (Sefinek lists: ${new Date().toUTCString()})`);
};

const processFile = async file => {
	let domainCount = 0;
	const lines = [];

	const rl = readline.createInterface({ input: createReadStream(file, 'utf8'), crlfDelay: Infinity });
	for await (const line of rl) {
		if (line.startsWith('0.0.0.0 ')) domainCount++;
		lines.push(line);
	}

	const updatedFileContents = createUpdatedContents(lines, domainCount);
	await writeFile(file, updatedFileContents, 'utf8');
	console.log(green('[INFO]:'), `${domainCount.toLocaleString('en-US', { minimumIntegerDigits: 8, useGrouping: true }).replace(/,/g, ' ')} domains: ${file}`);
};

(async () => {
	const blockListDir = join(__dirname, '..', 'blocklists', 'templates');
	console.log(blue('[INFO]:'), blockListDir);

	try {
		const files = await getAllTxtFiles(blockListDir);
		console.log(blue('[INFO]:'), `Processing ${files.length} txt files...`);

		await Promise.all(files.map(processFile));
	} catch (err) {
		console.error(red('[FAIL]:'), err.message);
	}
})();