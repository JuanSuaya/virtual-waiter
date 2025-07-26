import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.png'],
    manifest: {
      name: 'Hackaton',
      short_name: 'Hackaton',
      description: 'Hackaton',
      theme_color: '#7C3AED',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          // src: 'logo192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          // src: 'logo512.png',
          sizes: '512x512',
          type: 'image/png',
        }
      ]
    }
  })],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: './postcss.config.mjs',
  },
});