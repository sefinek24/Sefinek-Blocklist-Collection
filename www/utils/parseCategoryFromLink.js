module.exports = url => {
	const data = url.split('/');
	const [, , , result] = data;
	return { url, array: data, category: result === '0.0.0.0' ? '00000' : result === '127.0.0.1' ? '127001' : result };
};