/**
 * Karin Gunnerek Portfolio - Project Page JavaScript
 * Minimal script for project detail pages
 * Handles back-to-top button, cookie consent, and scroll animations
 */

(function() {
  'use strict';

  // DOM element references (cached for performance)
  const elements = {
    backToTopBtn: null,
    footer: null,
    cookieBanner: null,
    cookieAcceptBtn: null
  };

  /**
   * Cache DOM elements for better performance
   */
  function cacheElements() {
    elements.backToTopBtn = document.getElementById('back-to-top-btn');
    elements.footer = document.querySelector('.footer');
    elements.cookieBanner = document.getElementById('cookie-consent-banner');
    elements.cookieAcceptBtn = document.getElementById('cookie-accept-btn');
  }

  /**
   * Set up back to top button functionality
   */
  function setupBackToTopButton() {
    if (!elements.backToTopBtn || !elements.footer) return;

    // Set up intersection observer for footer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          elements.backToTopBtn.classList.add('is-visible');
          elements.backToTopBtn.classList.add('is-above-footer');
        } else {
          elements.backToTopBtn.classList.remove('is-visible');
          elements.backToTopBtn.classList.remove('is-above-footer');
        }
      });
    }, observerOptions);

    observer.observe(elements.footer);

    // Add click handler for scroll to top
    elements.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Set up cookie consent functionality
   */
  function setupCookieConsent() {
    if (!elements.cookieBanner || !elements.cookieAcceptBtn) return;

    // Check if consent cookie exists
    const consentCookie = getCookie('karin_cookie_consent');

    if (!consentCookie) {
      // Show banner if no consent cookie
      setTimeout(() => {
        elements.cookieBanner.classList.add('is-visible');
      }, 1000); // Delay for better UX
    }

    // Handle accept button click
    elements.cookieAcceptBtn.addEventListener('click', () => {
      // Set consent cookie for 365 days
      setCookie('karin_cookie_consent', 'true', 365);

      // Hide banner
      elements.cookieBanner.classList.remove('is-visible');
    });
  }
  
  /**
   * Set up scroll animations with intersection observer
   */
  function setupScrollAnimations() {
    const animatedSections = document.querySelectorAll('section');

    if (!animatedSections.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Stop observing once animated to prevent re-animation on scroll up
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedSections.forEach(section => {
      observer.observe(section);
    });
  }

  /**
   * Get cookie value by name
   * @param {string} name - Cookie name
   * @returns {string|null} - Cookie value or null if not found
   */
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  /**
   * Set cookie with name, value, and expiry days
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value
   * @param {number} days - Expiry in days
   */
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  /**
   * Initialize project page functionality
   */
  function init() {
    cacheElements();
    setupBackToTopButton();
    setupCookieConsent();
    setupScrollAnimations(); // Bug fix: Added this line
  }

  /**
   * Initialize when DOM is ready
   */
  document.addEventListener('DOMContentLoaded', init);

})();