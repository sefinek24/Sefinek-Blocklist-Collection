const { promises: fs } = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

module.exports = async (thisFileName, type, file) => {
	// Cache
	const cacheFolder = path.join(__dirname, `../../cache/${type}/${path.basename(path.dirname(thisFileName)) === 'template' ? '' : path.basename(path.dirname(thisFileName))}`);
	await fs.mkdir(cacheFolder, { recursive: true });

	const cacheFilePath = path.join(cacheFolder, `${file.name.replace('.txt', '')}.sha256`);
	let hashFromCacheFile;

	try {
		hashFromCacheFile = await fs.readFile(cacheFilePath, 'utf8');
	} catch (err) {
		console.warn(`❌  Cache file not found: ${cacheFilePath}`);
	}

	const buff = await fs.readFile(thisFileName);
	const hash = createHash('sha256').update(buff).digest('hex');

	if (hash === hashFromCacheFile) {
		console.log(`⏭️ ${hash} == ${hashFromCacheFile || 'Unknown hash'} / ${file.name} / skipped`);
		return { stop: true };
	}

	try {
		await fs.writeFile(cacheFilePath, hash);
		console.log(`✅  ${hash} -> ${hashFromCacheFile || 'Unknown hash'} / ${file.name} / hashed`);
	} catch (err) {
		console.error(`Error writing cache file ${cacheFilePath}: ${err}`);
		return { stop: true };
	}

	return { cacheHash: hashFromCacheFile, stop: false };
};