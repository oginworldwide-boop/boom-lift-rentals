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

  // One URL per page, no trailing slash. 'file' emits /fleet/jlg-1350sjp.html, which
  // static hosts serve at /fleet/jlg-1350sjp. This has to agree with the canonical
  // tags and the sitemap or the port manufactures the duplicate URLs it exists to
  // prevent.
  trailingSlash: 'never',
  build: { format: 'file' },

  integrations: [react()],

  vite: {
    // Tailwind v4 is CSS-first: config lives in src/styles/global.css via
    // @import "tailwindcss". This is the same plugin the Vite build used, so
    // nothing about the Tailwind setup changes in this port.
    plugins: [tailwindcss()],
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  },
});
