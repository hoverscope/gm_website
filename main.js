function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const arrow = button.querySelector('.faq-arrow');

    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = null;
        arrow.style.transform = 'rotate(0deg)';
    } else {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        arrow.style.transform = 'rotate(180deg)';
    }
}

function openModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    document.getElementById('preregisterForm').reset();
    clearErrors();
}

function clearErrors() {
    document.getElementById('fullNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
}

function validateName(name) {
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    return nameRegex.test(name) && name.trim().length > 0;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.getElementById('preregisterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    let isValid = true;

    clearErrors();

    if (!fullName) {
        document.getElementById('fullNameError').textContent = 'Full name is required';
        isValid = false;
    } else if (!validateName(fullName)) {
        document.getElementById('fullNameError').textContent = 'Full name can only contain letters, spaces, hyphens, and apostrophes';
        isValid = false;
    }

    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (isValid) {
        alert('Thank you for pre-registering! We\'ll be in touch soon.');
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const fullName = document.getElementById('contactFullName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const title = document.getElementById('contactTitle').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!fullName || !email || !title || !message) {
        console.log('Error: Nuh uh you cant do that');
        return;
    }

    console.log('Desktop Contact Form Submitted:', { fullName, email, title, message });
    this.reset();
    alert('Thank you for your message! We\'ll get back to you soon.');
});

document.getElementById('contactFormMobile')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const fullName = document.getElementById('contactFullNameMobile').value.trim();
    const email = document.getElementById('contactEmailMobile').value.trim();
    const title = document.getElementById('contactTitleMobile').value.trim();
    const message = document.getElementById('contactMessageMobile').value.trim();

    if (!fullName || !email || !title || !message) {
        console.log('Error: Nuh uh you cant do that');
        return;
    }

    console.log('Mobile Contact Form Submitted:', { fullName, email, title, message });
    this.reset();
});


let autoScrollInterval;
let userInteracting = false;
let lastUserInteraction = 0;
const AUTO_SCROLL_SPEED = 0.75;
const PAUSE_AFTER_INTERACTION = 1000;

const scroller = document.getElementById("team-scroller");
let originalWidth = 0;
let cardsCloned = false;

function startAutoScroll() {
    if (autoScrollInterval) return;

    autoScrollInterval = setInterval(() => {
        if (!userInteracting && Date.now() - lastUserInteraction > PAUSE_AFTER_INTERACTION) {
            const maxScroll = originalWidth * 6;
            if (scroller.scrollLeft < maxScroll) {
                scroller.scrollLeft += AUTO_SCROLL_SPEED;
            } else {
                scroller.scrollLeft = originalWidth * 3;
            }
        }
    }, 16);
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

function cloneCards(times = 3) {
    if (cardsCloned) return;
    cardsCloned = true;

    const originalCards = Array.from(scroller.children);

    for (let i = 0; i < times; i++) {
        originalCards.forEach(card => {
            scroller.appendChild(card.cloneNode(true));
        });
    }

    for (let i = 0; i < times; i++) {
        [...originalCards].reverse().forEach(card => {
            scroller.insertBefore(card.cloneNode(true), scroller.firstChild);
        });
    }
}

window.onload = () => {
    cloneCards();

    const card = scroller.querySelector('.team-card');
    if (card) {
        const cardWidth = card.offsetWidth;
        const cardCount = 7;
        originalWidth = cardWidth * cardCount;
        scroller.scrollLeft = originalWidth * 3;
        setTimeout(startAutoScroll, 1000);
    }
};

scroller.addEventListener("scroll", () => {
    const resetThreshold = 50;

    if (scroller.scrollLeft >= originalWidth * 6 - resetThreshold) {
        scroller.scrollLeft = originalWidth * 3;
    }

    if (scroller.scrollLeft <= resetThreshold) {
        scroller.scrollLeft = originalWidth * 4;
    }
});

let isDown = false;
let startX;
let scrollLeftStart;

scroller.addEventListener('mousedown', (e) => {
    userInteracting = true;
    lastUserInteraction = Date.now();
    stopAutoScroll();

    isDown = true;
    scroller.style.cursor = 'grabbing';
    startX = e.pageX - scroller.offsetLeft;
    scrollLeftStart = scroller.scrollLeft;
});

scroller.addEventListener('mouseup', () => {
    isDown = false;
    scroller.style.cursor = 'grab';
    userInteracting = false;
    lastUserInteraction = Date.now();
    setTimeout(startAutoScroll, PAUSE_AFTER_INTERACTION);
});

scroller.addEventListener('mouseleave', () => {
    isDown = false;
    scroller.style.cursor = 'grab';
    userInteracting = false;
    lastUserInteraction = Date.now();
    setTimeout(startAutoScroll, PAUSE_AFTER_INTERACTION);
});

scroller.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scroller.offsetLeft;
    const walk = (startX - x) * 1.2;
    scroller.scrollLeft = scrollLeftStart + walk;
});

