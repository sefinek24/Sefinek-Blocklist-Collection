const { promises: fs } = require('node:fs');
const path = require('node:path');
const date = require('../functions/date.js');
const sha256 = require('../functions/sha512.js');
const txtFilter = require('../functions/txtFilter.js');
const process = require('../functions/process.js');

const convert = async (folderPath = path.join(__dirname, '../../blocklists/templates'), relativePath = '') => {
	const { format, allFiles, txtFiles, generatedPath } = await txtFilter('adguard', path, fs, relativePath, folderPath);

	await Promise.all(txtFiles.map(async file => {
		const thisFileName = path.join(folderPath, file.name);

		// Cache
		const { cacheHash, stop } = await sha256(thisFileName, format, file);
		if (stop) return;

		// Content
		const fileContent = await fs.readFile(thisFileName, 'utf8');
		const replacedFile = fileContent
			.replaceAll(
				/127\.0\.0\.1 localhost\.localdomain|255\.255\.255\.255 broadcasthost|ff0(?:0::0 ip6-mcastprefix|2::(?:2 ip6-allrouter|(?:1 ip6-allnode|3 ip6-allhost))s)|(?:fe80::1%lo0 |(?:(?:127\.0\.0\.|::)1 {2}|::1 (?:ip6-)?))localhost|ff00::0 ip6-localnet|127\.0\.0\.1 local(?:host)?|::1 ip6-loopback|0\.0\.0\.0 0\.0\.0\.0/gi,
				''
			)
			.replaceAll('#=====', '! =====')
			.replace(/^# 0\.0\.0\.0 (.*?) (.*)/gmu, '@@||$1^! $2')
			.replace(/0\.0\.0\.0 (.*?)$/gmu, '||$1^')
			.replaceAll(/::|#/gmu, '!')
			.replace(/<Release>/gim, 'AdGuard [adguard.com]')
			.replace(/<Version>/gim, date.timestamp.toString())
			.replace(/<LastUpdate>/gim, `${date.full} | ${date.now}`);

		const fullNewFile = path.join(generatedPath, file.name);
		await fs.writeFile(fullNewFile, replacedFile);

		console.log(`✔️ ${cacheHash || file.name} ++ ${fullNewFile}`);
	}));

	await process(convert, allFiles, path, relativePath, folderPath);
};

const run = async () => {
	await convert();
	console.log('\n');
};

(async () => await run())();

module.exports = run;