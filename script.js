// ===========================
// Navigation & Mobile Menu
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close menu if clicking on dropdown parent
        if (!link.parentElement.classList.contains('nav-dropdown')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Handle dropdown toggles on mobile
const dropdownItems = document.querySelectorAll('.nav-dropdown');
dropdownItems.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');
    
    dropdownLink.addEventListener('click', (e) => {
        // Only prevent default and toggle on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdownItems.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        }
    });
});

// Close dropdowns when clicking dropdown links (mobile)
document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        dropdownItems.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===========================
// Smooth Scrolling for Navigation Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Active Navigation Link Highlighting
// ===========================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateOnScroll = document.querySelectorAll('.product-card, .service-card, .why-item, .testimonial-card, .value-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission (in production, this would send to a server)
    try {
        // Disable submit button
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        
        // Log form data (in production, this would be sent to a server)
        console.log('Form submitted:', formData);
        
    } catch (error) {
        showMessage('Something went wrong. Please try again later.', 'error');
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// ===========================
// Statistics Counter Animation
// ===========================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16); // 60 FPS
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===========================
// Back to Top Button (Optional Enhancement)
// ===========================
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'scale(1.1)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'scale(1)';
});

// ===========================
// Loading Animation
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Product & Service Cards Interaction
// ===========================
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--border-color)';
    });
});

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--border-color)';
    });
});

// ===========================
// Testimonial Cards Hover Effect
// ===========================
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeft = '4px solid var(--primary-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = 'none';
    });
});

// ===========================
// Phone Number Formatting
// ===========================
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `+1 (${value}`;
            } else if (value.length <= 6) {
                value = `+1 (${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `+1 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    });
}

// ===========================
// Prevent Form Resubmission on Page Refresh
// ===========================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===========================
// Quote Modal System
// ===========================

// Set your n8n (or any webhook) URL here to receive form submissions.
// Leave empty to log to console only (useful for testing).
const QUOTE_WEBHOOK_URL = '';

function openQuoteModal(type) {
    const modal = document.getElementById('quoteModal-' + type);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus first input for accessibility
    setTimeout(() => {
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
    }, 100);
}

function closeQuoteModal(type) {
    const modal = document.getElementById('quoteModal-' + type);
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    // Reset form state
    resetQuoteModal(type);
}

function resetQuoteModal(type) {
    const form = document.getElementById('quoteForm-' + type);
    const success = document.getElementById('qSuccess-' + type);
    if (form) {
        form.reset();
        form.style.display = '';
        // Return to step 1
        form.querySelectorAll('.quote-step-panel').forEach((panel, i) => {
            panel.classList.toggle('active', i === 0);
        });
    }
    if (success) success.style.display = 'none';
    // Reset stepper visibility and state
    const stepper = document.getElementById('quoteStepper-' + type);
    if (stepper) stepper.style.display = '';
    if (stepper) {
        stepper.querySelectorAll('.stepper-step').forEach((step, i) => {
            step.classList.toggle('active', i === 0);
            step.classList.remove('done');
        });
        stepper.querySelectorAll('.stepper-line').forEach(line => line.classList.remove('done'));
    }
    const errEl = document.getElementById('qError-' + type);
    if (errEl) errEl.textContent = '';
}

function goToQuoteStep(type, toStep) {
    const form = document.getElementById('quoteForm-' + type);
    if (!form) return;

    form.querySelectorAll('.quote-step-panel').forEach(panel => {
        panel.classList.toggle('active', parseInt(panel.dataset.panel) === toStep);
    });

    // Update stepper
    const stepper = document.getElementById('quoteStepper-' + type);
    if (stepper) {
        stepper.querySelectorAll('.stepper-step').forEach(step => {
            const s = parseInt(step.dataset.step);
            step.classList.toggle('active', s === toStep);
            step.classList.toggle('done', s < toStep);
        });
        stepper.querySelectorAll('.stepper-line').forEach((line, i) => {
            line.classList.toggle('done', i < toStep - 1);
        });
    }
}

function validateQuoteStep(type, step) {
    const form = document.getElementById('quoteForm-' + type);
    if (!form) return true;
    const panel = form.querySelector(`.quote-step-panel[data-panel="${step}"]`);
    if (!panel) return true;

    let valid = true;
    const errEl = document.getElementById('qError-' + type);
    if (errEl) errEl.textContent = '';

    panel.querySelectorAll('[required]').forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
            field.style.borderColor = '#e53935';
            valid = false;
        }
    });

    // Email check
    const emailField = panel.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());
        if (!emailOk) {
            emailField.style.borderColor = '#e53935';
            valid = false;
        }
    }

    if (!valid && errEl) {
        errEl.textContent = 'Please fill in all required fields correctly.';
    }
    return valid;
}

