const mongoose = require('mongoose');
const RequestStats = require('./models/RequestStats.js');

mongoose.connect(process.env.MONGODB_URL)
	.then(() => {
		console.info('Connected to the database');
	}).catch(err => {
		console.error('Failed to connect to the database', err);
		process.exit(1);
	});

const db = mongoose.connection;
db.on('connected', async () => {
	console.info('MongoDB connected successfully!');

	try {
		const data = await RequestStats.findOne({}).limit(1);
		if (data) return;

		await RequestStats.create({});
		console.info('RequestStats collection initialized successfully');
	} catch (err) {
		console.error('Failed to initialize `RequestStats`', err);
		process.exit(1);
	}
});

db.on('disconnected', () => {
	console.warn('MongoDB disconnected!');
});

db.on('error', err => {
	console.error('MongoDB connection error:', err);
	process.exit(1);
});
