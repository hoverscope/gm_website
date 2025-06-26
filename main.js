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
      console.log('Error: Nuh uh you cant do that')
      return
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
      console.log('Error: Nuh uh you cant do that')
      return
    }
    
  
    console.log('Mobile Contact Form Submitted:', { fullName, email, title, message });
    
  
    this.reset();
});

// Interactive navigation dots
const dots = document.querySelectorAll('.nav-dot');
const container = document.getElementById('teamContainer');
const members = document.querySelectorAll('.team-member');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        
        const memberWidth = members[0].offsetWidth + 20;
        container.scrollTo({
            left: memberWidth * index,
            behavior: 'smooth'
        });
    });
});

// Update active dot on scroll
container.addEventListener('scroll', () => {
    const scrollLeft = container.scrollLeft;
    const memberWidth = members[0].offsetWidth + 20;
    const activeIndex = Math.round(scrollLeft / memberWidth);
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
});

let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
    container.classList.add('dragging');
});

container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
    setTimeout(() => {
        container.classList.remove('dragging');
    }, 100);
});

container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
});

container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
});

document.querySelectorAll('.linkedin-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.add('clicked');
    setTimeout(() => {
      btn.classList.remove('clicked');
    }, 150);
  });
});

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

document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

let scrollTimeout;
container.addEventListener('scroll', () => {
    container.classList.add('scrolling');
    clearTimeout(scrollTimeout);
    
    const scrollLeft = container.scrollLeft;
    const memberWidth = members[0].offsetWidth + 20;
    const activeIndex = Math.round(scrollLeft / memberWidth);
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
    
    scrollTimeout = setTimeout(() => {
        container.classList.remove('scrolling');
    }, 150);
});

function initScrollAnimations() {
    const featuresSection = document.querySelector('.features-section');
    const faqSection = document.querySelector('.faq-section');
    const teamWrapper = document.querySelector('.team-wrapper');
    const preregister = document.querySelector('.preregister-section');
    const contact = document.querySelector('.contact-section');
    
    if (featuresSection) featuresSection.classList.add('scroll-animate');
    if (faqSection) faqSection.classList.add('scroll-animate');
    if (teamWrapper) teamWrapper.classList.add('scroll-animate');
    if (preregister) preregister.classList.add('scroll-animate');
    if (contact) contact.classList.add('scroll-animate');
    
    const animateElements = document.querySelectorAll('.scroll-animate, .feature-item, .center-message, .section-header, .faq-item, .team-section');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
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
            
            switch(targetText) {
              case 'mission':
                  targetSection = document.querySelector('.mission-section');
                  break;
              case 'features':
                  targetSection = document.querySelector('.features-section');
                  break;
              case 'faq':
                  targetSection = document.querySelector('.faq-section');
                  break;
              case 'team':
                  targetSection = document.querySelector('.team-section');
                  break;
              case 'contact':
                  targetSection = document.querySelector('.contact-section');
                  break;
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
    
    if (overlay.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
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
    initNavigation()
});