// Void Esports - Premium UI Enhancements - Ultra Premium Edition
// Comprehensive JavaScript Framework for Advanced Interactions

/**
 * Premium UI Framework - Main Class
 * Handles all premium interactions and animations
 */
class PremiumUI {
    constructor() {
        this.isInitialized = false;
        this.config = {
            particlesEnabled: true,
            parallaxEnabled: true,
            magneticEnabled: true,
            cursorEnabled: true,
            smoothScrollEnabled: true,
            autoInit: true,
            performanceMode: false,
            debugMode: false
        };
        
        this.modules = {
            parallax: null,
            magnetic: null,
            cursor: null,
            particles: null,
            animations: null,
            scroll: null,
            navigation: null,
            theme: null,
            performance: null,
            analytics: null
        };
        
        this.init();
    }

    /**
     * Initialize all premium features
     */
    async init() {
        try {
            if (this.isInitialized) {
                console.warn('🌟 Premium UI already initialized');
                return;
            }
            
            console.log('🚀 Initializing Premium UI Framework...');
            
            // Initialize core modules
            await this.initPerformanceMonitor();
            await this.initThemeManager();
            await this.initNavigation();
            await this.initScrollEffects();
            await this.initAnimations();
            await this.initParallax();
            await this.initMagneticEffects();
            await this.initCursorEffects();
            await this.initSmoothScroll();
            await this.initParticleSystem();
            await this.initGlowEffects();
            await this.initIntersectionObserver();
            await this.initLazyLoading();
            await this.initAnalytics();
            
            // Setup global event listeners
            this.setupGlobalEventListeners();
            
            // Initialize performance optimizations
            this.optimizePerformance();
            
            this.isInitialized = true;
            console.log('✨ Premium UI Framework initialized successfully!');
            
            // Emit initialization complete event
            this.emitEvent('premium:initialized');
            
        } catch (error) {
            console.error('❌ Failed to initialize Premium UI:', error);
            this.emitEvent('premium:error', { error });
        }
    }

    /**
     * Performance Monitor Module
     */
    async initPerformanceMonitor() {
        this.modules.performance = new PerformanceMonitor();
        await this.modules.performance.init();
    }

    /**
     * Theme Manager Module
     */
    async initThemeManager() {
        this.modules.theme = new ThemeManager();
        await this.modules.theme.init();
    }

    /**
     * Navigation Module
     */
    async initNavigation() {
        this.modules.navigation = new NavigationManager();
        await this.modules.navigation.init();
    }

    /**
     * Scroll Effects Module
     */
    async initScrollEffects() {
        this.modules.scroll = new ScrollEffectsManager();
        await this.modules.scroll.init();
    }

    /**
     * Animations Module
     */
    async initAnimations() {
        this.modules.animations = new AnimationManager();
        await this.modules.animations.init();
    }

    /**
     * Parallax Module
     */
    async initParallax() {
        if (!this.config.parallaxEnabled) return;
        
        this.modules.parallax = new ParallaxManager();
        await this.modules.parallax.init();
    }

    /**
     * Magnetic Effects Module
     */
    async initMagneticEffects() {
        if (!this.config.magneticEnabled) return;
        
        this.modules.magnetic = new MagneticEffectsManager();
        await this.modules.magnetic.init();
    }

    /**
     * Cursor Effects Module
     */
    async initCursorEffects() {
        if (!this.config.cursorEnabled) return;
        
        this.modules.cursor = new CursorEffectsManager();
        await this.modules.cursor.init();
    }

    /**
     * Smooth Scroll Module
     */
    async initSmoothScroll() {
        if (!this.config.smoothScrollEnabled) return;
        
        this.modules.smoothScroll = new SmoothScrollManager();
        await this.modules.smoothScroll.init();
    }

    /**
     * Particle System Module
     */
    async initParticleSystem() {
        if (!this.config.particlesEnabled) return;
        
        this.modules.particles = new ParticleSystemManager();
        await this.modules.particles.init();
    }

    /**
     * Glow Effects Module
     */
    async initGlowEffects() {
        this.modules.glow = new GlowEffectsManager();
        await this.modules.glow.init();
    }

    /**
     * Intersection Observer Module
     */
    async initIntersectionObserver() {
        this.modules.intersection = new IntersectionObserverManager();
        await this.modules.intersection.init();
    }

    /**
     * Lazy Loading Module
     */
    async initLazyLoading() {
        this.modules.lazyLoad = new LazyLoadManager();
        await this.modules.lazyLoad.init();
    }

