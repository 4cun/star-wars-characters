import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import "vitest/config"

export default defineConfig({
  plugins: [react()]
  , test: {
    environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/setupTests.ts'],
  },
})
