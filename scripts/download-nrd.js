const { readFile, writeFile, mkdir, readdir } = require('node:fs/promises');
const { join, basename, extname } = require('node:path');
const { createWriteStream, createReadStream } = require('node:fs');
const axios = require('axios');
const AdmZip = require('adm-zip');
const lzma = require('lzma-native');

const REGEX = /interseksualny|a(?:lloromantic|seksualn[ay])|genderfluid|(?:gender)?queer|t(?:rans(?:gender|sexual|exual)|wo\\-spirit)|(?:p(?:oly|an)s|allos|bis)exual|(?:polyamor|nonbinar|ga)y|l(?:esbi(?:jka|an)|gbtq(?:ia|\+))|(?:bi|a)gender|lgbtq?|pride|demi/gim;

const downloadFile = async (url, outputPath) => {
	console.log('GET', url);
	try {
		const res = await axios.get(url, { responseType: 'stream' });
		await new Promise((resolve, reject) => {
			const writer = createWriteStream(outputPath);
			res.data.pipe(writer);
			writer.on('finish', resolve);
			writer.on('error', reject);
		});
	} catch (err) {
		console.error(`Failed to download ${url}.`, err.message);
		throw err;
	}
};

const processFile = async (filePath) => {
	const data = await readFile(filePath, 'utf-8');
	return data.split('\n').reduce((acc, line) => {
		if (REGEX.test(line)) {
			const domain = line.trim().split(/\s+/)[0];
			if (domain) acc.add(`0.0.0.0 ${domain}`);
		}
		return acc;
	}, new Set());
};

const extractZipFile = async (zipFilePath, extractToDir) => {
	const zip = new AdmZip(zipFilePath);
	await mkdir(extractToDir, { recursive: true });
	zip.extractAllTo(extractToDir, true);
};

const extractXzFile = (xzFilePath, extractToDir) => {
	return new Promise((resolve, reject) => {
		const decompressedFileName = basename(xzFilePath, '.xz');
		const decompressedPath = join(extractToDir, decompressedFileName);

		const inputStream = createReadStream(xzFilePath);
		const outputStream = createWriteStream(decompressedPath);
		const decompressor = lzma.createDecompressor();

		inputStream.pipe(decompressor).pipe(outputStream);

		outputStream.on('finish', () => resolve(decompressedPath));
		outputStream.on('error', reject);
	});
};

const processZipFile = async (zipFilePath, extractToDir) => {
	await extractZipFile(zipFilePath, extractToDir);
	const files = await readdir(extractToDir);
	const sites = new Set();

	await Promise.all(files.map(async (file) => {
		const filePath = join(extractToDir, file);
		if ((await readdir(extractToDir)).length > 0) {
			const fileSites = await processFile(filePath);
			fileSites.forEach(site => sites.add(site));
		}
	}));

	return sites;
};

