/**
 * Karin Gunnerek Portfolio - JavaScript
 * Handles navigation, project loading, modal interactions, multi-language system,
 * load more pagination, image carousel, scroll animations, back-to-top functionality,
 * and cookie consent system with full accessibility support and error handling
 */

(function() {
  'use strict';

  // -- CONFIGURATION --
  const HERO_TEXT_ANIMATION_DELAY = 4000; // Delay in milliseconds (4000ms = 4 seconds)

  // Application state
  let projects = [];
  let translations = {};
  let currentLanguage = 'sv'; // Default to Swedish
  
  // Pagination state
  let visibleProjectsCount = 0;
  const projectsToShowDesktop = 9;
  const projectsToShowMobile = 4;
  let projectsIncrement = 0;

  // DOM element references (cached for performance)
  const elements = {
    projectsGrid: null,
    modal: null,
    modalTitle: null,
    modalImage: null,
    modalYear: null,
    modalTags: null,
    modalDescription: null,
    modalGallery: null,
    closeButton: null,
    navLinks: null
  };

  /**
   * Initialize the application when DOM is ready
   */
  function init() {
    cacheElements();
    setupEventListeners();
    loadProjects();
  }

  /**
   * Cache DOM elements for better performance
   */
  function cacheElements() {
    elements.projectsGrid = document.getElementById('projects-grid');
    elements.navLinks = document.querySelectorAll('.nav__link');
    elements.backToTopBtn = document.getElementById('back-to-top-btn');
    elements.footer = document.querySelector('.footer');
    elements.cookieBanner = document.getElementById('cookie-consent-banner');
    elements.cookieAcceptBtn = document.getElementById('cookie-accept-btn');
    elements.languageToggle = document.getElementById('language-toggle');
    elements.loadMoreBtn = document.getElementById('load-more-btn');
    elements.heroTextContainer = document.getElementById('hero-text-container');
    elements.heroTagline = document.querySelector('.hero-text__tagline');
    elements.heroBrandName = document.querySelector('.hero-text__brand');
    elements.heroAudioToggle = document.getElementById('hero-audio-toggle');
    elements.heroVideo = document.querySelector('.hero__video');
  }

  /**
   * Set up all event listeners
   */
  function setupEventListeners() {
    setupHeroTextAnimation();
    setupNavigationScrolling();
    setupKeyboardNavigation();
    setupScrollSpyObserver();
    setupScrollAnimations();
    setupBackToTopButton();
    setupCookieConsent();
    setupLanguageSystem();
    setupLoadMoreButton();
    setupScrollIndicator();
    setupHeroAudioToggle();
  }

  /**
   * Set up smooth scrolling for navigation links
   */
  function setupNavigationScrolling() {
    elements.navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });
  }

  /**
   * Handle navigation link clicks with smooth scrolling
   * @param {Event} event - Click event
   */
  function handleNavClick(event) {
    event.preventDefault();
    
    const href = event.currentTarget.getAttribute('href');
    const targetId = href.substring(1); // Remove the #
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      targetElement.focus({ preventScroll: true });
    }
  }

  /**
   * Set up keyboard navigation
   */
  function setupKeyboardNavigation() {
    document.addEventListener('keydown', handleKeyDown);
  }

  /**
   * Handle keyboard events globally
   * @param {KeyboardEvent} event - Keyboard event
   */
  function handleKeyDown(event) {
    // Reserved for future keyboard shortcuts
  }

  /**
   * Check if current device is mobile
   * @returns {boolean} - Whether device is mobile
   */
  function isMobile() {
    return window.innerWidth < 768;
  }

  /**
   * Load translations from JSON file for multi-language support
   * @returns {Promise<void>}
   */
  async function loadTranslations() {
    try {
      const response = await fetch(`ui-strings.json?v=${Date.now()}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      translations = await response.json();
    } catch (error) {
      console.error('Error loading translations:', error);
      translations = {};
    }
  }

  /**
   * Load projects from JSON file with pagination support
   */
  async function loadProjects() {
    try {
      showLoadingState();
      const response = await fetch('projects.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      projects = await response.json();
      
      const initialCount = isMobile() ? projectsToShowMobile : projectsToShowDesktop;
      projectsIncrement = isMobile() ? projectsToShowMobile : projectsToShowDesktop;
      visibleProjectsCount = Math.min(initialCount, projects.length);
      
      renderProjects();
      updateLoadMoreButton();
      hideLoadingState();
    } catch (error) {
      console.error('Error loading projects:', error);
      showErrorState();
    }
  }

  function showLoadingState() {
    if (elements.projectsGrid) {
      elements.projectsGrid.innerHTML = `<div class="loading-state" style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p style="color: var(--color-text-light);">Loading projects...</p></div>`;
    }
  }

  function showErrorState() {
    if (elements.projectsGrid) {
      elements.projectsGrid.innerHTML = `<div class="error-state" style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p style="color: var(--color-text-light);">Unable to load projects. Please try again later.</p></div>`;
    }
  }

  function hideLoadingState() {
    const loadingState = document.querySelector('.loading-state');
    if (loadingState) loadingState.remove();
  }

  function renderProjects() {
    if (!elements.projectsGrid || !projects.length) return;
    const projectsToShow = projects.slice(0, visibleProjectsCount);
    const projectsHTML = projectsToShow.map(project => {
      const title = getLocalizedText(project.title);
      const altText = getLocalizedText(project.altText);
      const projectUrl = `projekt/${project.id}.html`;
      return `<a href="${projectUrl}" class="project-card" data-project-id="${project.id}" aria-label="View details for ${title}"><img src="${project.mainImage}" alt="${altText}" class="project-card__image" loading="lazy" width="400" height="300"><h3 class="project-card__title">${escapeHtml(title)}</h3><p class="project-card__year">${escapeHtml(project.year)}</p></a>`;
    }).join('');
    elements.projectsGrid.innerHTML = projectsHTML;
  }

  function appendProjects() {
    if (!elements.projectsGrid || !projects.length) return;
    const startIndex = elements.projectsGrid.querySelectorAll('.project-card').length;
    const endIndex = visibleProjectsCount;
    const newProjects = projects.slice(startIndex, endIndex);
    const projectsHTML = newProjects.map(project => {
      const title = getLocalizedText(project.title);
      const altText = getLocalizedText(project.altText);
      const projectUrl = `projekt/${project.id}.html`;
      return `<a href="${projectUrl}" class="project-card" data-project-id="${project.id}" aria-label="View details for ${title}"><img src="${project.mainImage}" alt="${altText}" class="project-card__image" loading="lazy" width="400" height="300"><h3 class="project-card__title">${escapeHtml(title)}</h3><p class="project-card__year">${escapeHtml(project.year)}</p></a>`;
    }).join('');
    elements.projectsGrid.insertAdjacentHTML('beforeend', projectsHTML);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function isModernBrowser() {
    return 'fetch' in window && 'Promise' in window;
  }

  function showBrowserFallback() {
    if (elements.projectsGrid) {
      elements.projectsGrid.innerHTML = `<div style="background: #f8f9fa; padding: 1rem; margin: 1rem; border-radius: 8px; text-align: center;"><p style="color: #666;">Your browser doesn't support some modern features. Please update your browser for the best experience.</p></div>`;
    }
  }

  function setupScrollSpyObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    if (!sections.length || !navLinks.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          navLinks.forEach(link => link.classList.remove('active-nav-link'));
          const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
          if (activeLink) activeLink.classList.add('active-nav-link');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  function setupScrollAnimations() {
    const animatedSections = document.querySelectorAll('section');
    if (!animatedSections.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    animatedSections.forEach(section => observer.observe(section));
  }

  function setupBackToTopButton() {
    if (!elements.backToTopBtn || !elements.footer) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        elements.backToTopBtn.classList.toggle('is-visible', entry.isIntersecting);
        elements.backToTopBtn.classList.toggle('is-above-footer', entry.isIntersecting);
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    observer.observe(elements.footer);
    elements.backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function setupCookieConsent() {
    if (!elements.cookieBanner || !elements.cookieAcceptBtn) return;
    if (!getCookie('karin_cookie_consent')) {
      setTimeout(() => elements.cookieBanner.classList.add('is-visible'), 1000);
    }
    elements.cookieAcceptBtn.addEventListener('click', () => {
      setCookie('karin_cookie_consent', 'true', 365);
      elements.cookieBanner.classList.remove('is-visible');
    });
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  }

  function getCurrentLanguage() {
    return localStorage.getItem('karin_language') || 'sv';
  }

  function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('karin_language', lang);
  }

  function getLocalizedText(textObj) {
    if (typeof textObj === 'string') return textObj;
    return textObj?.[currentLanguage] ?? textObj?.['en'] ?? '';
  }

  function getTranslation(key) {
    return getLocalizedText(key.split('.').reduce((o, i) => o?.[i], translations));
  }

  function renderPage() {
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.dataset.i18nKey;
      const text = getTranslation(key);
      if (text) el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      const text = getTranslation(key);
      if (text) el.setAttribute('aria-label', text);
    });
    if (elements.languageToggle) {
      elements.languageToggle.textContent = (currentLanguage === 'sv' ? 'en' : 'sv').toUpperCase();
    }
    if (projects.length > 0) {
      renderProjects();
      updateLoadMoreButton();
    }
  }

  function setupLanguageSystem() {
    currentLanguage = getCurrentLanguage();
    if (elements.languageToggle) {
      elements.languageToggle.addEventListener('click', () => {
        setLanguage(currentLanguage === 'sv' ? 'en' : 'sv');
        renderPage();
      });
    }
  }

  function updateLoadMoreButton() {
    if (elements.loadMoreBtn) {
      elements.loadMoreBtn.classList.toggle('is-visible', visibleProjectsCount < projects.length);
    }
  }

  function setupLoadMoreButton() {
    if (!elements.loadMoreBtn) return;
    elements.loadMoreBtn.addEventListener('click', () => {
      const remaining = projects.length - visibleProjectsCount;
      visibleProjectsCount += Math.min(projectsIncrement, remaining);
      appendProjects();
      updateLoadMoreButton();
    });
  }

  function setupHeroTextAnimation() {
    if (elements.heroTextContainer) {
      setTimeout(() => elements.heroTextContainer.classList.add('is-visible'), HERO_TEXT_ANIMATION_DELAY);
    }
  }

  function setupScrollIndicator() {
    const indicator = document.getElementById('scroll-indicator');
    if (!indicator) return;
    const handleScroll = () => indicator.classList.toggle('hidden', window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * REVISED FUNCTION TO FIX NAVIGATION BUG
   * Handles scrolling to a section specified in the URL hash on page load.
   * This version is more robust to prevent conflicts with other scripts and CSS smooth scrolling.
   */
  function handlePageLoadScroll() {
    const hash = window.location.hash;
    if (hash) {
      // The timeout ensures that this code runs after the browser's initial (and buggy)
      // scroll attempt, and after other scripts have potentially run.
      setTimeout(() => {
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);
        const navElement = document.querySelector('.nav');

        if (targetElement && navElement) {
          // Calculate the target position, accounting for the fixed navigation bar height.
          const navHeight = navElement.offsetHeight;
          const targetPosition = targetElement.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // A 100ms delay is usually enough to avoid race conditions.
    }
  }

  function setupHeroAudioToggle() {
    if (!elements.heroAudioToggle || !elements.heroVideo) return;
    updateAudioToggleIcon(elements.heroVideo.muted);
    elements.heroAudioToggle.addEventListener('click', () => {
      elements.heroVideo.muted = !elements.heroVideo.muted;
      updateAudioToggleIcon(elements.heroVideo.muted);
      if (!elements.heroVideo.muted) {
        elements.heroVideo.play().catch(console.error);
      }
    });
  }
  
  function updateAudioToggleIcon(isMuted) {
    if (!elements.heroAudioToggle) return;
    const icon = isMuted ? `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const label = isMuted ? 'Unmute video' : 'Mute video';
    elements.heroAudioToggle.innerHTML = icon;
    elements.heroAudioToggle.setAttribute('aria-label', label);
  }

  /**
   * Simplified and robust initialization.
   */
  document.addEventListener('DOMContentLoaded', async () => {
    if (isModernBrowser()) {
      try {
        document.documentElement.classList.add('js-enabled');
        await loadTranslations();
        init();
        renderPage();
        handlePageLoadScroll(); // Bug fix: Call the function on page load
      } catch (error) {
        console.error("Initialization failed:", error);
        showErrorState();
      }
    } else {
      showBrowserFallback();
    }
  });

})();