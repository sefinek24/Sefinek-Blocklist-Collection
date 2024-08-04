const { DateTime } = require('luxon');

const getDate = () => {
	const now = DateTime.local();
	const timezone = now.toFormat('ZZZZ');

	return {
		timestamp: now.ts,
		now: now.toISO(),
		full: now.toLocaleString(DateTime.DATETIME_FULL),
		timezone
	};
};

module.exports = getDate();