const increment = require('../increment.js');

exports.notFound = async (req, res) => {
	res.status(404).render('errors/404.ejs');

	await increment.errors(404);
};

exports.rateLimit = async (req, res) => {
	res.status(429).render('errors/429.ejs');

	await increment.errors(429);
};

exports.internalError = async (err, req, res, next) => {
	res.status(500).render('errors/500.ejs');
	await increment.errors(500);

	if (err) console.error(err);
	return next;
};

exports.onTimeout = async (req, res) => {
	res.status(503).render('errors/503.ejs');

	await increment.errors(503);
};
