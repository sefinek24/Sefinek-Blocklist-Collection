const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
	navbar.classList.toggle('active');
});

if (window.innerWidth < 768) {
	menuToggle.style.display = 'block';
} else {
	menuToggle.style.display = 'none';
}