    /**
     * Analytics Module
     */
    async initAnalytics() {
        this.modules.analytics = new AnalyticsManager();
        await this.modules.analytics.init();
    }

    /**
     * Setup global event listeners
     */
    setupGlobalEventListeners() {
        // Window resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Visibility change handler
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // Error handler
        window.addEventListener('error', (event) => {
            this.handleError(event);
        });

        // Performance observer
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                this.handlePerformanceEntries(list.getEntries());
            });
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.handleResize === 'function') {
                module.handleResize();
            }
        });
        
        this.emitEvent('premium:resize');
    }

    /**
     * Handle visibility change
     */
    handleVisibilityChange() {
        const isHidden = document.hidden;
        
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.handleVisibilityChange === 'function') {
                module.handleVisibilityChange(isHidden);
            }
        });
        
        this.emitEvent('premium:visibility', { hidden: isHidden });
    }

    /**
     * Handle errors
     */
    handleError(event) {
        console.error('Premium UI Error:', event.error);
        this.emitEvent('premium:error', { error: event.error, event });
    }

    /**
     * Handle performance entries
     */
    handlePerformanceEntries(entries) {
        entries.forEach(entry => {
            if (entry.duration > 100) { // Log slow operations
                console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
            }
        });
    }

    /**
     * Optimize performance
     */
    optimizePerformance() {
        // Enable passive event listeners
        this.enablePassiveListeners();
        
        // Optimize images
        this.optimizeImages();
        
        // Reduce motion if needed
        this.reduceMotionIfNeeded();
        
        // Enable GPU acceleration
        this.enableGPUAcceleration();
    }

    /**
     * Enable passive event listeners
     */
    enablePassiveListeners() {
        const passiveOptions = { passive: true };
        
        document.addEventListener('touchstart', () => {}, passiveOptions);
        document.addEventListener('touchmove', () => {}, passiveOptions);
        window.addEventListener('scroll', () => {}, passiveOptions);
        window.addEventListener('wheel', () => {}, passiveOptions);
    }

    /**
     * Optimize images
     */
    optimizeImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }

    /**
     * Reduce motion if needed
     */
    reduceMotionIfNeeded() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }

    /**
     * Enable GPU acceleration
     */
    enableGPUAcceleration() {
        const elements = document.querySelectorAll('.glass-card, .btn, .staff-card');
        elements.forEach(el => {
            el.style.transform = 'translateZ(0)';
            el.style.willChange = 'transform';
        });
    }

    /**
     * Debounce utility
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle utility
     */
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

    /**
     * Emit custom event
     */
    emitEvent(eventName, data = {}) {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    }

    /**
     * Destroy all modules
     */
    destroy() {
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.destroy === 'function') {
                module.destroy();
            }
        });
        
        this.isInitialized = false;
        console.log('🔴 Premium UI Framework destroyed');
    }
}

/**
 * Performance Monitor Module
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            memoryUsage: 0,
            renderTime: 0,
            scrollLatency: 0
        };
        
        this.observers = [];
        this.isMonitoring = false;
    }

    async init() {
        this.startFPSMonitoring();
        this.startMemoryMonitoring();
        this.startRenderTimeMonitoring();
        this.isMonitoring = true;
        
        console.log('📊 Performance monitor initialized');
    }

    startFPSMonitoring() {
        let lastTime = performance.now();
        let frames = 0;
        
        const measureFPS = () => {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                this.metrics.fps = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;
                
                this.updatePerformanceDisplay();
            }
            
            if (this.isMonitoring) {
                requestAnimationFrame(measureFPS);
            }
        };
        
        requestAnimationFrame(measureFPS);
    }

    startMemoryMonitoring() {
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1048576);
                this.updatePerformanceDisplay();
            }, 1000);
        }
    }

    startRenderTimeMonitoring() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.entryType === 'measure') {
                    this.metrics.renderTime = Math.round(entry.duration);
                    this.updatePerformanceDisplay();
                }
            });
        });
        
        observer.observe({ entryTypes: ['measure'] });
        this.observers.push(observer);
    }

    updatePerformanceDisplay() {
        const display = document.getElementById('performance-display');
        if (display) {
            display.innerHTML = `
                FPS: ${this.metrics.fps} | 
                Memory: ${this.metrics.memoryUsage}MB | 
                Render: ${this.metrics.renderTime}ms
            `;
        }
    }

    getMetrics() {
        return { ...this.metrics };
    }

    destroy() {
        this.isMonitoring = false;
        this.observers.forEach(observer => observer.disconnect());
    }
}

/**
 * Theme Manager Module
 */
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.themes = ['dark', 'light', 'cyberpunk', 'retro', 'minimal'];
        this.themeTransition = null;
    }

    async init() {
        this.loadSavedTheme();
        this.setupThemeToggle();
        this.setupSystemThemeDetection();
        this.applyTheme(this.currentTheme);
        
        console.log('🎨 Theme manager initialized');
    }

    loadSavedTheme() {
        const saved = localStorage.getItem('premium-theme');
        if (saved && this.themes.includes(saved)) {
            this.currentTheme = saved;
        }
    }

    setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                this.nextTheme();
            });
        }
    }

    setupSystemThemeDetection() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        mediaQuery.addListener((e) => {
            if (this.currentTheme === 'auto') {
                this.applyTheme(e.matches ? 'light' : 'dark');
            }
        });
    }

    nextTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.setTheme(this.themes[nextIndex]);
    }

    setTheme(theme) {
        if (!this.themes.includes(theme)) return;
        
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.saveTheme(theme);
        
        document.dispatchEvent(new CustomEvent('theme:changed', { 
            detail: { theme } 
        }));
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Add transition class for smooth theme switching
        document.body.classList.add('theme-transitioning');
        
        clearTimeout(this.themeTransition);
        this.themeTransition = setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }

    saveTheme(theme) {
        localStorage.setItem('premium-theme', theme);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    destroy() {
        clearTimeout(this.themeTransition);
    }
}

