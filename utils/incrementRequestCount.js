const BlockListStats = require('../database/models/Blocklist');
const parseCategoryFromLink = require('./parseCategoryFromLink.js');

module.exports = async (req, res, next) => {
	let category = parseCategoryFromLink(req.url);

	if (category === '0.0.0.0') category = '00000';
	if (category === '127.0.0.1') category = '127001';

	try {
		const database = await BlockListStats.findOne({ domain: process.env.DOMAIN });
		if (database && category) {
			database.requests.all++;
			database.requests[category]++;
			await database.save();
		}

		next();
	} catch (err) {
		console.error('Error incrementing request count:', err);
		next(err);
	}
};