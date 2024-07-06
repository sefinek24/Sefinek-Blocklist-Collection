const { userAgents } = require('./morgan.js');
const parseCategoryFromLink = require('../utils/parseCategoryFromLink.js');
const time = require('../utils/time.js');
const RequestStats = require('../database/models/RequestStats');

const updateStats = async (req, res) => {
	const ua = req.headers['user-agent'];
	if (userAgents.includes(ua)) return;

	try {
		const { url, listUrl, type, category } = parseCategoryFromLink(req.originalUrl || req.url);
		const { dateKey, yearKey, monthKey, hourKey, minuteKey } = time.dateKey();

		const updateQuery = {
			$inc: { 'requests.all': 1 },
			$set: {}
		};

		if (res.statusCode >= 200 && res.statusCode < 300 && category && (url.endsWith('.txt') || url.endsWith('.conf'))) {
			updateQuery.$inc[`requests.${type}`] = 1;
			updateQuery.$inc['requests.blocklist'] = 1;

			if (category) {
				updateQuery.$inc[`requests.categories.${category}.total`] = 1;
				updateQuery.$set[`requests.categories.${category}.last`] = new Date();
				updateQuery.$inc[`requests.categories.${category}.perYear.${yearKey}`] = 1;
				updateQuery.$inc[`requests.categories.${category}.perMonth.${monthKey}-${yearKey}`] = 1;
				updateQuery.$inc[`requests.categories.${category}.perDay.${dateKey}`] = 1;
				updateQuery.$inc[`requests.categories.${category}.perHour.${dateKey}:${hourKey}`] = 1;
				updateQuery.$inc[`requests.categories.${category}.perMinute.${dateKey}:${hourKey}:${minuteKey}`] = 1;
			}

			if (listUrl) {
				updateQuery.$inc[`requests.urls.${listUrl}.total`] = 1;
				updateQuery.$set[`requests.urls.${listUrl}.last`] = new Date();
				updateQuery.$inc[`requests.urls.${listUrl}.perYear.${yearKey}`] = 1;
				updateQuery.$inc[`requests.urls.${listUrl}.perMonth.${monthKey}-${yearKey}`] = 1;
				updateQuery.$inc[`requests.urls.${listUrl}.perDay.${dateKey}`] = 1;
				updateQuery.$inc[`requests.urls.${listUrl}.perHour.${dateKey}:${hourKey}`] = 1;
				updateQuery.$inc[`requests.urls.${listUrl}.perMinute.${dateKey}:${hourKey}:${minuteKey}`] = 1;
			}
		}

		updateQuery.$inc[`responses.${res.statusCode || 'unknown'}`] = 1;

		await RequestStats.findOneAndUpdate({}, updateQuery, { upsert: true, new: true });
	} catch (err) {
		console.error('Error updating request stats:', err);
		await RequestStats.findOneAndUpdate({}, { $inc: { updateStatsFail: 1 } }, { upsert: true, new: true });
	}
};

module.exports = (req, res, next) => {
	res.on('finish', () => updateStats(req, res));
	next();
};
