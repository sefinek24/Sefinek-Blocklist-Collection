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
	responses: { type: Object, default: {} },
},
{
	timestamps: true,
	versionKey: false,
});

module.exports = model('requests-stats', RequestStats);