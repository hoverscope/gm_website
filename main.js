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

// Configuration - Update this URL to match your backend
const API_BASE_URL = 'http://localhost:3000';

// Updated preregister form handler
document.getElementById('preregisterForm').addEventListener('submit', async function(e) {
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
        try {
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch spinner-icon" style="width: 70%;"></i>';
            submitBtn.disabled = true;
            
            const response = await fetch(`${API_BASE_URL}/api/preregister`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email })
            });
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                alert('Thank you for pre-registering! We\'ll be in touch soon. Check your email for confirmation.');
                this.reset();
                closeModal();
            } else {
                alert('Error: ' + result.message);
            }
            
            // Reset button
            submitBtn.innerHTML = 'Join Waitlist';
            submitBtn.disabled = false;
            
        } catch (error) {
            console.error('Error:', error);
            if (error.message.includes('Failed to fetch')) {
               alert('Cannot connect to server.');
               console.log(error);
            } else {
                alert('An error occurred. Please try again.');
            }
            
            // Reset button
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Join Waitlist';
            submitBtn.disabled = false;
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});


document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('contactFullName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const title = document.getElementById('contactTitle').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    if (!fullName || !email || !title || !message) {
        console.log('Error: All fields are required');
        alert('Please fill in all fields');
        return;
    }
    
    try {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch spinner-icon"></i>';
        submitBtn.disabled = true;
        
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, email, title, message })
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            alert('Thank you for your message! We\'ll get back to you soon. Check your email for confirmation.');
            this.reset();
        } else {
            alert('Error: ' + result.message);
        }
        
        // Reset button
        submitBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
        submitBtn.disabled = false;
        
    } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('Failed to fetch')) {
            alert('Cannot connect to server. Make sure the backend is running on http://localhost:3000');
        } else {
            alert('An error occurred. Please try again.');
        }
        
        // Reset button
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
        submitBtn.disabled = false;
    }
});

// Updated contact form handler (mobile)
document.getElementById('contactFormMobile')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('contactFullNameMobile').value.trim();
    const email = document.getElementById('contactEmailMobile').value.trim();
    const title = document.getElementById('contactTitleMobile').value.trim();
    const message = document.getElementById('contactMessageMobile').value.trim();
    
    if (!fullName || !email || !title || !message) {
        console.log('Error: All fields are required');
        alert('Please fill in all fields');
        return;
    }
    
    try {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch spinner-icon"></i>';
        submitBtn.disabled = true;
        
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, email, title, message })
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            alert('Thank you for your message! We\'ll get back to you soon. Check your email for confirmation.');
            this.reset();
        } else {
            alert('Error: ' + result.message);
        }
        
        // Reset button
        submitBtn.innerHTML = 'Send';
        submitBtn.disabled = false;
        
    } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('Failed to fetch')) {
            alert('Cannot connect to server.');
            console.log(error);
        } else {
            alert('An error occurred. Please try again.');
        }
        
        // Reset button
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Send';
        submitBtn.disabled = false;
    }
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


function initScrollAnimations() {
    const featuresSection = document.querySelector('.features-section');
    const faqSection = document.querySelector('.faq-section');
    const teamWrapper = document.querySelector('.team-section');
    const team = document.querySelector('.team')
    const preregister = document.querySelector('.preregister-section');
    const contact = document.querySelector('.contact-section');
    const mission = document.querySelector('.mission-section');
    
    if (featuresSection) featuresSection.classList.add('scroll-animate');
    if (faqSection) faqSection.classList.add('scroll-animate');
    if (teamWrapper) teamWrapper.classList.add('scroll-animate');
    if (team) teamWrapper.classList.add('scroll-animate');
    if (preregister) preregister.classList.add('scroll-animate');
    if (contact) contact.classList.add('scroll-animate');
    if (mission) mission.classList.add('scroll-animate');
    
    const animateElements = document.querySelectorAll('.scroll-animate, .feature-item, .center-message, .section-header, .faq-item, .team-section, .team');
    
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