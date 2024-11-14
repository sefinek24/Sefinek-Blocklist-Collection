const { writeFile } = require('node:fs/promises');
const { createReadStream } = require('node:fs');
const { red, yellow, blue, green } = require('kleur');
const readline = require('readline');
const { join } = require('node:path');
const getAllTxtFiles = require('./utils/getAllTxtFiles.js');

const ignoreQuestion = process.argv.includes('--ignore-question');

const createUpdatedContents = (lines, domainCount) => {
	return lines.join('\n')
		.replace(/^# Count: ?(\d*)$/gmu, `# Count: ${domainCount || 'N/A'}`)
		.replace(/^# Entries: ?(\d*)$/gmu, `# Entries: ${domainCount || 'N/A'}`)
		.replace('# Count       : N/A', `# Count       : ${domainCount || 'N/A'}`)
		.replace(/^# Number of entries: ?(\d*)$/gmu, `# Number of entries: ${domainCount || 'N/A'}`)
		.replace(/^# Number of unique domains: ?(\d*)$/gmu, `# Number of unique domains: ${domainCount || 'N/A'}`)
		.replace(/^# Total number of network filters: ?(\d*)$/gmu, `# Total number of network filters: ${domainCount || 'N/A'}`);
};

const processFile = async file => {
	const readStream = createReadStream(file, 'utf8');
	const fileInterface = readline.createInterface({ input: readStream });

	let domainCount = 0;
	const updatedContent = [];
	try {
		for (const line of fileInterface) {
			if (line.startsWith('0.0.0.0 ')) domainCount++;
			updatedContent.push(line);
		}
	} finally {
		fileInterface.close();
		readStream.close();
	}

	const updatedFileContents = createUpdatedContents(updatedContent, domainCount);
	await writeFile(file, updatedFileContents, 'utf8');

	console.log(green('[INFO]:'), `Saved: ${file} (${domainCount} domains)`);
};

const proceedWithProcedure = async () => {
	const blockListDir = join(__dirname, '..', 'blocklists', 'templates');
	console.log(blue('[INFO]:'), `Path: ${blockListDir}`);

	try {
		const files = await getAllTxtFiles(blockListDir);
		console.log(blue('[INFO]:'), `Processing ${files.length} txt files...`);

		for (const file of files) {
			await processFile(file);
		}
	} catch (err) {
		console.error(red('[ERROR]:'), err.message);
	}
};

(async () => {
	if (!ignoreQuestion) {
		const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
		const answer = await new Promise(resolve => {
			rl.question(`${red('[WARN]: THIS PROCEDURE DEMANDS A SIGNIFICANT AMOUNT OF RAM!')}\n\n> ${yellow('Are you sure? [Yes/no]: ')}`, resolve);
		});
		rl.close();

		if (answer.toLowerCase() === 'no') {
			return console.log(red('[INFO]: Procedure aborted by the user.'));
		}
	}

	await proceedWithProcedure();
})();