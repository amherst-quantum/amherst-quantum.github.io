// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
            if (scrolled) {
            navbar.style.background = 'rgba(253, 248, 244, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(253, 248, 244, 0.95)';
            navbar.style.boxShadow = 'none';
        }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll(
        '.about-item, .program-card, .stat-item, .contact-item, .outreach-item, .outreach-highlight, .quantum-demo'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.innerText;
        
        // Skip infinity symbol
        if (target === '∞') return;
        
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Particle System Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const quantumAnimation = document.querySelector('.quantum-animation');
    
    if (quantumAnimation) {
        // Add mouse interaction to particles
        quantumAnimation.addEventListener('mousemove', function(e) {
            const particles = document.querySelectorAll('.particle');
            const rect = quantumAnimation.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            particles.forEach((particle, index) => {
                const particleRect = particle.getBoundingClientRect();
                const particleX = particleRect.left - rect.left + particleRect.width / 2;
                const particleY = particleRect.top - rect.top + particleRect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(x - particleX, 2) + Math.pow(y - particleY, 2)
                );
                
                if (distance < 100) {
                    const scale = 1 + (100 - distance) / 100;
                    particle.style.transform = `scale(${scale})`;
                    particle.style.boxShadow = `0 0 ${20 + (100 - distance) / 5}px rgba(253, 248, 244, 0.8)`;
                } else {
                    particle.style.transform = 'scale(1)';
                    particle.style.boxShadow = '0 0 20px rgba(253, 248, 244, 0.6)';
                }
            });
        });
        
        quantumAnimation.addEventListener('mouseleave', function() {
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.transform = 'scale(1)';
                particle.style.boxShadow = '0 0 20px rgba(253, 248, 244, 0.6)';
            });
        });
    }
});

// Preload Critical Images
document.addEventListener('DOMContentLoaded', function() {
    const criticalImages = ['AQI_logo.png'];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Performance: Lazy Load Non-Critical Elements
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add loading class for smooth transition
            element.classList.add('loaded');
            
            lazyLoadObserver.unobserve(element);
        }
    });
});

// Observe elements for lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyElements = document.querySelectorAll('.program-card, .contact-item, .outreach-item');
    lazyElements.forEach(element => {
        lazyLoadObserver.observe(element);
    });
});

// Accessibility: Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Focus Management for Accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = 'a, button, [tabindex]:not([tabindex="-1"])';
    const navMenu = document.querySelector('.nav-menu');
    
    if (navMenu) {
        const firstFocusableElement = navMenu.querySelectorAll(focusableElements)[0];
        const focusableContent = navMenu.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        // Trap focus within mobile menu when open
        document.addEventListener('keydown', function(e) {
            if (!navMenu.classList.contains('active')) return;
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
});

// Error Handling for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder if image fails to load
            const placeholder = document.createElement('div');
            placeholder.style.width = this.style.width || '40px';
            placeholder.style.height = this.style.height || '40px';
            placeholder.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            placeholder.style.borderRadius = '8px';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.color = 'white';
            placeholder.style.fontSize = '12px';
            placeholder.style.fontWeight = 'bold';
            placeholder.textContent = 'AQI';
            
            this.parentNode.replaceChild(placeholder, this);
        });
    });
});

// Page Load Performance Monitoring
window.addEventListener('load', function() {
    // Hide loading indicators if any
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.style.display = 'none';
    });
    
    // Performance logging (optional, for development)
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
}); 