/**
 * Navigation Manager Module
 */
class NavigationManager {
    constructor() {
        this.navbar = null;
        this.mobileMenu = null;
        this.isMenuOpen = false;
        this.lastScrollY = 0;
        this.scrollThreshold = 100;
    }

    async init() {
        this.setupNavbar();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupActiveNavigation();
        this.setupKeyboardNavigation();
        
        console.log('🧭 Navigation manager initialized');
    }

    setupNavbar() {
        this.navbar = document.querySelector('.navbar');
        if (this.navbar) {
            this.lastScrollY = window.scrollY;
        }
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.navbar-toggler');
        const menu = document.querySelector('.navbar-nav');
        
        if (toggle && menu) {
            this.mobileMenu = menu;
            
            toggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isMenuOpen) {
                    this.closeMobileMenu();
                }
            });
            
            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (this.isMenuOpen && !this.navbar.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isMenuOpen = true;
        
        document.dispatchEvent(new CustomEvent('nav:menu-opened'));
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        this.isMenuOpen = false;
        
        document.dispatchEvent(new CustomEvent('nav:menu-closed'));
    }

    setupScrollEffects() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class
            if (currentScrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > this.lastScrollY && currentScrollY > this.scrollThreshold) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            this.lastScrollY = currentScrollY;
        });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }

    setupKeyboardNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowDown':
                    case 'ArrowRight':
                        e.preventDefault();
                        const nextLink = navLinks[index + 1] || navLinks[0];
                        nextLink.focus();
                        break;
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        e.preventDefault();
                        const prevLink = navLinks[index - 1] || navLinks[navLinks.length - 1];
                        prevLink.focus();
                        break;
                }
            });
        });
    }

    destroy() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }
}

/**
 * Scroll Effects Manager Module
 */
class ScrollEffectsManager {
    constructor() {
        this.scrollProgress = null;
        this.scrollDirection = 'down';
        this.lastScrollY = 0;
        this ticking = false;
    }

    async init() {
        this.createScrollProgressBar();
        this.setupScrollListener();
        this.setupSmoothScroll();
        
        console.log('📜 Scroll effects manager initialized');
    }

    createScrollProgressBar() {
        this.scrollProgress = document.createElement('div');
        this.scrollProgress.className = 'scroll-progress';
        document.body.appendChild(this.scrollProgress);
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollProgress();
                    this.updateScrollDirection();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (this.scrollProgress) {
            this.scrollProgress.style.width = `${scrollPercent}%`;
        }
    }

    updateScrollDirection() {
        const currentScrollY = window.scrollY;
        this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        this.lastScrollY = currentScrollY;
        
        document.body.setAttribute('data-scroll-direction', this.scrollDirection);
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.scrollToElement(target);
                }
            });
        });
    }

    scrollToElement(element, offset = 0) {
        const targetY = element.offsetTop - offset;
        
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
    }

    getScrollDirection() {
        return this.scrollDirection;
    }

    getScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        return (scrollTop / docHeight) * 100;
    }

    destroy() {
        if (this.scrollProgress) {
            this.scrollProgress.remove();
        }
    }
}

/**
 * Animation Manager Module
 */
