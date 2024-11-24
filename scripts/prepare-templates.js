const { mkdir, readdir, readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');
const validator = require('validator');
const local = require('./utils/local.js');
const ipsToReplace = /0\.0\.0\.0 local|broadcasthost|localhost|ff0(?:0::0|2::[1-3])|::1/;

const processDirectory = async dirPath => {
	try {
		await mkdir(dirPath, { recursive: true });

		const fileNames = await readdir(dirPath);
		const txtFiles = fileNames.filter(fileName => fileName.endsWith('.txt'));

		for (const fileName of txtFiles) {
			const filePath = join(dirPath, fileName);
			const fileContents = await readFile(filePath, 'utf8');

			let convertedDomains = 0, invalidDomainsRemoved = 0, ipsReplaced = 0, modifiedLines = 0;

			const lines = fileContents.split('\n');
			const processedLines = [];

			for (let line of lines) {
				line = line.trim();

				// Remove 0.0.0.0
				if (line === '0.0.0.0') {
					invalidDomainsRemoved++;
					continue;
				}

				// Replace localhost entries with 0.0.0.0
				if (line.includes('127.0.0.1 localhost')) line = '0.0.0.0 localhost';
				if (line.includes('127.0.0.1 localhost.localdomain')) line = '0.0.0.0 localhost.localdomain';
				if (line.includes('127.0.0.1 local')) line = '0.0.0.0 local';

				// grex "localhost" "broadcasthost" "::1" "ff00::0" "ff02::1" "ff02::2" "ff02::3" "0.0.0.0 local"
				if (local.test(line)) {
					processedLines.push(line);
					continue;
				}

				// Preserve comments
				if (line.startsWith('#')) {
					processedLines.push(line);
					continue;
				}

				// domain -> 0.0.0.0 domain
				if (!(line.startsWith('0.0.0.0') || line.startsWith('127.0.0.1')) && !line.includes('#')) {
					const words = line.split(/\s+/);
					if (words.length === 1 && words[0] !== '') {
						line = `0.0.0.0 ${words[0].toLowerCase()}`;
						modifiedLines++;
					}
				}

				// doMAin.tld -> domain.tld
				if (line.match(/^(0\.0\.0\.0|127\.0\.0\.1)\s+/)) {
					const words = line.split(/\s+/);
					const domain = words[1];
					if ((/[A-Z]/).test(domain)) {
						line = `${words[0]} ${domain.toLowerCase()} ${words.slice(2).join(' ')}`.trim();
						convertedDomains++;
					}
				}

				// 127.0.0.1 || 195.187.6.33 || 195.187.6.34 || 195.187.6.35 -> 0.0.0.0
				if (line.startsWith('127.0.0.1') || line.startsWith('195.187.6.33') || line.startsWith('195.187.6.34') || line.startsWith('195.187.6.35')) {
					line = line.replace(ipsToReplace, '0.0.0.0');
					ipsReplaced++;
				}

				// 0.0.0.0\t -> 0.0.0.0 ||  0.0.0.0		-> 0.0.0.0
				if (line.startsWith('0.0.0.0\t') || line.startsWith('0.0.0.0  ')) {
					line = line.replace(/0\.0\.0\.0\s+/, '0.0.0.0 ');
					modifiedLines++;
				}

				// AdGuard specific replacements
				if (line.startsWith('||') && !line.includes('#')) {
					line = `0.0.0.0 ${line.replace(/^(\|\|)/, '').replace(/\^$/, '')}`;
					modifiedLines++;
				}

				// ! -> #
				if (line.startsWith('!')) {
					line = line.replace('!', '#');
					if (line === '# Syntax: Adblock Plus Filter List') line = '# Syntax: 0.0.0.0 domain.tld';
					modifiedLines++;
				}

				// 0.0.0.0 example1.com example2.com -> split into multiple lines
				if ((line.startsWith('0.0.0.0') || line.startsWith('127.0.0.1')) && !line.includes('#')) {
					const words = line.split(/\s+/);
					if (words.length > 2) {
						const ipAddress = words.shift();
						line = words.map(d => `${ipAddress} ${d.toLowerCase()}`).join('\n').trim();
						modifiedLines++;
					}
				}

				// 0.0.0.0example.com -> 0.0.0.0 example.com
				const match = line.match(/^0\.0\.0\.0([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\s+.*)?$/);
				if (match) {
					line = `0.0.0.0 ${match[1].toLowerCase()}${match[2] ? match[2] : ''}`;
					modifiedLines++;
				}

				// keyboardcat domain.tld -> 0.0.0.0 domain.tld
				if (!line.startsWith('0.0.0.0 ')) {
					line = `0.0.0.0 ${line.replace(/^\S+\s*/, '')}`;
					modifiedLines++;
				}

				// Remove invalid domains
				if (line.match(/^(0\.0\.0\.0|127\.0\.0\.1)\s+/)) {
					const words = line.split(/\s+/);
					const domain = words[1];
					if (domain && !validator.isURL(domain, { require_valid_protocol: false, allow_underscores: true })) {
						invalidDomainsRemoved++;
						continue;
					}
				}

				processedLines.push(line);
			}

			// Save
			if (modifiedLines !== 0 || convertedDomains !== 0 || invalidDomainsRemoved !== 0 || ipsReplaced !== 0) {
				await writeFile(filePath, processedLines.join('\n').trim(), 'utf8');

				console.log(
					`📝 ${fileName}: ${modifiedLines} ${modifiedLines === 1 ? 'line' : 'lines'} modified; ` +
					`${convertedDomains} ${convertedDomains === 1 ? 'domain' : 'domains'} converted to lowercase; ` +
					`${invalidDomainsRemoved} invalid ${invalidDomainsRemoved === 1 ? 'line' : 'lines'} removed; ` +
					`${ipsReplaced} ${ipsReplaced === 1 ? 'IP' : 'IPs'} replaced`
				);
			}
		}

		const subDirectories = await readdir(dirPath, { withFileTypes: true });
		for (const subDirectory of subDirectories.filter(subDir => subDir.isDirectory())) {
			await processDirectory(join(dirPath, subDirectory.name));
		}
	} catch (err) {
		console.error(`❌ An error occurred while processing ${dirPath} directory.`, err);
	}
};

const run = async () => {
	try {
		console.log('🔍 Analyzing the `templates` folder...');

		const templateDirPath = join(__dirname, '..', 'blocklists', 'templates');
		await processDirectory(templateDirPath);
		console.log(`✔️ Completed successfully for ${templateDirPath}`);
	} catch (err) {
		console.error(`❌ An error occurred: ${err.message}`);
	}
};

(async () => await run())();

module.exports = () => run;