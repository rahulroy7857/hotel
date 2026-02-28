// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and sign up for a free account
// 2. Create an Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template
// 4. Get your Public Key from Account > General
// 5. Replace the values below with your credentials

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'MdwkpD0G3e2-i47CO',        // Your EmailJS Public Key
    SERVICE_ID: 'service_hh832ug',          // Your EmailJS Service ID
    TEMPLATE_ID: 'template_boxmm7f',        // Your EmailJS Template ID
    ADMIN_EMAIL: 'rahulkumar53500@gmail.com' // All emails send to this address; template "To Email" must be {{to_email}}
};
// Recipient for all form emails – ensure template uses {{to_email}} in EmailJS dashboard
const RECIPIENT_EMAIL = 'rahulkumar53500@gmail.com';

// Ensure EmailJS is available (same as test-email.html). Load script if missing so index/contact work like test page.
function ensureEmailJSLoaded() {
    return new Promise(function (resolve) {
        if (typeof window.emailjs !== 'undefined') {
            resolve();
            return;
        }
        var s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        s.async = false;
        s.onload = function () { resolve(); };
        s.onerror = function () { resolve(); };
        document.head.appendChild(s);
    });
}

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

// Navbar scroll effect (navbar may be null until header is loaded)
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
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
        author: "John Doe, Bihar"
    },
    {
        text: "Our stay at CozyStay was exceptional. The apartments are beautifully furnished and the location is perfect. The staff went above and beyond to make our visit memorable.",
        author: "Sarah Ray, Patna"
    },
    {
        text: "I've stayed in many hotels, but CozyStay offers something truly special. The combination of luxury and comfort is unmatched. I'll definitely be back!",
        author: "Michael Chen, Bihar"
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

// Validate booking widget (check-in, check-out, guests, room type) before opening modal. Returns true if valid.
function validateBookingWidgetBeforeModal() {
    const bookingWidget = document.querySelector('.booking-widget');
    if (!bookingWidget) return false;
    const dateInputs = bookingWidget.querySelectorAll('input[type="date"]');
    const checkInInput = dateInputs[0];
    const checkOutInput = dateInputs[1];
    const guestSelect = document.getElementById('guest-select');
    const roomTypeSelect = document.getElementById('room-type-select');
    const checkIn = checkInInput?.value?.trim() || '';
    const checkOut = checkOutInput?.value?.trim() || '';
    const guests = guestSelect?.value?.trim() || '';
    const roomType = roomTypeSelect?.value?.trim() || '';

    if (!checkIn) {
        showSearchError('Please select check-in date.');
        checkInInput?.focus();
        return false;
    }
    if (!checkOut) {
        showSearchError('Please select check-out date.');
        checkOutInput?.focus();
        return false;
    }
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
    if (!guests) {
        showSearchError('Please select number of guests.');
        guestSelect?.focus();
        return false;
    }
    if (!roomType || roomType === 'all-types') {
        showSearchError('Please select a room type.');
        roomTypeSelect?.focus();
        return false;
    }
    return true;
}

// Format YYYY-MM-DD to "February 28, 2026" for email (no decimals, plain string)
function formatDateForEmail(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T12:00:00');
    if (isNaN(d.getTime())) return dateStr;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

// Get check-in, check-out, guest, room_type from booking widget
function getBookingWidgetData() {
    const bookingWidget = document.querySelector('.booking-widget');
    if (!bookingWidget) return { from_date: '', to_date: '', guest: '', room_type: '' };
    const dateInputs = bookingWidget.querySelectorAll('input[type="date"]');
    const guestSelect = document.getElementById('guest-select');
    const roomTypeSelect = document.getElementById('room-type-select');
    const checkIn = dateInputs[0]?.value || '';
    const checkOut = dateInputs[1]?.value || '';
    return {
        from_date: formatDateForEmail(checkIn),
        to_date: formatDateForEmail(checkOut),
        guest: (guestSelect && guestSelect.value) ? guestSelect.value : '',
        room_type: (roomTypeSelect && roomTypeSelect.value) ? roomTypeSelect.value : ''
    };
}

function getSearchRequestFormData() {
    return {
        name: document.getElementById('searchReqName')?.value?.trim() || '',
        email: document.getElementById('searchReqEmail')?.value?.trim() || '',
        phone: document.getElementById('searchReqPhone')?.value?.trim() || ''
    };
}

function hasFilledAnySearchDetail(d) {
    return !!(d.name || d.email || d.phone);
}

// Send search request email using same template as test-email.html. Returns a Promise that resolves when sent (or when skipped).
function sendSearchRequestEmail(name, email, phone, from_date, to_date, guest, room_type, cancelled) {
    if (!hasFilledAnySearchDetail({ name, email, phone })) return Promise.resolve();
    if (typeof EMAILJS_CONFIG === 'undefined') return Promise.resolve();
    var subject = cancelled ? 'Search Request (Cancelled) - Hills Castle Inn' : 'Search Request - Hills Castle Inn';
    var message = cancelled
        ? 'User closed the form. We welcome your request at Hills Castle Inn.'
        : 'We welcome your request at Hills Castle Inn.';
    var templateParams = {
        to_email: RECIPIENT_EMAIL,
        to_name: 'Admin',
        from_name: name || 'Website Guest',
        from_email: email || 'noreply@castelhills.com',
        phone: phone || '-',
        subject: subject,
        message: message,
        guest: guest || '',
        from_date: from_date || '',
        to_date: to_date || '',
        room_type: room_type || '',
        reply_to: email || '',
        user_email: email || '',
        user_name: name || '',
        user_phone: phone || ''
    };
    return ensureEmailJSLoaded().then(function () {
        if (typeof window.emailjs === 'undefined') {
            console.error('Search request email error: EmailJS did not load.');
            return;
        }
        window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        return window.emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams);
    }).catch(function (err) {
        console.error('Search request email error:', err);
    });
}

// Attach search functionality to search button
const searchButton = document.querySelector('.btn-search');
if (searchButton) {
    const searchModalEl = document.getElementById('searchRequestModal');
    if (searchModalEl) {
        const searchModal = new bootstrap.Modal(searchModalEl);
        let searchModalClosedByOk = false;
        let searchModalClosedByCancelBtn = false;

        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (!validateBookingWidgetBeforeModal()) return;
            searchModalClosedByOk = false;
            searchModalClosedByCancelBtn = false;
            searchModal.show();
        });

        document.getElementById('searchModalOkBtn')?.addEventListener('click', () => {
            const d = getSearchRequestFormData();
            const w = getBookingWidgetData();
            const emailPromise = hasFilledAnySearchDetail(d)
                ? sendSearchRequestEmail(d.name, d.email, d.phone, w.from_date, w.to_date, w.guest, w.room_type, false)
                : Promise.resolve();
            emailPromise.finally(() => {
                searchModalClosedByOk = true;
                searchModal.hide();
                handleSearch();
            });
        });

        document.getElementById('searchModalCancelBtn')?.addEventListener('click', () => {
            const d = getSearchRequestFormData();
            const w = getBookingWidgetData();
            if (hasFilledAnySearchDetail(d)) sendSearchRequestEmail(d.name, d.email, d.phone, w.from_date, w.to_date, w.guest, w.room_type, true);
            searchModalClosedByCancelBtn = true;
            searchModal.hide();
        });

        searchModalEl.addEventListener('hidden.bs.modal', () => {
            if (!searchModalClosedByOk && !searchModalClosedByCancelBtn) {
                const d = getSearchRequestFormData();
                const w = getBookingWidgetData();
                if (hasFilledAnySearchDetail(d)) sendSearchRequestEmail(d.name, d.email, d.phone, w.from_date, w.to_date, w.guest, w.room_type, true);
            }
            searchModalClosedByOk = false;
            searchModalClosedByCancelBtn = false;
        });
    } else {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            handleSearch();
        });
    }
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
                    if (document.getElementById('searchRequestModal')) searchButton?.click();
                    else handleSearch();
                }
            });
        });
    }
});

