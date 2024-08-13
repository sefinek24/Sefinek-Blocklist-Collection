const { createReadStream, createWriteStream } = require('node:fs');
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');
const readline = require('readline');
const { CATEGORIES } = require('./scripts/data.js');

const processLineByLine = async () => {
	const tmpDir = join(__dirname, '..', '..', '..', 'tmp');
	const fileStream = createReadStream(join(tmpDir, 'global.txt'));

	const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
	for (const { file } of CATEGORIES) {
		const dir = join(__dirname, 'output', file.split('/')[0]);
		await mkdir(dir, { recursive: true });
	}

	const domainCounters = CATEGORIES.reduce((acc, { file }) => {
		acc[file] = 0;
		return acc;
	}, {});

	const writeStreams = CATEGORIES.reduce((acc, { file }) => {
		acc[file] = createWriteStream(join(__dirname, `../../../blocklists/templates/${file}`), { flags: 'a' });
		return acc;
	}, {});

	console.log('Starting to process lines from global.txt...');
	rl.on('line', line => {
		for (const { regex, file } of CATEGORIES) {
			if (regex.test(line)) {
				writeStreams[file].write(line + '\n');
				domainCounters[file]++;
			}
		}
	});

	rl.on('close', () => {
		console.log('Finished processing global.txt');
		for (const [file, count] of Object.entries(domainCounters)) {
			console.log(`Category: ${file} - Collected domains: ${count}`);
		}
		for (const stream of Object.values(writeStreams)) {
			stream.end();
		}
	});

	rl.on('error', err => {
		console.error(`Error reading global.txt: ${err.message}`);
	});

	for (const stream of Object.values(writeStreams)) {
		stream.on('error', err => {
			console.error(`Error writing to file: ${err.message}`);
		});
	}
};

processLineByLine().catch(console.error);