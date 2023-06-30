const increment = require('../../utils/increment.js');

exports.notFound = async (req, res) => {
	res.status(404).send('<h1>404 Page was not found 📃</h1><a href="/">Go to Home page...</a>');

	await increment.errors(404);
};

exports.rateLimit = async (req, res) => {
	res.status(429).send('<h1>429 Too many requests 😑</h1>Please try again later.');

	await increment.errors(429);
};

exports.internalError = async (err, req, res, next) => {
	res.status(500).send('<h1>500 Server error 😾</h1>');
	await increment.errors(500);

	if (err) console.error(err);
	return next;
};

exports.onTimeout = async (req, res) => {
	res.status(503).send('<h1>503 Woah, timeout ⏰</h1>');

	await increment.errors(503);
};
