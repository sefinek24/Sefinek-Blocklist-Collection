const getDate = () => {
	const now = new Date();

	const timestamp = now.getTime();
	const day = now.getDate().toString().padStart(2, '0');
	const month = (now.getMonth() + 1).toString().padStart(2, '0');
	const year = now.getFullYear().toString();
	const hours = now.getHours().toString().padStart(2, '0');
	const minutes = now.getMinutes().toString().padStart(2, '0');
	const seconds = now.getSeconds().toString().padStart(2, '0');
	const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

	return { timestamp, day, month, year, hours, minutes, seconds, milliseconds };
};


module.exports = getDate();