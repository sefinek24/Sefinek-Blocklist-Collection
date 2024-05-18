const express = require('express');
const router = express.Router();
const autoIndex = require('express-autoindex');
const path = require('node:path');
const fs = require('node:fs/promises');
const { version } = require('../../../package.json');

const options = { customTemplate: path.join(__dirname, '..', 'views', 'autoindex', 'markdown.html'), dirAtTop: true };

// Markdown
const Marked = require('marked');
Marked.use({ pedantic: false, gfm: true });

// Regex
const TITLE_REGEX = /\* Title\s+:\s+(.*)/;
const DESC_REGEX = /\* Description\s+:\s+(.*)/;
const TAGS_REGEX = /\* Tags\s+:\s+(.*)/;
const CANONICAL_REGEX = /\* Canonical\s+:\s+(.*)/;

// Functions
const convertUrls = link => {
	if ((/\/viewer\//).test(link)) link = link.replace(/%20/g, '_').replace('.md', '');
	return link;
};

const isValidName = name => (/^[a-zA-Z0-9_-]+$/).test(name);
const isPathSecure = file => !file.includes('..') && !file.includes('//') && !file.includes('\\');

// Routes
router.get('/markdown', (req, res) => res.render('markdown.ejs', { version }));
router.use('/markdown/lists', autoIndex(path.join(__dirname, '..', '..', 'docs', 'lists'), options));
router.use('/markdown/info', autoIndex(path.join(__dirname, '..', '..', 'docs', 'info'), options));
router.use('/markdown/tutorials', autoIndex(path.join(__dirname, '..', '..', 'docs', 'tutorials'), options));

// Viewer
const pages = [
	'Abuse',
	'Advertising',
	'AMP_Hosts',
	'Block_websites_and_games',
	'CryptoJacking',
	'Dating_services',
	'Drugs',
	'Fake_news',
	'Gambling',
	'Hate_and_junk',
	'Malicious',
	'Phishing',
	'Piracy',
	'Porn',
	'Ransomware',
	'Redirect',
	'Scam',
	'Spam_mails',
	'Spyware',
	'Telemetry_and_Tracking',
	'Useless_websites',
	'YouTube_and_mobile_ads_etc.',

	'Norton.txt',
	'What_is_Pi-hole',
	'What_is_Raspberry_Pi',
	'What_is_Regex',
	'Why_should_I_block_LoL',
	'Why_should_I_block_Omegle',
	'Why_should_I_block_Riot_Games',
	'Why_should_I_block_Snapchat',
	'Why_should_I_block_TikTok',
	'Why_should_I_block_Valorant',

	'How_to_install_Pi-hole',
	'How_to_install_Unbound_for_Pi-hole',
];

router.use('/viewer/:category', async (req, res) => {
	const { category } = req.params;
	const file = req.url
		.replace(`/viewer/${category}`, '')
		.replace(/_/g, ' ')
		.replace(/\.md/, '')
		.replace(/%20/g, ' ');

	const fileName = req.url.split('/').pop();
	if (!isValidName(fileName) || !pages.includes(fileName)) return res.sendStatus(404);
	if (!isPathSecure(file)) return res.sendStatus(404);
	if (file.endsWith('.txt')) return res.redirect(`/docs/${category}/${file}`);

	try {
		const fullPath = path.join(__dirname, '..', '..', 'docs', category, `${file}.md`);
		if (!fullPath.startsWith(path.join(__dirname, '..', '..', 'docs', category))) return res.sendStatus(403);

		const stat = await fs.lstat(fullPath);
		if (!stat.isFile()) return res.sendStatus(404);

		const mdFile = await fs.readFile(fullPath, 'utf8');
		res.render('markdown-viewer.ejs', {
			html: Marked.parse(convertUrls(mdFile)),
			title: mdFile.match(TITLE_REGEX) ? mdFile.match(TITLE_REGEX)[1] : 'Unknown title',
			desc: mdFile.match(DESC_REGEX) ? mdFile.match(DESC_REGEX)[1] : undefined,
			tags: mdFile.match(TAGS_REGEX) ? mdFile.match(TAGS_REGEX)[1] : undefined,
			canonical: mdFile.match(CANONICAL_REGEX) ? mdFile.match(CANONICAL_REGEX)[1].trim() : undefined,
		});
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});


module.exports = router;