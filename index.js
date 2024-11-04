require('dotenv').config();

const cluster = require('node:cluster');
const numCPUs = require('node:os').availableParallelism();
const path = require('node:path');
const WebSocket = require('ws');
const createDir = require('./scripts/utils/createDir.js');
const connectToDatabase = require('./www/database/mongoose.js');
const mergeUpdates = require('./www/cluster/mergeUpdates.js');
const RequestStats = require('./www/database/models/RequestStats');

if (!process.env.NODE_ENV || !process.env.DOMAIN || !process.env.PORT) {
	throw new Error('Environment variables are null or undefined');
}

if (!process.env.MONGODB_URL) {
	throw new Error('The MongoDB database URL `MONGODB_URL` was not found in the .env file');
}

if (!process.env.SEFINEK_API) {
	throw new Error('Specify the `SEFINEK_API` environment variable, e.g., https://api.sefinek.net/api/v2');
}

createDir(path.join(__dirname, 'www', 'public', 'logs'));

(async () => {
	if (process.env.NODE_ENV === 'development') {
		connectToDatabase().then(() => require('./www/server.js'));
	} else if (cluster.isPrimary) {
		// Connect to MongoDB
		await connectToDatabase();

		// WebSocket
		const ws = new WebSocket.Server({ port: process.env.WS_PORT });
		require('./www/websocket.js')(ws);

		// Global stats buffer
		let globalStatsBuffer = { inc: {}, set: {} };

		const flushBuffer = async () => {
			if (Object.keys(globalStatsBuffer.inc).length === 0 && Object.keys(globalStatsBuffer.set).length === 0) return;

			try {
				await RequestStats.findOneAndUpdate({}, { $inc: globalStatsBuffer.inc, $set: globalStatsBuffer.set }, { upsert: true });
				globalStatsBuffer = { inc: {}, set: {} };
			} catch (err) {
				console.error('[Index]: Error updating request stats.', err);
			}
		};

		setInterval(flushBuffer, 4000);

		// Fork workers
		for (let i = 0; i < numCPUs; i++) {
			cluster.fork();
		}

		// Merge updates
		cluster.on('message', (worker, message) => {
			if (message.type === 'updateStats') mergeUpdates(globalStatsBuffer, message.data);
		});

		// On exit
		cluster.on('exit', (worker, code, signal) => {
			console.error(`Worker ${worker.process.pid} died (code: ${code}, signal: ${signal}). Restarting...`);
			cluster.fork();
		});

		console.log(`Primary ${process.pid} is running: http://127.0.0.1:${process.env.PORT}`);
	} else {
		connectToDatabase().then(() => {
			require('./www/server.js');
			console.log(`Worker ${process.pid} started`);
		});
	}
})();