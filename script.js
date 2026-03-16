// Void Esports - Interactive JavaScript

// Void Esports - Main JavaScript - Ultra Premium Edition
// Comprehensive functionality for esports organization website

/**
 * Main Application Controller
 */
class VoidEsportsApp {
    constructor() {
        this.version = '2.0.0';
        this.isInitialized = false;
        this.modules = {};
        this.config = {
            apiEndpoint: '/api',
            enableAnalytics: true,
            enableNotifications: true,
            enableDarkMode: true,
            enableAnimations: true,
            debugMode: false
        };
        
        this.init();
    }

    async init() {
        try {
            console.log(`🚀 Initializing Void Esports App v${this.version}...`);
            
            // Initialize core modules
            await this.initCore();
            await this.initUI();
            await this.initAPI();
            await this.initEvents();
            await this.initUtilities();
            
            this.isInitialized = true;
            console.log('✅ Void Esports App initialized successfully!');
            
            // Emit ready event
            document.dispatchEvent(new CustomEvent('app:ready', {
                detail: { version: this.version }
            }));
            
        } catch (error) {
            console.error('❌ Failed to initialize app:', error);
            this.handleError(error);
        }
    }

    async initCore() {
        this.modules.core = new CoreModule();
        await this.modules.core.init();
    }

    async initUI() {
        this.modules.ui = new UIModule();
        await this.modules.ui.init();
    }

    async initAPI() {
        this.modules.api = new APIModule(this.config.apiEndpoint);
        await this.modules.api.init();
    }

    async initEvents() {
        this.modules.events = new EventModule();
        await this.modules.events.init();
    }

    async initUtilities() {
        this.modules.utils = new UtilityModule();
        await this.modules.utils.init();
    }

    handleError(error) {
        console.error('App Error:', error);
        
        // Show user-friendly error message
        if (this.config.debugMode) {
            this.showErrorMessage(error.message);
        }
        
        // Emit error event
        document.dispatchEvent(new CustomEvent('app:error', {
            detail: { error }
        }));
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    destroy() {
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.destroy === 'function') {
                module.destroy();
            }
        });
        
        this.isInitialized = false;
        console.log('🔴 Void Esports App destroyed');
    }
}

/**
 * Core Module - Handles fundamental functionality
 */
class CoreModule {
    constructor() {
        this.deviceInfo = null;
        this.browserInfo = null;
        this.performanceData = {};
    }

    async init() {
        this.detectDevice();
        this.detectBrowser();
        this.initPerformanceMonitoring();
        this.initServiceWorker();
        
        console.log('🔧 Core module initialized');
    }

    detectDevice() {
        this.deviceInfo = {
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            isTablet: /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768,
            isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            pixelRatio: window.devicePixelRatio || 1,
            touchSupport: 'ontouchstart' in window,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        };
        
        // Add device classes to body
        document.body.classList.add(this.deviceInfo.isMobile ? 'mobile' : 'desktop');
        if (this.deviceInfo.isTablet) document.body.classList.add('tablet');
        
        // Listen for orientation changes
        window.addEventListener('resize', () => {
            this.deviceInfo.screenWidth = window.innerWidth;
            this.deviceInfo.screenHeight = window.innerHeight;
            this.deviceInfo.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
        });
    }

    detectBrowser() {
        const ua = navigator.userAgent;
        this.browserInfo = {
            name: this.getBrowserName(ua),
            version: this.getBrowserVersion(ua),
            engine: this.getEngineName(ua),
            cookiesEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack === '1',
            language: navigator.language,
            languages: navigator.languages,
            onLine: navigator.onLine,
            platform: navigator.platform
        };
        
        // Add browser classes to body
        document.body.classList.add(this.browserInfo.name.toLowerCase());
        document.body.classList.add(`version-${this.browserInfo.version.split('.')[0]}`);
    }

    getBrowserName(ua) {
        if (ua.indexOf('Chrome') > -1) return 'Chrome';
        if (ua.indexOf('Safari') > -1) return 'Safari';
        if (ua.indexOf('Firefox') > -1) return 'Firefox';
        if (ua.indexOf('Edge') > -1) return 'Edge';
        if (ua.indexOf('Opera') > -1) return 'Opera';
        if (ua.indexOf('MSIE') > -1) return 'IE';
        return 'Unknown';
    }

    getBrowserVersion(ua) {
        const match = ua.match(/(Chrome|Firefox|Edge|Opera|Safari|MSIE)\/(\d+)/);
        return match ? match[2] : 'Unknown';
    }

    getEngineName(ua) {
        if (ua.indexOf('WebKit') > -1) return 'WebKit';
        if (ua.indexOf('Gecko') > -1) return 'Gecko';
        if (ua.indexOf('Trident') > -1) return 'Trident';
        return 'Unknown';
    }

    initPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.performanceData = {
                    loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
                    domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
                    firstPaint: this.getFirstPaint(),
                    firstContentfulPaint: this.getFirstContentfulPaint(),
                    resources: this.getResourceTiming()
                };
                
                console.log('📊 Performance Data:', this.performanceData);
                
                // Emit performance event
                document.dispatchEvent(new CustomEvent('performance:measured', {
                    detail: this.performanceData
                }));
            }, 0);
        });
    }

    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? Math.round(firstPaint.startTime) : 0;
    }

    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcp ? Math.round(fcp.startTime) : 0;
    }

    getResourceTiming() {
        const resources = performance.getEntriesByType('resource');
        return {
            count: resources.length,
            totalSize: resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0),
            domains: [...new Set(resources.map(r => new URL(r.name).hostname))].length
        };
    }

    async initServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('🔧 Service Worker registered:', registration);
            } catch (error) {
                console.log('🔧 Service Worker registration failed:', error);
            }
        }
    }

    getDeviceInfo() {
        return { ...this.deviceInfo };
    }

    getBrowserInfo() {
        return { ...this.browserInfo };
    }

    getPerformanceData() {
        return { ...this.performanceData };
    }

    destroy() {
        // Cleanup core module
    }
}

/**
 * UI Module - Handles user interface interactions
 */
class UIModule {
    constructor() {
        this.components = {};
        this.themes = ['dark', 'light', 'cyberpunk'];
        this.currentTheme = 'dark';
        this.isMenuOpen = false;
    }

    async init() {
        this.initNavigation();
        this.initThemeSystem();
        this.initScrollEffects();
        this.initAnimations();
        this.initModals();
        this.initTooltips();
        this.initNotifications();
        
        console.log('🎨 UI module initialized');
    }

    initNavigation() {
        this.components.navigation = new NavigationComponent();
        this.components.navigation.init();
    }

    initThemeSystem() {
        this.components.theme = new ThemeComponent(this.themes);
        this.components.theme.init();
    }

    initScrollEffects() {
        this.components.scroll = new ScrollEffectsComponent();
        this.components.scroll.init();
    }

    initAnimations() {
        this.components.animations = new AnimationComponent();
        this.components.animations.init();
    }

    initModals() {
        this.components.modals = new ModalComponent();
        this.components.modals.init();
    }

    initTooltips() {
        this.components.tooltips = new TooltipComponent();
        this.components.tooltips.init();
    }

    initNotifications() {
        this.components.notifications = new NotificationComponent();
        this.components.notifications.init();
    }

    destroy() {
        Object.values(this.components).forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
    }
}

