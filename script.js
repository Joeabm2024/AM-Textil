// Splash screen animation
document.addEventListener('DOMContentLoaded', function() {
    const splash = document.querySelector('.splash-screen');
    const mainContent = document.querySelector('.main-content');
    
    if (splash) {
        setTimeout(function() {
            splash.style.display = 'none';
            if (mainContent) {
                mainContent.style.display = 'block';
            }
        }, 3000);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        this.reset();
    });
}