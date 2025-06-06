/**
 * Karin Gunnerek Portfolio - JavaScript
 * Handles navigation, project loading, and modal interactions
 * with full accessibility support and error handling
 */

(function() {
  'use strict';

  // Application state
  let projects = [];
  let focusableElements = [];
  let lastFocusedElement = null;
  let currentProject = null;
  let currentImageIndex = 0;
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
    elements.modal = document.getElementById('project-modal');
    elements.modalTitle = document.getElementById('modal-title');
    elements.modalImage = document.getElementById('modal-image');
    elements.modalYear = document.getElementById('modal-year');
    elements.modalDescription = document.getElementById('modal-description');
    elements.modalGallery = document.getElementById('modal-gallery');
    elements.closeButton = document.querySelector('[data-close-modal]');
    elements.navLinks = document.querySelectorAll('.nav__link');
    elements.carouselImage = document.getElementById('carousel-image');
    elements.carouselDots = document.getElementById('carousel-dots');
    elements.carouselPrev = document.querySelector('.carousel-btn--prev');
    elements.carouselNext = document.querySelector('.carousel-btn--next');
    elements.backToTopBtn = document.getElementById('back-to-top-btn');
    elements.footer = document.querySelector('.footer');
    elements.cookieBanner = document.getElementById('cookie-consent-banner');
    elements.cookieAcceptBtn = document.getElementById('cookie-accept-btn');
    elements.languageToggle = document.getElementById('language-toggle');
    elements.loadMoreBtn = document.getElementById('load-more-btn');
  }

  /**
   * Set up all event listeners
   */
  function setupEventListeners() {
    // Navigation smooth scrolling
    setupNavigationScrolling();
    
    // Modal event listeners
    setupModalEventListeners();
    
    // Keyboard navigation
    setupKeyboardNavigation();
    
    // Scroll spy for active navigation
    setupScrollSpyObserver();
    
    // Scroll animations
    setupScrollAnimations();
    
    // Back to top button
    setupBackToTopButton();
    
    // Cookie consent
    setupCookieConsent();
    
    // Language system
    setupLanguageSystem();
    
    // Load more functionality
    setupLoadMoreButton();
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
      
      // Update focus for accessibility
      targetElement.focus({ preventScroll: true });
    }
  }

  /**
   * Set up modal-related event listeners
   */
  function setupModalEventListeners() {
    if (elements.closeButton) {
      elements.closeButton.addEventListener('click', closeModal);
    }
    
    if (elements.modal) {
      // Close modal when clicking on backdrop
      elements.modal.addEventListener('click', handleModalBackdropClick);
    }
    
    // Carousel controls
    if (elements.carouselPrev) {
      elements.carouselPrev.addEventListener('click', () => navigateCarousel(-1));
    }
    
    if (elements.carouselNext) {
      elements.carouselNext.addEventListener('click', () => navigateCarousel(1));
    }
    
    if (elements.carouselDots) {
      elements.carouselDots.addEventListener('click', handleDotClick);
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
    // Close modal with Escape key
    if (event.key === 'Escape' && elements.modal && elements.modal.open) {
      closeModal();
      return;
    }
    
    // Carousel navigation with arrow keys (only when modal is open)
    if (elements.modal && elements.modal.open && currentProject) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateCarousel(-1);
        return;
      }
      
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateCarousel(1);
        return;
      }
    }
    
    // Tab trapping in modal
    if (event.key === 'Tab' && elements.modal && elements.modal.open) {
      handleTabKeyInModal(event);
    }
  }

  /**
   * Handle tab key navigation within modal (focus trapping)
   * @param {KeyboardEvent} event - Keyboard event
   */
  function handleTabKeyInModal(event) {
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  /**
   * Check if current device is mobile
   * @returns {boolean} - Whether device is mobile
   */
  function isMobile() {
    return window.innerWidth < 768;
  }

  /**
   * Load projects from JSON file
   */
  async function loadProjects() {
    try {
      showLoadingState();
      
      const response = await fetch('projects.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      projects = await response.json();
      
      // Set initial pagination values
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

  /**
   * Load translations from JSON file
   */
  async function loadTranslations() {
    try {
      const response = await fetch('ui-strings.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      translations = await response.json();
      
    } catch (error) {
      console.error('Error loading translations:', error);
      translations = {}; // Fallback to empty object
    }
  }

  /**
   * Show loading state in projects grid
   */
  function showLoadingState() {
    if (elements.projectsGrid) {
      elements.projectsGrid.innerHTML = `
        <div class="loading-state" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-light);">Loading projects...</p>
        </div>
      `;
    }
  }

  /**
   * Show error state in projects grid
   */
  function showErrorState() {
    if (elements.projectsGrid) {
      elements.projectsGrid.innerHTML = `
        <div class="error-state" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-light);">Unable to load projects. Please try again later.</p>
        </div>
      `;
    }
  }

  /**
   * Hide loading state
   */
  function hideLoadingState() {
    const loadingState = document.querySelector('.loading-state');
    if (loadingState) {
      loadingState.remove();
    }
  }

  /**
   * Render projects grid (initial load or full re-render)
   */
  function renderProjects() {
    if (!elements.projectsGrid || !projects.length) return;
    
    // Get the projects to show (sliced array)
    const projectsToShow = projects.slice(0, visibleProjectsCount);
    
    const projectsHTML = projectsToShow.map(project => {
      const title = getLocalizedText(project.title);
      const altText = getLocalizedText(project.altText);
      
      return `
        <button type="button" 
                class="project-card" 
                data-project-id="${project.id}"
                aria-label="View details for ${title}">
          <img src="${project.mainImage}" 
               alt="${altText}"
               class="project-card__image"
               loading="lazy"
               width="400"
               height="300">
          <h3 class="project-card__title">${escapeHtml(title)}</h3>
          <p class="project-card__year">${escapeHtml(project.year)}</p>
        </button>
      `;
    }).join('');
    
    elements.projectsGrid.innerHTML = projectsHTML;
    
    // Add click listeners to project cards
    setupProjectCardListeners();
  }

  /**
   * Append new projects to the grid (for Load More functionality)
   */
  function appendProjects() {
    if (!elements.projectsGrid || !projects.length) return;
    
    const startIndex = visibleProjectsCount - projectsIncrement;
    const endIndex = visibleProjectsCount;
    const newProjects = projects.slice(startIndex, endIndex);
    
    const projectsHTML = newProjects.map(project => {
      const title = getLocalizedText(project.title);
      const altText = getLocalizedText(project.altText);
      
      return `
        <button type="button" 
                class="project-card" 
                data-project-id="${project.id}"
                aria-label="View details for ${title}">
          <img src="${project.mainImage}" 
               alt="${altText}"
               class="project-card__image"
               loading="lazy"
               width="400"
               height="300">
          <h3 class="project-card__title">${escapeHtml(title)}</h3>
          <p class="project-card__year">${escapeHtml(project.year)}</p>
        </button>
      `;
    }).join('');
    
    elements.projectsGrid.insertAdjacentHTML('beforeend', projectsHTML);
    
    // Add click listeners to new project cards
    setupProjectCardListeners();
  }

  /**
   * Set up event listeners for project cards
   */
  function setupProjectCardListeners() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', handleProjectCardClick);
    });
  }

  /**
   * Handle project card click
   * @param {Event} event - Click event
   */
  function handleProjectCardClick(event) {
    const projectId = event.currentTarget.getAttribute('data-project-id');
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
      openModal(project);
    }
  }

  /**
   * Open modal with project details
   * @param {Object} project - Project data
   */
  function openModal(project) {
    if (!elements.modal) return;
    
    // Store the currently focused element to restore later
    lastFocusedElement = document.activeElement;
    
    // Store current project and reset image index
    currentProject = project;
    currentImageIndex = 0;
    
    // Populate modal content
    populateModalContent(project);
    
    // Initialize carousel
    initializeCarousel(project);
    
    // Show modal
    elements.modal.showModal();
    
    // Set up focus trapping
    setupFocusTrapping();
    
    // Focus the first focusable element
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    
    // Hide page content from screen readers
    document.body.setAttribute('aria-hidden', 'true');
    elements.modal.removeAttribute('aria-hidden');
  }

  /**
   * Populate modal with project content
   * @param {Object} project - Project data
   */
  function populateModalContent(project) {
    if (elements.modalTitle) {
      elements.modalTitle.textContent = getLocalizedText(project.title);
    }
    
    if (elements.modalYear) {
      elements.modalYear.textContent = project.year;
    }
    
    if (elements.modalDescription) {
      elements.modalDescription.textContent = getLocalizedText(project.description);
    }
  }

  /**
   * Set up focus trapping for modal
   */
  function setupFocusTrapping() {
    if (!elements.modal) return;
    
    // Find all focusable elements within the modal
    const focusableSelectors = [
      'button',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    focusableElements = elements.modal.querySelectorAll(focusableSelectors.join(','));
    focusableElements = Array.from(focusableElements).filter(el => !el.disabled);
  }

  /**
   * Close modal
   */
  function closeModal() {
    if (!elements.modal) return;
    
    // Hide modal
    elements.modal.close();
    
    // Clear carousel state
    currentProject = null;
    currentImageIndex = 0;
    
    // Restore focus to the element that opened the modal
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
    
    // Restore page content for screen readers
    document.body.removeAttribute('aria-hidden');
    elements.modal.setAttribute('aria-hidden', 'true');
    
    // Clear focus trapping
    focusableElements = [];
  }

  /**
   * Handle clicks on modal backdrop
   * @param {Event} event - Click event
   */
  function handleModalBackdropClick(event) {
    if (event.target === elements.modal) {
      closeModal();
    }
  }

  /**
   * Initialize carousel with project images
   * @param {Object} project - Project data
   */
  function initializeCarousel(project) {
    if (!project.gallery || !project.gallery.length) return;
    
    // Set initial image
    updateCarouselImage();
    
    // Generate dots
    generateCarouselDots(project.gallery.length);
  }

  /**
   * Navigate carousel in specified direction
   * @param {number} direction - Direction to navigate (-1 for previous, 1 for next)
   */
  function navigateCarousel(direction) {
    if (!currentProject || !currentProject.gallery || !currentProject.gallery.length) return;
    
    const totalImages = currentProject.gallery.length;
    currentImageIndex = (currentImageIndex + direction + totalImages) % totalImages;
    
    updateCarouselImage();
    updateCarouselDots();
  }

  /**
   * Update the main carousel image
   */
  function updateCarouselImage() {
    if (!currentProject || !elements.carouselImage) return;
    
    const imageUrl = currentProject.gallery[currentImageIndex];
    const projectTitle = getLocalizedText(currentProject.title);
    const imageLabel = getTranslation('accessibility.imageAltPrefix') || 'Image';
    
    elements.carouselImage.src = imageUrl;
    elements.carouselImage.alt = `${projectTitle} - ${imageLabel} ${currentImageIndex + 1}`;
  }

  /**
   * Generate carousel dot indicators
   * @param {number} totalImages - Number of images in the gallery
   */
  function generateCarouselDots(totalImages) {
    if (!elements.carouselDots) return;
    
    const dotLabel = getTranslation('modal.dotButton') || 'Go to image';
    
    const dotsHTML = Array.from({ length: totalImages }, (_, index) => 
      `<button class="carousel-dot ${index === 0 ? 'active-dot' : ''}" 
               data-index="${index}" 
               aria-label="${dotLabel} ${index + 1}"></button>`
    ).join('');
    
    elements.carouselDots.innerHTML = dotsHTML;
  }

  /**
   * Update active state of carousel dots
   */
  function updateCarouselDots() {
    if (!elements.carouselDots) return;
    
    const dots = elements.carouselDots.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === currentImageIndex) {
        dot.classList.add('active-dot');
      } else {
        dot.classList.remove('active-dot');
      }
    });
  }

  /**
   * Handle clicks on carousel dots
   * @param {Event} event - Click event
   */
  function handleDotClick(event) {
    if (event.target.classList.contains('carousel-dot')) {
      const index = parseInt(event.target.getAttribute('data-index'), 10);
      if (!isNaN(index)) {
        currentImageIndex = index;
        updateCarouselImage();
        updateCarouselDots();
      }
    }
  }

  /**
   * Escape HTML to prevent XSS attacks
   * @param {string} text - Text to escape
   * @returns {string} - Escaped text
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Check if the current environment supports modern features
   * @returns {boolean} - Whether modern features are supported
   */
  function isModernBrowser() {
    return !!(
      window.fetch &&
      window.Promise &&
      Array.from &&
      Object.assign
    );
  }

  /**
   * Show fallback message for unsupported browsers
   */
  function showBrowserFallback() {
    const fallbackMessage = document.createElement('div');
    fallbackMessage.innerHTML = `
      <div style="background: #f8f9fa; padding: 1rem; margin: 1rem; border-radius: 8px; text-align: center;">
        <p style="color: #666;">Your browser doesn't support some modern features. Please update your browser for the best experience.</p>
      </div>
    `;
    
    if (elements.projectsGrid) {
      elements.projectsGrid.appendChild(fallbackMessage);
    }
  }

  /**
   * Set up scroll spy observer for active navigation highlighting
   */
  function setupScrollSpyObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (!sections.length || !navLinks.length) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          // Remove active class from all nav links
          navLinks.forEach(link => {
            link.classList.remove('active-nav-link');
          });
          
          // Add active class to corresponding nav link
          const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('active-nav-link');
          }
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      observer.observe(section);
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
        } else {
          elements.backToTopBtn.classList.remove('is-visible');
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
   * Get current language from localStorage or default to Swedish
   * @returns {string} - Current language code
   */
  function getCurrentLanguage() {
    return localStorage.getItem('karin_language') || 'sv';
  }

  /**
   * Set current language and save to localStorage
   * @param {string} lang - Language code
   */
  function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('karin_language', lang);
  }

  /**
   * Get localized text from a text object
   * @param {Object|string} textObj - Text object with language keys or plain string
   * @returns {string} - Localized text
   */
  function getLocalizedText(textObj) {
    if (typeof textObj === 'string') return textObj;
    if (typeof textObj === 'object' && textObj !== null) {
      return textObj[currentLanguage] || textObj['en'] || '';
    }
    return '';
  }

  /**
   * Get translation from translations object
   * @param {string} key - Translation key (e.g., 'navigation.projects')
   * @returns {string} - Translated text
   */
  function getTranslation(key) {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return '';
      }
    }
    
    return getLocalizedText(value);
  }

  /**
   * Update all page content based on current language
   */
  function renderPage() {
    // Update all elements with data-i18n-key attributes
    const i18nElements = document.querySelectorAll('[data-i18n-key]');
    i18nElements.forEach(element => {
      const key = element.getAttribute('data-i18n-key');
      const translatedText = getTranslation(key);
      if (translatedText) {
        element.textContent = translatedText;
      }
    });

    // Update all elements with data-i18n-aria attributes
    const ariaElements = document.querySelectorAll('[data-i18n-aria]');
    ariaElements.forEach(element => {
      const key = element.getAttribute('data-i18n-aria');
      const translatedText = getTranslation(key);
      if (translatedText) {
        element.setAttribute('aria-label', translatedText);
      }
    });

    // Update language toggle button
    if (elements.languageToggle) {
      const oppositeLanguage = currentLanguage === 'sv' ? 'en' : 'sv';
      elements.languageToggle.textContent = oppositeLanguage.toUpperCase();
    }

    // Re-render projects with new language
    if (projects.length > 0) {
      renderProjects();
      updateLoadMoreButton();
    }

    // Update modal content if it's open
    if (currentProject && elements.modal && elements.modal.open) {
      populateModalContent(currentProject);
      // Update carousel with new language
      if (currentProject.gallery && currentProject.gallery.length > 0) {
        updateCarouselImage();
        generateCarouselDots(currentProject.gallery.length);
        updateCarouselDots();
      }
    }
  }

  /**
   * Set up language switching system
   */
  function setupLanguageSystem() {
    // Set initial language from localStorage or default
    currentLanguage = getCurrentLanguage();
    
    // Set up language toggle button
    if (elements.languageToggle) {
      elements.languageToggle.addEventListener('click', () => {
        const newLanguage = currentLanguage === 'sv' ? 'en' : 'sv';
        setLanguage(newLanguage);
        renderPage();
      });
    }
  }

  /**
   * Update Load More button visibility
   */
  function updateLoadMoreButton() {
    if (!elements.loadMoreBtn) return;
    
    if (visibleProjectsCount < projects.length) {
      elements.loadMoreBtn.classList.add('is-visible');
    } else {
      elements.loadMoreBtn.classList.remove('is-visible');
    }
  }

  /**
   * Set up Load More button functionality
   */
  function setupLoadMoreButton() {
    if (!elements.loadMoreBtn) return;
    
    elements.loadMoreBtn.addEventListener('click', () => {
      // Calculate how many more projects to show
      const remainingProjects = projects.length - visibleProjectsCount;
      const projectsToAdd = Math.min(projectsIncrement, remainingProjects);
      
      // Update visible count
      visibleProjectsCount += projectsToAdd;
      
      // Append new projects
      appendProjects();
      
      // Update button visibility
      updateLoadMoreButton();
    });
  }

  /**
   * Initialize application when DOM is ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async function() {
      if (isModernBrowser()) {
        await loadTranslations();
        init();
        renderPage(); // Render with current language
      } else {
        showBrowserFallback();
      }
    });
  } else {
    if (isModernBrowser()) {
      loadTranslations().then(() => {
        init();
        renderPage(); // Render with current language
      });
    } else {
      showBrowserFallback();
    }
  }

})();