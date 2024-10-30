const rateLimit = require('express-rate-limit');
const error = require('./other/errors.js');

const limiter = rateLimit({
	windowMs: 3 * 60 * 1000,
	limit: 160,
	standardHeaders: 'draft-7',
	legacyHeaders: false,

	skip: req => req.ip === '::ffff:127.0.0.1',
	handler: (req, res) => error.rateLimit(req, res)
});

module.exports = limiter;