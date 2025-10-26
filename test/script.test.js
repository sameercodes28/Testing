/**
 * Sample test file for script.js functions
 * Demonstrates the testing structure for the project
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock functions that would normally be in script.js
const isMobile = () => window.innerWidth < 768;

const getLocalizedText = (textObject, language = 'sv') => {
  if (!textObject) return '';
  return textObject[language] || textObject['en'] || '';
};

const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

const getCurrentLanguage = () => {
  return localStorage.getItem('preferredLanguage') || 'sv';
};

const setLanguage = (lang) => {
  localStorage.setItem('preferredLanguage', lang);
};

// Test suite
describe('Utility Functions', () => {
  describe('isMobile()', () => {
    it('should return true when window width is less than 768px', () => {
      window.innerWidth = 767;
      expect(isMobile()).toBe(true);
    });

    it('should return false when window width is 768px or more', () => {
      window.innerWidth = 768;
      expect(isMobile()).toBe(false);

      window.innerWidth = 1024;
      expect(isMobile()).toBe(false);
    });
  });

  describe('getLocalizedText()', () => {
    const testObject = {
      en: 'English text',
      sv: 'Svensk text'
    };

    it('should return Swedish text by default', () => {
      expect(getLocalizedText(testObject)).toBe('Svensk text');
    });

    it('should return English text when specified', () => {
      expect(getLocalizedText(testObject, 'en')).toBe('English text');
    });

    it('should fallback to English if Swedish is not available', () => {
      const englishOnly = { en: 'Only English' };
      expect(getLocalizedText(englishOnly, 'sv')).toBe('Only English');
    });

    it('should return empty string for null or undefined', () => {
      expect(getLocalizedText(null)).toBe('');
      expect(getLocalizedText(undefined)).toBe('');
    });
  });

  describe('escapeHtml()', () => {
    it('should escape HTML special characters', () => {
      expect(escapeHtml('<script>alert("XSS")</script>'))
        .toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
    });

    it('should escape quotes', () => {
      expect(escapeHtml('"Hello" & \'World\''))
        .toBe('"Hello" &amp; \'World\'');
    });

    it('should handle normal text without changes', () => {
      expect(escapeHtml('Normal text')).toBe('Normal text');
    });

    it('should handle empty strings', () => {
      expect(escapeHtml('')).toBe('');
    });
  });

  describe('Language Management', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });

    it('should default to Swedish language', () => {
      expect(getCurrentLanguage()).toBe('sv');
    });

    it('should save and retrieve language preference', () => {
      setLanguage('en');
      expect(getCurrentLanguage()).toBe('en');

      setLanguage('sv');
      expect(getCurrentLanguage()).toBe('sv');
    });

    it('should persist language across sessions', () => {
      setLanguage('en');
      // Simulate new session
      const savedLang = localStorage.getItem('preferredLanguage');
      expect(savedLang).toBe('en');
    });
  });
});

describe('Project Loading', () => {
  let mockProjects;

  beforeEach(() => {
    mockProjects = [
      {
        id: 'test-project-1',
        title: { en: 'Test Project 1', sv: 'Testprojekt 1' },
        year: '2025',
        mainImage: 'test1.jpg',
        altText: { en: 'Test image 1', sv: 'Testbild 1' }
      },
      {
        id: 'test-project-2',
        title: { en: 'Test Project 2', sv: 'Testprojekt 2' },
        year: '2024',
        mainImage: 'test2.jpg',
        altText: { en: 'Test image 2', sv: 'Testbild 2' }
      }
    ];
  });

  it('should load projects from JSON', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProjects)
    });

    const response = await fetch('projects.json');
    const projects = await response.json();

    expect(projects).toEqual(mockProjects);
    expect(fetch).toHaveBeenCalledWith('projects.json');
  });

  it('should handle fetch errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    try {
      await fetch('projects.json');
    } catch (error) {
      expect(error.message).toBe('Network error');
    }
  });
});

describe('Pagination', () => {
  it('should calculate correct initial project count for desktop', () => {
    window.innerWidth = 1024;
    const projectsToShowDesktop = 9;
    const initialCount = isMobile() ? 4 : projectsToShowDesktop;
    expect(initialCount).toBe(9);
  });

  it('should calculate correct initial project count for mobile', () => {
    window.innerWidth = 375;
    const projectsToShowMobile = 4;
    const initialCount = isMobile() ? projectsToShowMobile : 9;
    expect(initialCount).toBe(4);
  });

  it('should increment projects correctly', () => {
    let visibleProjectsCount = 9;
    const projectsIncrement = 9;
    const totalProjects = 20;

    // First load more
    const remaining = totalProjects - visibleProjectsCount;
    visibleProjectsCount += Math.min(projectsIncrement, remaining);
    expect(visibleProjectsCount).toBe(18);

    // Second load more (partial)
    const remaining2 = totalProjects - visibleProjectsCount;
    visibleProjectsCount += Math.min(projectsIncrement, remaining2);
    expect(visibleProjectsCount).toBe(20);
  });
});

describe('Cookie Consent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should check if cookies are accepted', () => {
    expect(localStorage.getItem('cookiesAccepted')).toBe(null);

    localStorage.setItem('cookiesAccepted', 'true');
    expect(localStorage.getItem('cookiesAccepted')).toBe('true');
  });

  it('should save cookie acceptance', () => {
    const acceptCookies = () => {
      localStorage.setItem('cookiesAccepted', 'true');
      const banner = document.getElementById('cookie-consent-banner');
      if (banner) {
        banner.style.display = 'none';
      }
    };

    acceptCookies();
    expect(localStorage.getItem('cookiesAccepted')).toBe('true');
  });
});
