const express = require('express');
const router = express.Router();
const autoIndex = require('express-autoindex');
const path = require('node:path');
const fs = require('node:fs');
const formatTime = require('../utils/formatTime.js');
const { version } = require('../../package.json');

const generated = path.join(__dirname, '..', '..', 'blocklists', 'generated');
const logs = path.join(__dirname, '..', 'public', 'logs');

// Default
router.get('/api/v1/version', (req, res) => {
	res.status(200).json({ success: true, code: 200, version, node: process.version.replace('v', '') });
});

router.get('/api/v1/uptime', (req, res) => {
	res.status(200).json({
		success: true,
		code: 200,
		time: formatTime.time(process.uptime()),
		full: formatTime.full(process.uptime()),
		uptime: process.uptime()
	});
});

// Auto Index
router.use('/api/v1/static/generated', autoIndex(generated, { json: true }));
router.use('/api/v1/static/logs', autoIndex(logs, { json: true }));

// SHA512
router.use('/api/v1/static/cache/:name', async (req, res) => {
	const file = req.url.replace(`/cache/${req.params.name}`, '').replace(/%20/g, ' ');
	const fullPath = path.join(__dirname, '..', '..', 'cache', req.params.name, file);
	if (!fs.existsSync(fullPath)) return res.sendStatus(404);

	const stat = await fs.promises.lstat(fullPath);
	if (stat.isDirectory()) return res.sendStatus(404);

	const sha256 = await fs.promises.readFile(fullPath, 'utf8');
	res.json({ success: true, status: 200, message: sha256, type: 'sha512' });
});


module.exports = router;