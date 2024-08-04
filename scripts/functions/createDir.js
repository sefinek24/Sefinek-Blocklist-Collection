const { mkdir } = require('node:fs');

module.exports = path => {
	mkdir(path, { recursive: true }, err => {
		if (err && err.code !== 'EEXIST') console.error('Failed to create directory:', err);
	});
};