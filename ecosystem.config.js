module.exports = {
	apps: [{
		name                  : 'blocklists',
		script                : './index.js',

		log_date_format       : 'HH:mm:ss.SSS DD.MM.YYYY',
		merge_logs            : true,
		log_file		      : '/home/sefinek/logs/www/blocklist.sefinek.net/combined.log',
		out_file              : '/home/sefinek/logs/www/blocklist.sefinek.net/out.log',
		error_file            : '/home/sefinek/logs/www/blocklist.sefinek.net/error.log',

		max_restarts          : 4,
		restart_delay         : 6000,
		wait_ready            : true,

		// instances             : 'max',
		// exec_mode             : 'cluster',
	}],
};