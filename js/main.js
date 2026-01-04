/**
 * Main JavaScript for Muna Thapa Portfolio
 * Handles: Navigation, Scroll effects, Mobile menu, Contact form
 */

// ===================================
// DOM Elements
// ===================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const contactForm = document.getElementById('contact-form');
const toastContainer = document.getElementById('toast-container');
const themeToggle = document.getElementById('theme-toggle');

// Navigation items for active state tracking
const sections = ['home', 'about', 'education', 'research', 'experience', 'skills', 'certifications', 'conferences', 'honors', 'volunteering', 'contact'];

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Initialize theme
  initTheme();

  // Initialize scroll listener
  window.addEventListener('scroll', handleScroll);

  // Initialize mobile menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Initialize theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Initialize contact form
  if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
  }

  // Initial scroll check
  handleScroll();
});

// ===================================
// Theme Functions
// ===================================
function initTheme() {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// ===================================
// Scroll Handler
// ===================================
function handleScroll() {
  // Add scrolled class to navbar
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Update active section
  const currentSection = sections.find(section => {
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect.top <= 150 && rect.bottom >= 150;
    }
    return false;
  });

  if (currentSection) {
    updateActiveNav(currentSection);
  }
}

// ===================================
// Navigation Functions
// ===================================
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // Close mobile menu if open
  closeMobileMenu();
}

function updateActiveNav(activeId) {
  // Update desktop nav
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.section === activeId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update mobile nav
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    if (link.dataset.section === activeId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ===================================
// Mobile Menu Functions
// ===================================
function toggleMobileMenu() {
  const isHidden = mobileNav.classList.contains('hidden');

  if (isHidden) {
    mobileNav.classList.remove('hidden');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    closeMobileMenu();
  }
}

function closeMobileMenu() {
  mobileNav.classList.add('hidden');
  menuIcon.classList.remove('hidden');
  closeIcon.classList.add('hidden');
}

// ===================================
// Contact Form Handler
// ===================================
async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = {
    name: form.elements.namedItem('name').value,
    email: form.elements.namedItem('email').value,
    subject: form.elements.namedItem('subject').value,
    message: form.elements.namedItem('message').value,
  };

  // Get submit button and disable it
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.classList.add('btn-disabled');
  submitBtn.textContent = 'Sending...';

  // Show loading toast
  const loadingToast = showToast('Sending your message... This may take up to a minute. Please wait.', 'loading');

  try {
    const response = await fetch('https://mailer-vb0z.onrender.com/contact/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Remove loading toast
    removeToast(loadingToast);

    if (!response.ok) {
      throw new Error('Failed to send');
    }

    // Success
    form.reset();
    showToast('✅ Message sent successfully! We\'ll get back to you soon.', 'success', 5000);

  } catch (error) {
    // Remove loading toast
    removeToast(loadingToast);

    // Show error
    showToast('❌ Failed to send message. Please try again.', 'error', 5000);
  } finally {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.classList.remove('btn-disabled');
    submitBtn.textContent = 'Send Message';
  }
}

// ===================================
// Toast Notifications
// ===================================
function showToast(message, type = 'info', duration = null) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // Auto-remove after duration (if specified)
  if (duration) {
    setTimeout(() => {
      removeToast(toast);
    }, duration);
  }

  return toast;
}

function removeToast(toast) {
  if (toast && toast.parentNode) {
    toast.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(style);

// Make scrollToSection available globally
window.scrollToSection = scrollToSection;
