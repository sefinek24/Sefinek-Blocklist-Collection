const parseCategoryFromLink = require('../utils/parseCategoryFromLink.js');
const time = require('../utils/time.js');

const BOT_REGEX1 = /i(?:a_archiv|ndex)er|(?:s(?:c(?:ann|rap)|pid)|fetch)er|crawl|bot/i;
const EXCLUDED_FILES = new Set(['/favicon.ico', '/robots.txt', '/sitemap.xml']);

const updateStats = (req, res) => {
	const userAgent = req.headers['user-agent'];
	if (BOT_REGEX1.test(userAgent) || EXCLUDED_FILES.has(req.url)) {
		console.log('return');
		return;
	}

	try {
		const { url, type } = parseCategoryFromLink(req.originalUrl || req.url);
		if (!type || res.statusCode < 200 || res.statusCode > 304) return;

		const updateQuery = {
			inc: {
				total: 1,
				[`responses.${res.statusCode || 'unknown'}`]: 1,
			},
		};

		if (url.endsWith('.txt') || url.endsWith('.conf')) {
			const { dateKey, yearKey, monthKey } = time.dateKey();
			Object.assign(updateQuery.inc, {
				blocklists: 1,
				[`categories.${type}`]: 1,
				[`perDay.${dateKey}`]: 1,
				[`perMonth.${monthKey}-${yearKey}`]: 1,
				[`perYear.${yearKey}`]: 1,
			});
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