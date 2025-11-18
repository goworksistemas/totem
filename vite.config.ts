import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'gowork.png', 'favicongowork.jpg'],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'GoWork Totem - Acesso Rápido',
        short_name: 'GoWork Totem',
        description: 'Sistema de totem para acesso rápido da GoWork',
        theme_color: '#0ea5e9',
        background_color: '#1f2937',
        display: 'fullscreen',
        orientation: 'any',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicongowork.jpg',
            sizes: '64x64',
            type: 'image/jpeg'
          },
          {
            src: 'favicongowork.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'favicongowork.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        // TOTEM SEMPRE FRESH - cache mínimo
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate', // Mais agressivo que CacheFirst
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24 * 7 // Apenas 1 semana
              }
            }
          },
          {
            urlPattern: /^https:\/\/share\.hsforms\.com\/.*/i,
            handler: 'NetworkFirst', // Sempre tenta rede primeiro
            options: {
              cacheName: 'hubspot-forms-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 2 // Apenas 2 horas
              }
            }
          },
          {
            // Para o próprio app - sempre buscar atualizações
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 60 * 5 // Apenas 5 minutos
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'react-qr-code']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: true
  }
}) 