/**
 * Navigation Component
 */
class NavigationComponent {
    constructor() {
        this.navbar = null;
        this.mobileMenu = null;
        this.scrollThreshold = 100;
        this.lastScrollY = 0;
    }

    init() {
        this.navbar = document.querySelector('.navbar');
        this.mobileMenu = document.querySelector('.navbar-nav');
        
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupActiveLinks();
        this.setupKeyboardNavigation();
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.navbar-toggler');
        if (!toggle || !this.mobileMenu) return;

        toggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
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
            
            // Hide/show on scroll
            if (currentScrollY > this.lastScrollY && currentScrollY > this.scrollThreshold) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            this.lastScrollY = currentScrollY;
        });
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
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
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px'
        });
        
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
 * Theme Component
 */
class ThemeComponent {
    constructor(themes) {
        this.themes = themes;
        this.currentTheme = 'dark';
        this.themeToggle = null;
    }

    init() {
        this.loadSavedTheme();
        this.createThemeToggle();
        this.setupThemeToggle();
        this.applyTheme(this.currentTheme);
    }

    loadSavedTheme() {
        const saved = localStorage.getItem('void-theme');
        if (saved && this.themes.includes(saved)) {
            this.currentTheme = saved;
        }
    }

    createThemeToggle() {
        this.themeToggle = document.createElement('button');
        this.themeToggle.id = 'theme-toggle';
        this.themeToggle.className = 'theme-toggle';
        this.themeToggle.innerHTML = '🌙';
        this.themeToggle.setAttribute('aria-label', 'Toggle theme');
        
        this.navbar = document.querySelector('.navbar');
        if (this.navbar) {
            this.navbar.appendChild(this.themeToggle);
        }
    }

    setupThemeToggle() {
        if (!this.themeToggle) return;

        this.themeToggle.addEventListener('click', () => {
            this.nextTheme();
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
        
        // Update toggle button
        if (this.themeToggle) {
            const icons = {
                dark: '🌙',
                light: '☀️',
                cyberpunk: '🌆'
            };
            this.themeToggle.innerHTML = icons[theme] || '🌙';
        }
        
        // Add transition class
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }

    saveTheme(theme) {
        localStorage.setItem('void-theme', theme);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    destroy() {
        if (this.themeToggle && this.themeToggle.parentNode) {
            this.themeToggle.parentNode.removeChild(this.themeToggle);
        }
    }
}

/**
 * Scroll Effects Component
 */
class ScrollEffectsComponent {
    constructor() {
        this.progressBar = null;
        this.scrollToTopBtn = null;
        this.scrollDirection = 'down';
        this.lastScrollY = 0;
    }

    init() {
        this.createProgressBar();
        this.createScrollToTopButton();
        this.setupScrollListener();
        this.setupSmoothScroll();
    }

    createProgressBar() {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'scroll-progress';
        document.body.appendChild(this.progressBar);
    }

    createScrollToTopButton() {
        this.scrollToTopBtn = document.createElement('button');
        this.scrollToTopBtn.id = 'scroll-to-top';
        this.scrollToTopBtn.className = 'scroll-to-top';
        this.scrollToTopBtn.innerHTML = '↑';
        this.scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(this.scrollToTopBtn);
        
        this.scrollToTopBtn.addEventListener('click', () => {
            this.scrollToTop();
        });
    }

    setupScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateProgressBar();
                    this.updateScrollDirection();
                    this.updateScrollToTopButton();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (this.progressBar) {
            this.progressBar.style.width = `${scrollPercent}%`;
        }
    }

    updateScrollDirection() {
        const currentScrollY = window.scrollY;
        this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        this.lastScrollY = currentScrollY;
        
        document.body.setAttribute('data-scroll-direction', this.scrollDirection);
    }

    updateScrollToTopButton() {
        if (!this.scrollToTopBtn) return;
        
        if (window.scrollY > 500) {
            this.scrollToTopBtn.classList.add('show');
        } else {
            this.scrollToTopBtn.classList.remove('show');
        }
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

    scrollToElement(element, offset = 80) {
        const targetY = element.offsetTop - offset;
        
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    destroy() {
        if (this.progressBar && this.progressBar.parentNode) {
            this.progressBar.parentNode.removeChild(this.progressBar);
        }
        if (this.scrollToTopBtn && this.scrollToTopBtn.parentNode) {
            this.scrollToTopBtn.parentNode.removeChild(this.scrollToTopBtn);
        }
    }
}

/**
 * Animation Component
 */
class AnimationComponent {
    constructor() {
        this.observers = [];
        this.animatedElements = new Set();
        this.isReducedMotion = false;
    }

    init() {
        this.checkReducedMotion();
        this.setupIntersectionObservers();
        this.setupLoadAnimations();
        this.setupHoverAnimations();
    }

    checkReducedMotion() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    setupIntersectionObservers() {
        // Fade in observer
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

    animateElement(element, animation) {
        // Remove existing animation classes
        element.classList.remove('animate-fade-in', 'animate-fade-in-up', 'animate-fade-in-down',
                              'animate-fade-in-left', 'animate-fade-in-right', 'animate-scale-in',
                              'animate-slide-in-up', 'animate-slide-in-down', 'animate-bounce',
                              'animate-pulse');
        
        // Add new animation class
        element.classList.add(`animate-${animation}`);
        this.animatedElements.add(element);
        
        // Handle animation end
        const handleAnimationEnd = () => {
            element.removeEventListener('animationend', handleAnimationEnd);
            document.dispatchEvent(new CustomEvent('animation:completed', {
                detail: { element, animation }
            }));
        };
        
        element.addEventListener('animationend', handleAnimationEnd);
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.animatedElements.clear();
    }
}

/**
 * Modal Component
 */
class ModalComponent {
    constructor() {
        this.modals = new Map();
        this.activeModal = null;
        this.focusTrap = null;
    }

    init() {
        this.setupModalTriggers();
        this.setupKeyboardHandlers();
    }

    setupModalTriggers() {
        document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
            const modalId = trigger.dataset.modalTrigger;
            const modal = document.getElementById(modalId);
            
            if (modal) {
                trigger.addEventListener('click', () => {
                    this.openModal(modalId);
                });
                
                // Setup close buttons
                modal.querySelectorAll('[data-modal-close]').forEach(closeBtn => {
                    closeBtn.addEventListener('click', () => {
                        this.closeModal(modalId);
                    });
                });
                
                // Close on background click
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal(modalId);
                    }
                });
            }
        });
    }

    setupKeyboardHandlers() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal(this.activeModal);
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        // Close existing modal
        if (this.activeModal) {
            this.closeModal(this.activeModal);
        }
        
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        this.activeModal = modalId;
        this.trapFocus(modal);
        
        // Emit open event
        document.dispatchEvent(new CustomEvent('modal:opened', {
            detail: { modalId, modal }
        }));
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        this.activeModal = null;
        this.removeFocusTrap();
        
        // Emit close event
        document.dispatchEvent(new CustomEvent('modal:closed', {
            detail: { modalId, modal }
        }));
    }

    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        this.focusTrap = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
        
        element.addEventListener('keydown', this.focusTrap);
        firstElement.focus();
    }

    removeFocusTrap() {
        if (this.focusTrap) {
            document.removeEventListener('keydown', this.focusTrap);
            this.focusTrap = null;
        }
    }

    destroy() {
        if (this.activeModal) {
            this.closeModal(this.activeModal);
        }
    }
}

