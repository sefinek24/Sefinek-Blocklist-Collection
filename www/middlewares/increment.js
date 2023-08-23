const RequestStats = require('../database/models/RequestStats');
const parseCategoryFromLink = require('../utils/parseCategoryFromLink.js');

module.exports.requests = async (req, res, next) => {
	try {
		const database = await RequestStats.findOne({}).limit(1);
		if (database) {
			database.requests.all++;
			await database.save();
		}

		next();
	} catch (err) {
		console.error('Error incrementing request count `requests`:', err);
		next(err);
	}
};

module.exports.blocklist = async (req, res, next) => {
	let category = parseCategoryFromLink(req.url);

	if (category === '0.0.0.0') category = '00000';
	if (category === '127.0.0.1') category = '127001';

	try {
		const database = await RequestStats.findOne({}).limit(1);
		if (database && category) {
			database.requests.blocklist++;
			database.requests[category]++;
			await database.save();
		}

		next();
	} catch (err) {
		console.error('Error incrementing request count `blocklist`:', err);
		next(err);
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

		await RequestStats.updateOne({}, update);
	} catch (err) {
		console.error('Error incrementing request count `errors`:', err);
	}
};