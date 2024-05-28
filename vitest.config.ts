/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@bigtransit/core': path.resolve(__dirname, 'packages/core/src')
    }
  },
  test: {
    globals: true,
    environment: 'node',
    reporters: ['verbose']
  }
});