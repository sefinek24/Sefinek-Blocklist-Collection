const { mkdir, readdir, readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');
const patterns = ['[Adblock Plus]', '! Version:', '! Description:', '! Title:', '! Last modified:', '! Expires:', '! Homepage:', '! Syntax:'];

const processDirectory = async dirPath => {
	try {
		await mkdir(dirPath, { recursive: true });

		const fileNames = await readdir(dirPath);
		const txtFiles = fileNames.filter(fileName => fileName.endsWith('.txt'));

		await Promise.all(
			txtFiles.map(async (fileName) => {
				const filePath = join(dirPath, fileName);
				let fileContents = await readFile(filePath, 'utf8');

				let modifiedLines = 0;
				let convertedDomains = 0;

				fileContents = fileContents
					.split('\n')
					.map(line => {
						line = line.trim();

						if (line.includes('127.0.0.1  localhost')) line = '0.0.0.0 localhost';
						if (line.includes('::1  localhost')) line = '::1 localhost';

						if (
							line.includes('127.0.0.1 localhost') ||
							line.includes('127.0.0.1 localhost.localdomain') ||
							line.includes('127.0.0.1 local')
						) {
							return line;
						}

						const [ip, domain, ...comment] = line.split(/\s+/);

						// Check if domain contains uppercase letters
						if (line.match(/^(0\.0\.0\.0|127\.0\.0\.1)\s/) && (/[A-Z]/).test(line)) {
							const modifiedLine = `${ip.trim()} ${domain.toLowerCase().trim()} ${comment.join(' ').trim()}`;

							if (modifiedLine !== line) {
								convertedDomains++;
								modifiedLines++;

								line = modifiedLine;
							}
						}


						// 127.0.0.1 || 195.187.6.33 || 195.187.6.34  || 195.187.6.35 -> 0.0.0.0
						// grex "127.0.0.1" "195.187.6.33" "195.187.6.34" "195.187.6.35"
						const ipsToReplace = (/^1(?:95\.187\.6\.3[3-5]|27\.0\.0\.1)/g);
						if (ipsToReplace.test(line)) {
							modifiedLines++;
							line = line.replace(ipsToReplace, '0.0.0.0');
						}


						// 0.0.0.0\t -> 0.0.0.0
						if (line.includes('0.0.0.0\t')) {
							modifiedLines++;
							line = line.replace('0.0.0.0\t', '0.0.0.0 ');
						}


						// 0.0.0.0 ||example.com^ -> 0.0.0.0 example.com
						if (!(line.startsWith('0.0.0.0') || line.startsWith('127.0.0.1')) && !line.includes('#') && (/\|\||\^/gim).test(line)) {
							const words = line.split(' ');
							if (words.length !== 1) return;

							line = `0.0.0.0 ${words[0].replace(/[|^]/gim, '').replace(/!/gim, '#').replace(/[\\[]/gim, '# [')}`;
							modifiedLines++;
						}

						// ! -> #
						if (patterns.some(pattern => line.startsWith(pattern))) {
							line = line.replace('!', '#');

							if (line === '[Adblock Plus]') {
								line = '# [Adblock Plus]';
							} else if (line === '# Syntax: Adblock Plus Filter List') {
								line = '# Syntax: 0.0.0.0 <domain>';
							}

							modifiedLines++;
						}


						// domain -> 0.0.0.0 domain
						if (!(line.startsWith('0.0.0.0') || line.startsWith('127.0.0.1')) && !line.includes('#')) {
							const words = line.split(' ');
							if (words.length === 1 && words[0] !== '') {
								const modifiedLine = `0.0.0.0 ${words[0].toLowerCase()}`;
								if (modifiedLine !== line && modifiedLine.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) {
									modifiedLines++;
									line = modifiedLine;
								}
							}
						}


						// 0.0.0.0 example1.com example2.com
						//               ->
						// 0.0.0.0 example1.com
						// 0.0.0.0 example2.com
						if ((line.startsWith('0.0.0.0') || line.startsWith('127.0.0.1')) && !line.includes('#')) {
							const words = line.split(' ');
							if (words.length > 2) {
								const ipAddress = words.shift();
								const domains = words.join(' ').split(' ')
									.filter(d => d.length > 0);

								const modifiedLine = domains
									.map(d => `${ipAddress} ${d.toLowerCase()}`)
									.join('\n')
									.trim();

								if (modifiedLine !== line && modifiedLine.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) {
									modifiedLines++;
									line = modifiedLine;
								}
							}
						}

						// 0.0.0.0example.com -> 0.0.0.0 example.com
						const match = line.match(/^0\.0\.0\.0([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\s+.*)?$/);
						if (match) {
							modifiedLines++;
							line = `0.0.0.0 ${match[1].toLowerCase()}${match[2] ? match[2] : ''}`;
						}

						// 0.0.0.0 -> nothing
						if (line === '0.0.0.0') {
							modifiedLines++;
							line = line.replace('0.0.0.0', '');
						}

						// 127.0.0.1 -> nothing
						if (line === '127.0.0.1') {
							modifiedLines++;
							line = line.replace('127.0.0.1', '');
						}


						return line;
					})
					.join('\n');



				if (modifiedLines !== 0) {
					await writeFile(filePath, fileContents.trim(), 'utf8');

					console.log(
						`📝 ${fileName}: ${modifiedLines} ${modifiedLines === 1 ? 'line' : 'lines'} modified${
							convertedDomains > 0 ? ` and ${convertedDomains} ${convertedDomains === 1 ? 'domain' : 'domains'} converted to lowercase` : ''
						}`
					);
				}
			})
		);

		const subDirectories = await readdir(dirPath, { withFileTypes: true });

		await Promise.all(
			subDirectories
				.filter((subDir) => subDir.isDirectory())
				.map((subDir) => processDirectory(join(dirPath, subDir.name)))
		);
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