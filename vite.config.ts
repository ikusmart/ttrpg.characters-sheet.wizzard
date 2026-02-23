import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'D&D / VtM Character Sheet',
        short_name: 'CharSheet',
        description: 'Character sheet for D&D 5e and Vampire: The Masquerade 5th Edition',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        start_url: '/dnd.character.sheet/',
        icons: [
          { src: 'pwa-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: 'pwa-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
        ],
      },
    }),
  ],
  base: '/dnd.character.sheet/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
