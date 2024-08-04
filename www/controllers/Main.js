const { parseExpression } = require('cron-parser');
const Marked = require('marked');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
const { version } = require('../../package.json');
const formatTime = require('../utils/time.js');
const RequestStats = require('../database/models/RequestStats');

Marked.use({ pedantic: false, gfm: true });
const changelog = path.join(__dirname, '..', '..', 'docs', 'changelog.md');
const tz = { tz: 'Europe/Warsaw' };

exports.index = async (req, res) => {
	const db = await RequestStats.findOne({});
	res.render('index.ejs', { version, requests: db.requests, responses: db.responses, date: { created: db.createdAt, updated: db.updatedAt }, formatTime });
};

exports.changelog = async (req, res) => {
	const mdFile = await readFile(changelog, 'utf8');
	const html = Marked.parse(mdFile);

	res.render('changelog.ejs', { version, html });
};

exports.api = (req, res) => res.render('api.ejs', { version });

exports.updateFrequency = (req, res) => {
	const github = parseExpression('0 */2 * * *', tz);
	const remote = parseExpression('0 1,6 * * *', tz);

	res.render('update-frequency.ejs', { cron: { github: github.next().toISOString(), remote: remote.next().toISOString() }, version });
};