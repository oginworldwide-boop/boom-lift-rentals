// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Used for canonical tags, absolute OG URLs and sitemap entries. Must match the
  // host the site is actually served from, or ranking signals split across two
  // origins.
  site: 'https://www.og-inworldwide.in',

  // One URL per page, no trailing slash: /fleet/jlg-1350sjp.
  //
  // 'directory' emits /fleet/jlg-1350sjp/index.html, which every static host serves
  // at the extensionless path without extra configuration. 'file' was tried first
  // and rejected: it puts .html into Astro.url.pathname, so canonical and og:url
  // came out as /fleet/jlg-1350sjp.html while the page is served at
  // /fleet/jlg-1350sjp -- manufacturing exactly the duplicate URLs this setting is
  // supposed to prevent.
  trailingSlash: 'never',
  build: { format: 'directory' },

  integrations: [react()],

  vite: {
    // Tailwind v4 is CSS-first: config lives in src/styles/global.css via
    // @import "tailwindcss". This is the same plugin the Vite build used, so
    // nothing about the Tailwind setup changes in this port.
    plugins: [tailwindcss()],
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  },
});
