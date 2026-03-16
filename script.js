// Void Esports - Interactive JavaScript

// Particle Background Animation
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
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
        
        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - distance / 150)})`;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Navigation scroll effects
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll progress bar
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / scrollHeight) * 100;
        document.getElementById('scrollProgress').style.width = scrollProgress + '%';
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.replace('fa-times', 'fa-bars');
        });
    });
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.glass-card, .stat-card, .section').forEach(el => {
        observer.observe(el);
    });
}

// Smooth counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('$')) {
            element.textContent = '$' + (current / 1000000).toFixed(1) + 'M+';
        } else if (element.textContent.includes('M')) {
            element.textContent = (current / 1000000).toFixed(1) + 'M+';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Initialize counter animations when stats come into view
function initStatCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                let target = 0;
                
                if (text.includes('$2.5M')) target = 2500000;
                else if (text.includes('1.2M')) target = 1200000;
                else if (text.includes('47')) target = 47;
                else if (text.includes('24')) target = 24;
                
                if (target > 0) {
                    animateCounter(entry.target, target);
                }
            }
        });
    });
    
    statValues.forEach(stat => observer.observe(stat));
}

// Add hover effects to cards
function initCardEffects() {
    const cards = document.querySelectorAll('.glass-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Analytics simulation for investors page
function simulateAnalytics() {
    const updateAnalytics = () => {
        const followers = document.querySelector('[data-analytics="followers"]');
        const mentions = document.querySelector('[data-analytics="mentions"]');
        const engagement = document.querySelector('[data-analytics="engagement"]');
        
        if (followers) {
            const current = parseInt(followers.textContent.replace(/[^0-9]/g, ''));
            const change = Math.floor(Math.random() * 100) - 50;
            followers.textContent = (current + change).toLocaleString() + '+';
        }
        
        if (mentions) {
            const current = parseInt(mentions.textContent.replace(/[^0-9]/g, ''));
            const change = Math.floor(Math.random() * 20) - 10;
            mentions.textContent = (current + change).toLocaleString();
        }
        
        if (engagement) {
            const current = parseFloat(engagement.textContent);
            const change = (Math.random() * 2 - 1).toFixed(1);
            engagement.textContent = Math.max(0, Math.min(100, current + parseFloat(change))).toFixed(1) + '%';
        }
    };
    
    // Update analytics every 5 seconds if on investors page
    if (window.location.pathname.includes('investors.html')) {
        setInterval(updateAnalytics, 5000);
    }
}

// Form handling (placeholder for contact forms)
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show success message
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Message Sent!';
            button.style.background = 'var(--gradient-secondary)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                form.reset();
            }, 3000);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initStatCounters();
    initCardEffects();
    simulateAnalytics();
    initForms();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 100));

// Social Media Analytics Tracking
class SocialMediaTracker {
    constructor() {
        this.updateInterval = 20000; // 20 seconds
        this.platforms = {
            discord: { selector: '[data-analytics="followers"]', current: 17700 },
            tiktok: { selector: '.tiktok-followers', current: 5918 },
            instagram: { selector: '.instagram-followers', current: 328 },
            youtube: { selector: '.youtube-subscribers', current: 0 }
        };
        this.init();
    }

    init() {
        this.startTracking();
        console.log('📊 Social Media Analytics Tracker initialized');
    }

    async fetchSocialMediaData() {
        // Simulate API calls to social media platforms
        // In production, replace with actual API endpoints
        const mockData = {
            discord: this.simulateGrowth(this.platforms.discord.current, 0.02),
            tiktok: this.simulateGrowth(this.platforms.tiktok.current, 0.03),
            instagram: this.simulateGrowth(this.platforms.instagram.current, 0.04),
            youtube: this.simulateGrowth(this.platforms.youtube.current, 0.05)
        };

        return mockData;
    }

    simulateGrowth(current, growthRate) {
        // Simulate realistic growth with some randomness
        const growth = current * growthRate * (0.5 + Math.random());
        return Math.floor(current + growth);
    }

    updateUI(data) {
        // Update Discord members
        const discordElements = document.querySelectorAll('[data-analytics="followers"]');
        discordElements.forEach(element => {
            if (element.textContent.includes('K')) {
                element.textContent = (data.discord / 1000).toFixed(1) + 'K+';
            } else {
                element.textContent = Math.floor(data.discord) + '+';
            }
        });

        // Update TikTok followers
        const tiktokElements = document.querySelectorAll('.tiktok-followers');
        tiktokElements.forEach(element => {
            element.textContent = this.formatNumber(data.tiktok) + '+';
        });

        // Update Instagram followers  
        const instagramElements = document.querySelectorAll('.instagram-followers');
        instagramElements.forEach(element => {
            element.textContent = this.formatNumber(data.instagram) + '+';
        });

        // Update YouTube subscribers
        const youtubeElements = document.querySelectorAll('.youtube-subscribers');
        youtubeElements.forEach(element => {
            element.textContent = this.formatNumber(data.youtube) + '+';
        });

        // Update chart data if chart exists
        this.updateChartData(data);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    updateChartData(data) {
        // Update growth chart if it exists on the page
        if (typeof growthChart !== 'undefined') {
            // Shift data arrays and add new data point
            growthChart.data.datasets[0].data.shift();
            growthChart.data.datasets[0].data.push(data.tiktok);
            
            growthChart.data.datasets[1].data.shift();
            growthChart.data.datasets[1].data.push(data.discord);
            
            growthChart.data.datasets[2].data.shift();
            growthChart.data.datasets[2].data.push(data.instagram);
            
            growthChart.update('none'); // Update without animation for smooth real-time updates
        }
    }

    async startTracking() {
        // Initial update
        const data = await this.fetchSocialMediaData();
        this.updateUI(data);

        // Set up interval for automatic updates
        setInterval(async () => {
            const newData = await this.fetchSocialMediaData();
            this.updateUI(newData);
            
            // Show subtle update indicator
            this.showUpdateIndicator();
        }, this.updateInterval);
    }

    showUpdateIndicator() {
        // Create a subtle indicator that data has been updated
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(109, 40, 217, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        indicator.innerHTML = '📊 Analytics Updated';
        document.body.appendChild(indicator);

        setTimeout(() => {
            indicator.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => indicator.remove(), 300);
        }, 2000);
    }
}

// Add CSS for update indicator
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize social media tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SocialMediaTracker();
});

// Add CSS classes for social media elements
document.addEventListener('DOMContentLoaded', () => {
    // Add tracking classes to existing elements
    const discordStats = document.querySelectorAll('[data-analytics="followers"]');
    discordStats.forEach(el => el.classList.add('discord-members'));
    
    // You can add more specific selectors for other platforms as needed
    console.log('🔄 Social media tracking enabled - updates every 20 seconds');
});
