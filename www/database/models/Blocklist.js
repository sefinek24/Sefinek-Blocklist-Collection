const { Schema, model } = require('mongoose');

const BlockList = new Schema({
	domain: { type: String, default: process.env.DOMAIN, index: true, unique: true },
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
}, {
	timestamps: true,
	versionKey: false,
});

module.exports = model('blocklists', BlockList);
