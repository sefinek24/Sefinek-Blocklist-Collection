const express = require('express');
const router = express.Router();
const autoIndex = require('express-autoindex');
const path = require('node:path');
const fs = require('node:fs');
const { version } = require('../../package.json');

const options = { customTemplate: path.join(__dirname, '..', 'views', 'autoindex', 'markdown.html'), dirAtTop: true };

// Markdown
const Marked = require('marked');
Marked.use({ pedantic: false, gfm: true });

// Regex
const TITLE_REGEX = /^######\s*Title:\s*(.*)/mi;
const DESC_REGEX = /^######\s*Description:\s*(.*)/mi;
const TAGS_REGEX = /^######\s*Tags:\s*(.*)/mi;
const CANONICAL_REGEX = /^######\s*Canonical:\s*(.*)/mi;


router.get('/markdown', (req, res) => res.render('markdown.ejs', { version }));
router.use('/markdown/lists', autoIndex(path.join(__dirname, '..', '..', 'docs', 'lists'), options));
router.use('/markdown/info', autoIndex(path.join(__dirname, '..', '..', 'docs', 'info'), options));
router.use('/markdown/tutorials', autoIndex(path.join(__dirname, '..', '..', 'docs', 'tutorials'), options));

router.use('/viewer/:type', async (req, res) => {
	const file = req.url.replace(`/viewer/${req.params.type}`, '').replace(/_/g, ' ');
	const fileName = `${file}.md`;
	const fullPath = path.join(__dirname, '..', '..', 'docs', req.params.type, fileName);

	try {
		const stat = await fs.promises.lstat(fullPath);
		if (stat.isDirectory()) return res.sendStatus(404);

		const mdFile = await fs.promises.readFile(fullPath, 'utf8');
		const html = Marked.parse(mdFile);

		res.render('markdown-viewer.ejs', { version,
			html,
			file,
			title: mdFile.match(TITLE_REGEX) ? mdFile.match(TITLE_REGEX)[1] : undefined,
			desc: mdFile.match(DESC_REGEX) ? mdFile.match(DESC_REGEX)[1] : undefined,
			tags: mdFile.match(TAGS_REGEX) ? mdFile.match(TAGS_REGEX)[1] : undefined,
			canonical: mdFile.match(CANONICAL_REGEX) ? mdFile.match(CANONICAL_REGEX)[1].trim() : undefined,
		});
	} catch (err) {
		res.sendStatus(500);
		console.error(err);
	}
});


module.exports = router;