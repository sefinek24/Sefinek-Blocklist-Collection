module.exports = url => {
	const segments = url.split('/');
	const fourthSegment = segments[3];

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

	return { url, array: segments, category: category };
};