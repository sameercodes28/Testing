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
    elements.modalTags = document.getElementById('modal-tags');
    elements.modalDescription = document.getElementById('modal-description');
    elements.modalGallery = document.getElementById('modal-gallery');
    elements.closeButton = document.querySelector('[data-close-modal]');
    elements.navLinks = document.querySelectorAll('.nav__link');
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
      renderProjects();
      hideLoadingState();
      
    } catch (error) {
      console.error('Error loading projects:', error);
      showErrorState();
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
   * Render projects grid
   */
  function renderProjects() {
    if (!elements.projectsGrid || !projects.length) return;
    
    const projectsHTML = projects.map(project => `
      <button type="button" 
              class="project-card" 
              data-project-id="${project.id}"
              aria-label="View details for ${project.title}">
        <img src="${project.mainImage}" 
             alt="${project.altText}"
             class="project-card__image"
             loading="lazy"
             width="400"
             height="300">
        <h3 class="project-card__title">${escapeHtml(project.title)}</h3>
        <p class="project-card__year">${escapeHtml(project.year)}</p>
      </button>
    `).join('');
    
    elements.projectsGrid.innerHTML = projectsHTML;
    
    // Add click listeners to project cards
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
    
    // Populate modal content
    populateModalContent(project);
    
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
      elements.modalTitle.textContent = project.title;
    }
    
    if (elements.modalImage) {
      elements.modalImage.src = project.mainImage;
      elements.modalImage.alt = project.altText;
    }
    
    if (elements.modalYear) {
      elements.modalYear.textContent = project.year;
    }
    
    if (elements.modalTags) {
      const tagsHTML = project.tags.map(tag => 
        `<span class="modal__tag">${escapeHtml(tag)}</span>`
      ).join('');
      elements.modalTags.innerHTML = tagsHTML;
    }
    
    if (elements.modalDescription) {
      elements.modalDescription.textContent = project.description;
    }
    
    if (elements.modalGallery && project.gallery) {
      const galleryHTML = project.gallery.map((imageUrl, index) => 
        `<img src="${imageUrl}" 
             alt="${project.title} - Image ${index + 1}"
             loading="lazy"
             width="200"
             height="150">`
      ).join('');
      elements.modalGallery.innerHTML = galleryHTML;
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
   * Initialize application when DOM is ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (isModernBrowser()) {
        init();
      } else {
        showBrowserFallback();
      }
    });
  } else {
    if (isModernBrowser()) {
      init();
    } else {
      showBrowserFallback();
    }
  }

})();