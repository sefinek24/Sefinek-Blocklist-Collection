const parser = require('cron-parser');
const { version } = require('../../package.json');
const Marked = require('marked');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
Marked.use({ pedantic: false, gfm: true });
const changelog = path.join(__dirname, '..', '..', 'docs', 'changelog.md');
const tz = { tz: 'Europe/Warsaw' };

exports.index = (req, res) => {
	res.render('index.ejs', { version });
};

exports.changelog = async (req, res) => {
	const mdFile = await readFile(changelog, 'utf8');
	const html = Marked.parse(mdFile);

	res.render('changelog.ejs', { version, html });
};

exports.api = (req, res) => {
	res.render('api.ejs', { version });
};

exports.updateFrequency = (req, res) => {
	const github = parser.parseExpression('0 */2 * * *', tz);
	const remote = parser.parseExpression('0 1,6 * * *', tz);

	res.render('update-frequency.ejs', { cron: { github: github.next().toISOString(), remote: remote.next().toISOString() }, version });
};