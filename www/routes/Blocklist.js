const express = require('express');
const router = express.Router();
const autoIndex = require('express-autoindex');
const path = require('path');
const increment = require('../middlewares/increment.js');
const SERVE_FILES = process.env.SERVE_FILES;

const generated = path.join(__dirname, '..', '..', 'blocklist', 'generated');
const ZeroZeroZeroZero = path.join(__dirname, '..', '..', 'blocklist', 'generated', '0.0.0.0');

const logs = path.join(__dirname, '..', 'public', 'logs');
const options = { customTemplate: path.join(__dirname, '..', 'views', 'autoindex', 'default.html'), dirAtTop: true };

function redirectMiddleware(req, res) {
	const url = req.url;
	return res.status(301).redirect(`https://raw.githubusercontent.com/sefinek24/Sefinek-Blocklist-Collection/main/blocklist/generated/${url}`);
}

// Serve block lists
if (SERVE_FILES === 'static') {
	router.use('/generated', increment.blocklist, autoIndex(generated, options), express.static(generated));
} else if (SERVE_FILES === 'redirect') {
	router.use('/generated', increment.blocklist, /* autoIndex(generated, options), */ redirectMiddleware);
} else {
	console.error('Invalid value for the SERVE_FILES environment variable');
	process.exit(1);
}

// Logs
router.use('/logs', autoIndex(logs, options), express.static(logs));

// Deprecated endpoints
router.get('/generated/0.0.0.0/riotgames.txt', (req, res) => res.sendFile(`${ZeroZeroZeroZero}/sites/riotgames.txt`));

module.exports = router;