const { parseExpression } = require('cron-parser');
const Marked = require('marked');
const { version } = require('../../package.json');
const formatTime = require('../utils/time.js');
const RequestStats = require('../database/models/RequestStats');

Marked.use({ pedantic: false, gfm: true });
const tz = { tz: 'Europe/Warsaw' };

exports.index = async (req, res) => {
	const db = await RequestStats.findOne({});
	res.render('index.ejs', { version, db, uptime: formatTime.full(process.uptime()) });
};

exports.api = (req, res) => res.render('api.ejs', { version });

exports.updateFrequency = (req, res) => {
	const github = parseExpression('0 */2 * * *', tz);
	const remote = parseExpression('0 1,6 * * *', tz);

	res.set('Cache-Control', 'public, max-age=600, s-maxage=600');
	res.render('update-frequency.ejs', { cron: { github: github.next().toISOString(), remote: remote.next().toISOString() }, version });
};