require('dotenv').config();

const cluster = require('node:cluster');
const { availableParallelism } = require('node:os');
const path = require('node:path');
const createDir = require('./scripts/functions/createDir.js');

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

if (process.env.NODE_ENV === 'development') {
	require('./www/server.js');
} else if (cluster.isMaster) {
	console.log(`Primary ${process.pid} is running: http://127.0.0.1:${process.env.PORT}`);

	const numberCPUs = availableParallelism();
	for (let i = 0; i < numberCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died with code ${code} from signal ${signal}.`);
	});
} else {
	require('./www/server.js');
	console.log(`Worker ${process.pid} started`);
}