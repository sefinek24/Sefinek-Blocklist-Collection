require('dotenv').config({ path: './.env' });

const fs = require('fs').promises;
const axios = require('axios');
const kleur = require('kleur');
const readline = require('readline');
const { version } = require('../package.json');

const markdownFiles = [
	'./lists/md/127.0.0.1.md',
	'./lists/md/AdGuard.md',
	'./lists/md/dnsmasq.md',
	'./lists/md/noip.md',
	'./lists/md/Pi-hole.md',
];

// Axios
const headers = {
	headers: {
		'User-Agent': `Mozilla/5.0 (compatible; SefinekBlocklistsAgent/${version}; +https://blocklist.sefinek.net)`,
	},
};

// Constants
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

// Variables
let totalLinks = 0;
let successfulLinks = 0;
let failedLinks = 0;
let retriesFails = 0;
let invalidFiles = 0;
const invalidLinks = [];

// Function to serve URLs with appropriate protocol and domain
function serveUrl(link) {
	const linkRegex = /(http|https):\/\/[^ "]+/g;
	const mainDomainRegex = /https:\/\/blocklist\.sefinek\.net/gi;
	const validUrlRegex = /https:\/\/blocklist\.sefinek\.net\/generated\/(adguard|dnsmasq|noip|127\.0\.0\.1|0\.0\.0\.0)\/(?:[\w-]+\/)*[\w\\.-]+\.\w+/gim;

	if (!linkRegex.test(link)) {
		console.warn(kleur.yellow('Error:'), `Invalid link: ${link}`);
		failedLinks++;
		return null;
	}

	if (!validUrlRegex.test(link)) {
		console.warn(kleur.yellow('Error:'), `Invalid link format: ${link}`);
		failedLinks++;
		return null;
	}

	if (!mainDomainRegex.test(link)) {
		console.warn(kleur.yellow('Error:'), `Wrong domain: ${link}`);
		failedLinks++;
		return null;
	}

	return process.env.NODE_ENV === 'production'
		? link
		: link.replace(mainDomainRegex, `${process.env.DOMAIN}${process.env.PORT ? `:${process.env.PORT}` : ''}`);
}

// Function to test links for availability
async function testLinks() {
	console.log(kleur.white('=== Testing URLs collection ===\n'));
	const links = [];

	try {
		for (const markdownFile of markdownFiles) {
			try {
				const fileContent = await fs.readFile(markdownFile, 'utf-8');
				links.push(...extractLinks(fileContent));
			} catch (err) {
				console.error(kleur.red('Error reading file:'), markdownFile);
				invalidFiles++;
			}
		}

		totalLinks = links.length;

		for (const link of links) {
			const processedLink = serveUrl(link);

			if (!processedLink) {
				invalidLinks.push(link);
				continue;
			}

			try {
				console.log(kleur.blue('>'), processedLink);
				const response = await axios.head(processedLink, headers);

				console.log(`${kleur.bgGreen(response.status)} ${kleur.green(`Status: ${response.statusText}`)}`);
				successfulLinks++;
			} catch (err) {
				retriesFails++;

				if (err.response) {
					console.warn(`${kleur.bgRed(err.response.status)} ${kleur.red(`Status: ${err.response.statusText}`)}`);
				} else {
					console.error(kleur.red(err.stack));
					process.exit(1);
				}

				let retries = 0;
				let success = false;

				while (retries < MAX_RETRIES) {
					if (retriesFails >= MAX_RETRIES * 4) {
						console.error(kleur.red(`\n): Test failed. Exceeded maximum retries: ${retriesFails}`));
						process.exit(1);
					}

					console.log(kleur.blue(`> Waiting ${RETRY_DELAY_MS / 1000} seconds...`));
					await sleep(RETRY_DELAY_MS);

					try {
						console.log(kleur.blue('> Retrying...'));
						const response = await axios.head(processedLink, headers);
						console.log(`${kleur.bgGreen(response.status)} ${kleur.green(`Status: ${response.statusText}`)}`);
						successfulLinks++;
						success = true;
						break;
					} catch (err) {
						console.warn(`${kleur.bgRed(err.response.status)} ${kleur.red(`Status: ${err.response.statusText}`)}`);
						retries++;
						retriesFails++;
					}
				}

				if (!success) {
					console.warn(kleur.bgRed('Max retries exceeded. Skipping link.\n'));
					failedLinks++;
				}
			}
		}

		console.log(kleur.white('\n=== Test Summary ==='));
		console.log(kleur.blue(`Total links: ${totalLinks}`));
		console.log(kleur.green(`Successful links: ${successfulLinks}/${totalLinks}`));
		console.log(kleur.red(`Failed links: ${failedLinks}/${totalLinks}`));
		console.log(kleur.magenta(`Failed retries: ${retriesFails}`));
		console.log(kleur.yellow(`Invalid files: ${invalidFiles}`));
		console.log(kleur.yellow(`Invalid links: ${invalidLinks.length}`));
		console.log(kleur.yellow('Invalid links list:'), invalidLinks);
	} catch (err) {
		console.error('An error occurred while testing links:', err);
		process.exit(1);
	}
}

// Function to extract links from content
function extractLinks(content) {
	const linkRegex = /```dotenv([\s\S]*?)```/g;
	const links = [];
	let match;

	while ((match = linkRegex.exec(content))) {
		const codeBlock = match[1];
		const urlRegex = /https:\/\/blocklist\.sefinek\.net\/generated\/(adguard|dnsmasq|noip|127\.0\.0\.1|0\.0\.0\.0)\/(?:[\w-]+\/)*[\w\\.-]+\.\w+/gim;
		let urlMatch;

		while ((urlMatch = urlRegex.exec(codeBlock))) {
			if (!serveUrl(urlMatch[0])) {
				console.warn(kleur.yellow('Error:'), `Skipping invalid link: ${urlMatch[0]}`);
				invalidFiles++;
				continue;
			}
			links.push(urlMatch[0]);
		}
	}

	return links;
}

// Function to introduce delay
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Immediately invoke the testLinks function when the script is executed
(async () => {
	if (process.env.SERVE_FILES === 'redirect') {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		rl.question(`${kleur.magenta('SERVE_FILES')} ${kleur.blue('is set to')} ${kleur.magenta('redirect')}. ${kleur.blue('Do you want to continue?')} ${kleur.yellow('[Yes/no]:')} `, async answer => {
			if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
				try {
					await testLinks();
				} catch (err) {
					console.error(kleur.red(`${process.env.SERVE_FILES}: An error occurred while testing links: ` + err.stack));
					process.exit(1);
				}
			} else {
				console.log(kleur.yellow(`${process.env.SERVE_FILES}: Okay. Canceled.`));
			}

			rl.close();
		});
	} else {
		console.log(kleur.yellow(`${kleur.yellow('SERVE_FILES')} ${kleur.blue('is not set to')} ${kleur.yellow('redirect')}.`));

		try {
			await testLinks();
		} catch (err) {
			console.error(kleur.red(`${process.env.SERVE_FILES}: An error occurred while testing links: ` + err.stack));
			process.exit(1);
		}
	}
})();

// Export the testLinks function for potential usage elsewhere
module.exports = testLinks;