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


router.get('/markdown', (req, res) => res.render('markdown.ejs', { version }));
router.use('/markdown/lists', autoIndex(path.join(__dirname, '..', '..', 'lists'), options));
router.use('/markdown/info', autoIndex(path.join(__dirname, '..', '..', 'info'), options));
router.use('/markdown/tutorials', autoIndex(path.join(__dirname, '..', '..', 'tutorials'), options));

router.use('/viewer/:type', async (req, res) => {
	const file = req.url.replace(`/viewer/${req.params.type}`, '').replace(/%20/g, ' ');
	const fullPath = path.join(__dirname, '..', '..', req.params.type, file);
	if (!fs.existsSync(fullPath)) return res.sendStatus(404);

	const stat = await fs.promises.lstat(fullPath);
	if (stat.isDirectory()) return res.sendStatus(404);

	const mdFile = await fs.promises.readFile(fullPath, 'utf8');
	const html = Marked.parse(mdFile);

	res.render('markdown-viewer.ejs', { version, html, file });
});


module.exports = router;