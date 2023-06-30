const mongoose = require('mongoose');
const BlockList = require('./models/Blocklist');

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.info('Connected to the database');
}).catch(err => {
	console.error('Failed to connect to the database', err);
	process.exit(1);
});

const db = mongoose.connection;
db.on('connected', async () => {
	console.info('MongoDB connected successfully!');

	try {
		const data = await BlockList.findOne({ domain: process.env.DOMAIN });
		if (data) return;

		await BlockList.create({ domain: process.env.DOMAIN });
		console.info('Blocklist collection initialized successfully!');
	} catch (err) {
		console.error('Failed to initialize BlockListStats', err);
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
