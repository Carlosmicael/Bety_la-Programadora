// Variables globales
let currentSlide = 1;
const totalSlides = 8;
let testimonialIndex = 0;
let testimonialInterval;

// Elementos del DOM
const slides = document.querySelectorAll('.presentation-slide');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const startButton = document.getElementById('start-button');
const progressBar = document.getElementById('progressBar');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');

// Inicialización cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    initializePresentation();
    setupEventListeners();
    setupKeyboardNavigation();
    startTestimonialRotation();
});

// Inicializar la presentación
function initializePresentation() {
    updateSlideCounter();
    updateProgressBar();
    updateNavigationButtons();
    
    // Verificar si existe el primer slide y activarlo
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
    
    // Configurar total de slides
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = totalSlides;
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación con botones
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentSlide < totalSlides) {
                goToSlide(currentSlide + 1);
            }
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentSlide > 1) {
                goToSlide(currentSlide - 1);
            }
        });
    }
    
    // Indicadores de testimonios
    const testimonialIndicators = document.querySelectorAll('.indicator');
    testimonialIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Navegación con gestos táctiles
    setupTouchNavigation();
}

// Navegación con teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                if (currentSlide < totalSlides) {
                    goToSlide(currentSlide + 1);
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (currentSlide > 1) {
                    goToSlide(currentSlide - 1);
                }
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
        }
    });
}

// Navegación táctil
function setupTouchNavigation() {
    let startX = 0;
    let endX = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50; // Umbral mínimo para el swipe
        const swipeDistance = Math.abs(endX - startX);
        
        if (swipeDistance > threshold) {
            if (endX < startX) {
                // Swipe hacia la izquierda - siguiente slide
                if (currentSlide < totalSlides) {
                    goToSlide(currentSlide + 1);
                }
            } else {
                // Swipe hacia la derecha - slide anterior
                if (currentSlide > 1) {
                    goToSlide(currentSlide - 1);
                }
            }
        }
    }
}

// Ir a un slide específico
function goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) return;
    
    // Remover clase active del slide actual
    const currentSlideElement = document.getElementById(`slide-${currentSlide}`);
    if (currentSlideElement) {
        currentSlideElement.classList.remove('active');
    }
    
    // Actualizar número de slide actual
    currentSlide = slideNumber;
    
    // Agregar clase active al nuevo slide
    const newSlideElement = document.getElementById(`slide-${currentSlide}`);
    if (newSlideElement) {
        newSlideElement.classList.add('active');
    }
    
    // Actualizar UI
    updateSlideCounter();
    updateProgressBar();
    updateNavigationButtons();
    
    // Ejecutar animaciones específicas del slide
    executeSlideAnimations(currentSlide);
    
    // Efecto de vibración suave en dispositivos móviles
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

// Actualizar contador de slides
function updateSlideCounter() {
    if (currentSlideSpan) {
        currentSlideSpan.textContent = currentSlide;
    }
}

// Actualizar barra de progreso
function updateProgressBar() {
    if (progressBar) {
        const progress = (currentSlide / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// Actualizar botones de navegación
function updateNavigationButtons() {
    // Botón anterior
    if (prevButton) {
        if (currentSlide <= 1) {
            prevButton.classList.add('d-none');
        } else {
            prevButton.classList.remove('d-none');
        }
    }
    
    // Botón siguiente y botón de inicio
    if (currentSlide >= totalSlides) {
        if (nextButton) nextButton.classList.add('d-none');
        if (startButton) startButton.classList.remove('d-none');
    } else {
        if (nextButton) nextButton.classList.remove('d-none');
        if (startButton) startButton.classList.add('d-none');
    }
}

// Ejecutar animaciones específicas de cada slide
function executeSlideAnimations(slideNumber) {
    switch(slideNumber) {
        case 3: // Slide de estadísticas
            animateCounters();
            break;
        case 7: // Slide de testimonios
            resetTestimonialRotation();
            break;
    }
}

// Animar contadores en el slide de estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += step;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                // Agregar signo "+" al final
                if (target === 700 || target === 32) {
                    counter.textContent = target + '+';
                }
            }
        };
        
        // Resetear contador antes de animar
        counter.textContent = '0';
        setTimeout(updateCounter, 500); // Delay de 500ms
    });
}

