import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this repo at /kimaru-website/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/kimaru-website/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: { input: { main: resolve(__dirname, 'index.html'), product: resolve(__dirname, 'product.html'), production: resolve(__dirname, 'production-commitment.html'), company: resolve(__dirname, 'company.html'), walkthrough: resolve(__dirname, 'walkthrough.html') } },
  },
});
