/* Time formatting */
document.querySelectorAll('.time').forEach(el => {
	const timestamp = el.getAttribute('data-timestamp');
	if (timestamp) {
		const date = new Date(parseInt(timestamp));
		el.textContent = date.toLocaleString();
	}
});


const table = document.getElementById('table');

/* Toggle width */
const toggleWidthButton = document.getElementById('toggleWidthButton');
let tableWidth = localStorage.getItem('tableWidth') !== null;

const savedTableWidth = localStorage.getItem('tableWidth');
if (savedTableWidth) table.style.width = savedTableWidth;
else table.style.width = '100%';

function updateTableWidth() {
	if (tableWidth) {
		toggleWidthButton.style.backgroundColor = 'green';
	} else {
		toggleWidthButton.style.backgroundColor = 'blue';
	}
}

updateTableWidth();

toggleWidthButton.addEventListener('click', () => {
	const currentWidth = table.style.width;
	const newWidth = currentWidth !== '100%' ? '100%' : null;

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
		table.classList.add('not-compact-mode');
		toggleCompactModeButton.style.backgroundColor = 'blue';
	} else {
		table.classList.remove('not-compact-mode');
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