class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.observers = [];
        this.isReducedMotion = false;
    }

    async init() {
        this.checkReducedMotion();
        this.setupIntersectionObservers();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupLoadAnimations();
        
        console.log('🎬 Animation manager initialized');
    }

    checkReducedMotion() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    setupIntersectionObservers() {
        // Fade in animation observer
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isReducedMotion) {
                    this.animateElement(entry.target, 'fadeInUp');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements with animation classes
        document.querySelectorAll('.animate-fade-in, .animate-scale-in, .animate-slide-in').forEach(el => {
            fadeInObserver.observe(el);
        });
        
        this.observers.push(fadeInObserver);
    }

    setupScrollAnimations() {
        const scrollElements = document.querySelectorAll('[data-scroll-animation]');
        
        scrollElements.forEach(element => {
            const animation = element.dataset.scrollAnimation;
            const delay = element.dataset.delay || 0;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.isReducedMotion) {
                        setTimeout(() => {
                            this.animateElement(entry.target, animation);
                        }, delay);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            observer.observe(element);
            this.observers.push(observer);
        });
    }

    setupHoverAnimations() {
        const hoverElements = document.querySelectorAll('[data-hover-animation]');
        
        hoverElements.forEach(element => {
            const animation = element.dataset.hoverAnimation;
            
            element.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    this.animateElement(element, animation);
                }
            });
        });
    }

    setupLoadAnimations() {
        window.addEventListener('load', () => {
            const loadElements = document.querySelectorAll('[data-load-animation]');
            
            loadElements.forEach((element, index) => {
                const animation = element.dataset.loadAnimation;
                const delay = element.dataset.delay || (index * 100);
                
                setTimeout(() => {
                    if (!this.isReducedMotion) {
                        this.animateElement(element, animation);
                    }
                }, delay);
            });
        });
    }

    animateElement(element, animation) {
        // Remove existing animation classes
        element.classList.remove('animate-fade-in', 'animate-fade-in-up', 'animate-fade-in-down', 
                              'animate-fade-in-left', 'animate-fade-in-right', 'animate-scale-in',
                              'animate-slide-in-up', 'animate-slide-in-down', 'animate-bounce',
                              'animate-pulse', 'animate-spin');
        
        // Add new animation class
        element.classList.add(`animate-${animation}`);
        
        // Store animation reference
        this.animations.set(element, animation);
        
        // Emit animation event
        document.dispatchEvent(new CustomEvent('animation:started', {
            detail: { element, animation }
        }));
        
        // Handle animation end
        const handleAnimationEnd = () => {
            document.dispatchEvent(new CustomEvent('animation:completed', {
                detail: { element, animation }
            }));
            element.removeEventListener('animationend', handleAnimationEnd);
        };
        
        element.addEventListener('animationend', handleAnimationEnd);
    }

    createCustomAnimation(name, keyframes) {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes ${name} {
                ${keyframes}
            }
        `;
        document.head.appendChild(styleSheet);
    }

    pauseAnimation(element) {
        element.style.animationPlayState = 'paused';
    }

    resumeAnimation(element) {
        element.style.animationPlayState = 'running';
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.animations.clear();
    }
}

/**
 * Parallax Manager Module
 */
class ParallaxManager {
    constructor() {
        this.elements = [];
        this.isScrolling = false;
        this.ticking = false;
    }

    async init() {
        this.setupParallaxElements();
        this.setupScrollListener();
        
        console.log('🌌 Parallax manager initialized');
    }

    setupParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const direction = element.dataset.parallaxDirection || 'vertical';
            
            this.elements.push({
                element,
                speed,
                direction,
                initialY: element.offsetTop,
                initialX: element.offsetLeft
            });
        });
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    updateParallax() {
        const scrollTop = window.scrollY;
        
        this.elements.forEach(({ element, speed, direction, initialY, initialX }) => {
            const yPos = direction === 'vertical' ? -(scrollTop * speed) : 0;
            const xPos = direction === 'horizontal' ? -(scrollTop * speed) : 0;
            
            element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        });
    }

    addElement(element, speed = 0.5, direction = 'vertical') {
        this.elements.push({
            element,
            speed,
            direction,
            initialY: element.offsetTop,
            initialX: element.offsetLeft
        });
    }

    removeElement(element) {
        this.elements = this.elements.filter(item => item.element !== element);
    }

    destroy() {
        this.elements.forEach(({ element }) => {
            element.style.transform = '';
        });
        this.elements = [];
    }
}

/**
 * Magnetic Effects Manager Module
 */
class MagneticEffectsManager {
    constructor() {
        this.elements = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.isActive = true;
    }

    async init() {
        this.setupMagneticElements();
        this.setupMouseTracking();
        
        console.log('🧲 Magnetic effects manager initialized');
    }

    setupMagneticElements() {
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        
        magneticElements.forEach(element => {
            const strength = parseFloat(element.dataset.magnetic) || 0.3;
            const radius = parseFloat(element.dataset.magneticRadius) || 100;
            
            this.elements.push({
                element,
                strength,
                radius,
                rect: null
            });
        });
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            if (this.isActive) {
                this.updateMagneticEffects();
            }
        });
        
        document.addEventListener('mouseleave', () => {
            this.resetMagneticEffects();
        });
    }

    updateMagneticEffects() {
        this.elements.forEach(({ element, strength, radius }) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(this.mouseX - centerX, 2) + 
                Math.pow(this.mouseY - centerY, 2)
            );
            
            if (distance < radius) {
                const force = (1 - distance / radius) * strength;
                const deltaX = (this.mouseX - centerX) * force;
                const deltaY = (this.mouseY - centerY) * force;
                
                element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${1 + force * 0.1})`;
            }
        });
    }

    resetMagneticEffects() {
        this.elements.forEach(({ element }) => {
            element.style.transform = 'translate3d(0, 0, 0) scale(1)';
        });
    }

    addElement(element, strength = 0.3, radius = 100) {
        this.elements.push({
            element,
            strength,
            radius,
            rect: null
        });
    }

    removeElement(element) {
        this.elements = this.elements.filter(item => item.element !== element);
    }

    setActive(active) {
        this.isActive = active;
        if (!active) {
            this.resetMagneticEffects();
        }
    }

    destroy() {
        this.resetMagneticEffects();
        this.elements = [];
    }
}

