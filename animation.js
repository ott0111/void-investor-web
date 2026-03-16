// Void Esports - Animations JavaScript

// Particle Background Animation
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.init());
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.scroll-animate');
        this.init();
    }

    init() {
        this.checkElements();
        window.addEventListener('scroll', () => this.throttle(this.checkElements.bind(this), 100));
    }

    checkElements() {
        this.animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-counter]');
        this.init();
    }

    init() {
        this.counters.forEach(counter => {
            this.animateCounter(counter);
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    }
}

// Typewriter Effect
class TypewriterEffect {
    constructor() {
        this.elements = document.querySelectorAll('.typewriter');
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            this.typeWriter(element);
        });
    }

    typeWriter(element) {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };

        // Start when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(element);
    }
}

// Hover Effects
class HoverEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addCardHovers();
        this.addButtonHovers();
        this.addSocialHovers();
    }

    addCardHovers() {
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    addButtonHovers() {
        const buttons = document.querySelectorAll('.neon-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.boxShadow = '0 10px 30px rgba(168, 85, 247, 0.5)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '';
            });
        });
    }

    addSocialHovers() {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-5px) rotate(5deg)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) rotate(0)';
            });
        });
    }
}

// Loading Animations
class LoadingAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.addPageLoadAnimation();
        this.addImageLoadingAnimation();
    }

    addPageLoadAnimation() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Animate elements on page load
            const elements = document.querySelectorAll('.fade-in, .fade-in-up, .scale-in');
            elements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            });
        });
    }

    addImageLoadingAnimation() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    }
}

// Intersection Observer for Animations
class IntersectionAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupObservers();
    }

    setupObservers() {
        // Fade in animations
        const fadeElements = document.querySelectorAll('.fade-in');
        this.observeElements(fadeElements, 'fade-in');

        // Slide in animations
        const slideElements = document.querySelectorAll('.slide-in');
        this.observeElements(slideElements, 'slide-in');

        // Scale animations
        const scaleElements = document.querySelectorAll('.scale-in');
        this.observeElements(scaleElements, 'scale-in');
    }

    observeElements(elements, animationClass) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addParallaxToElements();
    }

    addParallaxToElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.init();
    }

    init() {
        this.monitorFPS();
        this.optimizeAnimations();
    }

    monitorFPS() {
        const updateFPS = (currentTime) => {
            const delta = currentTime - this.lastTime;
            this.fps = Math.round(1000 / delta);
            this.lastTime = currentTime;

            // Reduce animations if FPS is low
            if (this.fps < 30) {
                document.body.classList.add('reduce-animations');
            } else {
                document.body.classList.remove('reduce-animations');
            }

            requestAnimationFrame(updateFPS);
        };

        requestAnimationFrame(updateFPS);
    }

    optimizeAnimations() {
        // Add GPU acceleration to animated elements
        const animatedElements = document.querySelectorAll('.glass-card, .neon-button, .social-link');
        animatedElements.forEach(element => {
            element.style.transform = 'translateZ(0)';
            element.style.willChange = 'transform';
        });
    }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle background
    new ParticleBackground();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize counter animations
    new CounterAnimation();
    
    // Initialize typewriter effect
    new TypewriterEffect();
    
    // Initialize hover effects
    new HoverEffects();
    
    // Initialize loading animations
    new LoadingAnimations();
    
    // Initialize intersection animations
    new IntersectionAnimations();
    
    // Initialize parallax effects
    new ParallaxEffects();
    
    // Initialize performance monitor
    new PerformanceMonitor();
    
    console.log('🎨 All animations initialized');
});

// Export animation classes for external use
window.VoidEsportsAnimations = {
    ParticleBackground,
    ScrollAnimations,
    CounterAnimation,
    TypewriterEffect,
    HoverEffects,
    LoadingAnimations,
    IntersectionAnimations,
    ParallaxEffects,
    PerformanceMonitor
};
