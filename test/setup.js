/**
 * Test Setup File
 * Configures the testing environment for all tests
 */

import { vi } from 'vitest';

// Mock DOM elements that tests might need
global.document = {
  getElementById: vi.fn(),
  querySelector: vi.fn(),
  querySelectorAll: vi.fn(),
  addEventListener: vi.fn(),
  createElement: vi.fn()
};

global.window = {
  scrollTo: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  innerWidth: 1024,
  innerHeight: 768,
  location: {
    hash: '',
    href: 'https://karingunnerek.se'
  }
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
};

// Mock fetch for API calls
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({})
  })
);

// Set up console mocks to reduce test output noise
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn()
};