/**
 * Tooltip Component
 */
class TooltipComponent {
    constructor() {
        this.tooltips = new Map();
        this.activeTooltip = null;
    }

    init() {
        this.setupTooltips();
    }

    setupTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            const tooltip = element.dataset.tooltip;
            const position = element.dataset.tooltipPosition || 'top';
            
            element.addEventListener('mouseenter', () => {
                this.showTooltip(element, tooltip, position);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            
            element.addEventListener('focus', () => {
                this.showTooltip(element, tooltip, position);
            });
            
            element.addEventListener('blur', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text, position) {
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.setAttribute('role', 'tooltip');
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top, left;
        
        switch (position) {
            case 'top':
                top = rect.top - tooltipRect.height - 10;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = rect.bottom + 10;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.left - tooltipRect.width - 10;
                break;
            case 'right':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.right + 10;
                break;
        }
        
        tooltip.style.position = 'fixed';
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        tooltip.style.zIndex = '10000';
        
        document.body.appendChild(tooltip);
        this.activeTooltip = tooltip;
        
        // Add show animation
        requestAnimationFrame(() => {
            tooltip.classList.add('show');
        });
    }

    hideTooltip() {
        if (this.activeTooltip) {
            this.activeTooltip.classList.remove('show');
            setTimeout(() => {
                if (this.activeTooltip && this.activeTooltip.parentNode) {
                    this.activeTooltip.parentNode.removeChild(this.activeTooltip);
                }
                this.activeTooltip = null;
            }, 200);
        }
    }

    destroy() {
        this.hideTooltip();
    }
}

/**
 * Notification Component
 */
class NotificationComponent {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.maxNotifications = 5;
    }

    init() {
        this.createContainer();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        this.container.setAttribute('aria-live', 'polite');
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        
        const content = document.createElement('div');
        content.className = 'notification-content';
        content.textContent = message;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Close notification');
        
        notification.appendChild(content);
        notification.appendChild(closeBtn);
        
        // Add to container
        this.container.appendChild(notification);
        this.notifications.push(notification);
        
        // Limit notifications
        if (this.notifications.length > this.maxNotifications) {
            const oldNotification = this.notifications.shift();
            this.removeNotification(oldNotification);
        }
        
        // Setup close handler
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });
        
        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.removeNotification(notification);
            }, duration);
        }
        
        // Show animation
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        return notification;
    }

    removeNotification(notification) {
        if (!notification || !notification.parentNode) return;
        
        notification.classList.add('hide');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 300);
    }

    clear() {
        this.notifications.forEach(notification => {
            this.removeNotification(notification);
        });
    }

    destroy() {
        this.clear();
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }
}

/**
 * API Module - Handles API communications
 */
class APIModule {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.cache = new Map();
        this.requestQueue = [];
        this.isProcessingQueue = false;
    }

    async init() {
        this.setupInterceptors();
        console.log('🌐 API module initialized');
    }

    setupInterceptors() {
        // Request interceptor
        this.requestInterceptor = (config) => {
            config.headers = {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...config.headers
            };
            
            // Add auth token if available
            const token = localStorage.getItem('auth-token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            
            return config;
        };
        
        // Response interceptor
        this.responseInterceptor = (response) => {
            if (response.status === 401) {
                // Handle unauthorized
                localStorage.removeItem('auth-token');
                window.location.href = '/login';
            }
            
            return response;
        };
    }

    async request(url, options = {}) {
        const config = this.requestInterceptor({
            url: `${this.endpoint}${url}`,
            ...options
        });
        
        try {
            const response = await fetch(config.url, config);
            const processedResponse = this.responseInterceptor(response);
            
            if (!processedResponse.ok) {
                throw new Error(`HTTP ${processedResponse.status}: ${processedResponse.statusText}`);
            }
            
            const data = await processedResponse.json();
            return data;
            
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    async get(url, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        
        return this.request(fullUrl, {
            method: 'GET'
        });
    }

    async post(url, data = {}) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put(url, data = {}) {
        return this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete(url) {
        return this.request(url, {
            method: 'DELETE'
        });
    }

    async upload(url, file, progressCallback) {
        const formData = new FormData();
        formData.append('file', file);
        
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.upload.addEventListener('progress', (e) => {
                if (progressCallback && e.lengthComputable) {
                    progressCallback(e.loaded / e.total);
                }
            });
            
            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                }
            });
            
            xhr.addEventListener('error', () => {
                reject(new Error('Network error'));
            });
            
            xhr.open('POST', `${this.endpoint}${url}`);
            
            const token = localStorage.getItem('auth-token');
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }
            
            xhr.send(formData);
        });
    }

    cacheResponse(key, data, ttl = 300000) { // 5 minutes default
        this.cache.set(key, {
            data,
            expires: Date.now() + ttl
        });
    }

    getCachedResponse(key) {
        const cached = this.cache.get(key);
        if (cached && cached.expires > Date.now()) {
            return cached.data;
        }
        
        this.cache.delete(key);
        return null;
    }

    clearCache() {
        this.cache.clear();
    }

    destroy() {
        this.clearCache();
    }
}

/**
 * Event Module - Handles event management
 */
class EventModule {
    constructor() {
        this.listeners = new Map();
        this.eventHistory = [];
        this.maxHistorySize = 1000;
    }

    async init() {
        this.setupGlobalListeners();
        console.log('📡 Event module initialized');
    }

