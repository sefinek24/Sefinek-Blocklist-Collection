const express = require('express');
const router = express.Router();
const autoIndex = require('express-autoindex');
const path = require('node:path');
const formatTime = require('../utils/formatTime.js');
const { version } = require('../../package.json');

const generated = path.join(__dirname, '..', '..', 'blocklist', 'generated');
const logs = path.join(__dirname, '..', '..', 'public', 'logs');


router.get('/api/v1/version', (req, res) => {
	res.status(200).json({
		success: true,
		code: 200,
		version, node: process.version.replace('v', ''),
	});
});

router.get('/api/v1/uptime', (req, res) => {
	res.status(200).json({
		success: true,
		code: 200,
		time: formatTime.HHMMSS(process.uptime()),
		full: formatTime.full(process.uptime()),
		uptime: process.uptime(),
	});
});

router.use('/api/v1/static/generated', autoIndex(generated, { json: true }));
router.use('/api/v1/static/logs', autoIndex(logs, { json: true }));


module.exports = router;