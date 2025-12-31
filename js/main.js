/* ========================================
   Agriculture Portfolio - Main JavaScript
   GSAP Animations & Interactions
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ========== GSAP Registration ==========
    gsap.registerPlugin(ScrollTrigger);

    // ========== Navigation ==========
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.3 });
            gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
        } else {
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        updateActiveNavLink();

        lastScroll = currentScroll;
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Hero Section Animations ==========
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Make sure buttons exist before animating
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');

    heroTimeline
        .from('.profile-frame', {
            scale: 0,
            rotation: 180,
            duration: 1,
            ease: 'back.out(1.7)'
        })
        .from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.hero-tagline', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.3');

    // Animate buttons only if they exist
    if (heroButtons.length > 0) {
        heroTimeline.from(heroButtons, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15
        }, '-=0.3');
    }

    heroTimeline.from('.scroll-indicator', {
        opacity: 0,
        y: -20,
        duration: 0.5
    }, '-=0.2');

    // ========== About Section Animations ==========
    const aboutParagraphs = document.querySelectorAll('.about-text p');

    aboutParagraphs.forEach((p, index) => {
        gsap.from(p, {
            scrollTrigger: {
                trigger: p,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1
        });
    });


    const agriIcons = document.querySelectorAll('.agri-icon');

    agriIcons.forEach((icon, index) => {
        gsap.from(icon, {
            scrollTrigger: {
                trigger: icon,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            scale: 0,
            rotation: 360,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });

    // ========== Timeline Animations ==========
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: -100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1
        });
    });

    // ========== Research Cards Animation ==========
    const researchCards = document.querySelectorAll('.research-card');

    researchCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1
        });
    });

    // ========== Skills Section Animations ==========
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');

        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            width: `${progress}%`,
            duration: 1.5,
            ease: 'power2.out'
        });
    });

    // Animate skill categories
    gsap.from('.skill-category', {
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // ========== Certifications Animation ==========
    const certCards = document.querySelectorAll('.cert-card');

    certCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.2)'
        });
    });

    // ========== Conferences Animation ==========
    const conferenceCards = document.querySelectorAll('.conference-card');

    conferenceCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: -80,
            opacity: 0,
            duration: 0.7,
            delay: index * 0.1
        });
    });

    // ========== Awards Animation ==========
    const awardCards = document.querySelectorAll('.award-card');

    awardCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 60,
            opacity: 0,
            rotation: -5,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.3)'
        });
    });

    // ========== Leadership Cards Animation ==========
    const leadershipCards = document.querySelectorAll('.leadership-card');

    leadershipCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 70,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1
        });
    });

    // ========== Language Cards Animation ==========
    gsap.from('.language-card', {
        scrollTrigger: {
            trigger: '.languages-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'back.out(1.5)'
    });

    // Animate language proficiency bars
    const proficiencyBars = document.querySelectorAll('.proficiency-bar');
    proficiencyBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';

        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            width: width,
            duration: 1.2,
            ease: 'power2.out'
        });
    });

    // ========== Contact Section Animations ==========
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        x: -60,
        opacity: 0,
        duration: 0.8
    });

    gsap.fromTo('.info-item',
        {
            x: 60,
            opacity: 0
        },
        {
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15
        }
    );

    gsap.fromTo('.social-links .social-link',
        {
            scale: 0,
            opacity: 0
        },
        {
            scrollTrigger: {
                trigger: '.social-links',
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }
    );

    // ========== Form Interactions ==========
    const contactForm = document.getElementById('contactForm');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    // Add focus animations to form inputs
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', function () {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Form submission handling
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Animate button
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        // Disable button and show sending toast
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        showToast('Sending your message... This may take up to a minute.', 'info');

        try {
            const response = await fetch('https://mailer-vb0z.onrender.com/contact/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showToast('Message sent successfully! ✓', 'success');
                contactForm.reset();
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = '#4a7c3b';

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            showToast('Failed to send message. Please try again.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Toast notification function
    function showToast(message, type = 'info') {
        // Remove any existing toasts
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        // Add to body
        document.body.appendChild(toast);

        // Animate in
        gsap.fromTo(toast,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        );

        // Auto remove after 5 seconds (except for info type which stays longer)
        const autoRemoveTime = type === 'info' ? 60000 : 5000;
        setTimeout(() => {
            if (toast.parentElement) {
                gsap.to(toast, {
                    x: 100,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => toast.remove()
                });
            }
        }, autoRemoveTime);
    }

    // ========== Section Header Animations ==========
    const sectionHeaders = document.querySelectorAll('.section-header');

    sectionHeaders.forEach(header => {
        gsap.from(header.querySelector('.section-title'), {
            scrollTrigger: {
                trigger: header,
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.7
        });

        const divider = header.querySelector('.section-divider');
        if (divider) {
            gsap.from(divider, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                width: 0,
                duration: 0.8,
                delay: 0.3
            });
        }

        const description = header.querySelector('.section-description');
        if (description) {
            gsap.from(description, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                delay: 0.5
            });
        }
    });

    // ========== Button Hover Effects ==========
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', function () {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // ========== Parallax Effect for Background Patterns ==========
    const heroBgPattern = document.querySelector('.hero-bg-pattern');
    if (heroBgPattern) {
        gsap.to(heroBgPattern, {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 200,
            opacity: 0.5
        });
    }

    // ========== Current Year in Footer ==========
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // ========== Performance Optimization ==========
    // Lazy load images (if needed)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ========== Scroll to Top on Page Load ==========
    window.scrollTo(0, 0);

    // ========== Console Message ==========
    console.log('%c🌱 Agriculture Portfolio Website', 'color: #2d5016; font-size: 20px; font-weight: bold;');
    console.log('%cCultivating Knowledge, Growing Sustainability', 'color: #4a7c3b; font-size: 14px; font-style: italic;');

});

// ========== Utility Functions ==========

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
