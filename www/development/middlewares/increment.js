const { userAgents } = require('./morgan.js');
const parseCategoryFromLink = require('../utils/parseCategoryFromLink.js');
const RequestStats = require('../database/models/RequestStats');

module.exports.requests = async (req, res, next) => {
	const ua = req.headers['user-agent'];
	if (userAgents.includes(ua)) return next();

	const category = parseCategoryFromLink(req.url);
	try {
		const updateQuery = {
			$inc: { 'requests.all': 1 },
		};

		if (category && res.statusCode === 200) {
			updateQuery.$inc[`requests.${category}`] = 1;
			updateQuery.$inc['requests.blocklist'] = 1;
		}

		await RequestStats.findOneAndUpdate({}, updateQuery, { upsert: true, new: true });
	} catch (err) {
		console.error('Error updating request stats:', err);
	} finally {
		next();
	}
};

module.exports.errors = async status => {
	const update = {};

	try {
		if (status) {
			update.$inc = {
				[`responses.${status}`]: 1,
			};
		}

		await RequestStats.findOneAndUpdate({}, update, { upsert: true, new: true });
	} catch (err) {
		console.error('Error incrementing request count `errors`:', err);
	}
};