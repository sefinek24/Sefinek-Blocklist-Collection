const { readFile, writeFile } = require('node:fs/promises');
const kleur = require('kleur');
const readline = require('readline');
const { join } = require('node:path');
const getAllTxtFiles = require('./functions/getAllTxtFiles.js');

// Check if the '--ignore-question' command line parameter is present
const ignoreQuestion = process.argv.includes('--ignore-question');

// Create an interface for reading user input
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

(async () => {
	// If '--ignore-question' is not present, ask for user confirmation
	if (!ignoreQuestion) {
		rl.question(
			`${kleur.red('[WARN]: THIS PROCEDURE DEMANDS A SIGNIFICANT AMOUNT OF RAM!')}\n\n> ${kleur.yellow('Are you sure? [Yes/no]: ')}`,
			async (answer) => {
				if (answer.toLowerCase() === 'no') {
					console.log(kleur.red('[INFO]: Procedure aborted by the user.'));
					rl.close();
					return;
				}

				console.log(kleur.green('[INFO]: Continuing the procedure...\n'));
				await proceedWithProcedure();
			},
		);
	} else {
		// If '--ignore-question' is present, proceed with the procedure directly
		await proceedWithProcedure();
	}
})();

async function proceedWithProcedure() {
	const blockListDir = join(__dirname, '..', 'blocklist', 'generated');
	console.log(kleur.blue('[INFO]:'), `Path: ${blockListDir}`);

	console.log(kleur.blue('[INFO]:'), 'Searching txt files...');
	const files = await getAllTxtFiles(blockListDir);

	console.log(kleur.blue('[INFO]:'), 'Promise.all()');
	console.log(kleur.yellow('[WARN]:'), 'This may take a while. Your computer may become unresponsive for a moment.');
	await Promise.all(files.map(async (file) => {
		console.log(kleur.green('[INFO]:'), `Counting domains in the file: ${file}`);

		const existingDomains = new Set();
		const fileContents = await readFile(file, 'utf8');
		fileContents.split('\n').forEach((line) => {
			if (
				line.startsWith('0.0.0.0 ') ||
				line.startsWith('127.0.0.1 ') ||
				line.startsWith('server=/') ||
				line.startsWith('||')
			) {
				const domain = line.replace(/^(0\.0\.0\.0|127\.0\.0\.1|server=\/|^\|\|)\s+/g, '');
				existingDomains.add(domain);
			}
		});

		try {
			console.log(kleur.green('[INFO]:'), `Saving the file: ${file}`);

			await writeFile(
				file,
				fileContents
					.replace(/^# Total number of network filters: ?(\d*)$/gmu, `# Total number of network filters: ${existingDomains.size}`)
					.replace('# Count       : N/A', `# Count       : ${existingDomains.size}`),
				'utf8',
			);
		} catch (err) {
			console.log(kleur.red('[ERROR]:'), err.stack);
		}
	}));

	// Close the readline interface
	rl.close();
}
