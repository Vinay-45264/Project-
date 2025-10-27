// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
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

// ===== NAVBAR BACKGROUND ON SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== ANIMATED COUNTER FOR STATS =====
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
};

// ===== INTERSECTION OBSERVER FOR COUNTERS =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

// Observe cards and sections
document.querySelectorAll('.portfolio-card, .stat-card, .insight-card, .market-row').forEach(element => {
    fadeInObserver.observe(element);
});

// ===== THEME TOGGLE (OPTIONAL FUTURE ENHANCEMENT) =====
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Theme toggle functionality can be expanded
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        
        // Add a pulse animation
        themeToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 200);
    });
}

// ===== FORM SUBMISSION HANDLER =====
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message (replace with actual API call in production)
        const btn = contactForm.querySelector('.btn-primary');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            btn.textContent = 'Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// ===== TRADE BUTTON ANIMATIONS =====
document.querySelectorAll('.btn-small').forEach(btn => {
    btn.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
            animation: ripple 0.6s;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Show trading modal (placeholder)
        const assetName = this.closest('.market-row').querySelector('.asset-name').textContent;
        alert(`Trading feature for ${assetName} coming soon!`);
    });
});

// ===== ADD RIPPLE ANIMATION TO CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// ===== PORTFOLIO CARD HOVER EFFECTS =====
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== DYNAMIC MARKET PRICE UPDATES (SIMULATION) =====
const updateMarketPrices = () => {
    document.querySelectorAll('.market-row:not(.market-header)').forEach(row => {
        const priceCell = row.children[1];
        const changeCell = row.children[2];
        
        if (priceCell && changeCell) {
            // Simulate small price fluctuations
            const currentPrice = parseFloat(priceCell.textContent.replace(/[$,]/g, ''));
            const fluctuation = (Math.random() - 0.5) * 0.01; // ±0.5% change
            
            // Occasionally update prices (10% chance each interval)
            if (Math.random() < 0.1) {
                const newPrice = currentPrice * (1 + fluctuation);
                priceCell.textContent = `$${newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
                
                // Add flash animation
                priceCell.style.transition = 'all 0.3s ease';
                priceCell.style.color = fluctuation > 0 ? '#10b981' : '#ef4444';
                setTimeout(() => {
                    priceCell.style.color = '';
                }, 300);
            }
        }
    });
};

// Update prices every 3 seconds
setInterval(updateMarketPrices, 3000);

// ===== PARALLAX EFFECT FOR HERO SECTION =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const shapes = document.querySelectorAll('.shape');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
    }
    
    shapes.forEach((shape, index) => {
        shape.style.transform = `translate(${scrolled * (0.1 + index * 0.05)}px, ${scrolled * (0.15 + index * 0.05)}px)`;
    });
});

// ===== ADD ENTRANCE ANIMATIONS ON PAGE LOAD =====
window.addEventListener('load', () => {
    // Add stagger animation to nav items
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s backwards`;
    });
    
    // Trigger hero animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) heroTitle.style.animation = 'fadeInUp 1s ease 0.2s backwards';
    if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 1s ease 0.4s backwards';
    if (heroButtons) heroButtons.style.animation = 'fadeInUp 1s ease 0.6s backwards';
});

// ===== CURSOR TRAIL EFFECT (OPTIONAL) =====
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    // Only on desktop
    if (window.innerWidth > 768) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: cursorTrailFade 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        cursorTrail.push(trail);
        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.remove();
            }
        }
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 800);
    }
});

// Add cursor trail animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes cursorTrailFade {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(cursorStyle);

// ===== CONSOLE MESSAGE =====
console.log('%c FinanceHub Dashboard ', 'background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Welcome to your financial management platform! ', 'color: #00d4ff; font-size: 14px;');
