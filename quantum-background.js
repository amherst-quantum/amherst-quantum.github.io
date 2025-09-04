class QuantumField {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.entanglementPairs = [];
        this.waves = [];
        this.time = 0;
        this.mouse = { x: 0, y: 0 };
        
        // Simple color palette
        this.colors = {
            particle: '#FFFFFF',
            entanglement: '#8B1538',
            wave: 'rgba(139, 21, 56, 0.1)',
            glow: 'rgba(255, 255, 255, 0.3)'
        };
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.canvas = document.getElementById('quantum-background');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        // Create quantum particles (white circles)
        this.createParticles();
        this.createEntanglementPairs();
        this.createWaves();
    }
    
    createParticles() {
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                id: i,
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 3 + Math.random() * 2,
                phase: Math.random() * Math.PI * 2,
                entangled: false,
                partner: null,
                measured: false
            });
        }
    }
    
    createEntanglementPairs() {
        // Create entangled pairs
        for (let i = 0; i < this.particles.length; i += 2) {
            if (i + 1 < this.particles.length) {
                const p1 = this.particles[i];
                const p2 = this.particles[i + 1];
                
                p1.entangled = true;
                p2.entangled = true;
                p1.partner = p2;
                p2.partner = p1;
                
                this.entanglementPairs.push({
                    p1: p1,
                    p2: p2,
                    strength: 0.7 + Math.random() * 0.3,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }
    }
    
    createWaves() {
        // Create subtle quantum waves
        const waveCount = 3;
        
        for (let i = 0; i < waveCount; i++) {
            this.waves.push({
                centerX: Math.random() * this.canvas.width,
                centerY: Math.random() * this.canvas.height,
                radius: 0,
                maxRadius: 150 + Math.random() * 100,
                speed: 0.5 + Math.random() * 0.5,
                frequency: 0.02 + Math.random() * 0.01,
                amplitude: 20 + Math.random() * 20,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Gentle floating movement
            particle.x += particle.vx + Math.sin(this.time * 0.001 + particle.phase) * 0.1;
            particle.y += particle.vy + Math.cos(this.time * 0.001 + particle.phase) * 0.1;
            
            // Boundary wrapping
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Quantum uncertainty (slight jitter)
            particle.x += (Math.random() - 0.5) * 0.2;
            particle.y += (Math.random() - 0.5) * 0.2;
            
            // No mouse interaction - particles remain unchanged
            particle.measured = false;
        });
    }
    
    updateEntanglement() {
        this.entanglementPairs.forEach(pair => {
            // Quantum entanglement correlation
            const { p1, p2 } = pair;
            
            // Anti-correlated behavior when measured
            if (p1.measured || p2.measured) {
                const correlation = Math.sin(this.time * 0.002 + pair.phase);
                
                // Entangled particles respond to each other
                if (p1.measured && !p2.measured) {
                    p2.phase = -p1.phase + Math.PI; // Anti-correlation
                }
                if (p2.measured && !p1.measured) {
                    p1.phase = -p2.phase + Math.PI; // Anti-correlation
                }
            }
        });
    }
    
    updateWaves() {
        this.waves.forEach(wave => {
            wave.radius += wave.speed;
            
            // Reset wave when it reaches max radius
            if (wave.radius > wave.maxRadius) {
                wave.radius = 0;
                wave.centerX = Math.random() * this.canvas.width;
                wave.centerY = Math.random() * this.canvas.height;
            }
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            const { x, y, radius, entangled, measured } = particle;
            
            this.ctx.save();
            
            // Consistent glow effect for entangled particles
            if (entangled) {
                this.ctx.shadowColor = this.colors.glow;
                this.ctx.shadowBlur = 8;
            }
            
            // Main particle (white circle)
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.colors.particle;
            this.ctx.fill();
            
            // Quantum superposition ring for entangled particles
            if (entangled) {
                this.ctx.beginPath();
                const superpositionRadius = radius + 3 + Math.sin(this.time * 0.003 + particle.phase) * 2;
                this.ctx.arc(x, y, superpositionRadius, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(139, 21, 56, ${0.3 + Math.sin(this.time * 0.002) * 0.1})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }
            
            this.ctx.restore();
        });
    }
    
    drawEntanglement() {
        this.entanglementPairs.forEach(pair => {
            const { p1, p2, strength } = pair;
            const alpha = strength * (0.2 + Math.sin(this.time * 0.001) * 0.1);
            
            // Draw entanglement connection
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(139, 21, 56, ${alpha})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            
            // Draw quantum correlation pulses
            const distance = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
            const pulsePosition = (Math.sin(this.time * 0.002) + 1) * 0.5;
            const pulseX = p1.x + (p2.x - p1.x) * pulsePosition;
            const pulseY = p1.y + (p2.y - p1.y) * pulsePosition;
            
            this.ctx.beginPath();
            this.ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(139, 21, 56, ${alpha * 2})`;
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }
    
    drawWaves() {
        this.waves.forEach(wave => {
            if (wave.radius > 0) {
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.arc(wave.centerX, wave.centerY, wave.radius, 0, Math.PI * 2);
                const alpha = (1 - wave.radius / wave.maxRadius) * 0.1;
                this.ctx.strokeStyle = `rgba(139, 21, 56, ${alpha})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                this.ctx.restore();
            }
        });
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw quantum waves (subtle background)
        this.drawWaves();
        
        // Draw entanglement connections
        this.drawEntanglement();
        
        // Draw particles (white circles)
        this.drawParticles();
    }
    
    animate() {
        this.time = Date.now();
        
        this.updateParticles();
        this.updateEntanglement();
        this.updateWaves();
        this.draw();
        
        requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new QuantumField();
}); 