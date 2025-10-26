import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test environment
    environment: 'jsdom',

    // Global test APIs
    globals: true,

    // Setup files
    setupFiles: ['./test/setup.js'],

    // Coverage configuration
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '*.config.js',
        'optimize-media.sh',
        'update-html-with-optimized-media.sh'
      ]
    },

    // Test file patterns
    include: ['**/*.test.js', '**/*.spec.js'],

    // Exclude patterns
    exclude: ['node_modules', 'dist', 'cypress', 'coverage'],

    // Timeout
    testTimeout: 10000,

    // Reporters
    reporters: ['verbose'],

    // Watch mode
    watchExclude: ['**/node_modules/**', '**/dist/**']
  }
});
