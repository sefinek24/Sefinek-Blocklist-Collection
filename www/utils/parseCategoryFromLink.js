module.exports = url => {
	const parts = url.split('/');
	if (parts.length >= 3) return parts[1];

	return null;
};