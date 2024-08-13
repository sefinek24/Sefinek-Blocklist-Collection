const { mkdir, readdir, rm } = require('node:fs/promises');
const { join, basename, extname } = require('node:path');
const { createWriteStream, createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');
const axios = require('axios');
const AdmZip = require('adm-zip');
const lzma = require('lzma-native');
const { fileUrls, CATEGORIES, WHITELIST } = require('./scripts/data.js');
const generateHeader = require('./scripts/generateHeader.js');

const downloadFile = async (url, outputPath) => {
	console.log(`Downloading file from ${url} to ${outputPath}...`);
	try {
		const res = await axios.get(url, { responseType: 'stream' });
		await new Promise((resolve, reject) => {
			const writer = createWriteStream(outputPath);
			res.data.pipe(writer);
			writer.on('finish', () => {
				writer.close();
				resolve();
			});
			writer.on('error', err => {
				writer.close();
				reject(err);
			});
		});
	} catch (err) {
		console.error(`Failed to download ${url}. Error: ${err.message}`);
		throw err;
	}
};

const isWhitelisted = domain => {
	return WHITELIST.some(whitelistItem => {
		if (whitelistItem.startsWith('*.')) {
			const baseDomain = whitelistItem.slice(2);
			return domain === baseDomain || domain.endsWith(`.${baseDomain}`);
		} else {
			return domain === whitelistItem;
		}
	});
};

const isCI = process.env.CI === 'true';
const isTTY = process.stdout.isTTY;

const logProgress = message => {
	if (!isCI && isTTY) {
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		process.stdout.write(message);
	} else {
		console.log(message);
	}
};

const extractZipFile = async (zipFilePath, extractToDir) => {
	console.log('Extracting ZIP archive...');
	const zip = new AdmZip(zipFilePath);
	await mkdir(extractToDir, { recursive: true });
	zip.extractAllTo(extractToDir, true);
};

const extractXzFile = (xzFilePath, extractToDir) => {
	console.log('Extracting XZ archive...');
	return new Promise((resolve, reject) => {
		const decompressedPath = join(extractToDir, basename(xzFilePath, '.xz'));
		const inputStream = createReadStream(xzFilePath);
		const outputStream = createWriteStream(decompressedPath);
		const decompressor = lzma.createDecompressor();

		inputStream
			.pipe(decompressor)
			.pipe(outputStream)
			.on('finish', () => {
				resolve(decompressedPath);
				inputStream.destroy();
				outputStream.destroy();
				if (global.gc) global.gc();
			})
			.on('error', err => {
				inputStream.destroy();
				outputStream.destroy();
				reject(err);
			});

		inputStream.on('error', err => {
			outputStream.destroy();
			reject(err);
		});

		decompressor.on('error', err => {
			inputStream.destroy();
			outputStream.destroy();
			reject(err);
		});
	});
};

const processCompressedFile = async (filePath, extractToDir) => {
	await mkdir(extractToDir, { recursive: true });
	const sites = {};

	if (extname(filePath) === '.zip') {
		await extractZipFile(filePath, extractToDir);
	} else if (extname(filePath) === '.xz') {
		await extractXzFile(filePath, extractToDir);
	}

	return sites;
};

const main = async () => {
	const tmpDir = join(__dirname, '..', '..', '..', 'tmp');
	await rm(tmpDir, { recursive: true, force: true });
	await mkdir(tmpDir, { recursive: true });

	for (const { url, name } of fileUrls) {
		const fileName = name || basename(url);
		const filePath = join(tmpDir, fileName);
		const extractToDir = join(tmpDir, `${fileName}_extracted`);

		try {
			await downloadFile(url, filePath);

			let fileSites = {};
			if (['.zip', '.xz'].includes(extname(filePath))) {
				fileSites = await processCompressedFile(filePath, extractToDir);
			}

			fileSites = null;
			if (global.gc) global.gc();
		} catch (err) {
			console.error(`Error processing file ${fileName}: ${err.message}`);
		}
	}

	await rm(tmpDir, { recursive: true, force: true });
	console.log('The process has been completed!');
};

main().catch(console.error);