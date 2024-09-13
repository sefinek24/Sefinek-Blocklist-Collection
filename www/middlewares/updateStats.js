const { userAgents } = require('./morgan.js');
const parseCategoryFromLink = require('../utils/parseCategoryFromLink.js');
const time = require('../utils/time.js');

const excludedFiles = new Set(['/favicon.ico', '/robots.txt', '/sitemap.xml']);

const updateStats = (req, res) => {
	const ua = req.headers['user-agent'];
	if (userAgents.includes(ua) || excludedFiles.has(req.url)) return;

	try {
		const { url, listUrl, type, category } = parseCategoryFromLink(req.originalUrl || req.url);
		const { dateKey, yearKey, monthKey } = time.dateKey();

		const updateQuery = {
			inc: {
				total: 1,
				[`responses.${res.statusCode || 'unknown'}`]: 1,
				[`perDay.${dateKey}`]: 1,
				[`perMonth.${monthKey}-${yearKey}`]: 1,
				[`perYear.${yearKey}`]: 1
			}
		};

		if (res.statusCode >= 200 && res.statusCode <= 304 && category && (url.endsWith('.txt') || url.endsWith('.conf'))) {
			updateQuery.inc.blocklists = 1;
			if (listUrl) updateQuery.inc[`categories.${type}`] = 1;
		}

		process.send({ type: 'updateStats', data: updateQuery });
	} catch {
		process.send({ type: 'updateStats', data: { inc: { updateStatsFail: 1 } } });
	}
};

module.exports = (req, res, next) => {
	if (req.method === 'GET') res.on('finish', () => updateStats(req, res));
	next();
};