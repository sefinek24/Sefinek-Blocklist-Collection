const { mkdir, rm, readdir } = require('node:fs/promises');
const { join, basename, extname } = require('node:path');
const { createWriteStream, createReadStream } = require('node:fs');
const axios = require('axios');
const AdmZip = require('adm-zip');
const lzma = require('lzma-native');
const readline = require('readline');
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
	console.log(`Extracting ZIP archive: ${zipFilePath}`);
	const zip = new AdmZip(zipFilePath);
	await mkdir(extractToDir, { recursive: true });
	zip.extractAllTo(extractToDir, true);
};

const extractXzFile = (xzFilePath, extractToDir) => new Promise((resolve, reject) => {
	const decompressedPath = join(extractToDir, basename(xzFilePath, '.xz'));
	createReadStream(xzFilePath)
		.pipe(lzma.createDecompressor())
		.pipe(createWriteStream(decompressedPath))
		.on('finish', () => resolve(decompressedPath))
		.on('error', reject);
});

const collectDomains = (filePath, writeStream) => new Promise((resolve, reject) => {
	const rl = readline.createInterface({ input: createReadStream(filePath), crlfDelay: Infinity });

	rl.on('line', line => {
		const domain = extname(filePath) === '.csv' ? line.split(',')[0].trim() : line.trim();
		if (domain) writeStream.write(domain + '\n');
	});

	rl.on('close', resolve);
	rl.on('error', reject);
});

const processFilesRecursively = async (directory, writeStream) => {
	const files = await readdir(directory, { withFileTypes: true });

	for (const file of files) {
		const fullPath = join(directory, file.name);
		if (file.isDirectory()) {
			await processFilesRecursively(fullPath, writeStream);
		} else if (['.txt', '.csv'].includes(extname(fullPath)) || extname(fullPath) === '') {
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
};

const main = async () => {
	const tmpDir = join(__dirname, '..', '..', '..', 'tmp');
	await rm(tmpDir, { recursive: true, force: true });
	await mkdir(tmpDir, { recursive: true });

	const globalFilePath = join(tmpDir, 'global.txt');
	const writeStream = createWriteStream(globalFilePath);

	for (const { url, name } of fileUrls) {
		const fileName = name || basename(url);
		const filePath = join(tmpDir, fileName);
		const extractToDir = join(tmpDir, `${fileName}_extracted`);

		try {
			await downloadFile(url, filePath);

			if (['.zip', '.xz'].includes(extname(filePath))) {
				await processCompressedFile(filePath, extractToDir, writeStream);
			} else if (['.txt', '.csv'].includes(extname(filePath)) || extname(filePath) === '') {
				await collectDomains(filePath, writeStream);
			}

			console.log(`Finished processing ${fileName}`);
		} catch (err) {
			console.error(`Error processing file ${fileName}: ${err.message}`);
		}
	}

	writeStream.end();
	console.log(`Global domain list saved to ${globalFilePath}`);
};

main().catch(console.error);