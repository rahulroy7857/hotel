// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and sign up for a free account
// 2. Create an Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template
// 4. Get your Public Key from Account > General
// 5. Replace the values below with your credentials

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'MdwkpD0G3e2-i47CO',        // Your EmailJS Public Key
    SERVICE_ID: 'service_hh832ug',        // Your EmailJS Service ID
    TEMPLATE_ID: 'template_boxmm7f',      // Your EmailJS Template ID
    ADMIN_EMAIL: 'rahulkumar53500@gmail.com'  // Admin email (already set)
};

// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // Set active nav link based on current page
            setActiveNavLink();
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

// Function to set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
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

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(`
        .animate-fade-in,
        .animate-fade-in-left,
        .animate-fade-in-left-delay,
        .animate-fade-in-right,
        .animate-slide-up,
        .animate-scale-in,
        .animate-scale-in-delay,
        .animate-scale-in-delay-2,
        .animate-fade-in-up,
        .animate-fade-in-up-delay,
        .animate-fade-in-up-delay-2,
        .animate-fade-in-up-delay-3
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in-on-scroll');
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const rate = scrolled * 0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Image hover zoom effect
document.querySelectorAll('.card-image img, .service-image img, .city-image img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.6s ease';
    });
});

// Testimonial carousel functionality
let currentTestimonial = 0;
const testimonials = [
    {
        text: "The restaurant was absolutely amazing! The food was delicious, and the service was impeccable. We had a wonderful time and would highly recommend it.",
        author: "John Doe, New York"
    },
    {
        text: "Our stay at CozyStay was exceptional. The apartments are beautifully furnished and the location is perfect. The staff went above and beyond to make our visit memorable.",
        author: "Sarah Johnson, Los Angeles"
    },
    {
        text: "I've stayed in many hotels, but CozyStay offers something truly special. The combination of luxury and comfort is unmatched. I'll definitely be back!",
        author: "Michael Chen, San Francisco"
    }
];

function updateTestimonial(index) {
    const testimonialText = document.querySelector('.testimonial-text');
    const testimonialAuthor = document.querySelector('.testimonial-author');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialText && testimonialAuthor) {
        testimonialText.style.opacity = '0';
        testimonialAuthor.style.opacity = '0';
        
        setTimeout(() => {
            testimonialText.textContent = `"${testimonials[index].text}"`;
            testimonialAuthor.textContent = testimonials[index].author;
            testimonialText.style.opacity = '1';
            testimonialAuthor.style.opacity = '1';
        }, 300);
    }
    
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Testimonial dots click handlers
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        updateTestimonial(currentTestimonial);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
}, 5000);

// Booking widget date inputs - set minimum date to today
const checkInInput = document.querySelector('input[type="date"]');
const checkOutInput = document.querySelectorAll('input[type="date"]')[1];

if (checkInInput) {
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);
    checkInInput.addEventListener('change', function() {
        if (checkOutInput) {
            const checkInDate = new Date(this.value);
            checkInDate.setDate(checkInDate.getDate() + 1);
            checkOutInput.setAttribute('min', checkInDate.toISOString().split('T')[0]);
        }
    });
}

// Search button functionality
function handleSearch() {
    // Get form inputs - use more specific selectors
    const bookingWidget = document.querySelector('.booking-widget');
    if (!bookingWidget) {
        console.error('Booking widget not found');
        return false;
    }
    
    const dateInputs = bookingWidget.querySelectorAll('input[type="date"]');
    const checkInInput = dateInputs[0];
    const checkOutInput = dateInputs[1];
    const guestSelect = document.getElementById('guest-select');
    const roomTypeSelect = document.getElementById('room-type-select');
    
    // Get values
    const checkIn = checkInInput ? checkInInput.value : '';
    const checkOut = checkOutInput ? checkOutInput.value : '';
    const guests = guestSelect ? guestSelect.value : '1';
    const roomType = roomTypeSelect ? roomTypeSelect.value : 'all-types';
    
    // Validation
    if (!checkIn) {
        showSearchError('Please select a check-in date.');
        checkInInput?.focus();
        return false;
    }
    
    if (!checkOut) {
        showSearchError('Please select a check-out date.');
        checkOutInput?.focus();
        return false;
    }
    
    // Date validation
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
        showSearchError('Check-in date cannot be in the past.');
        checkInInput?.focus();
        return false;
    }
    
    if (checkOutDate <= checkInDate) {
        showSearchError('Check-out date must be after check-in date.');
        checkOutInput?.focus();
        return false;
    }
    
    // Store search parameters in sessionStorage
    const searchParams = {
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests,
        roomType: roomType
    };
    
    sessionStorage.setItem('bookingSearch', JSON.stringify(searchParams));
    
    // Redirect to rooms page with search parameters
    const params = new URLSearchParams({
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests,
        roomType: roomType
    });
    
    window.location.href = `rooms.html?${params.toString()}`;
    
    return true;
}

// Function to show search error messages
function showSearchError(message) {
    // Remove existing error message if any
    const existingError = document.querySelector('.search-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'search-error-message alert alert-danger mt-3';
    errorDiv.style.cssText = 'margin-top: 10px; padding: 10px 15px; border-radius: 5px;';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i>${message}`;
    
    // Insert after booking widget
    const bookingWidget = document.querySelector('.booking-widget');
    if (bookingWidget) {
        bookingWidget.appendChild(errorDiv);
        
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.transition = 'opacity 0.3s ease';
                errorDiv.style.opacity = '0';
                setTimeout(() => errorDiv.remove(), 300);
            }
        }, 5000);
    } else {
        // Fallback to alert if widget not found
        alert(message);
    }
}

