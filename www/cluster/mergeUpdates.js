module.exports = (buffer, updateQuery) => {
	for (const key in updateQuery.inc) {
		buffer.inc[key] = (buffer.inc[key] || 0) + updateQuery.inc[key];
	}

	for (const key in updateQuery.set) {
		buffer.set[key] = updateQuery.set[key];
	}
};