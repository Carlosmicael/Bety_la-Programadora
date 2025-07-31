// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) alternative
    initScrollAnimations();
    
    // Initialize form interactions
    initFormInteractions();
    
    // Initialize pricing card interactions
    initPricingInteractions();
    
    // Initialize cart button effect
    initCartButton();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize typing effect for hero title
    initTypingEffect();
});

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger animation for children
                const children = entry.target.querySelectorAll('.benefit-card, .step-card, .pricing-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.benefits-section, .steps-section, .pricing-section, .form-section');
    sections.forEach(section => observer.observe(section));

    // Initial state for animated elements
    const animatedElements = document.querySelectorAll('.benefit-card, .step-card, .pricing-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
    });
}

// Form interactions
function initFormInteractions() {
    const form = document.querySelector('.signature-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Add floating label animation
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
    
    // Form submission prevention (visual only)
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showFormSubmissionFeedback();
    });
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove previous validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    switch(field.type) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            break;
        case 'tel':
            isValid = /^[\d\s\-\+\(\)]{7,}$/.test(value);
            break;
        case 'text':
            if (field.id === 'cedula') {
                isValid = /^\d{10}$/.test(value.replace(/\D/g, ''));
            } else {
                isValid = value.length >= 2;
            }
            break;
        default:
            isValid = value.length > 0;
    }
    
    if (value && isValid) {
        field.classList.add('is-valid');
    } else if (value) {
        field.classList.add('is-invalid');
    }
}

// Pricing card interactions
function initPricingInteractions() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.transform = 'translateY(0) scale(1.05)';
            }
        });
        
        // Add click effect for pricing buttons
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showPricingSelection(card);
            });
        }
    });
}

// Cart button initialization
function initCartButton() {
    const cartButton = document.querySelector('.add-to-cart-btn');
    
    if (cartButton) {
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Procesando...';
            this.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check me-2"></i>¡Agregado al Carrito!';
                this.classList.remove('btn-success');
                this.classList.add('btn-info');
                
                // Show success animation
                showSuccessAnimation();
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.classList.remove('btn-info');
                    this.classList.add('btn-success');
                }, 3000);
            }, 1500);
        });
    }
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-content h1');
    if (!titleElement) return;
    
    const titleText = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let i = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
        if (i < titleText.length) {
            titleElement.innerHTML += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Add blinking cursor
            titleElement.innerHTML += '<span class="blinking-cursor">|</span>';
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// Show pricing selection
function showPricingSelection(card) {
    // Remove selection from other cards
    document.querySelectorAll('.pricing-card').forEach(c => {
        c.classList.remove('selected');
    });
    
    // Add selection to clicked card
    card.classList.add('selected');
    
    // Update form with selected pricing
    const priceType = card.closest('.pricing-category').querySelector('.category-title').textContent;
    const years = card.querySelector('h4').textContent;
    const price = card.querySelector('.price').textContent;
    
    // Show selection feedback
    showToast(`Seleccionado: ${priceType} - ${years} (${price})`, 'success');
    
    // Scroll to form
    document.querySelector('#formulario').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Show form submission feedback
function showFormSubmissionFeedback() {
    showToast('Formulario completado (solo demostración)', 'info');
}

// Show success animation
function showSuccessAnimation() {
    // Create floating success icons
    for (let i = 0; i < 5; i++) {
        createFloatingIcon();
    }
    
    // Show confetti effect
    createConfettiEffect();
}

// Create floating icon
function createFloatingIcon() {
    const icon = document.createElement('div');
    icon.innerHTML = '<i class="fas fa-check-circle"></i>';
    icon.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        color: #28a745;
        pointer-events: none;
        z-index: 9999;
        animation: floatUp 2s ease-out forwards;
    `;
    
    // Random offset
    const offsetX = (Math.random() - 0.5) * 200;
    const offsetY = (Math.random() - 0.5) * 200;
    icon.style.left = `calc(50% + ${offsetX}px)`;
    icon.style.top = `calc(50% + ${offsetY}px)`;
    
    document.body.appendChild(icon);
    
    // Remove after animation
    setTimeout(() => {
        if (icon.parentNode) {
            icon.parentNode.removeChild(icon);
        }
    }, 2000);
}

// Create confetti effect
function createConfettiEffect() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}%;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        padding: 1rem 1.5rem;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        border-left: 4px solid ${getToastColor(type)};
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getToastColor(type) {
    const colors = {
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(0.8);
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .blinking-cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .pricing-card.selected {
        border-color: #28a745 !important;
        box-shadow: 0 0 20px rgba(40, 167, 69, 0.3) !important;
    }
    
    .form-floating.focused label {
        color: var(--primary-color) !important;
    }
    
    .is-valid {
        border-color: #28a745 !important;
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(style);

// Smooth scroll for anchor links
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

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function(e) {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();