const timeout = require('express-timeout-handler');
const { onTimeout } = require('./other/errors.js');

const handleTimeout = () => {
	return timeout.handler({
		timeout: 8000,
		onTimeout,
		disable: ['write', 'setHeaders', 'send', 'json', 'end'],
	});
};

module.exports = handleTimeout;