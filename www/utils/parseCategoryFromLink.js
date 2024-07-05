module.exports = url => {
	const segments = url.split('/');
	const fourthSegment = segments[3];
	const fileName = segments[segments.length - 1];

	let category;
	switch (fourthSegment) {
	case '0.0.0.0':
		category = '0000';
		break;
	case '127.0.0.1':
		category = '127001';
		break;
	default:
		category = fourthSegment;
	}

	let isValidFile = fileName.endsWith('.txt') || fileName.endsWith('.conf');
	if (!isValidFile) isValidFile = false;

	return { url, array: segments, category, fileName: isValidFile ? fileName.replace(/[.]/, '-') : null };
};