let touchScrollTimeout;
let lastScrollPosition = 0;
let scrollVelocity = 0;

scroller.addEventListener('touchstart', () => {
    userInteracting = true;
    lastUserInteraction = Date.now();
    stopAutoScroll();
    lastScrollPosition = scroller.scrollLeft;

    if (touchScrollTimeout) clearTimeout(touchScrollTimeout);
}, { passive: true });

scroller.addEventListener('scroll', () => {
    if (userInteracting) {
        lastUserInteraction = Date.now();
        scrollVelocity = Math.abs(scroller.scrollLeft - lastScrollPosition);
        lastScrollPosition = scroller.scrollLeft;

        if (touchScrollTimeout) clearTimeout(touchScrollTimeout);

        touchScrollTimeout = setTimeout(() => {
            userInteracting = false;
            lastUserInteraction = Date.now();
            setTimeout(startAutoScroll, PAUSE_AFTER_INTERACTION);
        }, 150);
    }
});

document.addEventListener('touchend', (e) => {
    if (!scroller.contains(e.target)) {
        if (touchScrollTimeout) clearTimeout(touchScrollTimeout);

        touchScrollTimeout = setTimeout(() => {
            userInteracting = false;
            lastUserInteraction = Date.now();
            setTimeout(startAutoScroll, PAUSE_AFTER_INTERACTION);
        }, 300);
    }
}, { passive: true });

scroller.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

setInterval(() => {
    if (scroller.scrollLeft <= 0 || scroller.scrollLeft >= originalWidth * 6) {
        console.warn('Auto-scroll reset triggered');
        scroller.scrollLeft = originalWidth * 3;
    }
}, 10000);


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function initScrollAnimations() {
    const sections = [
        '.features-section',
        '.faq-section',
        '.team-wrapper',
        '.preregister-section',
        '.contact-section'
    ];

    sections.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.classList.add('scroll-animate');
    });

    const animateElements = document.querySelectorAll('.scroll-animate, .feature-item, .center-message, .section-header, .faq-item, .team-section');
    animateElements.forEach(el => observer.observe(el));
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const targetText = link.textContent.toLowerCase();
            let targetSection = null;

            switch (targetText) {
                case 'features':
                    targetSection = document.querySelector('.features-row');
                    break;
                case 'faq':
                    targetSection = document.querySelector('.faq-section');
                    break;
                case 'team':
                    targetSection = document.querySelector('.team-wrapper');
                    break;
                case 'contact':
                    targetSection = document.querySelector('.contact-section');
                    break;
            }

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function toggleMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    const icon = document.getElementById('hamburger-icon');
    const html = document.documentElement;

    overlay.classList.toggle('active');
    html.classList.toggle('menu-open');

    icon.className = overlay.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
}

function closeMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    const icon = document.getElementById('hamburger-icon');
    const html = document.documentElement;

    overlay.classList.remove('active');
    html.classList.remove('menu-open');
    icon.className = 'fas fa-bars';
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavigation();
});
