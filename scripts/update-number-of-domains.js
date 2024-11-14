const { writeFile } = require('node:fs/promises');
const { createReadStream } = require('node:fs');
const { red, blue, green } = require('kleur');
const readline = require('readline');
const { join } = require('node:path');
const getAllTxtFiles = require('./utils/getAllTxtFiles.js');

const createUpdatedContents = (lines, domainCount) => {
	return lines.join('\n')
		.replace(/^# Count: ?(\d*)$/gim, `# Count: ${domainCount || 'N/A'}`)
		.replace(/^# Entries: ?(\d*)$/gim, `# Entries: ${domainCount || 'N/A'}`)
		.replace(/^(# Entries:\s*)(\d+)$/gim, (_, prefix) => `${prefix}${domainCount || 'N/A'}`)
		.replace('# Count       : N/A', `# Count       : ${domainCount || 'N/A'}`)
		.replace(/^# Number of entries: ?(\d*)$/gim, `# Number of entries: ${domainCount || 'N/A'}`)
		.replace(/^# Number of unique domains: ?(\d*)$/gim, `# Number of unique domains: ${domainCount || 'N/A'}`)
		.replace(/^# Total number of network filters: ?(\d*)$/gim, `# Total number of network filters: ${domainCount || 'N/A'}`);
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
	const formattedCount = domainCount.toLocaleString('en-US', { minimumIntegerDigits: 8, useGrouping: true }).replace(/,/g, ' ');
	console.log(green('[INFO]:'), `${formattedCount} domains: ${file}`);
};

(async () => {
	const blockListDir = join(__dirname, '..', 'blocklists', 'templates');
	console.log(blue('[INFO]:'), blockListDir);

	try {
		const files = await getAllTxtFiles(blockListDir);
		console.log(blue('[INFO]:'), `Processing ${files.length} txt files...`);

		for (const file of files) {
			await processFile(file);
		}
	} catch (err) {
		console.error(red('[FAIL]:'), err.message);
	}
})();