const processCompressedFile = async (filePath, extractToDir) => {
	const ext = extname(filePath);
	if (ext === '.zip') {
		return await processZipFile(filePath, extractToDir);
	} else if (ext === '.xz') {
		await mkdir(extractToDir, { recursive: true });
		const decompressedPath = await extractXzFile(filePath, extractToDir);
		const sites = new Set();
		const files = await readdir(extractToDir);

		await Promise.all(files.map(async (file) => {
			const filePath2 = join(extractToDir, file);
			if ((await readdir(extractToDir)).length > 0) {
				const fileSites = await processFile(filePath2);
				fileSites.forEach(site => sites.add(site));
			}
		}));

		return sites;
	}
};
const main = async () => {
	const tmpDir = join(__dirname, '..', 'tmp');
	const outputFilePath = join(__dirname, '../blocklists/templates/sites/lgbtqplus2.txt');

	await mkdir(tmpDir, { recursive: true });

	const fileUrls = [
		{
			url: 'https://raw.githubusercontent.com/xRuffKez/NRD/main/nrd-30day_part1.txt',
			name: 'xRuffKez_nrd-30day-part1.txt'
		},
		{
			url: 'https://raw.githubusercontent.com/xRuffKez/NRD/main/nrd-30day_part2.txt',
			name: 'xRuffKez_nrd-30day-part2.txt'
		},
		{
			url: 'https://raw.githubusercontent.com/shreshta-labs/newly-registered-domains/main/nrd-1w.csv',
			name: 'shreshta-labs_nrd-1w.txt'
		},
		{
			url: 'https://whoisds.com//whois-database/newly-registered-domains/MjAyNC0wOC0xMi56aXA=/nrd',
			name: 'whoisds1.zip'
		},
		{
			url: 'https://whoisds.com//whois-database/newly-registered-domains/MjAyNC0wOC0xMS56aXA=/nrd',
			name: 'whoisds2.zip'
		},
		{
			url: 'https://whoisds.com//whois-database/newly-registered-domains/MjAyNC0wOC0xMC56aXA=/nrd',
			name: 'whoisds3.zip'
		},
		{
			url: 'https://whoisds.com//whois-database/newly-registered-domains/MjAyNC0wOC0wOS56aXA=/nrd',
			name: 'whoisds4.zip'
		},
		{
			url: 'https://github.com/spaze/domains/raw/main/tld-cz.txt',
			name: 'spaze_tld-cz.txt'
		},
		{
			url: 'https://github.com/tb0hdan/domains/raw/master/data/generic_lgbt/domain2multi-lgbt00.txt.xz',
			name: 'tb0hdan_generic_lgbt.xz'
		}
	];

	const sites = new Set();

	await Promise.all(fileUrls.map(async ({ url, name }) => {
		const fileName = name || basename(url);
		const filePath = join(tmpDir, fileName);
		try {
			await downloadFile(url, filePath);

			if (['.zip', '.xz'].includes(extname(filePath))) {
				const extractToDir = join(tmpDir, `extracted_${fileName}`);
				const zipSites = await processCompressedFile(filePath, extractToDir);
				zipSites.forEach(site => sites.add(site));
			} else {
				const fileSites = await processFile(filePath);
				fileSites.forEach(site => sites.add(site));
			}
		} catch (err) {
			console.error(`Error processing file ${fileName}: ${err.message}`);
		}
	}));

	if (sites.size > 0) {
		const sortedSites = Array.from(sites).sort((a, b) => a.localeCompare(b));

		await writeFile(outputFilePath, `#       _____   ______   ______   _____   _   _   ______   _  __        ____    _         ____     _____   _  __  _        _____    _____   _______
#      / ____| |  ____| |  ____| |_   _| | \\ | | |  ____| | |/ /       |  _ \\  | |       / __ \\   / ____| | |/ / | |      |_   _|  / ____| |__   __|
#     | (___   | |__    | |__      | |   |  \\| | | |__    | ' /        | |_) | | |      | |  | | | |      | ' /  | |        | |   | (___      | |
#      \\___ \\  |  __|   |  __|     | |   | . \` | |  __|   |  <         |  _ <  | |      | |  | | | |      |  <   | |        | |    \\___ \\     | |
#      ____) | | |____  | |       _| |_  | |\\  | | |____  | . \\        | |_) | | |____  | |__| | | |____  | . \\  | |____   _| |_   ____) |    | |
#     |_____/  |______| |_|      |_____| |_| \\_| |______| |_|\\_\\       |____/  |______|  \\____/   \\_____| |_|\\_\\ |______| |_____| |_____/     |_|
#
#                                             The best collection of blocklists for your DNS server
#                                                       https://blocklist.sefinek.net
#
# Title: Blocks LGBT websites solely based on their addresses
# Description: N/A
# Expires: 1 day
# Count: ${sortedSites.length}
# Author: Sefinek (https://sefinek.net) <contact@sefinek.net>
# Modified by: Nobody
# Source: N/A
# License: Unknown
# Release: <Release>
# Version: <Version>
# Last update: <LastUpdate>
#
# 〢 About:
# This file is part of the Sefinek Blocklist Collection, maintained by github.com/sefinek24.
# If you come across any false positives, please create a new Issue or Pull request on GitHub. Thank you!
#
# 〢 Warning:
# By using this file, you acknowledge that the author is not liable for any damages or losses that may arise from its use, although the likelihood of such events is low.
#
# -------------------------------------------------------------------------------------------------------------------------------------------------------
${sortedSites.join('\n')}`, { flag: 'w' });
	}

	console.log('Processing complete! Check the file at:', outputFilePath);
};

main().catch(console.error);
