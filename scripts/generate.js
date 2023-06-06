const lint = require('./lint.js');
const replaceTo00000 = require('./prepare-templates.js');
const removeDuplicates = require('./remove-duplicates.js');
const createEverythingList = require('./create-everything-list.js');
const generate000 = require('./generate-0.0.0.0.js');
const generate127 = require('./generate-127.0.0.1.js');
const generateAdGuard = require('./generate-adguard.js');
const generateDnsmasq = require('./generate-dnsmasq.js');
const generateNoIP = require('./generate-noip.js');

(async () => {
	console.log('\n\n🟣 Linting...');
	await lint();

	console.log('\n\n🟣 Replacing lines from 127.0.0.1 to 0.0.0.0 in templates...');
	await replaceTo00000();

	console.log('\n\n🟣 Removing duplicates...');
	await removeDuplicates();

	console.log('\n\n🔵 Generating... Everything list');
	await createEverythingList();

	console.log('\n\n🔵 Generating... 0.0.0.0 blocklist');
	await generate000();

	console.log('\n\n🔵 Generating... 127.0.0.1 blocklist');
	await generate127();

	console.log('\n\n🔵 Generating... AdGuard blocklist');
	await generateAdGuard();

	console.log('\n\n🔵 Generating... Dnsmasq blocklist');
	await generateDnsmasq();

	console.log('\n\n🔵 Generating... No-IP blocklist');
	await generateNoIP();
})();
