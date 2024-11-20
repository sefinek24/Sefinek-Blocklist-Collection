const { readdir, readFile } = require('node:fs/promises');
const { resolve, join } = require('node:path');

const worker = async () => {
	let hasError = false;

	const blockListDir = join(__dirname, '..', 'blocklists', 'templates');
	const files = await getAllTxtFiles(blockListDir);

	async function getAllTxtFiles(dir) {
		const dirents = await readdir(dir, { withFileTypes: true });
		const filesPromise = await Promise.all(
			dirents.map(dirent => {
				const res = resolve(dir, dirent.name);

				return dirent.isDirectory() ? getAllTxtFiles(res) : res;
			})
		);
		return Array.prototype.concat(...filesPromise).filter(file => {
			return file.endsWith('.txt') && file.includes('blocklists');
		});
	}

	await Promise.all(files.filter(file => file !== 'everything.txt').map(async file => {
		const fileContents = await readFile(join(file), 'utf8');

		fileContents.split('\n').map((line) => {
			if (line.startsWith('# 0.0.0.0')) {
				return line.split(' ')[2].trim();
			}

			return null;
		}).filter(a => a !== null && !!a);

		fileContents.split('\n').forEach((line, index) => {
			// Ensuring that no version/date might confuse users that read the raw text-file(s)
			if (line.length > 0 && !line.indexOf('Version')) {
				console.error(`[Line ${index + 1}]: Must not contain a Version/Date - ${file}`);
				hasError = true;
			}

			// Checking to ensure all URLs are lowercase
			if (line.startsWith('0.0.0.0 ')) {
				const lineNoIP = line.replace('0.0.0.0 ', '');
				const url = lineNoIP.split('#')[0].trim();
				if (url.toLowerCase() !== url) {
					console.error(`[Line ${index + 1}]: ${url} must be all lowercase - ${file}`);
					hasError = true;
				}
			}

			// Ensure that the URL doesn't contain whitespace characters
			if (line.startsWith('0.0.0.0 ')) {
				const lineNoIP = line.replace('0.0.0.0 ', '');
				const url = lineNoIP.split('#')[0].trim();
				if ((/\s/gmu).test(url)) {
					console.error(`[Line ${index + 1}]: in ${file} url ${url} contains whitespace in the URL.`);
					hasError = true;
				}
			}
		});
	}));

	console.log(hasError ? '❌ Linting failed!' : '✔️ Linting passed.');
	process.exit(hasError ? 1 : 0);
};

(async () => await worker())();

module.exports = () => worker;