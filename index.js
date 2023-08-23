require('dotenv').config();
const cluster = require('node:cluster');
const os = require('node:os');
const path = require('node:path');
const fs = require('fs');


const totalCPUs = os.cpus().length;
const logsPath = path.join(__dirname, 'www', 'public', 'logs');

if (!process.env.NODE_ENV || !process.env.DOMAIN || !process.env.PORT) {
	throw new Error('Environment variables are null or undefined');
}

if (!process.env.MONGODB_URL) {
	throw new Error('The MongoDB database URL `MONGODB_URL` was not found in the .env file');
}

if (!process.env.SEFINEK_API) {
	throw new Error('Specify the `SEFINEK_API` environment variable, e.g., https://api.sefinek.net/api/v2');
}

if (process.env.NODE_ENV === 'development') {
	createDir();
	require('./www/server.js');
} else if (cluster.isMaster) {
	createDir();
	console.log(`Primary ${process.pid} is running`);

	for (let i = 0; i < totalCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', worker => {
		console.warn(`Worker ${worker.process.pid} died`);
	});
} else {
	require('./www/server.js');
	console.log(`Worker ${process.pid} started`);
}

function createDir() {
	fs.mkdir(logsPath, { recursive: true }, err => {
		if (!err || (err && err.code === 'EEXIST')) {
			console.log(`Folder '${logsPath}' created or already exists.`);
		} else {
			console.error('Unable to create folder:', err);
		}
	});
}
