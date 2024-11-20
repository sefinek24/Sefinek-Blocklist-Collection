const { promises: fs } = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

const BASE_PATH = path.join(__dirname, '../../blocklists/templates');

module.exports = async (thisFileName, type) => {
	const relativePath = path.relative(BASE_PATH, path.dirname(thisFileName));
	const cacheFolder = path.join(__dirname, `../../cache/${type}`, relativePath);

	await fs.mkdir(cacheFolder, { recursive: true }).catch(err => console.error(`❌ Error creating cache folder: ${err}`));

	const cacheFilePath = path.join(cacheFolder, `${path.basename(thisFileName, '.txt')}.sha512`);
	const hashFromCacheFile = await fs.readFile(cacheFilePath, 'utf8').catch(() => null);

	const buff = await fs.readFile(thisFileName);
	const hash = createHash('sha512').update(buff).digest('hex');
	if (hash === hashFromCacheFile) {
		// console.log(`⏭️ ${hash} / ${type}:${path.basename(thisFileName)} / skipped`);
		return { stop: true };
	}

	await fs.writeFile(cacheFilePath, hash).catch(err => {
		console.error(`❌ Error writing cache file ${cacheFilePath}: ${err}`);
		return { stop: true };
	});

	console.log(`✅ ${hash} -> ${type}:${path.basename(thisFileName)} / hashed`);
	return { cacheHash: hash, stop: false };
};