// Gestión de testimonios
function startTestimonialRotation() {
    // Solo rotar si estamos en el slide de testimonios
    if (currentSlide === 7) {
        testimonialInterval = setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % 3;
            showTestimonial(testimonialIndex);
        }, 5000); // Cambiar cada 5 segundos
    }
}

function resetTestimonialRotation() {
    clearInterval(testimonialInterval);
    testimonialIndex = 0;
    showTestimonial(0);
    startTestimonialRotation();
}

function showTestimonial(index) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remover clase active de todos los testimonios
    testimonialCards.forEach(card => card.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Activar el testimonio seleccionado
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    testimonialIndex = index;
}

// Efectos de partículas flotantes
function createFloatingParticles() {
    const particles = document.querySelector('.floating-elements');
    if (!particles) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particles.appendChild(particle);
    }
}

// Efecto de escritura automática
function typeWriter(element, text, speed = 50) {
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Efectos de sonido (opcional)
function playTransitionSound() {
    // Crear un sonido suave de transición
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Guardar progreso en localStorage
function saveProgress() {
    localStorage.setItem('presentationProgress', currentSlide);
}

function loadProgress() {
    const savedProgress = localStorage.getItem('presentationProgress');
    if (savedProgress) {
        const slideNumber = parseInt(savedProgress);
        if (slideNumber >= 1 && slideNumber <= totalSlides) {
            goToSlide(slideNumber);
        }
    }
}

// Modo de presentación automática
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        if (currentSlide < totalSlides) {
            goToSlide(currentSlide + 1);
        } else {
            stopAutoPlay();
        }
    }, 8000); // 8 segundos por slide
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Teclas de atajo adicionales
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                saveProgress();
                showNotification('Progreso guardado');
                break;
            case 'l':
                e.preventDefault();
                loadProgress();
                showNotification('Progreso cargado');
                break;
            case 'p':
                e.preventDefault();
                if (autoPlayInterval) {
                    stopAutoPlay();
                    showNotification('Auto-play detenido');
                } else {
                    startAutoPlay();
                    showNotification('Auto-play iniciado');
                }
                break;
        }
    }
});

// Mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.9);
        color: #1e40af;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.style.opacity = '1', 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Optimización para dispositivos móviles
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reducir animaciones en dispositivos móviles
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
        
        // Desactivar partículas flotantes
        const floatingElements = document.querySelector('.floating-elements');
        if (floatingElements) {
            floatingElements.style.display = 'none';
        }
    }
}

// Detectar cambios de orientación
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        optimizeForMobile();
        updateProgressBar();
    }, 500);
});

// Inicializar optimizaciones móviles
window.addEventListener('resize', optimizeForMobile);
optimizeForMobile();

// Prevenir zoom en dispositivos móviles
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Precargar imágenes para mejor rendimiento
function preloadImages() {
    const images = [
        // Agregar aquí las URLs de las imágenes si las hay
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Analíticas básicas (opcional)
function trackSlideView(slideNumber) {
    // Aquí podrías enviar datos a Google Analytics o similar
    console.log(`Slide ${slideNumber} viewed`);
}

// Ejecutar al cambiar slide
function onSlideChange(slideNumber) {
    trackSlideView(slideNumber);
    saveProgress();
}

// Mejorar la función goToSlide para incluir tracking
const originalGoToSlide = goToSlide;
goToSlide = function(slideNumber) {
    originalGoToSlide(slideNumber);
    onSlideChange(slideNumber);
};

console.log('🎯 Presentación de la Cámara de Comercio de Loja cargada correctamente');
console.log('📊 Controles: ← → Flechas | Espacio: Siguiente | Ctrl+P: Auto-play');
console.log('💾 Ctrl+S: Guardar | Ctrl+L: Cargar progreso');