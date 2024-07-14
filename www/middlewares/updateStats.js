const { userAgents } = require('./morgan.js');
const parseCategoryFromLink = require('../utils/parseCategoryFromLink.js');
const time = require('../utils/time.js');
const RequestStats = require('../database/models/RequestStats');

let statsBuffer = {
	inc: {},
	set: {}
};

const mergeUpdates = (buffer, updateQuery) => {
	for (const key in updateQuery.inc) {
		if (buffer.inc[key]) {
			buffer.inc[key] += updateQuery.inc[key];
		} else {
			buffer.inc[key] = updateQuery.inc[key];
		}
	}

	for (const key in updateQuery.set) {
		buffer.set[key] = updateQuery.set[key];
	}
};

const flushBuffer = async () => {
	if (Object.keys(statsBuffer.inc).length === 0 && Object.keys(statsBuffer.set).length === 0) return;

	const updateQuery = {
		$inc: statsBuffer.inc,
		$set: statsBuffer.set
	};

	console.log(updateQuery);

	try {
		await RequestStats.findOneAndUpdate({}, updateQuery, { upsert: true });
		statsBuffer = { inc: {}, set: {} };
	} catch (err) {
		console.error('Error updating request stats:', err);
	}
};

setInterval(flushBuffer, 6000);

const updateStats = (req, res) => {
	const ua = req.headers['user-agent'];
	if (userAgents.includes(ua)) return;

	try {
		const { url, listUrl, type, category } = parseCategoryFromLink(req.originalUrl || req.url);
		const { dateKey, yearKey, monthKey, hourKey, minuteKey } = time.dateKey();

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
				updateQuery.inc[`requests.urls.${listUrl}.perMinute.${dateKey}:${hourKey}:${minuteKey}`] = 1;
			}
		}

		mergeUpdates(statsBuffer, updateQuery);
	} catch (err) {
		console.error('Error updating request stats:', err);
		mergeUpdates(statsBuffer, { inc: { updateStatsFail: 1 } });
	}
};

module.exports = (req, res, next) => {
	res.on('finish', () => updateStats(req, res));
	next();
};