require('dotenv').config();

const cluster = require('node:cluster');
const totalCPUs = require('node:os').cpus().length;
const path = require('node:path');
const fs = require('fs');

if (!process.env.NODE_ENV || !process.env.DOMAIN || !process.env.PORT) throw new Error('env variables are null or undefined');
if (!process.env.MONGODB_URL) throw new Error('The MongoDB database URL `MONGODB_URL` was not found in the .env file');
if (!process.env.SEFINEK_API) throw new Error('Specify the `SEFINEK_API` env variable. For example: https://api.sefinek.net/api/v2');


if (process.env.NODE_ENV === 'development') {
	require('./www/server.js');
} else if (cluster.isMaster) {
	console.log(`Primary ${process.pid} is running: http://127.0.0.1:${process.env.PORT}`);

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


const logs = path.join(__dirname, 'www', 'public', 'logs');
fs.mkdir(logs, (err) => {
	if (err) {
		if (err.code === 'EEXIST') {
			console.log(`Folder '${logs}' already exists.`);
		} else {
			console.error('Unable to create folder:', err);
		}
	} else {
		console.log(`Folder '${logs}' created successfully!`);
	}
});