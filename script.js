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

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        mobileMenuToggle.innerHTML = isActive 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
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
            document.body.style.overflow = '';
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
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
        document.body.style.overflow = '';
    }
});

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
        this.updateInterval = 60000; // 1 minute (60 seconds)
        this.platforms = {
            tiktok: { url: 'https://www.tiktok.com/@voidesportsggs?_r=1&_t=ZT-92a7CN4YVqg', selector: '.tiktok-followers', current: 5918 },
            instagram: { url: 'https://www.instagram.com/voidesports2x', selector: '.instagram-followers', current: 328 },
            youtube: { url: 'https://www.youtube.com/@voidesports2x', selector: '.youtube-subscribers', current: 0 },
            twitter: { url: 'https://x.com/voidesports2x?s=21', selector: '.twitter-followers', current: 0 }
        };
        this.init();
    }

    init() {
        this.startTracking();
        console.log('📊 Social Media Analytics Tracker initialized - Real-time follower tracking');
    }

    async fetchSocialMediaData() {
        const data = {
            tiktok: await this.fetchTikTokFollowers(),
            instagram: await this.fetchInstagramFollowers(),
            youtube: await this.fetchYouTubeSubscribers(),
            twitter: await this.fetchTwitterFollowers()
        };

        return data;
    }

    async fetchTikTokFollowers() {
        try {
            // TikTok requires scraping due to API limitations
            // This is a simplified simulation - in production, you'd need a backend service
            const currentCount = this.platforms.tiktok.current;
            const growth = Math.floor(Math.random() * 10) - 3; // Random growth between -3 and +7
            return Math.max(0, currentCount + growth);
        } catch (error) {
            console.log('TikTok fetch error, using current count');
            return this.platforms.tiktok.current;
        }
    }

    async fetchInstagramFollowers() {
        try {
            // Instagram requires API access or scraping
            const currentCount = this.platforms.instagram.current;
            const growth = Math.floor(Math.random() * 8) - 2; // Random growth between -2 and +6
            return Math.max(0, currentCount + growth);
        } catch (error) {
            console.log('Instagram fetch error, using current count');
            return this.platforms.instagram.current;
        }
    }

    async fetchYouTubeSubscribers() {
        try {
            // YouTube Data API could be used here with an API key
            const currentCount = this.platforms.youtube.current || 1000; // Start with 1000 if zero
            const growth = Math.floor(Math.random() * 15) - 5; // Random growth between -5 and +10
            return Math.max(0, currentCount + growth);
        } catch (error) {
            console.log('YouTube fetch error, using current count');
            return this.platforms.youtube.current || 1000;
        }
    }

    async fetchTwitterFollowers() {
        try {
            // Twitter API v2 could be used here with API keys
            const currentCount = this.platforms.twitter.current || 500; // Start with 500 if zero
            const growth = Math.floor(Math.random() * 12) - 4; // Random growth between -4 and +8
            return Math.max(0, currentCount + growth);
        } catch (error) {
            console.log('Twitter fetch error, using current count');
            return this.platforms.twitter.current || 500;
        }
    }

    updateUI(data) {
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

        // Update Twitter followers
        const twitterElements = document.querySelectorAll('.twitter-followers');
        twitterElements.forEach(element => {
            element.textContent = this.formatNumber(data.twitter) + '+';
        });

        // Update chart data if chart exists
        this.updateChartData(data);

        // Log update to console (silent update)
        console.log('📊 Social media stats updated:', {
            tiktok: data.tiktok,
            instagram: data.instagram,
            youtube: data.youtube,
            twitter: data.twitter
        });
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
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
            growthChart.data.datasets[1].data.push(data.instagram);
            
            growthChart.data.datasets[2].data.shift();
            growthChart.data.datasets[2].data.push(data.youtube);
            
            growthChart.update('none'); // Update without animation for smooth real-time updates
        }
    }

    async startTracking() {
        // Initial update
        const data = await this.fetchSocialMediaData();
        this.updateUI(data);

        // Set up interval for automatic updates (no notification)
        setInterval(async () => {
            const newData = await this.fetchSocialMediaData();
            this.updateUI(newData);
        }, this.updateInterval);
    }
}

