const express = require('express');
const router = express.Router();
const parser = require('cron-parser');
const { version } = require('../../package.json');
const tz = { tz: 'Europe/Warsaw' };

router.get('/', (req, res) => res.render('index.ejs', { version }));

router.get('/api', (req, res) => res.render('api.ejs', { version }));

router.get('/update-frequency', (req, res) => {
	const github = parser.parseExpression('0 */2 * * *', tz);
	const remote = parser.parseExpression('0 1,6 * * *', tz);

	res.render('update-frequency.ejs', { cron: { github: github.next().toISOString(), remote: remote.next().toISOString() }, version });
});

module.exports = router;