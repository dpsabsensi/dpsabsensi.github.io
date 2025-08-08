// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // penting untuk DOM testing
    setupFiles: './vitest.setup.js', // konfigurasi tambahan
  },
})