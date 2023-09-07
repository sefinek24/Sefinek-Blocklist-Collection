const morgan = require('morgan');

const userAgentsArray = [
	'Better Uptime Bot Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
];

const skipUserAgent = () => req => {
	const userAgent = req.headers['user-agent'];
	return userAgentsArray.includes(userAgent);
};

const logger = morgan('[:status :method :response-time ms] :url - :user-agent', {
	skip: skipUserAgent(),
});

module.exports = { use: logger, userAgentsArray };