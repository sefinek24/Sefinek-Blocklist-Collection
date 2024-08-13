const { writeFile, mkdir, readdir, rm } = require('node:fs/promises');
const { join, basename, extname } = require('node:path');
const { createWriteStream, createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');
const axios = require('axios');
const AdmZip = require('adm-zip');
const lzma = require('lzma-native');

const CATEGORIES = [
	{
		title: 'Blocks websites dedicated to anime, manga, cosplay, hentai, and other NSFW degeneracy',
		category: 'Anime',
		regex: /(?:doujinsh|henta|iseka|chib|ecch|y(?:ao|ur))i|bisho(?:unen|jo)|tsundere|cosplay|yandere|doujin|(?:seiyu|otak)u|kawaii|shou?jo|s(?:ho|ei)nen|harem|m(?:ang|ech)a|waifu|anime/gi,
		// grex "anime" "manga" "hentai" "cosplay" "otaku" "shonen" "shoujo" "yuri" "yaoi" "ecchi" "isekai" "kawaii" "tsundere" "yandere" "mecha" "waifu" "seinen" "bishounen" "shojo" "chibi" "bishojo" "doujin" "doujinshi" "seiyuu" "harem"
		file: 'anime/all.txt'
	},
	{
		title: 'Blocks most LGBTQ+ websites or those that promote LGBTQ+ content',
		category: 'LGBTQ+',
		regex: /n(?:ie(?:konformistyczn[ay]|binarn[ay])|onconforming)|(?:queerplatoni|poliamory)czny|alloromantyczn[ay]|multi\\-seksualny|skoliose(?:ksualny|xual)|demi(?:dziewczyna|chłopiec)|(?:(?:(?:(?:trans|pan)|allo)|poli)|demi)seksualn[ay]|inter(?:seksualn[aiy]|gender)|queer(?:platonic)?|omnise(?:ksualny|xual)|a(?:llo)?romantic|trzecia\\-plec|(?:(?:third\\-|(?:(?:(?:trans|a)|bi)|cis))|xeno)gender|aromantyczn[aiy]|(?:pangenderow|interplciow|ksenoplciow|(?:tranzyt|dwuduch)ow|(?:dwu|bez)płciow|polyamor|nonbinar|demibo|ga)y|ge(?:nderfluid|j(?:owski|e))|genderqueer|(?:bi|a)seksualn[aiy]|(?:(?:(?:(?:(?:(?:(?:(?:trans|pan)|allo)|demi)|a)|bi)|tran)|poly)|multi)sexual|two\\-spirit|(?:poliamori|lesbijsk)a|(?:cispłci|trans)ow[ay]|pangender|lesbi(?:j(?:ek|k[ai])|an)|demigirl|queers|trans|pride|lgbt/gi,
		// grex "lgbt" "pride" "gay" "geje" "gejowski" "lesbian" "lesbijka" "lesbijki" "lesbijek" "lesbijska" "bisexual" "biseksualny" "biseksualna" "biseksualni" "transgender" "trans" "transowy" "transowa" "transseksualny" "transseksualna" "transexual" "transsexual" "transowy" "tranzytowy" "nonbinary" "niebinarny" "niebinarna" "asexual" "aseksualny" "aseksualna" "aseksualni" "pansexual" "panseksualny" "panseksualna" "aromantic" "aromantyczny" "aromantyczna" "aromantyczni" "demisexual" "demiseksualny" "demiseksualna" "cisgender" "cispłciowy" "cispłciowa" "genderfluid" "genderqueer" "queer" "queers" "lesbijka" "lesbijki" "aseksualny" "aseksualna" "interseksualny" "interseksualna" "interseksualni" "polyamory" "poliamoria" "poliamoryczny" "polysexual" "poliseksualny" "poliseksualna" "bigender" "dwupłciowy" "agender" "bezpłciowy" "two-spirit" "dwuduchowy" "allosexual" "alloseksualny" "alloseksualna" "alloromantic" "alloromantyczny" "alloromantyczna" "nonconforming" "niekonformistyczny" "niekonformistyczna" "pangender" "pangenderowy" "demiboy" "demichłopiec" "demigirl" "demidziewczyna" "intergender" "interplciowy" "multisexual" "multi-seksualny" "omnisexual" "omniseksualny" "queerplatonic" "queerplatoniczny" "skoliosexual" "skolioseksualny" "third-gender" "trzecia-plec" "xenogender" "ksenoplciowy"
		file: 'sites/lgbtqplus2.txt'
	},
	{
		title: 'Blocks websites related to gambling, betting, and casinos',
		category: 'Gambling',
		regex: /s(?:portsbook|lots)|blackjack|(?:bookma|po)ker|gambling|roulette|jackpot|lottery|betting|(?:casin|bing)o|craps|wager/gi,
		// grex "casino" "poker" "betting" "roulette" "blackjack" "slots" "gambling" "wager" "lottery" "bingo" "jackpot" "sportsbook" "craps" "bookmaker"
		file: 'gambling/sefinek.hosts2.txt'
	},
	{
		title: 'Blocks websites with adult content, pornography, and explicit material',
		category: 'Adult',
		regex: /p(?:rostitution|layboy|orn)|adult(?:content|site)|s(?:tripclub|exual)|cam(?:girl)?s|(?:softcor|hardcor|lingeri|nud)e|erotica|hustler|fetish|voyeur|escort|bdsm|xxx/gi,
		// grex "porn" "xxx" "nude" "sexual" "erotica" "bdsm" "fetish" "hardcore" "softcore" "voyeur" "camgirls" "cams" "escort" "prostitution" "stripclub" "lingerie" "adultsite" "adultcontent" "playboy" "hustler"
		file: 'porn/sefinek.hosts2.txt'
	},
	{
		title: 'Blocks websites related to piracy, illegal downloads, and copyright infringement',
		category: 'Piracy',
		regex: /illegaldownload|freedownload|freem(?:ovies|usic)|streaming|hacking|torrent|(?:cam|web|b)rip|dvdrip|keygen|pirate|ripper|serial|crack|warez/gi,
		// grex "torrent" "pirate" "crack" "warez" "keygen" "serial" "hacking" "illegaldownload" "freedownload" "freemovies" "freemusic" "ripper" "dvdrip" "brip" "camrip" "webrip" "streaming"
		file: 'piracy/sefinek.hosts.txt'
	},
	{
		title: 'Blocks websites promoting racism, hate speech, and extremist ideologies',
		category: 'Hate Speech',
		regex: /white(?:nationalism|supremacy)|h(?:olocaustdenial|atespeech)|(?:antisemit|extrem|rac)ism|kukluxklan|radicalism|antiislam|n(?:eon)?azi/gi,
		// grex "racism" "nazi" "whitesupremacy" "whitenationalism" "antisemitism" "antiislam" "kukluxklan" "neonazi" "extremism" "radicalism" "hatespeech" "holocaustdenial"
		file: 'hate-and-junk/main.txt'
	}
];

const WHITELIST = [
	'*.stoplgbt.pl'
];

const downloadFile = async (url, outputPath) => {
	console.log(`Downloading file from ${url} to ${outputPath}...`);
	try {
		const res = await axios.get(url, { responseType: 'stream' });
		await new Promise((resolve, reject) => {
			const writer = createWriteStream(outputPath);
			res.data.pipe(writer);
			writer.on('finish', () => {
				writer.close();
				resolve();
			});
			writer.on('error', err => {
				writer.close();
				reject(err);
			});
		});
	} catch (err) {
		console.error(`Failed to download ${url}. Error: ${err.message}`);
		throw err;
	}
};

const isWhitelisted = domain => {
	return WHITELIST.some(whitelistItem => {
		if (whitelistItem.startsWith('*.')) {
			const baseDomain = whitelistItem.slice(2);
			return domain === baseDomain || domain.endsWith(`.${baseDomain}`);
		} else {
			return domain === whitelistItem;
		}
	});
};

const isCI = process.env.CI === 'true';
const isTTY = process.stdout.isTTY;

const logProgress = message => {
	if (!isCI && isTTY) {
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		process.stdout.write(message);
	} else {
		console.log(message);
	}
};

const processFile = async (filePath, category) => {
	if (!isCI && isTTY) logProgress(`Processing ${category.category}...`);

	const matchedSites = new Set();
	const rl = createInterface({ input: createReadStream(filePath, 'utf-8'), crlfDelay: Infinity });
	for await (const line of rl) {
		const domain = line.trim().split(/\s+/)[0];
		if (domain && !isWhitelisted(domain) && category.regex.test(line)) matchedSites.add(`0.0.0.0 ${domain}`);
	}
	rl.close();

	logProgress(`Processing ${category.category.toUpperCase()}... ${matchedSites.size} sites\n`);

	if (global.gc) global.gc();
	return matchedSites;
};

const extractZipFile = async (zipFilePath, extractToDir) => {
	console.log('Extracting ZIP archive...');
	const zip = new AdmZip(zipFilePath);
	await mkdir(extractToDir, { recursive: true });
	zip.extractAllTo(extractToDir, true);
};

const extractXzFile = (xzFilePath, extractToDir) => {
	console.log('Extracting XZ archive...');
	return new Promise((resolve, reject) => {
		const decompressedPath = join(extractToDir, basename(xzFilePath, '.xz'));
		const inputStream = createReadStream(xzFilePath);
		const outputStream = createWriteStream(decompressedPath);
		const decompressor = lzma.createDecompressor();

		inputStream.pipe(decompressor).pipe(outputStream);
		outputStream.on('finish', () => {
			outputStream.close();
			resolve(decompressedPath);
		});
		outputStream.on('error', err => {
			outputStream.close();
			reject(err);
		});
	});
};

const processCompressedFile = async (filePath, extractToDir) => {
	await mkdir(extractToDir, { recursive: true });
	const sites = {};

	let filesToProcess = [];

	if (extname(filePath) === '.zip') {
		await extractZipFile(filePath, extractToDir);
		filesToProcess = await readdir(extractToDir);
	} else if (extname(filePath) === '.xz') {
		const decompressedPath = await extractXzFile(filePath, extractToDir);
		filesToProcess = [basename(decompressedPath)];
	}

	for (const file of filesToProcess) {
		const fullPath = join(extractToDir, file);
		for (const category of CATEGORIES) {
			const fileSites = await processFile(fullPath, category);
			if (!sites[category.file]) sites[category.file] = new Set();
			fileSites.forEach(site => sites[category.file].add(site));
			fileSites.clear();
		}

		if (global.gc) global.gc();
	}

	return sites;
};

const generateHeader = (title, category, count) => {
	return `#       _____   ______   ______   _____   _   _   ______   _  __        ____    _         ____     _____   _  __  _        _____    _____   _______
#      / ____| |  ____| |  ____| |_   _| | \\ | | |  ____| | |/ /       |  _ \\  | |       / __ \\   / ____| | |/ / | |      |_   _|  / ____| |__   __|
#     | (___   | |__    | |__      | |   |  \\| | | |__    | ' /        | |_) | | |      | |  | | | |      | ' /  | |        | |   | (___      | |
#      \\___ \\  |  __|   |  __|     | |   | . \` | |  __|   |  <         |  _ <  | |      | |  | | | |      |  <   | |        | |    \\___ \\     | |
#      ____) | | |____  | |       _| |_  | |\\  | | |____  | . \\        | |_) | | |____  | |__| | | |____  | . \\  | |____   _| |_   ____) |    | |
#     |_____/  |______| |_|      |_____| |_| \\_| |______| |_|\\_\\       |____/  |______|  \\____/   \\_____| |_|\\_\\ |______| |_____| |_____/     |_|
#
#                                             The best collection of blocklists for your DNS server
#                                                       https://blocklist.sefinek.net
#
# Title: ${title || 'Unknown'}
# Category: ${category || 'Unknown'}
# Description: N/A
# Expires: 1 day
# Count: ${count || 'Unknown'}
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
# -------------------------------------------------------------------------------------------------------------------------------------------------------`;
};

const main = async () => {
	const tmpDir = join(__dirname, '..', 'tmp');
	await rm(tmpDir, { recursive: true, force: true });
	await mkdir(tmpDir, { recursive: true });

	const fileUrls = [
		// Misc
		{ url: 'https://raw.githubusercontent.com/shreshta-labs/newly-registered-domains/main/nrd-1w.csv', name: 'shreshta-labs_nrd-1w.txt' },
		{ url: 'https://github.com/spaze/domains/raw/main/tld-cz.txt', name: 'spaze_tld-cz.txt' },

		// xRuffKez
		{ url: 'https://raw.githubusercontent.com/xRuffKez/NRD/main/nrd-30day_part1.txt', name: 'xRuffKez_nrd-30day-part1.txt' },
		{ url: 'https://raw.githubusercontent.com/xRuffKez/NRD/main/nrd-30day_part2.txt', name: 'xRuffKez_nrd-30day-part2.txt' },

		// whoisds
		{ url: 'https://whoisds.com/whois-database/newly-registered-domains/MjAyNC0wOC0xMi56aXA=/nrd', name: 'whoisds1.zip' },
		{ url: 'https://whoisds.com/whois-database/newly-registered-domains/MjAyNC0wOC0xMS56aXA=/nrd', name: 'whoisds2.zip' },
		{ url: 'https://whoisds.com/whois-database/newly-registered-domains/MjAyNC0wOC0xMC56aXA=/nrd', name: 'whoisds3.zip' },
		{ url: 'https://whoisds.com/whois-database/newly-registered-domains/MjAyNC0wOC0wOS56aXA=/nrd', name: 'whoisds4.zip' },

		// tb0hdan
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/generic_lgbt/domain2multi-lgbt00.txt.xz', name: 'tb0hdan_generic-lgbt.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/generic_gay/domain2multi-gay00.txt.xz', name: 'tb0hdan_generic-gay.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de00.txt.xz', name: 'tb0hdan_d2m-de00.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de01.txt.xz', name: 'tb0hdan_d2m-de01.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de02.txt.xz', name: 'tb0hdan_d2m-de02.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de03.txt.xz', name: 'tb0hdan_d2m-de03.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de04.txt.xz', name: 'tb0hdan_d2m-de04.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de05.txt.xz', name: 'tb0hdan_d2m-de05.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de06.txt.xz', name: 'tb0hdan_d2m-de06.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de07.txt.xz', name: 'tb0hdan_d2m-de07.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/poland/domain2multi-pl00.txt.xz', name: 'tb0hdan_d2m-pl00.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/poland/domain2multi-pl01.txt.xz', name: 'tb0hdan_d2m-pl01.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/poland/domain2multi-pl02.txt.xz', name: 'tb0hdan_d2m-pl02.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/united_states/domain2multi-us00.txt.xz', name: 'tb0hdan_d2m-us00.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/united_kingdom/domain2multi-uk00.txt.xz', name: 'tb0hdan_d2m-uk00.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/united_kingdom/domain2multi-uk01.txt.xz', name: 'tb0hdan_d2m-uk01.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/united_kingdom/domain2multi-uk02.txt.xz', name: 'tb0hdan_d2m-uk02.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/venezuela/domain2multi-ve00.txt.xz', name: 'tb0hdan_d2m-ve00.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/australia/domain2multi-au00.txt.xz', name: 'tb0hdan_d2m-au00.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/australia/domain2multi-au01.txt.xz', name: 'tb0hdan_d2m-au01.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/australia/domain2multi-au02.txt.xz', name: 'tb0hdan_d2m-au02.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/austria/domain2multi-at00.txt.xz', name: 'tb0hdan_d2m-at00.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/south_africa/domain2multi-za00.txt.xz', name: 'tb0hdan_d2m-za00.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/canada/domain2multi-ca00.txt.xz', name: 'tb0hdan_d2m-ca00.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/canada/domain2multi-ca01.txt.xz', name: 'tb0hdan_d2m-ca01.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/chile/domain2multi-cl00.txt.xz', name: 'tb0hdan_d2m-cl00.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/new_zealand/domain2multi-nz00.txt.xz', name: 'tb0hdan_d2m-nz00.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/philippines/domain2multi-ph00.txt.xz', name: 'tb0hdan_d2m-ph00.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/israel/domain2multi-il00.txt.xz', name: 'tb0hdan_d2m-il00.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/thailand/domain2multi-th00.txt.xz', name: 'tb0hdan_d2m-th00.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/brazil/domain2multi-br00.txt.xz', name: 'tb0hdan_d2m-br00.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/brazil/domain2multi-br01.txt.xz', name: 'tb0hdan_d2m-br01.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/brazil/domain2multi-br02.txt.xz', name: 'tb0hdan_d2m-br02.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/brazil/domain2multi-br03.txt.xz', name: 'tb0hdan_d2m-br03.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/sweden/domain2multi-se00.txt.xz', name: 'tb0hdan_d2m-se00.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/sweden/domain2multi-se01.txt.xz', name: 'tb0hdan_d2m-se01.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/spain/domain2multi-es00.txt.xz', name: 'tb0hdan_d2m-es00.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/spain/domain2multi-es01.txt.xz', name: 'tb0hdan_d2m-es01.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/france/domain2multi-fr00.txt.xz', name: 'tb0hdan_d2m-fr00.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/france/domain2multi-fr01.txt.xz', name: 'tb0hdan_d2m-fr01.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/france/domain2multi-fr02.txt.xz', name: 'tb0hdan_d2m-fr02.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/france/domain2multi-fr03.txt.xz', name: 'tb0hdan_d2m-fr03.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/netherlands/domain2multi-nl00.txt.xz', name: 'tb0hdan_d2m-nl00.xz' },
		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/netherlands/domain2multi-nl01.txt.xz', name: 'tb0hdan_d2m-nl01.xz' },

		{ url: 'https://github.com/tb0hdan/domains/raw/master/data/iceland/domain2multi-is00.txt.xz', name: 'tb0hdan_d2m-is00.xz' }
	];

	const results = {};
	for (const { url, name } of fileUrls) {
		const fileName = name || basename(url);
		const filePath = join(tmpDir, fileName);
		const extractToDir = join(tmpDir, `${fileName}_extracted`);

		try {
			await downloadFile(url, filePath);

			let fileSites = {};
			if (['.zip', '.xz'].includes(extname(filePath))) {
				fileSites = await processCompressedFile(filePath, extractToDir);
			} else {
				for (const category of CATEGORIES) {
					const categorySites = await processFile(filePath, category);
					if (!fileSites[category.file]) fileSites[category.file] = new Set();
					categorySites.forEach(site => fileSites[category.file].add(site));
				}
			}

			for (const [categoryFile, sites] of Object.entries(results)) {
				if (sites.size < 0) return;

				const sortedSites = [...sites].sort();
				const category = CATEGORIES.find(cat => cat.file === categoryFile);
				const header = generateHeader(category.title, category.category, sortedSites.length);

				await writeFile(join(__dirname, `../blocklists/templates/${categoryFile}`), header + sortedSites.join('\n'), { flag: 'w' });
				sites.clear();
			}

			fileSites = null;
			if (global.gc) global.gc();
		} catch (err) {
			console.error(`Error processing file ${fileName}: ${err.message}`);
		}
	}

	for (const [fileName, sites] of Object.entries(results)) {
		const sortedSites = Array.from(sites).sort();
		const category = CATEGORIES.find(cat => cat.file === fileName);
		const header = generateHeader(category.title, category.category, sortedSites.length);

		await writeFile(join(__dirname, `../blocklists/templates/${fileName}`), header + sortedSites.join('\n'), { flag: 'w' });

		const zeroCount = sortedSites.filter(site => site.startsWith('0.0.0.0')).length;
		console.log(`Number of lines starting with "0.0.0.0" in ${fileName}: ${zeroCount}`);
	}

	await rm(tmpDir, { recursive: true, force: true });
	console.log('Processing complete!');
};

main().catch(console.error);