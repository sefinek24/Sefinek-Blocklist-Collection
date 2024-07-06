const { Schema, model } = require('mongoose');

const RequestStats = new Schema({
	requests: {
		all: { type: Number, default: 0 },
		blocklist: { type: Number, default: 0 },
		categories: {
			type: Map,
			of: new Schema({
				total: { type: Number, default: 0 },
				perYear: { type: Map, of: Number, default: {} },
				perMonth: { type: Map, of: Number, default: {} },
				perDay: { type: Map, of: Number, default: {} },
				perHour: { type: Map, of: Number, default: {} },
				perMinute: { type: Map, of: Number, default: {} }
			}, { _id: false }),
			default: {}
		},
		urls: {
			type: Map,
			of: new Schema({
				total: { type: Number, default: 0 },
				perYear: { type: Map, of: Number, default: {} },
				perMonth: { type: Map, of: Number, default: {} },
				perDay: { type: Map, of: Number, default: {} },
				perHour: { type: Map, of: Number, default: {} },
				perMinute: { type: Map, of: Number, default: {} }
			}, { _id: false }),
			default: {}
		},
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
	updateStatsFail: { type: Number, default: 0 }
}, { timestamps: true, versionKey: false });

module.exports = model('requests-stats', RequestStats);