/**
 * Cursor Effects Manager Module
 */
class CursorEffectsManager {
    constructor() {
        this.cursor = null;
        this.follower = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.followerX = 0;
        this.followerY = 0;
        this.isActive = true;
        this.isPointer = false;
    }

    async init() {
        this.createCursor();
        this.setupMouseTracking();
        this.setupHoverEffects();
        
        console.log('👆 Cursor effects manager initialized');
    }

    createCursor() {
        // Create main cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'premium-cursor';
        document.body.appendChild(this.cursor);
        
        // Create follower
        this.follower = document.createElement('div');
        this.follower.className = 'premium-cursor-follower';
        document.body.appendChild(this.follower);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .premium-cursor {
                position: fixed;
                width: 8px;
                height: 8px;
                background: var(--accent-gold);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                transition: transform 0.1s ease;
                mix-blend-mode: difference;
            }
            
            .premium-cursor-follower {
                position: fixed;
                width: 30px;
                height: 30px;
                border: 2px solid rgba(251, 191, 36, 0.5);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.3s ease;
                mix-blend-mode: difference;
            }
            
            .premium-cursor.active {
                transform: scale(2);
                background: rgba(251, 191, 36, 0.8);
            }
            
            .premium-cursor-follower.active {
                transform: scale(1.5);
                border-color: rgba(251, 191, 36, 0.8);
            }
            
            .premium-cursor.pointer {
                transform: scale(0.5);
            }
            
            .premium-cursor-follower.pointer {
                transform: scale(0.8);
            }
            
            @media (max-width: 768px) {
                .premium-cursor,
                .premium-cursor-follower {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        document.addEventListener('mousedown', () => {
            if (this.cursor) this.cursor.classList.add('active');
            if (this.follower) this.follower.classList.add('active');
        });
        
        document.addEventListener('mouseup', () => {
            if (this.cursor) this.cursor.classList.remove('active');
            if (this.follower) this.follower.classList.remove('active');
        });
        
        this.animateCursor();
    }

    setupHoverEffects() {
        const interactiveElements = document.querySelectorAll('a, button, .btn, .glass-card, input, textarea, select');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.isPointer = true;
                if (this.cursor) this.cursor.classList.add('pointer');
                if (this.follower) this.follower.classList.add('pointer');
            });
            
            element.addEventListener('mouseleave', () => {
                this.isPointer = false;
                if (this.cursor) this.cursor.classList.remove('pointer');
                if (this.follower) this.follower.classList.remove('pointer');
            });
        });
    }

    animateCursor() {
        // Smooth cursor following
        this.cursorX += (this.mouseX - this.cursorX) * 0.5;
        this.cursorY += (this.mouseY - this.cursorY) * 0.5;
        
        this.followerX += (this.mouseX - this.followerX) * 0.1;
        this.followerY += (this.mouseY - this.followerY) * 0.1;
        
        if (this.cursor) {
            this.cursor.style.left = `${this.cursorX - 4}px`;
            this.cursor.style.top = `${this.cursorY - 4}px`;
        }
        
        if (this.follower) {
            this.follower.style.left = `${this.followerX - 15}px`;
            this.follower.style.top = `${this.followerY - 15}px`;
        }
        
        requestAnimationFrame(() => this.animateCursor());
    }

    setActive(active) {
        this.isActive = active;
        if (!active) {
            if (this.cursor) this.cursor.style.display = 'none';
            if (this.follower) this.follower.style.display = 'none';
        } else {
            if (this.cursor) this.cursor.style.display = 'block';
            if (this.follower) this.follower.style.display = 'block';
        }
    }

    destroy() {
        if (this.cursor) this.cursor.remove();
        if (this.follower) this.follower.remove();
    }
}

