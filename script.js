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

  // ... (Application state and elements object remain the same) ...

  /**
   * Initialize the application when DOM is ready
   */
  function init() {
    cacheElements();
    setupEventListeners();
    loadProjects();
  }

  // ... (cacheElements function remains the same) ...
  
  // ... (setupEventListeners function remains the same) ...

  // ... (setupNavigationScrolling and handleNavClick functions remain the same) ...

  // ... (All other functions from openModal to setupScrollIndicator remain the same) ...

  /**
   * NEW FUNCTION TO FIX THE BUG
   * Handles scrolling to a section specified in the URL hash on page load.
   */
  function handlePageLoadScroll() {
    const hash = window.location.hash;
    if (hash) {
      // We use a small timeout to ensure the page has finished laying out
      // before we try to scroll. This prevents race conditions with other scripts.
      setTimeout(() => {
        const targetElement = document.getElementById(hash.substring(1));
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100); // 100ms delay
    }
  }

  function updateAudioToggleIcon(isMuted) {
    if (!elements.heroAudioToggle) return;
    const icon = isMuted ? 
      `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : 
      `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const label = isMuted ? 'Unmute video' : 'Mute video';
    elements.heroAudioToggle.innerHTML = icon;
    elements.heroAudioToggle.setAttribute('aria-label', label);
  }

  /**
   * Simplified and robust initialization.
   * This ensures all code runs only after the HTML is fully parsed.
   */
  document.addEventListener('DOMContentLoaded', async () => {
    if (isModernBrowser()) {
      try {
        await loadTranslations();
        init();
        renderPage();
        handlePageLoadScroll(); // <-- ADDED THIS LINE TO CALL THE NEW FUNCTION
      } catch (error) {
        console.error("Initialization failed:", error);
        showErrorState(); // Or some other UI feedback
      }
    } else {
      showBrowserFallback();
    }
  });

})();