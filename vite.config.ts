import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this repo at /kimaru-website/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/kimaru-website/',
  plugins: [react(), tailwindcss()],
});
