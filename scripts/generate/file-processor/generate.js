const { createReadStream, createWriteStream, statSync, promises: fsPromises } = require('node:fs');
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');
const readline = require('readline');
const cluster = require('cluster');
const os = require('os');
const { CATEGORIES, WHITELIST } = require('./scripts/data.js');

const matchesPattern = (pattern, domain) => {
	const regexPattern = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
	return regexPattern.test(domain);
};

const isDomainWhitelisted = domain => WHITELIST.some(pattern => matchesPattern(pattern, domain));

const clearOldFiles = async file => {
	try {
		await fsPromises.unlink(file);
	} catch (err) {
		console.error(err);
	}
};

const processChunk = async (start, end, chunkId) => {
	const tmpDir = join(__dirname, '..', '..', '..', 'tmp');
	const inputFilePath = join(tmpDir, 'global.txt');

	console.time(`Execution Time for chunk ${chunkId}`);
	console.log(`Worker ${process.pid} processing chunk ${chunkId}: ${start} - ${end}`);

	const rl = readline.createInterface({ input: createReadStream(inputFilePath, { start, end }), crlfDelay: Infinity });

	for (const { file } of CATEGORIES) {
		const dir = join(__dirname, 'output', file.split('/')[0]);
		await mkdir(dir, { recursive: true });
		await clearOldFiles(join(__dirname, `../../../blocklists/templates/${file.split('/')[0]}`));
	}

	const domainCounters = CATEGORIES.reduce((acc, { file }) => {
		acc[file] = 0;
		return acc;
	}, {});

	const writeStreams = CATEGORIES.reduce((acc, { file }) => {
		const outputPath = join(__dirname, `../../../blocklists/templates/${file}`);
		acc[file] = createWriteStream(outputPath, { flags: 'a' });
		return acc;
	}, {});

	rl.on('line', line => {
		if (isDomainWhitelisted(line)) return console.log(`Line "${line}" is whitelisted and will be ignored`);

		for (const { regex, file } of CATEGORIES) {
			if (!regex.test(line)) return;
			writeStreams[file].write(line + '\n');
			domainCounters[file]++;
		}
	});

	rl.on('close', () => {
		console.log(`Worker ${process.pid} finished processing chunk ${chunkId}`);
		for (const [file, count] of Object.entries(domainCounters)) {
			console.log(`Worker ${process.pid} - Category: ${file} - Collected domains: ${count}`);
		}
		for (const stream of Object.values(writeStreams)) {
			stream.end();
		}
		console.timeEnd(`Execution Time for chunk ${chunkId}`);
		cluster.worker.kill();
	});

	rl.on('error', err => {
		console.error(`Worker ${process.pid} error during line processing: ${err.message}`);
	});

	for (const stream of Object.values(writeStreams)) {
		stream.on('error', err => {
			console.error(`Worker ${process.pid} error writing to file: ${err.message}`);
		});
	}
};

if (cluster.isPrimary) {
	const numCPUs = os.cpus().length;
	const inputFilePath = join(__dirname, '..', '..', '..', 'tmp', 'global.txt');
	const fileSize = statSync(inputFilePath).size;
	const chunkSize = Math.ceil(fileSize / numCPUs);

	for (let i = 0; i < numCPUs; i++) {
		const start = i * chunkSize;
		const end = (i === numCPUs - 1) ? fileSize - 1 : (start + chunkSize - 1);
		cluster.fork({ start, end, chunkId: i });
	}

	cluster.on('exit', (worker, code, signal) => {
		if (code !== 0) {
			console.error(`Worker ${worker.process.pid} terminated unexpectedly with code ${code} and signal ${signal}`);
		}
	});
} else {
	const { start, end, chunkId } = process.env;
	processChunk(Number(start), Number(end), Number(chunkId)).catch(console.error);
}