// Void Esports - Advanced Particle Animation System
// Enhanced with multiple particle types and interactive effects

class AdvancedParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.time = 0;
        this.connectionDistance = 120;
        this.particleTypes = ['primary', 'secondary', 'accent', 'glow'];
        
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 12000);
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
            const type = this.particleTypes[Math.floor(Math.random() * this.particleTypes.length)];
            this.particles.push(this.createParticle(type));
        }
    }

    createParticle(type) {
        const particle = {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            type: type,
            pulsePhase: Math.random() * Math.PI * 2,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            trail: [],
            maxTrailLength: 10
        };

        // Set particle properties based on type
        switch(type) {
            case 'primary':
                particle.hue = 280; // Purple
                particle.glowIntensity = 0.8;
                break;
            case 'secondary':
                particle.hue = 220; // Blue
                particle.glowIntensity = 0.6;
                break;
            case 'accent':
                particle.hue = 330; // Pink
                particle.glowIntensity = 0.7;
                break;
            case 'glow':
                particle.hue = 180; // Cyan
                particle.glowIntensity = 1.0;
                particle.size = Math.random() * 2 + 0.5;
                break;
        }

        return particle;
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouseX = this.canvas.width / 2;
            this.mouseY = this.canvas.height / 2;
        });

        // Touch support for mobile
        this.canvas.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const rect = this.canvas.getBoundingClientRect();
                this.mouseX = e.touches[0].clientX - rect.left;
                this.mouseY = e.touches[0].clientY - rect.top;
            }
        });
    }

    updateParticles() {
        this.time += 0.01;

        this.particles.forEach((particle, index) => {
            // Store trail position
            if (particle.trail.length >= particle.maxTrailLength) {
                particle.trail.shift();
            }
            particle.trail.push({ x: particle.x, y: particle.y });

            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                const angle = Math.atan2(dy, dx);
                particle.x -= Math.cos(angle) * force * 2;
                particle.y -= Math.sin(angle) * force * 2;
                
                // Add some randomness when near mouse
                particle.speedX += (Math.random() - 0.5) * 0.1;
                particle.speedY += (Math.random() - 0.5) * 0.1;
            }

            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Update rotation
            particle.rotation += particle.rotationSpeed;

            // Update pulse
            particle.pulsePhase += 0.05;
            const pulseFactor = Math.sin(particle.pulsePhase) * 0.3 + 1;
            particle.currentSize = particle.size * pulseFactor;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Dynamic opacity based on position and time
            const centerDist = Math.sqrt(
                Math.pow(particle.x - this.canvas.width/2, 2) + 
                Math.pow(particle.y - this.canvas.height/2, 2)
            ) / Math.max(this.canvas.width, this.canvas.height);
            
            particle.opacity = 0.2 + Math.sin(this.time + index * 0.1) * 0.3 + (1 - centerDist) * 0.3;

            // Occasionally change particle type
            if (Math.random() < 0.001) {
                particle.type = this.particleTypes[Math.floor(Math.random() * this.particleTypes.length)];
                this.updateParticleType(particle);
            }
        });
    }

    updateParticleType(particle) {
        switch(particle.type) {
            case 'primary':
                particle.hue = 280;
                particle.glowIntensity = 0.8;
                break;
            case 'secondary':
                particle.hue = 220;
                particle.glowIntensity = 0.6;
                break;
            case 'accent':
                particle.hue = 330;
                particle.glowIntensity = 0.7;
                break;
            case 'glow':
                particle.hue = 180;
                particle.glowIntensity = 1.0;
                break;
        }
    }

    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.3;
                    
                    // Create gradient for connection line
                    const gradient = this.ctx.createLinearGradient(
                        particle.x, particle.y, otherParticle.x, otherParticle.y
                    );
                    
                    const hue1 = particle.hue;
                    const hue2 = otherParticle.hue;
                    
                    gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, ${opacity})`);
                    gradient.addColorStop(0.5, `hsla(${(hue1 + hue2) / 2}, 70%, 60%, ${opacity * 1.5})`);
                    gradient.addColorStop(1, `hsla(${hue2}, 70%, 60%, ${opacity})`);

                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 0.5 + Math.sin(this.time * 2) * 0.3;
                    this.ctx.stroke();
                }
            });
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            // Draw trail
            if (particle.trail.length > 1) {
                particle.trail.forEach((point, index) => {
                    const trailOpacity = (index / particle.trail.length) * particle.opacity * 0.3;
                    this.ctx.beginPath();
                    this.ctx.arc(point.x, point.y, particle.currentSize * 0.5, 0, Math.PI * 2);
                    this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${trailOpacity})`;
                    this.ctx.fill();
                });
            }

            // Draw main particle with glow
            const glowSize = particle.currentSize * (2 + particle.glowIntensity);
            const glowGradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, glowSize
            );
            
            glowGradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`);
            glowGradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 50%, ${particle.opacity * 0.5})`);
            glowGradient.addColorStop(1, `hsla(${particle.hue}, 70%, 40%, 0)`);

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
            this.ctx.fillStyle = glowGradient;
            this.ctx.fill();

            // Draw core particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.currentSize, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
            this.ctx.fill();

            // Add inner glow for special particles
            if (particle.type === 'glow') {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.currentSize * 0.5, 0, Math.PI * 2);
                this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 80%, ${particle.opacity})`;
                this.ctx.fill();
            }
        });
    }

    drawBackgroundEffects() {
        // Create subtle background gradient that shifts over time
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height) / 2
        );
        
        const hue = (this.time * 10) % 360;
        gradient.addColorStop(0, `hsla(${hue}, 30%, 10%, 0.1)`);
        gradient.addColorStop(1, 'rgba(15, 15, 15, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animate() {
        // Clear canvas with slight trail effect
        this.ctx.fillStyle = 'rgba(15, 15, 15, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background effects
        this.drawBackgroundEffects();

        // Update and draw everything
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    // Public methods for external control
    addParticle(type = 'primary') {
        this.particles.push(this.createParticle(type));
    }

    removeParticle() {
        if (this.particles.length > 10) {
            this.particles.pop();
        }
    }

    setConnectionDistance(distance) {
        this.connectionDistance = Math.max(50, Math.min(300, distance));
    }
}

// Initialize advanced particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const particleSystem = new AdvancedParticleSystem('particles-canvas');
    
    // Make it globally accessible for debugging and external control
    window.particleSystem = particleSystem;
    
    // Add keyboard controls for debugging
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                particleSystem.setConnectionDistance(particleSystem.connectionDistance + 10);
                break;
            case 'ArrowDown':
                particleSystem.setConnectionDistance(particleSystem.connectionDistance - 10);
                break;
            case 'a':
                particleSystem.addParticle('primary');
                break;
            case 's':
                particleSystem.addParticle('secondary');
                break;
            case 'd':
                particleSystem.addParticle('accent');
                break;
            case 'f':
                particleSystem.addParticle('glow');
                break;
            case 'r':
                particleSystem.removeParticle();
                break;
        }
    });
    
    console.log('Advanced Particle System initialized');
    console.log('Controls: Arrow keys (connection distance), A/S/D/F (add particles), R (remove particle)');
});

// Smooth scroll enhancement
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize smooth scroll
document.addEventListener('DOMContentLoaded', initSmoothScroll);

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.init();
    }

    init() {
        this.monitor();
    }

    monitor() {
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Adjust particle count based on performance
            if (this.fps < 30 && window.particleSystem && window.particleSystem.particles.length > 20) {
                window.particleSystem.removeParticle();
            }
        }
        
        requestAnimationFrame(() => this.monitor());
    }
}

// Initialize performance monitor
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceMonitor();
});
