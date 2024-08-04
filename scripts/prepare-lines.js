const { Address4, Address6 } = require('ip-address');
const validator = require('validator');
const { mkdir, readdir, readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');

const privateSubnets4 = [
	new Address4('10.0.0.0/8'),
	new Address4('172.16.0.0/12'),
	new Address4('192.168.0.0/16')
];

const privateSubnets6 = [
	new Address6('fc00::/7')
];

const isPrivateIP = ip => {
	if (!ip || ip === '::') return false;

	try {
		const address4 = new Address4(ip);
		if (address4.isCorrect()) {
			return privateSubnets4.some(subnet => subnet.isInSubnet(address4));
		}

		const address6 = new Address6(ip);
		if (address6.isCorrect()) {
			return privateSubnets6.some(subnet => subnet.isInSubnet(address6));
		}

		return false;
	} catch (err) {
		console.error(`⚠️ Error checking if IP is private (${ip}): ${err.message}`);
		return false;
	}
};

const processFile = async filePath => {
	try {
		let fileContents = await readFile(filePath, 'utf8');

		const existingDomains = new Set();
		let duplicatesRemoved = 0;
		let emptyLinesRemoved = 0;
		let uselessCommentsRemoved = 0;
		let invalidDomainsRemoved = 0;

		const lines = fileContents.split('\n').map(line => line.trim());
		fileContents = lines.filter(line => {
			if (line === '') {
				emptyLinesRemoved++;
				return false;
			}

			if (line.startsWith('# [')) {
				uselessCommentsRemoved++;
				return false;
			}

			if (line.startsWith('##') || line.startsWith('#') || line.startsWith('!') || line === '0.0.0.0 localhost' || line === '::1 localhost' || line === '127.0.0.1 localhost' || line === '127.0.0.1 local' || line === '::1 ip6-localhost' || line === '::1 ip6-loopback') return true;

			const [ip, domain] = line.split(/\s+/);
			if (ip && isPrivateIP(ip)) return true;

			if (ip && !validator.isURL(domain, { require_valid_protocol: false, allow_underscores: true })) {
				invalidDomainsRemoved++;
				return false;
			}

			if (existingDomains.has(domain)) {
				duplicatesRemoved++;
				return false;
			} else {
				existingDomains.add(domain);
				return true;
			}
		}).join('\n');

		await writeFile(filePath, fileContents, 'utf8');

		if (duplicatesRemoved > 0) {
			console.log(`✔️ ${duplicatesRemoved} ${duplicatesRemoved === 1 ? 'duplicate' : 'duplicates'} removed from ${filePath}`);
		}

		if (emptyLinesRemoved > 0) {
			console.log(`✔️ ${emptyLinesRemoved} ${emptyLinesRemoved === 1 ? 'empty line' : 'empty lines'} removed from ${filePath}`);
		}

		if (uselessCommentsRemoved > 0) {
			console.log(`✔️️ ${uselessCommentsRemoved} ${uselessCommentsRemoved === 1 ? 'useless comment' : 'useless comments'} removed from ${filePath}`);
		}

		if (invalidDomainsRemoved > 0) {
			console.log(`✔️ ${invalidDomainsRemoved} ${invalidDomainsRemoved === 1 ? 'invalid domain' : 'invalid domains'} removed from ${filePath}`);
		}
	} catch (err) {
		console.error(`⚠️ Error processing file ${filePath}: ${err.message}`);
	}
};

const processDirectory = async dirPath => {
	try {
		await mkdir(dirPath, { recursive: true });

		const fileNames = await readdir(dirPath);
		const txtFiles = fileNames.filter(fileName => fileName.endsWith('.txt'));

		await Promise.all(txtFiles.map(fileName => processFile(join(dirPath, fileName))));

		const subdirectories = (await readdir(dirPath, { withFileTypes: true }))
			.filter(file => file.isDirectory())
			.map(file => join(dirPath, file.name));

		await Promise.all(subdirectories.map(subdirectory => processDirectory(subdirectory)));
	} catch (err) {
		console.error(err);
	}
};

const run = async () => {
	try {
		console.log('🔍 Preparing lines in the blocklists/templates directory...');
		await processDirectory(join(__dirname, '..', 'blocklists', 'templates'));
	} catch (err) {
		console.error(err);
	}
};

(async () => await run())();

module.exports = run;