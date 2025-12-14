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
const searchButton = document.querySelector('.btn-search');
if (searchButton) {
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Search functionality would be implemented here. Thank you for your interest!');
    });
}

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

