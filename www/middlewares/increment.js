const BlockListStats = require('../database/models/Blocklist');
const parseCategoryFromLink = require('../utils/parseCategoryFromLink.js');

module.exports.requests = async (req, res, next) => {
	try {
		const database = await BlockListStats.findOne({ domain: process.env.DOMAIN });
		if (database) {
			database.requests.all++;
			await database.save();
		}

		next();
	} catch (err) {
		console.error('Error incrementing request count:', err);
		next(err);
	}
};

module.exports.blocklist = async (req, res, next) => {
	let category = parseCategoryFromLink(req.url);

	if (category === '0.0.0.0') category = '00000';
	if (category === '127.0.0.1') category = '127001';

	try {
		const database = await BlockListStats.findOne({ domain: process.env.DOMAIN });
		if (database && category) {
			database.requests.blocklist++;
			database.requests[category]++;
			await database.save();
		}

		next();
	} catch (err) {
		console.error('Error incrementing request count:', err);
		next(err);
	}
};

module.exports.errors = async status => {
	try {
		const query = { domain: process.env.DOMAIN };
		const update = {};

		if (status) {
			update.$inc = {
				[`responses.${status}`]: 1,
			};
		}

		await BlockListStats.findOneAndUpdate(query, update, { upsert: true });
	} catch (err) {
		console.error('Error incrementing request count:', err);
	}
};