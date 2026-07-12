import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works at any mount point (GitHub Pages
  // serves this under /coffeeshop/).
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
