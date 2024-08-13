const readline = require('readline');
const axios = require('axios');
const unzipper = require('unzipper');
const lzma = require('lzma-native');
const { mkdir, rm, readdir } = require('node:fs/promises');
const { join, basename, extname } = require('node:path');
const { createWriteStream, createReadStream } = require('node:fs');
const { fileUrls } = require('./scripts/data.js');

const downloadFile = async (url, outputPath) => {
	console.log(`Downloading file from ${url} to ${outputPath}...`);

	try {
		const res = await axios.get(url, { responseType: 'stream' });
		await new Promise((resolve, reject) => {
			const writer = createWriteStream(outputPath);
			res.data.pipe(writer);
			writer.on('finish', resolve);
			writer.on('error', reject);
		});
	} catch (err) {
		console.error(err.stack);
		throw err;
	}
};

const extractZipFile = async (zipFilePath, extractToDir) => {
	console.log('Extracting ZIP archive:', zipFilePath);

	try {
		await mkdir(extractToDir, { recursive: true });
		return new Promise((resolve, reject) => {
			const readStream = createReadStream(zipFilePath);
			const extractStream = unzipper.Extract({ path: extractToDir });

			readStream
				.pipe(extractStream)
				.on('close', () => {
					readStream.close();
					resolve();
				})
				.on('error', err => {
					readStream.close();
					reject(err);
				});
		});
	} catch (err) {
		console.error(`Failed to extract ZIP archive: ${err.message}`);
		throw err;
	}
};

const extractXzFile = (xzFilePath, extractToDir) => new Promise((resolve, reject) => {
	const decompressedPath = join(extractToDir, basename(xzFilePath, '.xz'));
	const decompressor = lzma.createDecompressor();
	const readStream = createReadStream(xzFilePath);
	const writeStream = createWriteStream(decompressedPath);

	const cleanup = () => {
		readStream.close();
		writeStream.close();
		decompressor.end();
	};

	readStream.pipe(decompressor).pipe(writeStream);

	writeStream.on('finish', () => {
		cleanup();
		resolve(decompressedPath);
	});

	writeStream.on('error', err => {
		cleanup();
		reject(err);
	});

	readStream.on('error', err => {
		cleanup();
		reject(err);
	});

	decompressor.on('error', err => {
		cleanup();
		reject(err);
	});
});

const collectDomains = (filePath, writeStream) => new Promise((resolve, reject) => {
	const rl = readline.createInterface({ input: createReadStream(filePath), crlfDelay: Infinity });
	rl.on('line', line => {
		const domain = extname(filePath) === '.csv' ? line.split(',')[0].trim() : line.trim();
		if (domain && !writeStream.write(domain + '\n')) rl.pause();
	});

	writeStream.on('drain', () => rl.resume());

	rl.on('close', () => {
		writeStream.end();
		resolve();
	});

	rl.on('error', err => {
		writeStream.end();
		reject(err);
	});

	writeStream.on('error', err => {
		rl.close();
		reject(err);
	});
});

const processFilesRecursively = async (directory, writeStream) => {
	const files = await readdir(directory, { withFileTypes: true });

	for (const file of files) {
		const fullPath = join(directory, file.name);
		if (file.isDirectory()) {
			await processFilesRecursively(fullPath, writeStream);
		} else {
			await collectDomains(fullPath, writeStream);
		}
	}
};

const processCompressedFile = async (filePath, extractToDir, writeStream) => {
	await mkdir(extractToDir, { recursive: true });

	if (extname(filePath) === '.zip') {
		await extractZipFile(filePath, extractToDir);
	} else if (extname(filePath) === '.xz') {
		await extractXzFile(filePath, extractToDir);
	}

	await processFilesRecursively(extractToDir, writeStream);
	if (global.gc) global.gc();
};

const main = async () => {
	const tmpDir = join(__dirname, '..', '..', '..', 'tmp');
	await rm(tmpDir, { recursive: true, force: true });
	await mkdir(tmpDir, { recursive: true });

	const globalFilePath = join(tmpDir, 'global.txt');
	for (const { url, name } of fileUrls) {
		const fileName = name || basename(url);
		const filePath = join(tmpDir, fileName);
		const extractToDir = join(tmpDir, `${fileName}_extracted`);

		let writeStream = createWriteStream(globalFilePath, { flags: 'a' });
		try {
			await downloadFile(url, filePath);

			if (['.zip', '.xz'].includes(extname(filePath))) {
				await processCompressedFile(filePath, extractToDir, writeStream);
			} else {
				await collectDomains(filePath, writeStream);
			}

			console.log(`Finished processing ${fileName}`);
		} catch (err) {
			console.error(`Error processing file ${fileName}: ${err.message}`);
		} finally {
			writeStream.end();
			writeStream = null;
		}

		if (global.gc) global.gc();
	}

	console.log(`Global domain list saved to ${globalFilePath}`);
};

main().catch(console.error);