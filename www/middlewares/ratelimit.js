const rateLimit = require('express-rate-limit');
const error = require('./other/errors.js');

const limiter = rateLimit({
	windowMs: 3 * 60 * 1000,
	max: 200,
	headers: {
		'Retry-After': 240,
		'X-RateLimit-Limit': 148,
		'X-RateLimit-Remaining': '{{remaining}}',
		'X-RateLimit-Reset': '{{reset}}',
	},
	skip: req => {
		return req.ip === '::ffff:127.0.0.1';
	},
	handler: (req, res) => error.rateLimit(req, res),
	statusCode: 429,
});

module.exports = limiter;