// Attach search functionality to search button
const searchButton = document.querySelector('.btn-search');
if (searchButton) {
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleSearch();
    });
}

// Allow Enter key to trigger search in date inputs
document.addEventListener('DOMContentLoaded', () => {
    const bookingWidget = document.querySelector('.booking-widget');
    if (bookingWidget) {
        const dateInputs = bookingWidget.querySelectorAll('input[type="date"]');
        const selects = bookingWidget.querySelectorAll('select');
        
        [...dateInputs, ...selects].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                }
            });
        });
    }
});

// Book Now button functionality
const bookNowButton = document.querySelector('.btn-book');
if (bookNowButton) {
    bookNowButton.addEventListener('click', (e) => {
        e.preventDefault();
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        const privacyCheck = newsletterForm.querySelector('#privacyCheck').checked;
        
        if (!privacyCheck) {
            alert('Please agree to the Privacy Policy to subscribe.');
            return;
        }
        
        if (email) {
            alert('Thank you for subscribing! You will receive our latest news and special offers.');
            newsletterForm.reset();
        }
    });
}

// Phone input restriction - only digits, max 10 digits
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    // Only allow digits on input
    phoneInput.addEventListener('input', function(e) {
        // Remove any non-digit characters
        this.value = this.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });
    
    // Prevent non-digit characters on keypress
    phoneInput.addEventListener('keypress', function(e) {
        // Allow: backspace, delete, tab, escape, enter
        if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    
    // Prevent paste of non-digit characters
    phoneInput.addEventListener('paste', function(e) {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        const digitsOnly = pastedText.replace(/\D/g, '').slice(0, 10);
        this.value = digitsOnly;
    });
}

// Contact form submission with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm && typeof EMAILJS_CONFIG !== 'undefined') {
    // Initialize EmailJS with public key
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnSpinner = submitBtn.querySelector('.btn-spinner');
        const formMessage = document.getElementById('formMessage');
        
        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate phone number (must be exactly 10 digits)
        if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            formMessage.classList.remove('d-none');
            formMessage.classList.remove('alert-success');
            formMessage.classList.add('alert-danger');
            formMessage.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Please enter a valid 10-digit mobile number.';
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.classList.add('d-none');
        btnSpinner.classList.remove('d-none');
        formMessage.classList.add('d-none');

        // Prepare email template parameters
        const templateParams = {
            to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
            to_name: 'Admin',
            from_name: `${firstName} ${lastName}`,
            from_email: email,
            phone: phone,
            subject: subject,
            message: message,
            reply_to: email,
            user_email: email,
            user_name: `${firstName} ${lastName}`,
            user_phone: phone
        };

        try {
            // Check if EmailJS is configured
            if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
                !EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' ||
                !EMAILJS_CONFIG.TEMPLATE_ID || EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
                throw new Error('EmailJS is not configured. Please set up your credentials in emailjs-config.js');
            }

            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );

            // Success
            formMessage.classList.remove('d-none');
            formMessage.classList.remove('alert-danger');
            formMessage.classList.add('alert-success');
            formMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully. We will get back to you soon.';
            contactForm.reset();
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            formMessage.classList.remove('d-none');
            formMessage.classList.remove('alert-success');
            formMessage.classList.add('alert-danger');
            
            if (error.text && error.text.includes('not configured')) {
                formMessage.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Email service is not configured. Please contact the website administrator.';
            } else {
                formMessage.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Sorry, there was an error sending your message. Please try again later or contact us directly.';
            }
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.classList.remove('d-none');
            btnSpinner.classList.add('d-none');
        }
    });
}

// Enhanced lazy loading for images with loading="lazy"
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            if (img.complete) {
                img.classList.add('loaded');
            }
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            if (img.complete) {
                img.classList.add('loaded');
            }
        });
    }
});

// Animate counter for statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Lazy loading for images (performance optimization)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth reveal animation on scroll
const revealElements = document.querySelectorAll('.section-content, .service-card, .city-card, .apartment-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(el);
});

// Mobile menu close on link click
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .navbar-nav .nav-link.active {
        color: var(--accent-gold) !important;
    }
    .navbar-nav .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

