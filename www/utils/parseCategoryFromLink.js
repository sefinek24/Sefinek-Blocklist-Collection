module.exports = (url) => {
	const [, , result] = url.split('/');
	return result === '0.0.0.0' ? '00000' : result === '127.0.0.1' ? '127001' : result;
};