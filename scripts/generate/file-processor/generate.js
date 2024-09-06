const { mkdir, rm } = require('node:fs/promises');
const { createReadStream, createWriteStream, statSync } = require('node:fs');
const { join } = require('node:path');
const readline = require('node:readline');
const cluster = require('node:cluster');
const numCPUs = require('node:os').availableParallelism();
const { CATEGORIES, GLOBAL_WHITELIST } = require('./scripts/data.js');

const matchesPattern = (pattern, domain) => {
	const regexPattern = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
	return regexPattern.test(domain);
};

const isDomainWhitelisted = domain => GLOBAL_WHITELIST.some(pattern => matchesPattern(pattern, domain));

const tmpDir = join(__dirname, '..', '..', '..', 'tmp');
const inputFilePath = join(tmpDir, 'global.txt');

const processChunk = async (start, end, chunkId) => {
	console.time(`Execution Time for chunk ${chunkId}`);
	console.log(`Worker ${process.pid} processing chunk ${chunkId}: ${start} - ${end}`);

	const domainCounters = CATEGORIES.reduce((acc, { file }) => {
		acc[file] = 0;
		return acc;
	}, {});

	const writeStreams = CATEGORIES.reduce((acc, { file }) => {
		const outputPath = join(__dirname, `../../../blocklists/templates/${file}`);
		acc[file] = createWriteStream(outputPath, { flags: 'a' });
		return acc;
	}, {});

	const rl = readline.createInterface({ input: createReadStream(inputFilePath, { start, end }), crlfDelay: Infinity });
	rl.on('line', line => {
		if (isDomainWhitelisted(line)) return console.log(`Line "${line}" is whitelisted and will be ignored`);

		for (const { regex, file, whitelist } of CATEGORIES) {
			if (whitelist && whitelist.test(line)) continue;

			if (!regex.test(line)) continue;
			writeStreams[file].write(`\n0.0.0.0 ${line}`);
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
		stream.on('error', err => console.error(`Worker ${process.pid} error writing to file: ${err.message}`));
	}
};

if (cluster.isPrimary) {
	(async () => {
		for (const { file } of CATEGORIES) {
			const dir = join(__dirname, 'output', file.split('/')[0]);
			await mkdir(dir, { recursive: true });
		}
	})();

	const fileSize = statSync(join(__dirname, '..', '..', '..', 'tmp', 'global.txt')).size;
	const chunkSize = Math.ceil(fileSize / numCPUs);

	for (let i = 0; i < numCPUs; i++) {
		const start = i * chunkSize;
		const end = (i === numCPUs - 1) ? fileSize - 1 : (start + chunkSize - 1);
		cluster.fork({ start, end, chunkId: i });
	}

	let workersExited = 0;
	cluster.on('exit', (worker, code, signal) => {
		workersExited++;
		if (code !== 0) console.error(`Worker ${worker.process.pid} terminated unexpectedly with code ${code} and signal ${signal}`);

		if (workersExited === numCPUs) {
			rm(tmpDir, { recursive: true, force: true })
				.then(() => console.log(`Deleted ${tmpDir}`))
				.catch(err => console.error(`Failed to delete ${tmpDir}:`, err));
		}
	});
} else {
	const { start, end, chunkId } = process.env;
	processChunk(Number(start), Number(end), Number(chunkId)).catch(console.error);
}