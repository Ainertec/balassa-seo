import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Caminho base configurável: use BASE_PATH=/subpasta/ ao publicar fora da raiz.
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: [
        'logo.webp',
        'banner.webp',
        'favicon.svg',
        'apple-touch-icon-180.png',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/icon-maskable-512.png',
      ],
      manifest: {
        id: base,
        name: 'Balassa — SEO & Growth',
        short_name: 'Balassa',
        description:
          'Consultoria de SEO de alto padrão, auditorias técnicas e crescimento orgânico para marcas que exigem autoridade digital.',
        lang: 'pt-BR',
        dir: 'ltr',
        start_url: base,
        scope: base,
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
        orientation: 'portrait-primary',
        background_color: '#0E0E0E',
        theme_color: '#0E0E0E',
        categories: ['business', 'productivity', 'marketing'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Solicitar diagnóstico',
            short_name: 'Diagnóstico',
            url: `${base}#contato`,
            description: 'Avaliação confidencial do seu ecossistema digital',
            icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }],
          },
          {
            name: 'Serviços',
            short_name: 'Serviços',
            url: `${base}#servicos`,
            icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }],
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'balassa-images',
              expiration: { maxEntries: 32, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
          {
            urlPattern: ({ url }) => `${url}`.startsWith('https://fonts.googleapis.com'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'balassa-font-stylesheets' },
          },
          {
            urlPattern: ({ url }) => `${url}`.startsWith('https://fonts.gstatic.com'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'balassa-font-files',
              expiration: { maxEntries: 12, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