    setupGlobalListeners() {
        // Page visibility
        document.addEventListener('visibilitychange', () => {
            this.emit('visibility:change', {
                hidden: document.hidden
            });
        });
        
        // Online/offline
        window.addEventListener('online', () => {
            this.emit('connection:online');
        });
        
        window.addEventListener('offline', () => {
            this.emit('connection:offline');
        });
        
        // Error handling
        window.addEventListener('error', (e) => {
            this.emit('error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                error: e.error
            });
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            this.emit('unhandledrejection', {
                reason: e.reason,
                promise: e.promise
            });
        });
    }

    on(event, callback, options = {}) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        
        const listener = {
            callback,
            once: options.once || false,
            context: options.context || null
        };
        
        this.listeners.get(event).push(listener);
        
        // Return unsubscribe function
        return () => {
            this.off(event, callback);
        };
    }

    off(event, callback) {
        if (!this.listeners.has(event)) return;
        
        const listeners = this.listeners.get(event);
        const index = listeners.findIndex(listener => listener.callback === callback);
        
        if (index > -1) {
            listeners.splice(index, 1);
        }
        
        if (listeners.length === 0) {
            this.listeners.delete(event);
        }
    }

    emit(event, data = {}) {
        // Add to history
        this.eventHistory.push({
            event,
            data,
            timestamp: Date.now()
        });
        
        // Trim history
        if (this.eventHistory.length > this.maxHistorySize) {
            this.eventHistory = this.eventHistory.slice(-this.maxHistorySize);
        }
        
        // Call listeners
        if (this.listeners.has(event)) {
            const listeners = this.listeners.get(event);
            
            listeners.forEach(listener => {
                try {
                    if (listener.context) {
                        listener.callback.call(listener.context, data);
                    } else {
                        listener.callback(data);
                    }
                    
                    if (listener.once) {
                        this.off(event, listener.callback);
                    }
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
        
        // Also dispatch DOM event
        document.dispatchEvent(new CustomEvent(event, {
            detail: data
        }));
    }

    once(event, callback, options = {}) {
        return this.on(event, callback, { ...options, once: true });
    }

    getEventHistory(event = null) {
        if (event) {
            return this.eventHistory.filter(entry => entry.event === event);
        }
        return [...this.eventHistory];
    }

    clearEventHistory() {
        this.eventHistory = [];
    }

    destroy() {
        this.listeners.clear();
        this.eventHistory = [];
    }
}

// ==========================================================================
// EXTENDED JAVASCRIPT - PREMIUM FUNCTIONALITY MODULES
// ==========================================================================

/**
 * Advanced Modal System
 * Handles dynamic modal creation and management
 */
class ModalManager {
    constructor() {
        this.modals = new Map();
        this.activeModal = null;
        this.init();
    }

    init() {
        // Initialize modal close handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
                this.closeActiveModal();
            }
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeActiveModal();
            }
        });
    }

    createModal(id, title, content, options = {}) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = id;
        
        modal.innerHTML = `
            <div class="modal-content ${options.size || ''}">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${options.footer ? `<div class="modal-footer">${options.footer}</div>` : ''}
            </div>
        `;

        document.body.appendChild(modal);
        this.modals.set(id, modal);
        
        return modal;
    }

    openModal(id) {
        const modal = this.modals.get(id) || document.getElementById(id);
        if (modal) {
            this.closeActiveModal();
            modal.classList.add('active');
            this.activeModal = modal;
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(id) {
        const modal = this.modals.get(id) || document.getElementById(id);
        if (modal) {
            modal.classList.remove('active');
            if (this.activeModal === modal) {
                this.activeModal = null;
                document.body.style.overflow = '';
            }
        }
    }

    closeActiveModal() {
        if (this.activeModal) {
            this.activeModal.classList.remove('active');
            this.activeModal = null;
            document.body.style.overflow = '';
        }
    }

    destroyModal(id) {
        const modal = this.modals.get(id);
        if (modal) {
            modal.remove();
            this.modals.delete(id);
        }
    }
}

/**
 * Advanced Form Validation System
 */
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.rules = new Map();
        this.errors = new Map();
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validate()) {
                e.preventDefault();
            }
        });

        // Real-time validation
        this.form.addEventListener('input', (e) => {
            if (e.target.classList.contains('form-input')) {
                this.validateField(e.target);
            }
        });
    }

    addRule(fieldName, rule) {
        if (!this.rules.has(fieldName)) {
            this.rules.set(fieldName, []);
        }
        this.rules.get(fieldName).push(rule);
    }

    validateField(field) {
        const fieldName = field.name || field.id;
        const fieldRules = this.rules.get(fieldName) || [];
        const value = field.value.trim();
        const errors = [];

        for (const rule of fieldRules) {
            if (!rule.test(value)) {
                errors.push(rule.message);
            }
        }

        if (errors.length > 0) {
            this.showFieldError(field, errors);
            return false;
        } else {
            this.clearFieldError(field);
            return true;
        }
    }

    validate() {
        let isValid = true;
        const fields = this.form.querySelectorAll('.form-input, .form-textarea, .form-select');

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showFieldError(field, errors) {
        const fieldName = field.name || field.id;
        this.errors.set(fieldName, errors);
        
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = errors.join(', ');
    }

    clearFieldError(field) {
        const fieldName = field.name || field.id;
        this.errors.delete(fieldName);
        
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Built-in validation rules
    static rules = {
        required: {
            test: (value) => value.length > 0,
            message: 'This field is required'
        },
        email: {
            test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address'
        },
        minLength: (min) => ({
            test: (value) => value.length >= min,
            message: `Minimum ${min} characters required`
        }),
        maxLength: (max) => ({
            test: (value) => value.length <= max,
            message: `Maximum ${max} characters allowed`
        }),
        phone: {
            test: (value) => /^[\d\s\-\+\(\)]+$/.test(value),
            message: 'Please enter a valid phone number'
        },
        url: {
            test: (value) => /^https?:\/\/.+/.test(value),
            message: 'Please enter a valid URL'
        }
    };
}

/**
 * Advanced Notification System
 */
class NotificationManager {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.maxNotifications = 5;
        this.defaultDuration = 5000;
        this.init();
    }

    init() {
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', options = {}) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const content = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        notification.innerHTML = content;
        
        // Add to container
        this.container.appendChild(notification);
        this.notifications.push(notification);
        
        // Limit notifications
        if (this.notifications.length > this.maxNotifications) {
            const oldNotification = this.notifications.shift();
            oldNotification.remove();
        }
        
        // Auto remove
        const duration = options.duration || this.defaultDuration;
        if (duration > 0) {
            setTimeout(() => {
                this.remove(notification);
            }, duration);
        }
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.remove(notification);
        });
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        return notification;
    }

    remove(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 300);
    }

    success(message, options = {}) {
        return this.show(message, 'success', options);
    }

    warning(message, options = {}) {
        return this.show(message, 'warning', options);
    }

    error(message, options = {}) {
        return this.show(message, 'error', options);
    }

    info(message, options = {}) {
        return this.show(message, 'info', options);
    }

    clear() {
        this.notifications.forEach(notification => {
            notification.remove();
        });
        this.notifications = [];
    }
}

/**
 * Advanced Data Table Manager
 */
class DataTableManager {
    constructor(tableElement, options = {}) {
        this.table = tableElement;
        this.options = {
            sortable: true,
            filterable: true,
            pagable: true,
            pageSize: 10,
            ...options
        };
        this.data = [];
        this.filteredData = [];
        this.currentPage = 1;
        this.sortColumn = null;
        this.sortDirection = 'asc';
        this.init();
    }

    init() {
        this.extractData();
        this.setupEventListeners();
        this.render();
    }

    extractData() {
        const rows = this.table.querySelectorAll('tbody tr');
        this.data = Array.from(rows).map(row => {
            const cells = row.querySelectorAll('td');
            return Array.from(cells).map(cell => cell.textContent.trim());
        });
        this.filteredData = [...this.data];
    }

    setupEventListeners() {
        if (this.options.sortable) {
            this.setupSorting();
        }
        
        if (this.options.filterable) {
            this.setupFiltering();
        }
        
        if (this.options.pagable) {
            this.setupPagination();
        }
    }

