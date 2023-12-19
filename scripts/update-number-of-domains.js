const { createReadStream, createWriteStream } = require('node:fs');
const { red, yellow, blue, green } = require('kleur');
const readline = require('readline');
const { join } = require('node:path');
const getAllTxtFiles = require('./functions/getAllTxtFiles.js');

const ignoreQuestion = process.argv.includes('--ignore-question');

(async () => {
	if (!ignoreQuestion) {
		const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
		const answer = await new Promise(resolve => {
			rl.question(`${red('[WARN]: THIS PROCEDURE DEMANDS A SIGNIFICANT AMOUNT OF RAM!')}\n\n> ${yellow('Are you sure? [Yes/no]: ')}`, resolve);
		});
		rl.close();

		if (answer.toLowerCase() === 'no') {
			console.log(red('[INFO]: Procedure aborted by the user.'));
			return;
		}
	}

	await proceedWithProcedure();
})();

async function proceedWithProcedure() {
	const blockListDir = join(__dirname, '..', 'blocklist', 'generated');
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
}

async function processFile(file) {
	const readStream = createReadStream(file, 'utf8');
	const fileInterface = readline.createInterface({ input: readStream });

	let domainCount = 0;
	let updatedContent = '';
	for await (const line of fileInterface) {
		if (line.startsWith('0.0.0.0 ') || line.startsWith('127.0.0.1 ') || line.startsWith('server=/') || line.startsWith('||')) {
			domainCount++;
		}
		updatedContent += line + '\n';
	}

	fileInterface.close();
	readStream.close();

	const updatedFileContents = updatedContent
		.replace(/^# Total number of network filters: ?(\d*)$/gmu, `# Total number of network filters: ${domainCount}`)
		.replace('# Count       : N/A', `# Count       : ${domainCount}`)
		.replace('! Count       : N/A', `! Count       : ${domainCount}`);

	const writeStream = createWriteStream(file);
	writeStream.write(updatedFileContents);
	writeStream.end();

	console.log(green('[INFO]:'), `Saved: ${file} (${domainCount} domains)`);
}
