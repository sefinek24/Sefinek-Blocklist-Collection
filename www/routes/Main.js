const express = require('express');
const router = express.Router();
const parser = require('cron-parser');
const formatTime = require('../utils/formatTime.js');
const { version } = require('../../package.json');
const BlockList = require('../database/models/Blocklist.js');

router.get('/', async (req, res) => {
	const database = await BlockList.findOne({ domain: process.env.DOMAIN });

	res.render('index.ejs', { database, version, uptime: formatTime.full(process.uptime()) });
});

router.get('/api', (req, res) => res.render('api.ejs', { version }));

router.get('/update-frequency', (req, res) => {
	const tz = { tz: 'Europe/Warsaw' };
	const github = parser.parseExpression('0 */2 * * *', tz);
	const remote = parser.parseExpression('0 0,6 * * *', tz);

	res.render('update-frequency.ejs', { cron: { github: github.next().toISOString(), remote: remote.next().toISOString() }, version });
});

module.exports = router;