/**
 * Smooth Scroll Manager Module
 */
class SmoothScrollManager {
    constructor() {
        this.isScrolling = false;
        this.scrollDuration = 800;
        this.easing = 'easeInOutCubic';
    }

    async init() {
        this.setupSmoothScrollLinks();
        this.setupScrollToTop();
        
        console.log('📍 Smooth scroll manager initialized');
    }

    setupSmoothScrollLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.scrollToElement(target);
                }
            });
        });
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                this.scrollToTop();
            });
            
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
            });
        }
    }

    scrollToElement(element, offset = 0, duration = this.scrollDuration) {
        if (this.isScrolling) return;
        
        const startY = window.scrollY;
        const targetY = element.offsetTop - offset;
        const distance = targetY - startY;
        
        this.isScrolling = true;
        
        const startTime = performance.now();
        
        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeProgress = this.easeInOutCubic(progress);
            const currentY = startY + (distance * easeProgress);
            
            window.scrollTo(0, currentY);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                this.isScrolling = false;
                document.dispatchEvent(new CustomEvent('scroll:completed', {
                    detail: { target, offset }
                }));
            }
        };
        
        requestAnimationFrame(animateScroll);
    }

    scrollToTop(duration = this.scrollDuration) {
        if (this.isScrolling) return;
        
        const startY = window.scrollY;
        const distance = -startY;
        
        this.isScrolling = true;
        
        const startTime = performance.now();
        
        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeProgress = this.easeInOutCubic(progress);
            const currentY = startY + (distance * easeProgress);
            
            window.scrollTo(0, currentY);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                this.isScrolling = false;
            }
        };
        
        requestAnimationFrame(animateScroll);
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    setDuration(duration) {
        this.scrollDuration = duration;
    }

    destroy() {
        this.isScrolling = false;
    }
}

/**
 * Particle System Manager Module
 */
