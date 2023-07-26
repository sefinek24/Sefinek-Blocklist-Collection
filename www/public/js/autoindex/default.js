const table = document.getElementById('table');
const tableLinks = table.querySelectorAll('td a');
const textFileExtensions = ['.txt', '.log', '.md'];

function isTextFile(text) {
	return textFileExtensions.some(ext => text.toLowerCase().endsWith(ext));
}

function createImage(src) {
	const img = document.createElement('img');
	img.src = `/images/flaticon/${src}`;
	img.classList.add('link-img');
	return img;
}

function formatDateTime(dateTimeString) {
	const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
	const dateTime = new Date(dateTimeString);
	const userLanguage = navigator.language || navigator.languages[0];
	return new Intl.DateTimeFormat(userLanguage, options).format(dateTime);
}

function formatFileSize(bytes) {
	if (bytes >= 1000000) {
		return (bytes / 1000000).toFixed(2) + ' MB';
	} else if (bytes >= 1000) {
		return (bytes / 1000).toFixed(2) + ' KB';
	} else {
		return bytes + ' B';
	}
}

function applyLinkStyles(link, color, imgSrc) {
	link.style.color = color;
	const img = createImage(imgSrc);
	link.insertBefore(img, link.firstChild);
}

function updateFileSizeAndTime(link) {
	const sizeTd = link.closest('tr').querySelector('.size');
	if (sizeTd) {
		const fileSize = sizeTd.textContent.trim();
		sizeTd.textContent = fileSize !== '-' ? formatFileSize(parseFloat(fileSize)) : fileSize;
	}

	const timeTd = link.closest('tr').querySelector('.time');
	if (timeTd) {
		const dateTimeString = timeTd.textContent.trim();
		timeTd.textContent = formatDateTime(dateTimeString);
	}
}

tableLinks.forEach(link => {
	const href = link.getAttribute('href');
	const linkText = link.textContent.trim();

	if (href.endsWith('/')) {
		applyLinkStyles(link, 'blue', 'back.png');
	} else if (linkText.endsWith('/')) {
		applyLinkStyles(link, 'yellow', 'open-folder.png');
	} else if (isTextFile(linkText)) {
		applyLinkStyles(link, 'cyan', 'word.png');
		link.href = link.href.replace('/explorer/', '/viewer/');
	} else {
		applyLinkStyles(link, 'red', 'unknown-mail.png');
	}

	link.insertAdjacentText('afterbegin', ' ');

	updateFileSizeAndTime(link);
});


/* Toggle width */
const toggleWidthButton = document.getElementById('toggleWidthButton');
let tableWidth = localStorage.getItem('tableWidth') === '100%';

const savedTableWidth = localStorage.getItem('tableWidth');
if (savedTableWidth) table.style.width = savedTableWidth;

function updateTableWidth() {
	if (tableWidth) {
		toggleWidthButton.style.backgroundColor = 'blue';
	} else {
		toggleWidthButton.style.backgroundColor = 'green';
	}
}

updateTableWidth();

toggleWidthButton.addEventListener('click', () => {
	const currentWidth = table.style.width;
	const newWidth = currentWidth === '100%' ? null : '100%';

	table.style.width = newWidth;
	tableWidth = newWidth === '100%';

	localStorage.setItem('tableWidth', newWidth);

	updateTableWidth();
});


/* Compact mode */
const toggleCompactModeButton = document.getElementById('toggleCompactModeButton');
let compactMode = localStorage.getItem('compactMode') === 'true';

function updateCompactMode() {
	if (compactMode) {
		table.classList.add('compact-mode');
		toggleCompactModeButton.textContent = 'Normal mode';
		toggleCompactModeButton.style.backgroundColor = 'blue';
	} else {
		table.classList.remove('compact-mode');
		toggleCompactModeButton.textContent = 'Compact mode';
		toggleCompactModeButton.style.backgroundColor = 'green';
	}
}

updateCompactMode();

toggleCompactModeButton.addEventListener('click', () => {
	compactMode = !compactMode;
	localStorage.setItem('compactMode', compactMode);
	updateCompactMode();
});


/* Reload page */
const reloadPageBtn = document.getElementById('reloadPage');
reloadPageBtn.addEventListener('click', () => window.location.reload());