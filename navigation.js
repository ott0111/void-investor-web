// Void Esports - Navigation JavaScript

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }
});

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-link');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
if (navbar) {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Active Navigation Link
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || 
            (currentPath === '/' && linkPath.endsWith('index.html')) ||
            (currentPath.endsWith('/') && linkPath.includes(currentPath.slice(0, -1)))) {
            link.classList.add('active');
        }
    });
}

// Set active link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});

// Focus Trap for Mobile Menu
function trapFocus(e) {
    if (navLinks && navLinks.classList.contains('active')) {
        const focusableElements = navLinks.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
}

document.addEventListener('keydown', trapFocus);

// Navigation Performance Optimization
let ticking = false;
function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateNavigation);
        ticking = true;
    }
}

function updateNavigation() {
    // Update scroll progress
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
    
    // Update navbar state
    if (navbar) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    ticking = false;
}

// Use optimized scroll handler
window.addEventListener('scroll', requestTick);

// Navigation Accessibility
function initializeNavigationAccessibility() {
    // Add ARIA labels
    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
    
    if (navLinks) {
        navLinks.setAttribute('aria-label', 'Main navigation');
    }
    
    // Update ARIA expanded state
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
}

// Initialize accessibility on DOM load
document.addEventListener('DOMContentLoaded', initializeNavigationAccessibility);

// Mobile Menu Touch Support
let touchStartY = 0;
let touchEndY = 0;

if (navLinks) {
    navLinks.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    navLinks.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - close menu
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }
    }
}

// Navigation Analytics (if needed)
function trackNavigationEvent(action, label) {
    // Placeholder for analytics tracking
    console.log(`Navigation: ${action} - ${label}`);
}

// Add tracking to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        trackNavigationEvent('click', link.textContent.trim());
    });
});

// Export functions for external use
window.VoidEsportsNavigation = {
    toggleMobileMenu: () => {
        if (navLinks && mobileMenuToggle) {
            navLinks.classList.toggle('active');
            mobileMenuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        }
    },
    closeMobileMenu: () => {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    },
    setActiveNavLink
};
