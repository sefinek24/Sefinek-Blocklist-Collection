let createdElement;
let updatedElement;

const formatDate = str => {
	const date = new Date(str);

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZoneName: 'short'
	};

	return date.toLocaleDateString(undefined, options);
};

document.addEventListener('DOMContentLoaded', () => {
	createdElement = document.getElementById('stats-content-coll-cAt');
	updatedElement = document.getElementById('stats-content-coll-uAt');

	createdElement.textContent = formatDate(createdElement.textContent);
	updatedElement.textContent = formatDate(updatedElement.textContent);
});
