const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
	navbar.classList.toggle('active');
});

if (window.innerWidth < 1235) {
	menuToggle.style.display = 'block';
} else {
	menuToggle.style.display = 'none';
}