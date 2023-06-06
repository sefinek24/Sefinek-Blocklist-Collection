const fs = require('fs/promises');
const path = require('node:path');
const date = require('./functions/date.js');

const defaultFolder = path.join(__dirname, '..', 'blocklist', 'template');
const generatedFolder = path.join(__dirname, '..', 'blocklist', 'generated');
const outputFile = path.join(generatedFolder, 'everything.txt');

const parseDomain = line => {
	const domain = line.trim().replace(/^0\.0\.0\.0\s+/, '');
	return domain === '' ? null : domain;
};

const header = size => {
	return `# -------------------------------------------------------------------------------------------------------------------------------------------------------
#
#       _____   ______   ______   _____   _   _   ______   _  __        ____    _         ____     _____   _  __  _        _____    _____   _______
#      / ____| |  ____| |  ____| |_   _| | \\ | | |  ____| | |/ /       |  _ \\  | |       / __ \\   / ____| | |/ / | |      |_   _|  / ____| |__   __|
#     | (___   | |__    | |__      | |   |  \\| | | |__    | ' /        | |_) | | |      | |  | | | |      | ' /  | |        | |   | (___      | |
#      \\___ \\  |  __|   |  __|     | |   | . \` | |  __|   |  <         |  _ <  | |      | |  | | | |      |  <   | |        | |    \\___ \\     | |
#      ____) | | |____  | |       _| |_  | |\\  | | |____  | . \\        | |_) | | |____  | |__| | | |____  | . \\  | |____   _| |_   ____) |    | |
#     |_____/  |______| |_|      |_____| |_| \\_| |______| |_|\\_\\       |____/  |______|  \\____/   \\_____| |_|\\_\\ |______| |_____| |_____/     |_|
#
#                                   The best collection of blocklists for Pi-hole and AdGuard - https://sefinke.net
#                                            https://github.com/sefinek24/PiHole-Blocklist-Collection
#
# » Title       : Big collection of blocklist
# » Description : This list contains a collection of everything from https://github.com/sefinek24/PiHole-BlockList-Test/tree/main/blocklist/template (without apps)
# » Author      : Sefinek (https://sefinek.net) <contact@sefinek.net>
# » GitHub      : https://github.com/sefinek24/PiHole-Blocklist-Collection
# » Release     : Default (with 0.0.0.0)
# » Domains     : ${size}
# » Version     : ${date.timestamp}
# » Last update : ${date.hours}:${date.minutes}:${date.seconds}.${date.milliseconds}, ${date.day}.${date.month}.${date.year} [GMT+2 HH:MM:SS.MS, DD.MM.YYYY]
#
# 〢 Warning:
# By using this file, you acknowledge that the author is not liable for any damages or losses that may arise from its use, although the likelihood of such events is low.
#
# 〢 About:
# This file is part of the Sefinek's Blocklist Collection, maintained by github.com/sefinek24.
# If you come across any false positives, please create a new Issue or Pull request on GitHub. Thank you!
#
# ---------------------------------------------------------------------------------------------------------------------------------------------------\n`;
};

const worker = async () => {
	try {
		await fs.access(generatedFolder);
	} catch (err) {
		await fs.mkdir(generatedFolder, { recursive: true });
		console.log('📁 Created \'generated\' folder');
	}

	const files = (await fs.readdir(defaultFolder)).filter((file) => file.endsWith('.txt'));
	const domains = new Set();

	await Promise.all(
		files.map(async file => {
			const fileContents = await fs.readFile(path.join(defaultFolder, file), 'utf8');

			fileContents.split('\n').forEach((line) => {
				if (line.startsWith('0.0.0.0 ')) {
					const domain = parseDomain(line);
					if (domain !== null) {
						domains.add(domain);
					}
				}
			});
		}),
	);

	const allDomainsSize = domains.size.toLocaleString('en-US');
	const newContent = [...domains].map(domain => `0.0.0.0 ${domain}`).join('\n');

	try {
		const savedContent = await fs.readFile(outputFile, 'utf8');
		const savedDomains = new Set(savedContent.trim().split('\n').map(parseDomain).filter((domain) => domain !== null));
		const newDomains = [...domains].filter(domain => !savedDomains.has(domain) && !domain.startsWith('##'));
		let outputString = savedContent.trim().split('\n').filter((line) => !line.startsWith('##')).join('\n');

		if (newDomains.length > 0) {
			outputString += `\n${newDomains.map(domain => `0.0.0.0 ${domain}`).join('\n')}`;
		}

		const removedDomains = [...savedDomains].filter(domain => !domains.has(domain) && !domain.startsWith('##'));
		if (removedDomains.length > 0) {
			outputString = outputString
				.split('\n')
				.filter((line) => !removedDomains.includes(parseDomain(line)))
				.join('\n');
		}


		// Create or update everything.txt
		if (newDomains.length === 0 && removedDomains.length === 0) {
			console.log(`✔️ everything.txt is up to date with ${savedDomains.size} domains`);
		} else {
			await fs.writeFile(outputFile, `${header(allDomainsSize)}${outputString}`, 'utf8');
			console.log(`📝 Updated everything.txt with ${newDomains.length} new domains and removed ${removedDomains.length} domains (total: ${allDomainsSize}) in ${generatedFolder}\n`);
		}
	} catch (err) {
		console.warn(`⚠️ ${err.message}`);
		await fs.writeFile(outputFile, `${header(allDomainsSize)}${newContent}`, 'utf8');

		console.log(`📝 Saved new file everything.txt with ${allDomainsSize} domains in ${generatedFolder}\n`);
	}
};

(async () => worker())();

module.exports = () => worker;