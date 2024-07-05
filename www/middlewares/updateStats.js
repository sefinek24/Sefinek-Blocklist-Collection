const { userAgents } = require('./morgan.js');
const parseCategoryFromLink = require('../utils/parseCategoryFromLink.js');
const RequestStats = require('../database/models/RequestStats');

const updateStats = async (req, res) => {
	const ua = req.headers['user-agent'];
	if (userAgents.includes(ua)) return;

	try {
		const { url, category } = parseCategoryFromLink(req.originalUrl || req.url);
		const updateQuery = {
			$inc: { 'requests.all': 1 }
		};

		console.log(url);
		console.log(category);

		if (res.statusCode >= 200 && res.statusCode < 300) {
			if (category && (url.endsWith('.txt') || url.endsWith('.conf'))) {
				const filename = category.replace(/\.(?:conf|txt)/, '').replace(/[.]/, '-');
				updateQuery.$inc[`requests.filenames.${filename}`] = 1;
				updateQuery.$inc[`requests.${category}`] = 1;
				updateQuery.$inc['requests.blocklist'] = 1;
			}
		}

		updateQuery.$inc[`responses.${res.statusCode || 'unknown'}`] = 1;

		await RequestStats.findOneAndUpdate({}, updateQuery, { upsert: true, new: true });
	} catch (err) {
		console.error('Error updating request stats:', err);
		await RequestStats.findOneAndUpdate({}, { $inc: { 'stats.updateStatsFail': 1 } }, { upsert: true, new: true });
	}
};

module.exports = (req, res, next) => {
	res.on('finish', () => updateStats(req, res));
	next();
};