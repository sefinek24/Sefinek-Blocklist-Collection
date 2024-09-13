const rateLimit = require('express-rate-limit');
const error = require('./other/errors.js');

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000,
	limit: 150,
	standardHeaders: 'draft-7',
	legacyHeaders: false,

	skip: req => req.ip === '::ffff:127.0.0.1',
	handler: (req, res) => error.rateLimit(req, res)
});

module.exports = limiter;