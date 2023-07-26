const express = require('express');
const router = express.Router();
const showdown = require('showdown');
const autoIndex = require('express-autoindex');
const path = require('node:path');
const fs = require('node:fs');
const { version } = require('../../package.json');

const options = { customTemplate: path.join(__dirname, '..', 'views', 'autoindex', 'lists.html'), dirAtTop: true };
const conv = new showdown.Converter();


router.get('/explorer', (req, res) => res.render('autoindex/markdown/main.ejs', { version }));
router.use('/explorer/lists', autoIndex(path.join(__dirname, '..', '..', 'lists'), options));
router.use('/explorer/info', autoIndex(path.join(__dirname, '..', '..', 'info'), options));
router.use('/explorer/tutorials', autoIndex(path.join(__dirname, '..', '..', 'tutorials'), options));

router.use('/viewer/:type', async (req, res) => {
	const endpoint = req.url.replace(`/viewer/${req.params.type}`).replace(/%20/g, ' ');
	const fName = path.join(__dirname, '..', '..', req.params.type, endpoint);
	if (!fs.existsSync(fName)) return res.sendStatus(404);

	const stat = await fs.promises.lstat(fName);
	if (stat.isDirectory()) return res.sendStatus(404);

	const file = await fs.promises.readFile(fName, 'utf8');
	const html = conv.makeHtml(file);

	res.render('autoindex/markdown/viewer.ejs', { version, html, endpoint });
});

module.exports = router;