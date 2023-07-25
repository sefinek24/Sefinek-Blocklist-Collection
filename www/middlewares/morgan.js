const morgan = require('morgan');

const skipUserAgents = [
	'Mozilla/5.0+(compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)',
];

const skipUserAgent = () => req => {
	const userAgent = req.headers['user-agent'];
	return skipUserAgents.includes(userAgent);
};

const logger = morgan('[:status :method :response-time ms] :url - :user-agent', {
	skip: skipUserAgent(),
});

module.exports = logger;