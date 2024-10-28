const pad = y => (y < 10 ? '0' : '') + y;

exports.time = x => {
	const hh = Math.floor(x / (60 * 60));
	const mm = Math.floor((x % (60 * 60)) / 60);
	const ss = Math.floor(x % 60);

	return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
};

exports.full = seconds => {
	const days = Math.floor(seconds / (3600 * 24));
	const hours = Math.floor((seconds % (3600 * 24)) / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = Math.floor(seconds % 60);

	let formattedTime = '';
	if (days > 0) formattedTime += `${days} ${days === 1 ? 'day' : 'days'}, `;
	if (hours > 0) formattedTime += `${hours} ${hours === 1 ? 'hour' : 'hours'}, `;
	if (minutes > 0) formattedTime += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}, `;
	if (remainingSeconds > 0) formattedTime += `${remainingSeconds} ${remainingSeconds === 1 ? 'second' : 'seconds'}`;

	formattedTime = formattedTime.replace(/,\s*$/, '');
	return formattedTime;
};

exports.dateKey = () => {
	const now = new Date();
	const dateKey = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;

	const yearKey = now.getFullYear().toString();
	const monthKey = (now.getMonth() + 1).toString().padStart(2, '0');
	const hourKey = now.getHours().toString().padStart(2, '0');

	return { dateKey, yearKey, monthKey, hourKey };
};
