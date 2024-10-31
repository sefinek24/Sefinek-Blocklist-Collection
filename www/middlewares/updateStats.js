const { userAgents } = require('./morgan.js');
const parseCategoryFromLink = require('../utils/parseCategoryFromLink.js');
const time = require('../utils/time.js');

const excludedFiles = new Set(['/favicon.ico', '/robots.txt', '/sitemap.xml']);

const updateStats = (req, res) => {
	const ua = req.headers['user-agent'];
	if (userAgents.includes(ua) || excludedFiles.has(req.url)) return;

	try {
		const { url, type } = parseCategoryFromLink(req.originalUrl || req.url);
		const { dateKey, yearKey, monthKey } = time.dateKey();

		const updateQuery = {
			inc: {
				total: 1,
				[`responses.${res.statusCode || 'unknown'}`]: 1,
			},
		};

		if (type && res.statusCode >= 200 && res.statusCode <= 304 && (url.endsWith('.txt') || url.endsWith('.conf'))) {
			updateQuery.inc.blocklists = 1;
			updateQuery.inc[`categories.${type}`] = 1;

			updateQuery.inc[`perDay.${dateKey}`] = 1;
			updateQuery.inc[`perMonth.${monthKey}-${yearKey}`] = 1;
			updateQuery.inc[`perYear.${yearKey}`] = 1;

			// console.debug(`Updated stats for ${type}`);
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