// ===========================
// Dynamic Vehicle / Driver Count Pills
// ===========================
document.addEventListener('click', (e) => {
    const pill = e.target.closest('.qcount-pill');
    if (!pill) return;

    const target = pill.dataset.target;  // 'vehicle' or 'driver'
    const count = parseInt(pill.dataset.count);

    // Update active pill
    pill.closest('.qcount-pills').querySelectorAll('.qcount-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    // Update hidden input
    const hiddenInputMap = { vehicle: 'numVehicles', driver: 'numDrivers', homeowner: 'numHomeowners', traveler: 'numTravelers' };
    const hiddenInput = document.getElementById(hiddenInputMap[target] || ('num' + target));
    if (hiddenInput) hiddenInput.value = count;

    // Show/hide blocks based on count
    const maxBlocksMap = { vehicle: 3, driver: 4, homeowner: 3, traveler: 2 };
    const maxBlocks = maxBlocksMap[target] || 4;
    for (let i = 1; i <= maxBlocks; i++) {
        const block = document.getElementById(target + '-block-' + i);
        if (block) {
            const show = i <= count;
            block.style.display = show ? '' : 'none';
            // Clear required on hidden blocks so form can submit
            block.querySelectorAll('[required]').forEach(f => {
                if (show) {
                    f.setAttribute('required', '');
                } else {
                    f.removeAttribute('required');
                    f.value = '';
                }
            });
        }
    }
});

// ===========================
// Attach next/prev handlers
// ===========================
document.addEventListener('click', (e) => {
    const nextBtn = e.target.closest('.btn-qnext');
    if (nextBtn) {
        const type = nextBtn.dataset.modal;
        const fromStep = parseInt(nextBtn.dataset.from);
        if (validateQuoteStep(type, fromStep)) {
            goToQuoteStep(type, fromStep + 1);
        }
        return;
    }
    const prevBtn = e.target.closest('.btn-qprev');
    if (prevBtn) {
        const type = prevBtn.dataset.modal;
        const fromStep = parseInt(prevBtn.dataset.from);
        goToQuoteStep(type, fromStep - 1);
    }
});

// Attach form submit handlers
['auto', 'home', 'commercial', 'supervisa'].forEach(type => {
    const form = document.getElementById('quoteForm-' + type);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const lastStep = form.querySelectorAll('.quote-step-panel').length;
        if (!validateQuoteStep(type, lastStep)) return;

        const submitBtn = form.querySelector('.btn-qsubmit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        }

        // Collect all form data
        const data = { form_type: type + '_insurance_quote' };
        new FormData(form).forEach((val, key) => { data[key] = val; });

        try {
            if (QUOTE_WEBHOOK_URL) {
                const response = await fetch(QUOTE_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) throw new Error('Webhook returned ' + response.status);
            } else {
                // No webhook configured — simulate a delay
                await new Promise(r => setTimeout(r, 1200));
                console.log('Quote form submitted (no webhook configured):', data);
            }

            // Show success
            form.style.display = 'none';
            const stepper = document.getElementById('quoteStepper-' + type);
            if (stepper) stepper.style.display = 'none';
            const successEl = document.getElementById('qSuccess-' + type);
            if (successEl) successEl.style.display = 'block';

        } catch (err) {
            console.error('Quote submission error:', err);
            const errEl = document.getElementById('qError-' + type);
            if (errEl) errEl.textContent = 'Something went wrong. Please try again or call us directly.';
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Get My Quote →';
            }
        }
    });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        ['auto', 'home', 'commercial', 'supervisa'].forEach(type => {
            const modal = document.getElementById('quoteModal-' + type);
            if (modal && modal.classList.contains('open')) closeQuoteModal(type);
        });
    }
});

// ===========================
// Populate year dropdowns for G-date selects
// ===========================
(function populateGdateYears() {
    const currentYear = new Date().getFullYear();
    const options = ['<option value="">Year</option>'];
    for (let y = currentYear; y >= 1970; y--) {
        options.push(`<option value="${y}">${y}</option>`);
    }
    document.querySelectorAll('.gdate-year').forEach(sel => {
        sel.innerHTML = options.join('');
    });
})();

// ===========================
// Ontario Driver License Auto-Format  (XXXXX-XXXXX-XXXXX)
// ===========================
document.addEventListener('input', (e) => {
    if (!e.target.classList.contains('dl-format')) return;
    const input = e.target;
    // Strip everything except alphanumeric, uppercase
    let raw = input.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 15);
    // Insert hyphens at positions 5 and 10
    let formatted = raw;
    if (raw.length > 10) {
        formatted = raw.slice(0, 5) + '-' + raw.slice(5, 10) + '-' + raw.slice(10);
    } else if (raw.length > 5) {
        formatted = raw.slice(0, 5) + '-' + raw.slice(5);
    }
    input.value = formatted;
});

// ===========================
// Phone formatting for modal phone fields
// ===========================
document.addEventListener('input', (e) => {
    if (!e.target.classList.contains('modal-phone')) return;
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `+1 (${value}`;
        } else if (value.length <= 6) {
            value = `+1 (${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `+1 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    e.target.value = value;
});

// ===========================
// Console Welcome Message
// ===========================
console.log('%c👋 Welcome to PolicyCover!', 'font-size: 20px; color: #62D84E; font-weight: bold;');
console.log('%cProtect What Matters Most', 'font-size: 14px; color: #6B7280;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #62D84E;');

// ===========================
// Performance Optimization
// ===========================
// Lazy load images (if any are added later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===========================
// Accessibility Enhancements
// ===========================
// Add keyboard navigation for cards
const interactiveCards = document.querySelectorAll('.product-card, .service-card, .why-item, .testimonial-card');
interactiveCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// Focus trap for mobile menu when open
document.addEventListener('keydown', (e) => {
    if (navMenu.classList.contains('active') && e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===========================
// Print Styles Handling
// ===========================
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections before printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});