// Book Now button functionality – skip contact form submit so "SEND MESSAGE" works
document.querySelectorAll('.btn-book').forEach(function (btn) {
    if (btn.closest('#contactForm')) return;
    btn.addEventListener('click', function (e) {
        var heroSection = document.querySelector('#home');
        if (heroSection && (this.tagName === 'BUTTON' || this.getAttribute('href') === '#')) {
            e.preventDefault();
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

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

// Contact form submission with EmailJS – ensure emails go to RECIPIENT_EMAIL
function initContactFormWithEmail() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm || typeof EMAILJS_CONFIG === 'undefined') return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
        const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
        const formMessage = document.getElementById('formMessage');
        const firstName = (document.getElementById('firstName') && document.getElementById('firstName').value) ? document.getElementById('firstName').value.trim() : '';
        const lastName = (document.getElementById('lastName') && document.getElementById('lastName').value) ? document.getElementById('lastName').value.trim() : '';
        const email = (document.getElementById('email') && document.getElementById('email').value) ? document.getElementById('email').value.trim() : '';
        const phone = (document.getElementById('phone') && document.getElementById('phone').value) ? document.getElementById('phone').value.trim() : '';
        const subject = (document.getElementById('subject') && document.getElementById('subject').value) ? document.getElementById('subject').value : '';
        const message = (document.getElementById('message') && document.getElementById('message').value) ? document.getElementById('message').value.trim() : '';

        if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            if (formMessage) {
                formMessage.classList.remove('d-none', 'alert-success');
                formMessage.classList.add('alert-danger');
                formMessage.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Please enter a valid 10-digit mobile number.';
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            return;
        }

        if (submitBtn) submitBtn.disabled = true;
        if (btnText) btnText.classList.add('d-none');
        if (btnSpinner) btnSpinner.classList.remove('d-none');
        if (formMessage) formMessage.classList.add('d-none');

        // Recipient: always rahulkumar53500@gmail.com; template "To Email" must be {{to_email}}
        const templateParams = {
            to_email: RECIPIENT_EMAIL,
            to_name: 'Admin',
            from_name: (firstName + ' ' + lastName).trim() || 'Website Guest',
            from_email: email || '',
            phone: phone,
            subject: subject || 'Contact form',
            message: message,
            guest: '',
            from_date: '',
            to_date: '',
            room_type: '',
            reply_to: email || '',
            user_email: email || '',
            user_name: (firstName + ' ' + lastName).trim() || 'Website Guest',
            user_phone: phone
        };

        if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
            !EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' ||
            !EMAILJS_CONFIG.TEMPLATE_ID || EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
            if (formMessage) {
                formMessage.classList.remove('d-none', 'alert-success');
                formMessage.classList.add('alert-danger');
                formMessage.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Email service is not configured.';
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            if (submitBtn) submitBtn.disabled = false;
            if (btnText) btnText.classList.remove('d-none');
            if (btnSpinner) btnSpinner.classList.add('d-none');
            return;
        }
        ensureEmailJSLoaded().then(function () {
            if (typeof window.emailjs === 'undefined') {
                if (formMessage) {
                    formMessage.classList.remove('d-none', 'alert-success');
                    formMessage.classList.add('alert-danger');
                    formMessage.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Email script did not load. Check your connection and try again.';
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                if (submitBtn) submitBtn.disabled = false;
                if (btnText) btnText.classList.remove('d-none');
                if (btnSpinner) btnSpinner.classList.add('d-none');
                return;
            }
            window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            window.emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
                .then(function () {
                    if (formMessage) {
                        formMessage.classList.remove('d-none', 'alert-danger');
                        formMessage.classList.add('alert-success');
                        formMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully. We will get back to you soon.';
                        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    // alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
                    contactForm.reset();
                })
                .catch(function (error) {
                    console.error('EmailJS Error:', error);
                    if (formMessage) {
                        formMessage.classList.remove('d-none', 'alert-success');
                        formMessage.classList.add('alert-danger');
                        formMessage.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Sorry, there was an error sending your message. Please try again or email us directly.';
                        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                })
                .finally(function () {
                    if (submitBtn) submitBtn.disabled = false;
                    if (btnText) btnText.classList.remove('d-none');
                    if (btnSpinner) btnSpinner.classList.add('d-none');
                });
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initContactFormWithEmail();
});

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

