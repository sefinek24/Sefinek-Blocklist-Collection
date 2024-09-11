const express = require('express');
const router = express.Router();
const formatTime = require('../utils/time.js');
const { version } = require('../../package.json');

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

module.exports = router;