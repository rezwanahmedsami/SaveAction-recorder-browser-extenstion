import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'tests/**',
        '**/*.config.ts',
        '**/*.d.ts',
        'src/manifest.json',
        'src/background/index.ts', // Integration heavy, tested via E2E
        'src/content/index.ts', // Entry point, minimal logic
        'src/popup/popup.ts', // UI component, requires E2E tests
        'src/content/recording-indicator.ts', // DOM manipulation, requires E2E tests
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 79,
        statements: 90,
      },
    },
    include: ['tests/**/*.test.ts'],
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/types': resolve(__dirname, './src/types'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/content': resolve(__dirname, './src/content'),
      '@/background': resolve(__dirname, './src/background'),
      '@/popup': resolve(__dirname, './src/popup'),
    },
  },
});
