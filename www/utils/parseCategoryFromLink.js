const types = {
	'0.0.0.0': '0000',
	'127.0.0.1': '127001'
};

const prepare = str => {
	if (!str || !str.length) return null;
	return str.replace(/\./g, '-').replace();
};

module.exports = url => {
	const segments = url.split('/');
	const fullSecond = segments.slice(2).join('/');
	const type = segments[3];
	const fourthSegment = segments[4];
	const fileName = segments[segments.length - 1];
	const isValidFile = fileName.endsWith('.txt') || fileName.endsWith('.conf');

	return {
		url,
		array: segments,
		listUrl: prepare(fullSecond),
		type: types[type] || type,
		category: prepare(fourthSegment),
		fileName: isValidFile ? prepare(fileName) : null
	};
};