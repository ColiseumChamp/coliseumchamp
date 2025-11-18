// ============================================
// COLISEUM - JavaScript
// ============================================

// Mobile Sidebar Menu
const menuToggle = document.getElementById('menuToggle');
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

// Open sidebar
function openSidebar() {
    sidebarMenu.classList.add('active');
    sidebarOverlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.classList.add('sidebar-open');
}

// Close sidebar
function closeSidebar() {
    sidebarMenu.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.classList.remove('sidebar-open');
}

// Toggle sidebar when menu button is clicked
menuToggle.addEventListener('click', () => {
    if (sidebarMenu.classList.contains('active')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// Close sidebar when close button is clicked
sidebarClose.addEventListener('click', closeSidebar);

// Close sidebar when overlay is clicked
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar when a link is clicked
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar();
    });
});

// Close sidebar when ESC key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarMenu.classList.contains('active')) {
        closeSidebar();
    }
});

// Desktop Navigation Links (if exists)
const navLinks = document.querySelector('.nav-links');
if (navLinks) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
}

// CTA Button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const streamSection = document.getElementById('stream');
        if (streamSection) {
            streamSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Mensagem enviada com sucesso! Obrigado pelo contato.');
        contactForm.reset();
    });
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FF6B35 0%, #FFD700 100%);
        color: #0a0e27;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: 700;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.4);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(255, 107, 53, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(255, 107, 53, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Parallax effect on hero background
const heroBackground = document.querySelector('.hero-background');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    if (heroBackground) {
        heroBackground.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Initialize animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.rule-card, .stat-box').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add touch swipe to close sidebar on mobile
let touchStartX = 0;
let touchEndX = 0;

sidebarMenu.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

sidebarMenu.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    // Swipe right to close (since sidebar comes from right)
    if (touchEndX > touchStartX + 50) {
        closeSidebar();
    }
}

console.log('🎮 Coliseum - CS Tournament loaded successfully!');
console.log('✨ Menu lateral implementado com sucesso!');
