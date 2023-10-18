const formatTime = require('../www/utils/formatTime.js');
const RequestStats = require('./database/models/RequestStats');
const osu = require('node-os-utils');

module.exports = wss => {
	wss.on('connection', ws => {
		console.log('New WebSocket connection established.');

		// Set up an interval to periodically send data to the connected client
		const interval = setInterval(async () => {
			const database = await RequestStats.findOne({}).limit(1);
			const cpuUsage = await osu.cpu.usage();

			// Prepare and send JSON data to the client
			ws.send(JSON.stringify({
				stats: {
					requests: database.requests,
					responses: database.responses,
				},
				uptime: formatTime.full(process.uptime()),
				collDate: database.createdAt,
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

	console.log('Loaded WebSocket.');
};