const { cpu } = require('node-os-utils');
const formatTime = require('./utils/formatTime.js');
const RequestStats = require('./database/models/RequestStats');

module.exports = wss => {
	wss.on('connection', ws => {
		ws.on('error', console.error);

		console.log('New WebSocket connection established.');

		// Set up an interval to periodically send data to the connected client
		const interval = setInterval(async () => {
			const database = await RequestStats.findOne({});
			const cpuUsage = await cpu.usage();

			// Prepare and send JSON data to the client
			ws.send(JSON.stringify({
				stats: {
					requests: database.requests,
					responses: database.responses,
				},
				uptime: formatTime.full(process.uptime()),
				coll: {
					createdAt: `${database.createdAt.toLocaleTimeString()}, ${database.createdAt.toLocaleDateString()}`,
					updatedAt: `${database.updatedAt.toLocaleTimeString()}, ${database.updatedAt.toLocaleDateString()}`,
				},
				cpuUsage: `${cpuUsage}%`,
			}));
		}, 2000);

		// Handle client's connection closure
		ws.on('close', () => {
			console.log('WebSocket connection was closed.');

			// Stop the interval when the connection is closed
			clearInterval(interval);
		});
	});

	console.log('WebSocket server is running');
};