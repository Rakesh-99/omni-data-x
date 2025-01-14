import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/', // Ensures the app works on Netlify (can adjust if deployed under a subdirectory)
  build: {
    outDir: 'dist', // This is the default, but you can explicitly define it
    assetsDir: 'assets', // Ensure assets are placed in the correct directory
  },
});
