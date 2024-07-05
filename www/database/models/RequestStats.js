const { Schema, model } = require('mongoose');

const RequestStats = new Schema({
	requests: {
		all: { type: Number, default: 0 },
		blocklist: { type: Number, default: 0 },
		categories: { type: Map, of: Number, default: {} },
		filenames: { type: Map, of: Number, default: {} },
		'0000': { type: Number, default: 0 },
		'127001': { type: Number, default: 0 },
		adguard: { type: Number, default: 0 },
		dnsmasq: { type: Number, default: 0 },
		noip: { type: Number, default: 0 },
		rpz: { type: Number, default: 0 },
		unbound: { type: Number, default: 0 }
	},
	responses: {
		type: Map,
		of: Number,
		default: {}
	},
	stats: {
		updateStatsFail: { type: Number, default: 0 }
	}
}, { timestamps: true, versionKey: false });

module.exports = model('requests-stats', RequestStats);