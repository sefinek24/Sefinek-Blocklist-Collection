const { DateTime } = require('luxon');

module.exports = () => {
	const now = DateTime.local();
	const timezone = now.toFormat('ZZZZ');

	return {
		timestamp: now.ts,
		now: now.toISO(),
		full: now.toLocaleString(DateTime.DATETIME_FULL),
		serialNumber: now.toFormat('yyyyLLdd') + '01',
		timezone,
	};
};