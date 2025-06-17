import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ← ✅ Esto soluciona el problema de pantalla negra
  server: {
    port: 3000
  }
})
