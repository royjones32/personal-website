// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .about-text, .about-video');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// YouTube iframe video handling with immediate fallback
const iframe = document.querySelector('iframe[src*="youtube"]');
if (iframe) {
    console.log('YouTube video iframe loaded');
    
    // Immediate fallback - show YouTube link instead of iframe
    showVideoFallback();
    
    // Also set up error handling as backup
    iframe.addEventListener('error', function() {
        console.log('YouTube iframe error occurred');
        showVideoFallback();
    });
}

function showVideoFallback() {
    const videoContainer = document.querySelector('.about-video');
    if (videoContainer) {
        videoContainer.innerHTML = `
            <h3>Tanıtım Videosu</h3>
            <div style="background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%); padding: 3rem; text-align: center; border-radius: 15px; color: white; box-shadow: 0 10px 30px rgba(255, 0, 0, 0.3);">
                <div style="margin-bottom: 2rem;">
                    <i class="fab fa-youtube" style="font-size: 5rem; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3);"></i>
                </div>
                <h4 style="margin-bottom: 1rem; font-size: 1.8rem; font-weight: 700;">Videoyu YouTube'da İzleyin</h4>
                <p style="margin-bottom: 2rem; opacity: 0.9; font-size: 1.1rem;">Video şu anda burada oynatılamıyor, ancak YouTube'da izleyebilirsiniz.</p>
                <a href="https://www.youtube.com/watch?v=Yk0pNKlTLKo" target="_blank" 
                   style="background: white; color: #ff0000; padding: 18px 35px; text-decoration: none; border-radius: 50px; font-weight: 700; display: inline-block; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(0,0,0,0.2); font-size: 1.1rem;">
                    <i class="fab fa-youtube" style="margin-right: 10px; font-size: 1.2rem;"></i>
                    YouTube'da İzle
                </a>
                <div style="margin-top: 1.5rem; opacity: 0.8; font-size: 0.9rem;">
                    <i class="fas fa-external-link-alt" style="margin-right: 5px;"></i>
                    Yeni sekmede açılır
                </div>
            </div>
        `;
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Contact form validation (if you add a form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add click effects to buttons
document.querySelectorAll('.cta-button, .project-link').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        let rect = this.getBoundingClientRect();
        let size = Math.max(rect.width, rect.height);
        let x = e.clientX - rect.left - size / 2;
        let y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cta-button, .project-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
