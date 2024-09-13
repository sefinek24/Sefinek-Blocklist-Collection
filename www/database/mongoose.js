const { connect, connection } = require('mongoose');
const RequestStats = require('./models/RequestStats.js');

const connectToDatabase = async () => {
	try {
		await connect(process.env.MONGODB_URL);
	} catch {
		process.exit(1);
	}
};

connection.on('connected', async () => {
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

connection.on('disconnected', () => {
	console.warn('MongoDB disconnected!');
});

connection.on('error', err => {
	console.error('MongoDB connection error:', err);
	process.exit(1);
});

module.exports = connectToDatabase;