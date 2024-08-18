const mongoose = require('mongoose');

module.exports = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		process.exit(1);
	}
};