class ParticleSystemManager {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.config = {
            particleCount: 80,
            particleSize: 2,
            particleSpeed: 0.5,
            connectionDistance: 100,
            mouseRadius: 150,
            colors: ['251, 191, 36', '139, 92, 246', '59, 130, 246']
        };
        this.mouseX = 0;
        this.mouseY = 0;
        this.isActive = true;
    }

    async init() {
        this.setupCanvas();
        this.createParticles();
        this.setupMouseTracking();
        this.animate();
        
        console.log('✨ Particle system manager initialized');
    }

    setupCanvas() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'particles-canvas';
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.zIndex = '1';
            document.body.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.particleSpeed,
                vy: (Math.random() - 0.5) * this.config.particleSpeed,
                size: Math.random() * this.config.particleSize + 1,
                color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    animate() {
        if (!this.isActive) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.config.mouseRadius) {
                const force = (1 - distance / this.config.mouseRadius) * 0.1;
                particle.vx -= (dx / distance) * force;
                particle.vy -= (dy / distance) * force;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = `rgba(${particle.color}, ${particle.opacity})`;
        });
        
        // Draw connections
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const distance = Math.sqrt(
                    Math.pow(p1.x - p2.x, 2) + 
                    Math.pow(p1.y - p2.y, 2)
                );
                
                if (distance < this.config.connectionDistance) {
                    const opacity = (1 - distance / this.config.connectionDistance) * 0.3;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        if (newConfig.particleCount !== undefined) {
            this.createParticles();
        }
    }

    setActive(active) {
        this.isActive = active;
        if (active && !this.animationId) {
            this.animate();
        } else if (!active && this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    destroy() {
        this.setActive(false);
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

/**
 * Glow Effects Manager Module
 */
class GlowEffectsManager {
    constructor() {
        this.elements = [];
        this.mouseX = 0;
        this.mouseY = 0;
    }

    async init() {
        this.setupGlowElements();
        this.setupMouseTracking();
        
        console.log('💫 Glow effects manager initialized');
    }

    setupGlowElements() {
        const glowElements = document.querySelectorAll('[data-glow]');
        
        glowElements.forEach(element => {
            const intensity = parseFloat(element.dataset.glow) || 0.5;
            const color = element.dataset.glowColor || '251, 191, 36';
            
            this.elements.push({
                element,
                intensity,
                color,
                originalStyle: {
                    boxShadow: element.style.boxShadow
                }
            });
        });
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateGlowEffects();
        });
    }

    updateGlowEffects() {
        this.elements.forEach(({ element, intensity, color }) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(this.mouseX - centerX, 2) + 
                Math.pow(this.mouseY - centerY, 2)
            );
            
            const maxDistance = 300;
            if (distance < maxDistance) {
                const glowIntensity = (1 - distance / maxDistance) * intensity;
                const glowSize = 20 + glowIntensity * 30;
                
                element.style.boxShadow = `
                    0 0 ${glowSize}px rgba(${color}, ${glowIntensity}),
                    0 0 ${glowSize * 2}px rgba(${color}, ${glowIntensity * 0.5}),
                    0 0 ${glowSize * 3}px rgba(${color}, ${glowIntensity * 0.3})
                `;
            } else {
                element.style.boxShadow = '';
            }
        });
    }

    addElement(element, intensity = 0.5, color = '251, 191, 36') {
        this.elements.push({
            element,
            intensity,
            color,
            originalStyle: {
                boxShadow: element.style.boxShadow
            }
        });
    }

    removeElement(element) {
        this.elements = this.elements.filter(item => item.element !== element);
    }

    destroy() {
        this.elements.forEach(({ element, originalStyle }) => {
            element.style.boxShadow = originalStyle.boxShadow;
        });
        this.elements = [];
    }
}

/**
 * Intersection Observer Manager Module
 */
class IntersectionObserverManager {
    constructor() {
        this.observers = [];
        this.observedElements = new Map();
    }

    async init() {
        this.setupDefaultObservers();
        
        console.log('👁️ Intersection observer manager initialized');
    }

    setupDefaultObservers() {
        // Lazy loading observer
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Load images
                    if (element.dataset.src) {
                        element.src = element.dataset.src;
                        element.removeAttribute('data-src');
                    }
                    
                    // Load backgrounds
                    if (element.dataset.bg) {
                        element.style.backgroundImage = `url(${element.dataset.bg})`;
                        element.removeAttribute('data-bg');
                    }
                    
                    // Trigger load animation
                    element.classList.add('loaded');
                    
                    lazyLoadObserver.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        // Observe elements with data attributes
        document.querySelectorAll('[data-src], [data-bg]').forEach(el => {
            lazyLoadObserver.observe(el);
        });
        
        this.observers.push(lazyLoadObserver);
        
        // Animation trigger observer
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.intersectionAnimation;
                    
                    if (animation) {
                        element.classList.add(animation);
                        element.classList.add('animate');
                    }
                }
            });
        }, {
            threshold: 0.1
        });
        
        document.querySelectorAll('[data-intersection-animation]').forEach(el => {
            animationObserver.observe(el);
        });
        
        this.observers.push(animationObserver);
    }

    createObserver(options, callback) {
        const observer = new IntersectionObserver(callback, options);
        this.observers.push(observer);
        return observer;
    }

    observeElement(element, observer, callback) {
        if (!this.observedElements.has(element)) {
            this.observedElements.set(element, new Set());
        }
        
        if (observer && callback) {
            const customObserver = new IntersectionObserver(callback, observer);
            customObserver.observe(element);
            this.observedElements.get(element).add(customObserver);
        }
    }

    unobserveElement(element, observer = null) {
        if (this.observedElements.has(element)) {
            const observers = this.observedElements.get(element);
            
            if (observer) {
                observers.forEach(obs => {
                    if (obs === observer) {
                        obs.unobserve(element);
                        observers.delete(obs);
                    }
                });
            } else {
                observers.forEach(obs => obs.unobserve(element));
                observers.clear();
            }
            
            if (observers.size === 0) {
                this.observedElements.delete(element);
            }
        }
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observedElements.forEach(observers => {
            observers.forEach(observer => observer.disconnect());
        });
        this.observers = [];
        this.observedElements.clear();
    }
}

/**
 * Lazy Load Manager Module
 */
class LazyLoadManager {
    constructor() {
        this.observer = null;
        this.loadedElements = new Set();
    }

