import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',         // or: host: true
    port: 5173,
    open: false,
    // Proxy removed - using direct production API URLs
  },
})
