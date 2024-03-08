const path = require('node:path');

module.exports = async (convert, files, relativePath, folderPath) => {
	try {
		const subdirectories = files.filter(file => file.isDirectory());
		await Promise.all(subdirectories.map(async subdirectory => {
			const nextRelativePath = path.join(relativePath, subdirectory.name);
			await convert(path.join(folderPath, subdirectory.name), nextRelativePath);
		}));
	} catch (err) {
		console.error(`❌ Error processing ${folderPath}:`, err);
	}
};