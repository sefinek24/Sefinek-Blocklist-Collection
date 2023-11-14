const { mkdir } = require('fs');

module.exports = path => {
	mkdir(path, { recursive: true }, err => {
		if (!err || (err && err.code === 'EEXIST')) {
			console.log(`Folder '${path}' created or already exists`);
		} else {
			console.error('Failed to create directory:', err);
		}
	});
};