const { mkdir, readdir, readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');
const validator = require('validator');

const processDirectory = async dirPath => {
	try {
		await mkdir(dirPath, { recursive: true });

		const fileNames = await readdir(dirPath);
		const txtFiles = fileNames.filter(fileName => fileName.endsWith('.txt'));

		const totalModifiedLines = 0;
		const totalConvertedDomains = 0;
		const totalInvalidDomainsRemoved = 0;
		const totalIPsReplaced = 0;
		const totalProcessedFiles = 0;
		const totalCommentsPreserved = 0;

		for (const fileName of txtFiles) {
			const filePath = join(dirPath, fileName);
			const fileContents = await readFile(filePath, 'utf8');

			let modifiedLines = 0;
			let convertedDomains = 0;
			let invalidDomainsRemoved = 0;
			let ipsReplaced = 0;
			let commentsPreserved = 0;

			const lines = fileContents.split('\n');
			const processedLines = [];

			for (let line of lines) {
				line = line.trim();

				if (line.includes('127.0.0.1 localhost')) line = '0.0.0.0 localhost';
				if (line.includes('127.0.0.1 localhost.localdomain')) line = '0.0.0.0 localhost.localdomain';
				if (line.includes('127.0.0.1 local')) line = '0.0.0.0 local';

				if ((/localhost/i).test(line)) {
					processedLines.push(line);
					commentsPreserved++;
					continue;
				}

				// Preserve comments
				if (line.startsWith('#')) {
					processedLines.push(line);
					commentsPreserved++;
					continue;
				}

				const [ip, domain, ...comment] = line.split(/\s+/);

				// Check if domain contains uppercase letters
				if (ip && domain && ip.match(/^(0\.0\.0\.0|127\.0\.0\.1)$/) && (/[A-Z]/).test(domain)) {
					line = `${ip} ${domain.toLowerCase()} ${comment.join(' ').trim()}`.trim();
					convertedDomains++;
					modifiedLines++;
				}

				// Remove invalid domains
				if (domain && !validator.isFQDN(domain, { require_tld: false, allow_underscores: true })) {
					invalidDomainsRemoved++;
					modifiedLines++;
					continue;
				}

				// 127.0.0.1 || 195.187.6.33 || 195.187.6.34  || 195.187.6.35 -> 0.0.0.0
				const ipsToReplace = /^(195\.187\.6\.3[3-5]|127\.0\.0\.1)/;
				if (ipsToReplace.test(line)) {
					line = line.replace(ipsToReplace, '0.0.0.0');
					ipsReplaced++;
					modifiedLines++;
				}

				// 0.0.0.0\t -> 0.0.0.0
				if (line.includes('0.0.0.0\t')) {
					line = line.replace('0.0.0.0\t', '0.0.0.0 ');
					modifiedLines++;
				}

				// 0.0.0.0 ||example.com^ -> 0.0.0.0 example.com
				if (!(line.startsWith('0.0.0.0') || line.startsWith('127.0.0.1')) && !line.includes('#') && (/\|\||\^/gim).test(line)) {
					const words = line.split(' ');
					if (words.length === 1) {
						line = `0.0.0.0 ${words[0].replace(/[|^]/gim, '').replace(/!/, '#').replace(/[\\[]/gim, '# [').toLowerCase()}`;
						modifiedLines++;
					}
				}

				// ! -> #
				if (line.startsWith('! ')) {
					line = line.replace('!', '#');
					if (line === '# Syntax: Adblock Plus Filter List') line = '# Syntax: 0.0.0.0 <domain>';
					modifiedLines++;
				}

				// domain -> 0.0.0.0 domain
				if (!(line.startsWith('0.0.0.0') || line.startsWith('127.0.0.1')) && !line.includes('#')) {
					const words = line.split(' ');
					if (words.length === 1 && words[0] !== '') {
						line = `0.0.0.0 ${words[0].toLowerCase()}`;
						modifiedLines++;
					}
				}

				// 0.0.0.0 example1.com example2.com -> split into multiple lines
				if ((line.startsWith('0.0.0.0') || line.startsWith('127.0.0.1')) && !line.includes('#')) {
					const words = line.split(' ');
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

				// Remove specific lines
				if (line === '0.0.0.0' || line === '127.0.0.1' || line === '[Adblock Plus]') {
					modifiedLines++;
					continue;
				}

				processedLines.push(line);
			}

			if (modifiedLines !== 0) {
				await writeFile(filePath, processedLines.join('\n').trim(), 'utf8');

				console.log(
					`📝 ${fileName}: ${modifiedLines} ${modifiedLines === 1 ? 'line' : 'lines'} modified, ` +
					`${convertedDomains} ${convertedDomains === 1 ? 'domain' : 'domains'} converted to lowercase, ` +
					`${invalidDomainsRemoved} invalid ${invalidDomainsRemoved === 1 ? 'domain' : 'domains'} removed, ` +
					`${ipsReplaced} ${ipsReplaced === 1 ? 'IP' : 'IPs'} replaced, ` +
					`${commentsPreserved} ${commentsPreserved === 1 ? 'comment' : 'comments'} preserved`
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
		console.log('🔍 Searching for .txt files in template directory...');

		const templateDirPath = join(__dirname, '..', 'blocklists', 'templates');
		await processDirectory(templateDirPath);
		console.log(`✔️ The process is completed successfully for ${templateDirPath} directory`);
	} catch (err) {
		console.error(`❌ An error occurred: ${err.message}`);
	}
};

(async () => await run())();

module.exports = () => run;