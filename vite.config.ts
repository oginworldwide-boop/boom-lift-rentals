import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
      // Add this line below. Replace 'og-in-worldwide' if your repo name is different.
      base: '/boom-lift-rentals/', 
      define: {
        'process.env.API_KEY' : JSON.stringify('api-key-this-is-not-used-can-be-ignored!'),
      },
      server: {
        proxy: {
          '/api-proxy': 'http://localhost:5000',
        },
      },
      plugins: [react()], // Wrapped in brackets for standard Vite syntax
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});