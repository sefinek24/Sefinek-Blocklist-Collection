/*
 *
 * ENG: This script is not functioning correctly. It duplicates domains when a new one is added to templates.
 * POL: Ten skrypt nie działa poprawnie. Duplikuje on domeny, gdy do szablonów dodawana jest nowa.
 *
 */

const fs = require('fs').promises;
const path = require('path');
const date = require('./functions/date.js');

const defaultFolder = path.join(__dirname, '..', 'blocklists', 'templates');
const generatedFolder = path.join(__dirname, '..', 'blocklists', 'generated');
const outputFile = path.join(generatedFolder, 'everything.txt');

const parseDomain = line => {
	const domain = line.trim().replace(/^0\.0\.0\.0\s+/, '');
	return domain === '' ? null : domain;
};

const generateHeader = size => {
	return `# » Domains     : ${size.toLocaleString('en-US')}
# » Version     : ${date.timestamp}
# » Last update : ${date.hours}:${date.minutes}:${date.seconds}.${date.milliseconds}, ${date.day}.${date.month}.${date.year} [GMT+2 HH:MM:SS.MS, DD.MM.YYYY]\n`;
};

const excludedFiles = [
	'myanimelist.net.txt',
	'shinden.pl.txt',
	'discord.txt',
	'spotify.txt',
	'steam.txt',
	'steam-extended.txt',
	'whatsapp.txt',
	'all-valve-games.txt',
	'booth.pm.txt',
	'gamebanana.txt',
	'patreon.txt',
	'pinterest.txt',
	'youtube.txt',
	'youtube-extended.txt',
	'facebook.txt',
	'instagram.txt',
	'twitter.txt'
];

const getAllFiles = async folder => {
	const files = await fs.readdir(folder);
	const filePaths = [];
	for (const file of files) {
		const fullPath = path.join(folder, file);
		const stat = await fs.stat(fullPath);
		if (stat.isDirectory()) {
			const subFolderFiles = await getAllFiles(fullPath);
			filePaths.push(...subFolderFiles);
		} else {
			filePaths.push(fullPath);
		}
	}
	return filePaths;
};

const worker = async () => {
	try {
		await fs.access(generatedFolder);
	} catch (err) {
		await fs.mkdir(generatedFolder, { recursive: true });
		console.log('📁 Created \'generated\' folder');
	}

	const files = await getAllFiles(defaultFolder);
	const domains = new Set();

	await Promise.all(
		files.map(async file => {
			if (!excludedFiles.includes(path.basename(file))) {
				const fileContents = await fs.readFile(file, 'utf8');

				fileContents.split('\n').forEach(line => {
					if (line.startsWith('0.0.0.0 ')) {
						const domain = parseDomain(line);
						if (domain !== null && !domain.startsWith('#')) {
							domains.add(domain);
						}
					}
				});
			}
		})
	);

	const allDomainsSize = domains.size;
	const sortedDomains = [...domains].sort((a, b) => a.localeCompare(b));
	const newContent = sortedDomains.map(domain => `0.0.0.0 ${domain}`).join('\n');
	const newHeader = generateHeader(allDomainsSize);

	try {
		const savedContent = await fs.readFile(outputFile, 'utf8');
		const lines = savedContent.trim().split('\n');
		const existingHeaderIndex = lines.findIndex(line => line.startsWith('# » Domains'));
		let outputString = '';

		if (existingHeaderIndex !== -1) {
			lines.splice(existingHeaderIndex, 1, newHeader);
		} else {
			outputString = newHeader + '\n';
		}

		outputString += newContent;

		const savedDomains = new Set(
			lines
				.slice(existingHeaderIndex + 1)
				.map(parseDomain)
				.filter(domain => domain !== null)
		);
		const newDomains = sortedDomains.filter(
			domain => !savedDomains.has(domain) && !domain.startsWith('#')
		);

		const removedDomains = [...savedDomains].filter(
			domain => !domains.has(domain) && !domain.startsWith('#')
		);

		if (newDomains.length > 0 || removedDomains.length > 0) {
			outputString += '\n' + newDomains.map(domain => `0.0.0.0 ${domain}`).join('\n');

			// Create or update everything.txt
			await fs.writeFile(outputFile, `${newHeader}${outputString}`, 'utf8');
			console.log(
				`📝 Updated everything.txt with ${newDomains.length} new domains and removed ${removedDomains.length} domains (total: ${allDomainsSize.toLocaleString('en-US')}) in ${generatedFolder}\n`
			);
		} else {
			console.log(`✔️ everything.txt is up to date with ${allDomainsSize.toLocaleString('en-US')} domains\n`);
		}
	} catch (err) {
		console.warn(`⚠️ ${err.message}`);
		await fs.writeFile(outputFile, `${newHeader}${newContent}`, 'utf8');
		console.log(
			`📝 Saved new file everything.txt with ${allDomainsSize.toLocaleString('en-US')} domains in ${generatedFolder}\n`
		);
	}
};

(async () => {
	await worker();
})();

module.exports = worker;
