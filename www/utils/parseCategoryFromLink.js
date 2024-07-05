const categories = {
	'0.0.0.0': '0000',
	'127.0.0.1': '127001'
};

module.exports = url => {
	const segments = url.split('/');
	const fourthSegment = segments[3];
	const fileName = segments[segments.length - 1];
	const isValidFile = fileName.endsWith('.txt') || fileName.endsWith('.conf');

	return {
		url,
		array: segments,
		category: categories[fourthSegment] || fourthSegment,
		fileName: isValidFile ? fileName.replace(/\./g, '-') : null
	};
};