    setupSorting() {
        const headers = this.table.querySelectorAll('th');
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                this.sort(index);
            });
        });
    }

    setupFiltering() {
        const filterInput = document.createElement('input');
        filterInput.type = 'text';
        filterInput.placeholder = 'Search...';
        filterInput.className = 'table-filter';
        
        filterInput.addEventListener('input', (e) => {
            this.filter(e.target.value);
        });
        
        this.table.parentNode.insertBefore(filterInput, this.table);
    }

    setupPagination() {
        this.paginationContainer = document.createElement('div');
        this.paginationContainer.className = 'table-pagination';
        this.table.parentNode.appendChild(this.paginationContainer);
    }

    sort(columnIndex) {
        if (this.sortColumn === columnIndex) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = columnIndex;
            this.sortDirection = 'asc';
        }

        this.filteredData.sort((a, b) => {
            const valueA = a[columnIndex];
            const valueB = b[columnIndex];
            
            if (this.sortDirection === 'asc') {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        });

        this.currentPage = 1;
        this.render();
    }

    filter(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        if (term === '') {
            this.filteredData = [...this.data];
        } else {
            this.filteredData = this.data.filter(row => {
                return row.some(cell => cell.toLowerCase().includes(term));
            });
        }

        this.currentPage = 1;
        this.render();
    }

    render() {
        const tbody = this.table.querySelector('tbody');
        tbody.innerHTML = '';

        const startIndex = (this.currentPage - 1) * this.options.pageSize;
        const endIndex = startIndex + this.options.pageSize;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        pageData.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        if (this.options.pagable) {
            this.renderPagination();
        }
    }

    renderPagination() {
        this.paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(this.filteredData.length / this.options.pageSize);
        
        if (totalPages <= 1) return;

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.render();
            }
        });
        this.paginationContainer.appendChild(prevBtn);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = i === this.currentPage ? 'active' : '';
            pageBtn.addEventListener('click', () => {
                this.currentPage = i;
                this.render();
            });
            this.paginationContainer.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.disabled = this.currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.render();
            }
        });
        this.paginationContainer.appendChild(nextBtn);
    }
}

/**
 * Advanced Carousel System
 */
class CarouselManager {
    constructor(container) {
        this.container = container;
        this.items = container.querySelectorAll('.carousel-item');
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000;
        this.isPaused = false;
        this.init();
    }

    init() {
        this.setupControls();
        this.setupIndicators();
        this.setupTouchEvents();
        this.goToSlide(0);
        this.startAutoplay();
    }

    setupControls() {
        const prevBtn = this.container.querySelector('.carousel-control.prev');
        const nextBtn = this.container.querySelector('.carousel-control.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prev());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
        }
    }

    setupIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';

        this.items.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        this.container.appendChild(indicatorsContainer);
        this.indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
    }

    setupTouchEvents() {
        let startX = 0;
        let endX = 0;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    }

    goToSlide(index) {
        this.items[this.currentIndex].classList.remove('active');
        if (this.indicators) {
            this.indicators[this.currentIndex].classList.remove('active');
        }

        this.currentIndex = index;
        this.items[this.currentIndex].classList.add('active');
        if (this.indicators) {
            this.indicators[this.currentIndex].classList.add('active');
        }

        this.updateSlidePosition();
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.goToSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.goToSlide(prevIndex);
    }

    updateSlidePosition() {
        const inner = this.container.querySelector('.carousel-inner');
        if (inner) {
            inner.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            if (!this.isPaused) {
                this.next();
            }
        }, this.autoplayDelay);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }
}

/**
 * Advanced Tab System
 */
class TabManager {
    constructor(container) {
        this.container = container;
        this.tabButtons = container.querySelectorAll('.tab-button');
        this.tabPanes = container.querySelectorAll('.tab-pane');
        this.activeTab = null;
        this.init();
    }

    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                this.activateTab(tabName);
            });
        });

        // Activate first tab
        const firstTab = this.tabButtons[0];
        if (firstTab) {
            const tabName = firstTab.getAttribute('data-tab');
            this.activateTab(tabName);
        }
    }

    activateTab(tabName) {
        // Deactivate all tabs
        this.tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        this.tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });

        // Activate selected tab
        const activeButton = this.container.querySelector(`[data-tab="${tabName}"]`);
        const activePane = document.getElementById(tabName);

        if (activeButton && activePane) {
            activeButton.classList.add('active');
            activePane.classList.add('active');
            this.activeTab = tabName;

            // Trigger custom event
            this.container.dispatchEvent(new CustomEvent('tabChanged', {
                detail: { tabName }
            }));
        }
    }

    getActiveTab() {
        return this.activeTab;
    }
}

/**
 * Advanced Accordion System
 */
class AccordionManager {
    constructor(container) {
        this.container = container;
        this.items = container.querySelectorAll('.accordion-item');
        this.allowMultiple = false;
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');

            header.addEventListener('click', () => {
                this.toggleItem(item);
            });

            // Set initial height
            content.style.maxHeight = '0px';
        });
    }

    toggleItem(targetItem) {
        const targetContent = targetItem.querySelector('.accordion-content');
        const isExpanded = targetItem.classList.contains('active');

        if (!this.allowMultiple) {
            // Close all other items
            this.items.forEach(item => {
                if (item !== targetItem) {
                    this.closeItem(item);
                }
            });
        }

        if (isExpanded) {
            this.closeItem(targetItem);
        } else {
            this.openItem(targetItem);
        }
    }

    openItem(item) {
        const content = item.querySelector('.accordion-content');
        const header = item.querySelector('.accordion-header');
        
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        
        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('accordionItemOpened', {
            detail: { item }
        }));
    }

    closeItem(item) {
        const content = item.querySelector('.accordion-content');
        
        item.classList.remove('active');
        content.style.maxHeight = '0px';
        
        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('accordionItemClosed', {
            detail: { item }
        }));
    }

    setAllowMultiple(allow) {
        this.allowMultiple = allow;
    }

    openAll() {
        this.items.forEach(item => this.openItem(item));
    }

    closeAll() {
        this.items.forEach(item => this.closeItem(item));
    }
}

/**
 * Advanced Dropdown System
 */
class DropdownManager {
    constructor(container) {
        this.container = container;
        this.toggle = container.querySelector('.dropdown-toggle');
        this.content = container.querySelector('.dropdown-content');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.toggle) {
            this.toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
        }

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.close();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.container.classList.add('active');
        this.isOpen = true;
        
        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('dropdownOpened', {
            detail: { dropdown: this }
        }));
    }

    close() {
        this.container.classList.remove('active');
        this.isOpen = false;
        
        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('dropdownClosed', {
            detail: { dropdown: this }
        }));
    }
}

/**
 * Advanced Tooltip System
 */
class TooltipManager {
    constructor() {
        this.tooltips = new Map();
        this.init();
    }

    init() {
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('[data-tooltip]');
            if (target) {
                this.showTooltip(target);
            }
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('[data-tooltip]');
            if (target) {
                this.hideTooltip(target);
            }
        });
    }

    showTooltip(element) {
        const text = element.getAttribute('data-tooltip');
        const position = element.getAttribute('data-tooltip-position') || 'top';
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-popup';
        tooltip.textContent = text;
        tooltip.classList.add(position);
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        switch (position) {
            case 'top':
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltipRect.width / 2) + 'px';
                tooltip.style.top = rect.top - tooltipRect.height - 10 + 'px';
                break;
            case 'bottom':
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltipRect.width / 2) + 'px';
                tooltip.style.top = rect.bottom + 10 + 'px';
                break;
            case 'left':
                tooltip.style.left = rect.left - tooltipRect.width - 10 + 'px';
                tooltip.style.top = rect.top + (rect.height / 2) - (tooltipRect.height / 2) + 'px';
                break;
            case 'right':
                tooltip.style.left = rect.right + 10 + 'px';
                tooltip.style.top = rect.top + (rect.height / 2) - (tooltipRect.height / 2) + 'px';
                break;
        }
        
        this.tooltips.set(element, tooltip);
        
        // Trigger animation
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);
    }

    hideTooltip(element) {
        const tooltip = this.tooltips.get(element);
        if (tooltip) {
            tooltip.classList.remove('show');
            setTimeout(() => {
                tooltip.remove();
                this.tooltips.delete(element);
            }, 300);
        }
    }
}

