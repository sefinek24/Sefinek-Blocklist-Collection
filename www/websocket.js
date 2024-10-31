const formatTime = require('./utils/time.js');
const RequestStats = require('./database/models/RequestStats');

module.exports = wss => {
	wss.on('connection', ws => {
		ws.on('error', console.error);

		console.log('New WebSocket connection established');

		// Set up an interval to periodically send data to the connected client
		const interval = setInterval(async () => {
			const db = await RequestStats.findOne({}).lean();

			// Prepare and send JSON data to the client
			ws.send(JSON.stringify({
				stats: {
					total: db.total,
					blocklists: db.blocklists,
					perDay: db.perDay,
					perMonth: db.perMonth,
					perYear: db.perYear,
					categories: db.categories,
					responses: db.responses,
				},
				uptime: formatTime.full(process.uptime()),
				coll: {
					createdAt: db.createdAt,
					updatedAt: db.updatedAt,
				},
			}));
		}, 4000);

		// Handle client's connection closure
		ws.on('close', () => {
			console.log('WebSocket connection was closed');

			// Stop the interval when the connection is closed
			clearInterval(interval);
		});
	});

	console.log('WebSocket server is running');
};