const RequestStats = require('../database/models/RequestStats');
const parseCategoryFromLink = require('../utils/parseCategoryFromLink.js');
const { userAgents } = require('../middlewares/morgan.js');

module.exports.requests = async (req, res, next) => {
	const ua = req.headers['user-agent'];
	if (userAgents.includes(ua)) return next();

	try {
		await RequestStats.findOneAndUpdate({}, { $inc: { 'requests.all': 1 } }, { upsert: true, new: true });
	} catch (err) {
		console.error('Error updating request stats:', err);
	}

	next();
};

module.exports.blocklist = async (req, res, next) => {
	const ua = req.headers['user-agent'];
	if (userAgents.includes(ua)) return next();

	let category = parseCategoryFromLink(req.url);
	if (category === '0.0.0.0') category = '00000';
	if (category === '127.0.0.1') category = '127001';

	try {
		const updateQuery = {
			$inc: {
				'requests.blocklist': 1,
			},
		};

		if (res.statusCode === 200 && category) updateQuery.$inc[`requests.${category}`] = 1;

		await RequestStats.findOneAndUpdate({}, updateQuery, { upsert: true, new: true });

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

		await RequestStats.findOneAndUpdate({}, update, { upsert: true, new: true });
	} catch (err) {
		console.error('Error incrementing request count `errors`:', err);
	}
};