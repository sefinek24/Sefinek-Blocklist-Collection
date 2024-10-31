const types = {
	'0.0.0.0': '0000',
	'127.0.0.1': '127001',
};

module.exports = url => {
	const segments = url.split('/');
	const isVersioned = segments[2] === 'v1';
	const rawType = isVersioned ? segments[3] : segments[2];
	const type = types[rawType] || rawType;

	return {
		url,
		array: segments,
		type,
	};
};