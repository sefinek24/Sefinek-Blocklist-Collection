const { userAgents } = require('./morgan.js');
const parseCategoryFromLink = require('../utils/parseCategoryFromLink.js');
const time = require('../utils/time.js');

const updateStats = (req, res) => {
	const ua = req.headers['user-agent'];
	if (userAgents.includes(ua)) return;

	try {
		const { url, listUrl, type, category } = parseCategoryFromLink(req.originalUrl || req.url);
		const { dateKey, yearKey, monthKey, hourKey } = time.dateKey();

		const updateQuery = {
			inc: { 'requests.all': 1, [`responses.${res.statusCode || 'unknown'}`]: 1 },
			set: {}
		};

		if (res.statusCode >= 200 && res.statusCode < 300 && category && (url.endsWith('.txt') || url.endsWith('.conf'))) {
			updateQuery.inc[`requests.${type}`] = 1;
			updateQuery.inc['requests.blocklist'] = 1;

			if (listUrl) {
				updateQuery.inc[`requests.urls.${listUrl}.total`] = 1;
				updateQuery.set[`requests.urls.${listUrl}.last`] = new Date();
				updateQuery.inc[`requests.urls.${listUrl}.perYear.${yearKey}`] = 1;
				updateQuery.inc[`requests.urls.${listUrl}.perMonth.${monthKey}-${yearKey}`] = 1;
				updateQuery.inc[`requests.urls.${listUrl}.perDay.${dateKey}`] = 1;
				updateQuery.inc[`requests.urls.${listUrl}.perHour.${dateKey}:${hourKey}`] = 1;
			}
		}

		process.send({ type: 'updateStats', data: updateQuery });
	} catch (err) {
		console.error('[UpdateStats]: Error updating request stats.', err);
		process.send({ type: 'updateStats', data: { inc: { updateStatsFail: 1 } } });
	}
};

module.exports = (req, res, next) => {
	if (process.env.NODE_ENV === 'production') res.on('finish', () => updateStats(req, res));
	next();
};