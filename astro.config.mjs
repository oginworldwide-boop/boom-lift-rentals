// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Used for canonical tags, absolute OG URLs and sitemap entries. Must match the
  // host the site is actually served from, or ranking signals split across two
  // origins.
  site: 'https://www.og-inworldwide.in',

  // One URL per page, with a trailing slash: /fleet/jlg-1350sjp/.
  //
  // 'directory' emits /fleet/jlg-1350sjp/index.html. Netlify's Pretty URLs then
  // 301s /fleet/jlg-1350sjp to /fleet/jlg-1350sjp/, so the slash form is the URL
  // that actually answers 200 and is the only correct canonical. With 'never' every
  // canonical, og:url and sitemap entry pointed at a redirect.
  // Do not switch build.format to 'file': it puts .html into Astro.url.pathname,
  // which corrupts every canonical and og:url.
  trailingSlash: 'always',
  // inlineStylesheets: the whole CSS is a few KB; inlining it removes the one
  // render-blocking request that delayed LCP on slow 4G.
  build: { format: 'directory', inlineStylesheets: 'always' },

  // sitemap() derives every URL from `site` and the generated routes, so the
  // sitemap cannot drift from the canonical tags. 404 is excluded automatically;
  // the quote thank-you page is noindex and must stay out too.
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/quote/thanks/') })],

  vite: {
    // Tailwind v4 is CSS-first: config lives in src/styles/global.css via
    // @import "tailwindcss". This is the same plugin the Vite build used, so
    // nothing about the Tailwind setup changes in this port.
    plugins: [tailwindcss()],
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  },
});