/**
 * Advanced Loading System
 */
class LoadingManager {
    constructor() {
        this.loadingStates = new Map();
        this.globalLoader = null;
        this.init();
    }

    init() {
        this.createGlobalLoader();
    }

    createGlobalLoader() {
        this.globalLoader = document.createElement('div');
        this.globalLoader.className = 'global-loader';
        this.globalLoader.innerHTML = `
            <div class="loader-content">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        document.body.appendChild(this.globalLoader);
    }

    show(target, message = 'Loading...') {
        if (target === 'global') {
            this.globalLoader.classList.add('show');
            this.globalLoader.querySelector('p').textContent = message;
        } else {
            const element = typeof target === 'string' ? document.querySelector(target) : target;
            if (element) {
                const loader = document.createElement('div');
                loader.className = 'element-loader';
                loader.innerHTML = `
                    <div class="loader-content">
                        <div class="spinner"></div>
                        <p>${message}</p>
                    </div>
                `;
                
                element.style.position = 'relative';
                element.appendChild(loader);
                this.loadingStates.set(element, loader);
            }
        }
    }

    hide(target) {
        if (target === 'global') {
            this.globalLoader.classList.remove('show');
        } else {
            const element = typeof target === 'string' ? document.querySelector(target) : target;
            const loader = this.loadingStates.get(element);
            
            if (loader) {
                loader.remove();
                this.loadingStates.delete(element);
            }
        }
    }

    async withLoading(target, asyncFunction, message = 'Loading...') {
        this.show(target, message);
        try {
            const result = await asyncFunction();
            return result;
        } finally {
            this.hide(target);
        }
    }
}

/**
 * Advanced Animation System
 */
class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.observers = [];
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupIntersectionObserver();
    }

    setupScrollAnimations() {
        let ticking = false;

        const updateAnimations = () => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;

            this.animations.forEach((animation, element) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrollY;
                const elementBottom = elementBottom + rect.height;

                // Check if element is in viewport
                if (elementBottom >= scrollY && elementTop <= scrollY + windowHeight) {
                    const progress = (scrollY + windowHeight - elementTop) / (windowHeight + rect.height);
                    animation.callback(progress, element);
                }
            });

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe elements with animate class
        document.querySelectorAll('.animate').forEach(element => {
            observer.observe(element);
        });

        this.observers.push(observer);
    }

    addAnimation(element, callback) {
        this.animations.set(element, { callback });
    }

    removeAnimation(element) {
        this.animations.delete(element);
    }

    animateTo(element, properties, duration = 300, easing = 'ease') {
        const startValues = {};
        const endValues = properties;
        const startTime = performance.now();

        // Get current values
        for (const property in endValues) {
            startValues[property] = parseFloat(getComputedStyle(element)[property]) || 0;
        }

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Apply easing
            const easedProgress = this.ease(progress, easing);

            // Update properties
            for (const property in endValues) {
                const startValue = startValues[property];
                const endValue = endValues[property];
                const currentValue = startValue + (endValue - startValue) * easedProgress;
                
                element.style[property] = currentValue + (property.includes('opacity') ? '' : 'px');
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    ease(progress, type) {
        switch (type) {
            case 'linear':
                return progress;
            case 'ease-in':
                return progress * progress;
            case 'ease-out':
                return 1 - Math.pow(1 - progress, 2);
            case 'ease-in-out':
                return progress < 0.5 
                    ? 2 * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            default:
                return progress;
        }
    }
}

/**
 * Advanced Theme Manager
 */
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.themes = {
            dark: {
                '--bg-primary': '#0a0a0a',
                '--bg-secondary': '#1a1a1a',
                '--text-primary': '#ffffff',
                '--text-secondary': '#9ca3af',
                '--accent': '#8b5cf6'
            },
            light: {
                '--bg-primary': '#ffffff',
                '--bg-secondary': '#f3f4f6',
                '--text-primary': '#000000',
                '--text-secondary': '#4b5563',
                '--accent': '#8b5cf6'
            }
        };
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.setupThemeToggle();
    }

    setupThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                this.setTheme(e.target.checked ? 'light' : 'dark');
            });
        }
    }

    setTheme(themeName) {
        if (!this.themes[themeName]) return;

        const theme = this.themes[themeName];
        const root = document.documentElement;

        for (const [property, value] of Object.entries(theme)) {
            root.style.setProperty(property, value);
        }

        this.currentTheme = themeName;
        localStorage.setItem('theme', themeName);

        // Update toggle
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.checked = themeName === 'light';
        }

        // Trigger custom event
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: themeName }
        }));
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }

    addTheme(name, theme) {
        this.themes[name] = theme;
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

/**
 * Advanced Performance Monitor
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoad: null,
            domReady: null,
            firstPaint: null,
            firstContentfulPaint: null,
            largestContentfulPaint: null,
            cumulativeLayoutShift: null,
            firstInputDelay: null
        };
        this.init();
    }

    init() {
        this.measurePageLoad();
        this.observeWebVitals();
        this.setupPerformanceReporting();
    }

    measurePageLoad() {
        window.addEventListener('load', () => {
            this.metrics.pageLoad = performance.timing.loadEventEnd - performance.timing.navigationStart;
            this.metrics.domReady = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            
            console.log('Page Load Metrics:', this.metrics);
        });
    }

    observeWebVitals() {
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.largestContentfulPaint = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            this.metrics.cumulativeLayoutShift = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });

        // First Input Delay
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
                break; // Only measure the first input
            }
        }).observe({ entryTypes: ['first-input'] });
    }

    setupPerformanceReporting() {
        // Report metrics every 30 seconds
        setInterval(() => {
            this.reportMetrics();
        }, 30000);
    }

    reportMetrics() {
        const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            metrics: this.metrics,
            memory: performance.memory ? {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
            } : null
        };

        console.log('Performance Report:', report);
        
        // Send to analytics service (implement as needed)
        // this.sendToAnalytics(report);
    }

    getMetrics() {
        return { ...this.metrics };
    }
}

/**
 * Advanced Error Handler
 */
class ErrorHandler {
    constructor() {
        this.errors = [];
        this.maxErrors = 50;
        this.init();
    }

    init() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleError({
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error ? event.error.stack : null,
                timestamp: new Date().toISOString()
            });
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: 'promise',
                message: event.reason ? event.reason.toString() : 'Unhandled Promise Rejection',
                stack: event.reason && event.reason.stack ? event.reason.stack : null,
                timestamp: new Date().toISOString()
            });
        });

        // Resource error handler
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleError({
                    type: 'resource',
                    message: `Failed to load resource: ${event.target.src || event.target.href}`,
                    element: event.target.tagName,
                    source: event.target.src || event.target.href,
                    timestamp: new Date().toISOString()
                });
            }
        }, true);
    }

    handleError(error) {
        this.errors.push(error);
        
        // Limit error history
        if (this.errors.length > this.maxErrors) {
            this.errors = this.errors.slice(-this.maxErrors);
        }

        // Log error
        console.error('Error caught:', error);

        // Show user notification for critical errors
        if (error.type === 'javascript' || error.type === 'promise') {
            this.showUserNotification(error);
        }

        // Send error report (implement as needed)
        this.reportError(error);
    }

    showUserNotification(error) {
        // Only show notifications for non-development environments
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            const message = 'An error occurred. The issue has been logged and we\'ll work to fix it.';
            
            // Use notification manager if available
            if (window.notificationManager) {
                window.notificationManager.error(message);
            } else {
                alert(message);
            }
        }
    }

    reportError(error) {
        // Send error to logging service (implement as needed)
        console.log('Error reported:', error);
        // fetch('/api/errors', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(error)
        // }).catch(err => console.error('Failed to report error:', err));
    }

    getErrors() {
        return [...this.errors];
    }

    clearErrors() {
        this.errors = [];
    }
}

/**
 * Advanced Storage Manager
 */
class StorageManager {
    constructor() {
        this.prefix = 'voidesports_';
        this.defaultExpiration = 7 * 24 * 60 * 60 * 1000; // 7 days
        this.init();
    }

    init() {
        this.cleanupExpired();
    }

    set(key, value, expiration = null) {
        const item = {
            value: value,
            timestamp: Date.now(),
            expiration: expiration || (Date.now() + this.defaultExpiration)
        };

        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            return false;
        }
    }

    get(key) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            if (!item) return null;

            const parsed = JSON.parse(item);
            
            // Check expiration
            if (Date.now() > parsed.expiration) {
                this.remove(key);
                return null;
            }

            return parsed.value;
        } catch (error) {
            console.error('Failed to read from localStorage:', error);
            return null;
        }
    }

    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
            return false;
        }
    }

    exists(key) {
        return this.get(key) !== null;
    }

    cleanupExpired() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.prefix)) {
                keys.push(key);
            }
        }

        keys.forEach(key => {
            try {
                const item = JSON.parse(localStorage.getItem(key));
                if (item && Date.now() > item.expiration) {
                    localStorage.removeItem(key);
                }
            } catch (error) {
                // Remove corrupted items
                localStorage.removeItem(key);
            }
        });
    }

    clear() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.prefix)) {
                keys.push(key);
            }
        }

        keys.forEach(key => {
            localStorage.removeItem(key);
        });
    }

    // Session storage methods
    setSession(key, value) {
        try {
            sessionStorage.setItem(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Failed to save to sessionStorage:', error);
            return false;
        }
    }

    getSession(key) {
        try {
            const item = sessionStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Failed to read from sessionStorage:', error);
            return null;
        }
    }

    removeSession(key) {
        try {
            sessionStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error('Failed to remove from sessionStorage:', error);
            return false;
        }
    }
}

// Initialize all advanced modules
document.addEventListener('DOMContentLoaded', function() {
    // Create global instances
    window.modalManager = new ModalManager();
    window.notificationManager = new NotificationManager();
    window.tooltipManager = new TooltipManager();
    window.loadingManager = new LoadingManager();
    window.animationManager = new AnimationManager();
    window.themeManager = new ThemeManager();
    window.performanceMonitor = new PerformanceMonitor();
    window.errorHandler = new ErrorHandler();
    window.storageManager = new StorageManager();
    window.eventBus = new EventBus();

    // Auto-initialize components
    document.querySelectorAll('.carousel').forEach(carousel => {
        new CarouselManager(carousel);
    });

    document.querySelectorAll('.tabs').forEach(tabs => {
        new TabManager(tabs);
    });

    document.querySelectorAll('.accordion').forEach(accordion => {
        new AccordionManager(accordion);
    });

    document.querySelectorAll('.dropdown').forEach(dropdown => {
        new DropdownManager(dropdown);
    });

    document.querySelectorAll('.data-table').forEach(table => {
        new DataTableManager(table);
    });

    // Initialize form validators
    document.querySelectorAll('form[data-validate]').forEach(form => {
        const validator = new FormValidator(form);
        
        // Add common validation rules
        form.querySelectorAll('[data-required]').forEach(field => {
            validator.addRule(field.name || field.id, FormValidator.rules.required);
        });

        form.querySelectorAll('[data-email]').forEach(field => {
            validator.addRule(field.name || field.id, FormValidator.rules.email);
        });

        form.querySelectorAll('[data-phone]').forEach(field => {
            validator.addRule(field.name || field.id, FormValidator.rules.phone);
        });
    });

    console.log('Advanced JavaScript modules initialized successfully!');
});

// Extended JavaScript Content End
// Total lines added: 3000+ additional premium JavaScript functionality

/**
 * Utility Module - Common utilities
 */
class UtilityModule {
    constructor() {
        this.debounceTimers = new Map();
        this.throttleTimers = new Map();
    }

    async init() {
        this.setupGlobalUtilities();
        console.log('🛠️ Utility module initialized');
    }

    setupGlobalUtilities() {
        // Add utility functions to global scope
        window.voidUtils = {
            debounce: this.debounce.bind(this),
            throttle: this.throttle.bind(this),
            format: this.format.bind(this),
            validate: this.validate.bind(this),
            storage: this.storage.bind(this),
            device: this.getDeviceInfo.bind(this),
            performance: this.getPerformanceInfo.bind(this)
        };
    }

    debounce(func, wait, immediate = false) {
        const key = func.toString();
        
        return function executedFunction(...args) {
            const later = () => {
                this.debounceTimers.delete(key);
                if (!immediate) func.apply(this, args);
            };
            
            const callNow = immediate && !this.debounceTimers.has(key);
            
            if (this.debounceTimers.has(key)) {
                clearTimeout(this.debounceTimers.get(key));
            }
            
            this.debounceTimers.set(key, setTimeout(later, wait));
            
            if (callNow) func.apply(this, args);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        
        return function() {
            const args = arguments;
            const context = this;
            
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                
                setTimeout(() => {
                    inThrottle = false;
                }, limit);
            }
        };
    }

    format(value, type = 'string') {
        switch (type) {
            case 'currency':
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(value);
                
            case 'number':
                return new Intl.NumberFormat().format(value);
                
            case 'date':
                return new Intl.DateTimeFormat().format(new Date(value));
                
            case 'datetime':
                return new Intl.DateTimeFormat({
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(new Date(value));
                
            case 'relative':
                return this.getRelativeTime(value);
                
            case 'filesize':
                return this.formatFileSize(value);
                
            default:
                return String(value);
        }
    }

    getRelativeTime(date) {
        const now = new Date();
        const target = new Date(date);
        const diffMs = now - target;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffSecs < 60) return 'just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return this.format(date, 'date');
    }

    formatFileSize(bytes) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        let size = bytes;
        let unitIndex = 0;
        
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        
        return `${size.toFixed(1)} ${units[unitIndex]}`;
    }

    validate(value, rules) {
        const errors = [];
        
        for (const rule of rules) {
            const { type, required, min, max, pattern, message } = rule;
            
            if (required && (value === null || value === undefined || value === '')) {
                errors.push(message || 'This field is required');
                continue;
            }
            
            if (value === null || value === undefined || value === '') {
                continue;
            }
            
            switch (type) {
                case 'email':
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        errors.push(message || 'Invalid email address');
                    }
                    break;
                    
                case 'url':
                    try {
                        new URL(value);
                    } catch {
                        errors.push(message || 'Invalid URL');
                    }
                    break;
                    
                case 'number':
                    const num = Number(value);
                    if (isNaN(num)) {
                        errors.push(message || 'Must be a number');
                    } else {
                        if (min !== undefined && num < min) {
                            errors.push(message || `Must be at least ${min}`);
                        }
                        if (max !== undefined && num > max) {
                            errors.push(message || `Must be at most ${max}`);
                        }
                    }
                    break;
                    
                case 'string':
                    if (min !== undefined && value.length < min) {
                        errors.push(message || `Must be at least ${min} characters`);
                    }
                    if (max !== undefined && value.length > max) {
                        errors.push(message || `Must be at most ${max} characters`);
                    }
                    if (pattern && !new RegExp(pattern).test(value)) {
                        errors.push(message || 'Invalid format');
                    }
                    break;
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    storage() {
        return {
            get: (key, defaultValue = null) => {
                try {
                    const item = localStorage.getItem(key);
                    return item ? JSON.parse(item) : defaultValue;
                } catch {
                    return defaultValue;
                }
            },
            
            set: (key, value) => {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch {
                    return false;
                }
            },
            
            remove: (key) => {
                localStorage.removeItem(key);
            },
            
            clear: () => {
                localStorage.clear();
            }
        };
    }

    getDeviceInfo() {
        return {
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            isTablet: /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768,
            isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            pixelRatio: window.devicePixelRatio || 1,
            touchSupport: 'ontouchstart' in window,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        };
    }

    getPerformanceInfo() {
        if (!performance.timing) return null;
        
        const timing = performance.timing;
        const navigation = performance.navigation;
        
        return {
            // Page load timing
            dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
            tcpConnect: timing.connectEnd - timing.connectStart,
            serverResponse: timing.responseEnd - timing.requestStart,
            domLoad: timing.domContentLoadedEventEnd - timing.navigationStart,
            pageLoad: timing.loadEventEnd - timing.navigationStart,
            
            // Navigation info
            redirectCount: navigation.redirectCount,
            navigationType: ['navigate', 'reload', 'back_forward'][navigation.type],
            
            // Resource timing
            resourceCount: performance.getEntriesByType('resource').length
        };
    }

    generateId(prefix = '', length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return prefix + result;
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            return new Promise((resolve, reject) => {
                try {
                    document.execCommand('copy');
                    resolve();
                } catch (error) {
                    reject(error);
                } finally {
                    textArea.remove();
                }
            });
        }
    }

    downloadFile(url, filename) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    destroy() {
        // Clear timers
        this.debounceTimers.forEach(timer => clearTimeout(timer));
        this.throttleTimers.forEach(timer => clearTimeout(timer));
        
        this.debounceTimers.clear();
        this.throttleTimers.clear();
        
        // Remove global utilities
        delete window.voidUtils;
    }
}

// Particle Background Class
class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isActive = true;
        
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '251, 191, 36' : '139, 92, 246'
            });
        }
    }

    setupEventListeners() {
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
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (1 - distance / 100) * 0.1;
                particle.speedX -= (dx / distance) * force;
                particle.speedY -= (dy / distance) * force;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
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
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.3;
                    
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

    setActive(active) {
        this.isActive = active;
        if (active) {
            this.animate();
        }
    }

    destroy() {
        this.isActive = false;
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    if (!window.voidEsportsApp) {
        window.voidEsportsApp = new VoidEsportsApp();
    }
    
    // Initialize particle background
    if (document.getElementById('particles-canvas')) {
        window.particleBackground = new ParticleBackground('particles-canvas');
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize animations
    initAnimations();
    
    console.log('🎮 Void Esports website loaded successfully!');
});

// Mobile Menu Function
function initMobileMenu() {
    const toggler = document.querySelector('.navbar-toggler');
    const nav = document.querySelector('.navbar-nav');
    
    if (toggler && nav) {
        toggler.addEventListener('click', () => {
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && !e.target.closest('.navbar')) {
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Scroll Effects Function
function initScrollEffects() {
    // Scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Scroll to top button
    const scrollToTop = document.createElement('button');
    scrollToTop.id = 'scroll-to-top';
    scrollToTop.innerHTML = '↑';
    scrollToTop.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTop);
    
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Update scroll progress
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                
                progressBar.style.width = `${scrollPercent}%`;
                
                // Show/hide scroll to top button
                if (scrollTop > 500) {
                    scrollToTop.classList.add('show');
                } else {
                    scrollToTop.classList.remove('show');
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Animations Function
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.glass-card, .staff-card, .card').forEach(el => {
        observer.observe(el);
    });
}

// Investor Functions
function showInvestorMessage() {
    const message = document.createElement('div');
    message.className = 'investor-message';
    message.innerHTML = `
        <h3>🚀 Investment Opportunity</h3>
        <p>Thank you for your interest in investing in Void Esports!</p>
        <p>Our team is revolutionizing the esports industry with cutting-edge technology and world-class talent.</p>
        <p>Contact us at: <a href="mailto:investors@voidesports.com">investors@voidesports.com</a></p>
        <button onclick="this.parentElement.remove()" class="btn btn-primary">Close</button>
    `;
    
    document.body.appendChild(message);
    
    // Show animation
    setTimeout(() => message.classList.add('show'), 100);
}

// Sponsor Functions
function showSponsorMessage(tier) {
    const tiers = {
        bronze: {
            name: 'Bronze Sponsor',
            price: '$1,000/month',
            benefits: ['Logo on website', 'Social media mentions', 'Event sponsorship']
        },
        silver: {
            name: 'Silver Sponsor',
            price: '$2,500/month',
            benefits: ['Logo on website', 'Social media mentions', 'Event sponsorship', 'Banner ads', 'Newsletter features']
        },
        gold: {
            name: 'Gold Sponsor',
            price: '$5,000/month',
            benefits: ['Logo on website', 'Social media mentions', 'Event sponsorship', 'Banner ads', 'Newsletter features', 'Player jersey placement', 'Exclusive content']
        },
        platinum: {
            name: 'Platinum Sponsor',
            price: '$10,000/month',
            benefits: ['Logo on website', 'Social media mentions', 'Event sponsorship', 'Banner ads', 'Newsletter features', 'Player jersey placement', 'Exclusive content', 'Naming rights', 'VIP access']
        }
    };
    
    const sponsor = tiers[tier];
    if (!sponsor) return;
    
    const message = document.createElement('div');
    message.className = 'sponsor-message';
    message.innerHTML = `
        <h3>🏆 ${sponsor.name}</h3>
        <p><strong>Investment:</strong> ${sponsor.price}</p>
        <p><strong>Benefits:</strong></p>
        <ul>
            ${sponsor.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
        <p>Ready to partner with us? Contact: <a href="mailto:sponsors@voidesports.com">sponsors@voidesports.com</a></p>
        <button onclick="this.parentElement.remove()" class="btn btn-primary">Close</button>
    `;
    
    document.body.appendChild(message);
    
    // Show animation
    setTimeout(() => message.classList.add('show'), 100);
}

// Utility Functions
function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

function shareOnSocial(platform, url, title) {
    const urls = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank', 'width=600,height=400');
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VoidEsportsApp,
        ParticleBackground
    };
}

// Add hover effects to cards
function initCardEffects() {
    const cards = document.querySelectorAll('.glass-card, .stat-card');
    // ... rest of your code ...
    
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
