// Script.js

// Function to show splash screen
function showSplashScreen() {
    const splash = document.getElementById('splash');
    splash.style.display = 'block';
    setTimeout(() => {
        splash.style.display = 'none';
    }, 3000); // Show splash for 3 seconds
}

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href');
        const targetSection = document.querySelector(targetID);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Active class management for nav links on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionID = section.getAttribute('id');
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelector('a[href="#' + sectionID + '"]').classList.add('active');
        } else {
            document.querySelector('a[href="#' + sectionID + '"]').classList.remove('active');
        }
    });
});

// Initialize the splash screen
window.onload = showSplashScreen;