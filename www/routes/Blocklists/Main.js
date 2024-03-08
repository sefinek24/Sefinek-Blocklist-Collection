const express = require('express');
const router = express.Router();
const autoIndex = require('express-autoindex');
const path = require('node:path');

// Variables
const SERVE_FILES = process.env.SERVE_FILES;

// Paths
const generated = path.join(__dirname, '..', '..', 'blocklist', 'generated');
const logs = path.join(__dirname, '..', 'public', 'logs');
const optionsGenerated = { customTemplate: path.join(__dirname, '..', 'views', 'autoindex', 'generated.html') };
const optionsLogs = { customTemplate: path.join(__dirname, '..', 'views', 'autoindex', 'logs.html') };

// Functions
const redirectMiddleware = (req, res) => {
	const url = req.url;
	if (!url || url.length === 0) return res.sendStatus(400);

	return res.status(301).redirect(`https://raw.githubusercontent.com/sefinek24/Sefinek-Blocklist-Collection/main/blocklist/generated/${url}`);
};


// Serve block lists
if (SERVE_FILES === 'static') {
	router.use('/generated/v1', autoIndex(generated, optionsGenerated));
} else if (SERVE_FILES === 'redirect') {
	router.get('/generated/v1', redirectMiddleware);
} else {
	console.error('Invalid value for the SERVE_FILES environment variable');
	process.exit(1);
}

// Logs
router.use('/logs/v1', autoIndex(logs, optionsLogs), express.static(logs));


module.exports = router;