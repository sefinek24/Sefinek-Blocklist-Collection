const { Schema, model } = require('mongoose');

const RequestStats = new Schema({
	requests: {
		all: { type: Number, default: 0 },
		blocklist: { type: Number, default: 0 },
		'127001': { type: Number, default: 0 },
		'00000': { type: Number, default: 0 },
		adguard: { type: Number, default: 0 },
		dnsmasq: { type: Number, default: 0 },
		noip: { type: Number, default: 0 },
	},
	responses: {
		404: { type: Number, default: 0 },
		429: { type: Number, default: 0 },
		500: { type: Number, default: 0 },
		503: { type: Number, default: 0 },
	},
}, { timestamps: true, versionKey: false });

module.exports = model('requests-stats', RequestStats);