    async init() {
        this.setupLazyLoading();
        
        console.log('⏳ Lazy load manager initialized');
    }

    setupLazyLoading() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.loadedElements.has(entry.target)) {
                    this.loadElement(entry.target);
                    this.loadedElements.add(entry.target);
                }
            });
        }, {
            rootMargin: '100px 0px'
        });
        
        // Observe elements with lazy loading attributes
        document.querySelectorAll('[data-lazy]').forEach(el => {
            this.observer.observe(el);
        });
    }

    loadElement(element) {
        // Load images
        if (element.dataset.lazySrc) {
            const img = new Image();
            img.onload = () => {
                element.src = element.dataset.lazySrc;
                element.classList.add('loaded');
                this.emitLazyLoadEvent(element, 'image');
            };
            img.src = element.dataset.lazySrc;
        }
        
        // Load backgrounds
        if (element.dataset.lazyBg) {
            const img = new Image();
            img.onload = () => {
                element.style.backgroundImage = `url(${element.dataset.lazyBg})`;
                element.classList.add('loaded');
                this.emitLazyLoadEvent(element, 'background');
            };
            img.src = element.dataset.lazyBg;
        }
        
        // Load content
        if (element.dataset.lazyContent) {
            fetch(element.dataset.lazyContent)
                .then(response => response.text())
                .then(html => {
                    element.innerHTML = html;
                    element.classList.add('loaded');
                    this.emitLazyLoadEvent(element, 'content');
                })
                .catch(error => {
                    console.error('Failed to load lazy content:', error);
                });
        }
    }

    emitLazyLoadEvent(element, type) {
        document.dispatchEvent(new CustomEvent('lazy:loaded', {
            detail: { element, type }
        }));
    }

    addElement(element) {
        if (this.observer) {
            this.observer.observe(element);
        }
    }

    removeElement(element) {
        if (this.observer) {
            this.observer.unobserve(element);
        }
        this.loadedElements.delete(element);
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.loadedElements.clear();
    }
}

/**
 * Analytics Manager Module
 */
class AnalyticsManager {
    constructor() {
        this.events = [];
        this.config = {
            trackClicks: true,
            trackScrolls: true,
            trackHover: false,
            trackPerformance: true
        };
    }

    async init() {
        this.setupEventTracking();
        this.setupPerformanceTracking();
        
        console.log('📈 Analytics manager initialized');
    }

    setupEventTracking() {
        if (this.config.trackClicks) {
            document.addEventListener('click', (e) => {
                this.trackEvent('click', {
                    element: e.target.tagName,
                    className: e.target.className,
                    id: e.target.id,
                    text: e.target.textContent?.substring(0, 50)
                });
            });
        }
        
        if (this.config.trackScrolls) {
            let scrollDepth = 0;
            window.addEventListener('scroll', () => {
                const currentDepth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
                
                if (currentDepth > scrollDepth && currentDepth % 25 === 0) {
                    scrollDepth = currentDepth;
                    this.trackEvent('scroll', { depth: scrollDepth });
                }
            });
        }
        
        if (this.config.trackHover) {
            let hoverTimer;
            document.addEventListener('mouseover', (e) => {
                hoverTimer = setTimeout(() => {
                    this.trackEvent('hover', {
                        element: e.target.tagName,
                        className: e.target.className
                    });
                }, 1000);
            });
            
            document.addEventListener('mouseout', () => {
                clearTimeout(hoverTimer);
            });
        }
    }

    setupPerformanceTracking() {
        if (this.config.trackPerformance) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    this.trackEvent('performance', {
                        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
                        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime
                    });
                }, 0);
            });
        }
    }

    trackEvent(type, data) {
        const event = {
            type,
            data,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        this.events.push(event);
        
        // Keep only last 1000 events
        if (this.events.length > 1000) {
            this.events = this.events.slice(-1000);
        }
        
        // Emit event for external listeners
        document.dispatchEvent(new CustomEvent('analytics:event', {
            detail: event
        }));
    }

    getEvents(type = null) {
        if (type) {
            return this.events.filter(event => event.type === type);
        }
        return [...this.events];
    }

    clearEvents() {
        this.events = [];
    }

    exportEvents() {
        return JSON.stringify(this.events, null, 2);
    }

    destroy() {
        this.events = [];
    }
}

// Initialize Premium UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if premium UI is already initialized
    if (!window.premiumUI) {
        window.premiumUI = new PremiumUI();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PremiumUI;
}

// Global access
if (typeof window !== 'undefined') {
    window.PremiumUI = PremiumUI;
}
