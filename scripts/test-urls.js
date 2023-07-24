require('dotenv').config({ path: '../.env' });

const fs = require('node:fs');
const { version } = require('../package.json');
const axios = require('axios');
const kleur = require('kleur');

const markdownFile = '../lists/md/Pi-hole.md';
const userAgent = `Mozilla/5.0 (compatible; SefinekBlocklistCollection/${version}; +https://sefinek.net/blocklist-generator)`;
const serveUrl = link => process.env.NODE_ENV === 'production' ? link : link.replace('https://blocklist.sefinek.net', `${process.env.PROTOCOL}${process.env.DOMAIN}:${process.env.PORT}`);

async function testLinks() {
	console.log(kleur.white('=== Testing urls collection ===\n'));

	let totalLinks = 0;
	let successfulLinks = 0;
	let failedLinks = 0;
	let retriesFails = 0;

	try {
		const fileContent = await fs.promises.readFile(markdownFile, 'utf-8');
		const links = extractLinks(fileContent);
		totalLinks = links.length;

		for (let link of links) {
			link = serveUrl(link);
			try {
				console.log(kleur.blue('>'), link);
				const response = await axios.head(link, { headers: { 'User-Agent': userAgent } });
				console.log(`${kleur.bgGreen(response.status)} ${kleur.green(`Status: ${response.statusText}`)}`);
				successfulLinks++;
			} catch (err1) {
				let retries = 0;
				let success = false;
				retriesFails++;

				if (err1.response) {
					console.warn(`${kleur.bgRed(err1.response.status)} ${kleur.red(`Status: ${err1.response.statusText}`)}`);
				} else {
					return console.error(kleur.red('FATAL ERROR:'), err1.stack);
				}

				while (retries < 3) {
					if (retriesFails >= 12) {
						throw new Error(`Exceeded maximum retries - ${retriesFails}. Test failed.`);
					}

					console.log(kleur.blue('> Waiting 2 seconds...'));
					await sleep(2000);

					try {
						console.log(kleur.blue('> Retrying...'));
						const response = await axios.get(serveUrl(link), { headers: { 'User-Agent': userAgent } });
						console.log(`${kleur.bgGreen(response.status)} ${kleur.green(`Status: ${response.statusText}`)}`);
						successfulLinks++;
						success = true;
						break;
					} catch (err2) {
						console.log(`${kleur.bgRed(err2.response.status)} ${kleur.red(`Status: ${err2.response.statusText}`)}`);
						retries++;
						retriesFails++;
					}
				}

				if (!success) {
					console.log(kleur.bgRed('Max retries exceeded. Skipping link.\n'));
					failedLinks++;
				}
			}
		}

		console.log(kleur.white('\n=== Test Summary ==='));
		console.log(kleur.blue(`Total links: ${totalLinks}`));
		console.log(kleur.green(`Successful links: ${successfulLinks}/${totalLinks}`));
		console.log(kleur.red(`Failed links: ${failedLinks}/${totalLinks}`));
		console.log(kleur.magenta(`Failed retries: ${retriesFails}`));
	} catch (err) {
		console.error('An error occurred while testing links:', err);
	}
}

function extractLinks(content) {
	const linkRegex = /```dotenv([\s\S]*?)```/g;
	const links = [];
	let match;

	let urlMatch;
	while ((match = linkRegex.exec(content))) {
		const codeBlock = match[1];
		const urlRegex = /https:\/\/blocklist\.sefinek\.net\/generated\/\d+\.\d+\.\d+\.\d+\/(?:[\w-]+\/)*[\w\\.-]+\.\w+/g;

		while ((urlMatch = urlRegex.exec(codeBlock))) {
			links.push(urlMatch[0]);
		}
	}

	return links;
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => await testLinks())();

module.exports = () => testLinks;