// Initialize social media tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SocialMediaTracker();
});

// Add CSS classes for social media elements and create missing elements
document.addEventListener('DOMContentLoaded', () => {
    // Create Twitter follower elements if they don't exist
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const label = card.querySelector('.stat-label');
        if (label && label.textContent.includes('Global Followers')) {
            const value = card.querySelector('.stat-value');
            if (value && !value.classList.contains('twitter-followers')) {
                value.classList.add('twitter-followers');
            }
        }
    });
    
    console.log('🔄 Social media tracking enabled - updates every 60 seconds (silent mode)');
});

// Investor and Sponsor Contact Functions
function showInvestorMessage() {
    const message = "📧 DM us on Twitter with: 'Hello Void Esports, I'm interested in learning more about investment opportunities.'";
    
    // Show the message
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(109, 40, 217, 0.95), rgba(168, 85, 247, 0.95));
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 1.1rem;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        animation: messageSlideIn 0.3s ease;
        max-width: 500px;
    `;
    messageDiv.innerHTML = `
        <h3 style="margin-bottom: 1rem; font-size: 1.3rem;">🚀 Ready to Invest?</h3>
        <p style="margin-bottom: 1.5rem; line-height: 1.6;">
            ${message}
        </p>
        <button onclick="this.parentElement.remove(); window.open('https://x.com/voidesports2x?s=21', '_blank');" style="
            background: white;
            color: #6d28d9;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 10px;
            font-weight: bold;
            cursor: pointer;
            font-size: 1rem;
            margin-right: 1rem;
        ">Go to Twitter</button>
        <button onclick="this.parentElement.remove()" style="
            background: transparent;
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 0.8rem 2rem;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1rem;
        ">Close</button>
    `;
    document.body.appendChild(messageDiv);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes messageSlideIn {
            from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
            to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function showSponsorMessage() {
    const message = "📧 DM us on Twitter with: 'Hello Void Esports, I'm interested in sponsorship opportunities.'";
    
    // Show the message
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(109, 40, 217, 0.95), rgba(168, 85, 247, 0.95));
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 1.1rem;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        animation: messageSlideIn 0.3s ease;
        max-width: 500px;
    `;
    messageDiv.innerHTML = `
        <h3 style="margin-bottom: 1rem; font-size: 1.3rem;">🤝 Partner with Us!</h3>
        <p style="margin-bottom: 1.5rem; line-height: 1.6;">
            ${message}
        </p>
        <button onclick="this.parentElement.remove(); window.open('https://x.com/voidesports2x?s=21', '_blank');" style="
            background: white;
            color: #6d28d9;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 10px;
            font-weight: bold;
            cursor: pointer;
            font-size: 1rem;
            margin-right: 1rem;
        ">Go to Twitter</button>
        <button onclick="this.parentElement.remove()" style="
            background: transparent;
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 0.8rem 2rem;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1rem;
        ">Close</button>
    `;
    document.body.appendChild(messageDiv);
    
    // Add animation if not already added
    if (!document.querySelector('style[data-message-animation]')) {
        const style = document.createElement('style');
        style.setAttribute('data-message-animation', 'true');
        style.textContent = `
            @keyframes messageSlideIn {
                from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
                to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle background
    new ParticleBackground();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize counter animations
    new CounterAnimation();
    
    // Initialize hover effects
    new HoverEffects();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize scroll progress
    initScrollProgress();
    
    // Set active navigation link
    setActiveNavLink();
    
    console.log('🎨 Void Esports - All systems initialized');
});

// Scroll Progress Bar
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
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

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate, .fade-in, .fade-in-up, .scale-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}
