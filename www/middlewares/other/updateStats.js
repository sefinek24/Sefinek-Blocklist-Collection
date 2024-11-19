const parseCategoryFromLink = require('../../utils/parseCategoryFromLink.js');
const time = require('../../utils/time.js');

const BOT_REGEX1 = /netcraftsurveyagent|domainsproject\.org|f(?:reepublicapis|acebook)|screaming frog|i(?:a_archiv|ndex)er|s(?:istrix|crapy|lurp)|scraper|(?:s(?:cann|pid)|fetch)er|crawl|jest\/|yahoo|bot/i;

const updateStats = (req, res) => {
	if (BOT_REGEX1.test(req.headers['user-agent']) || req.method !== 'GET') return;

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
	res.on('finish', () => updateStats());
	next();
};