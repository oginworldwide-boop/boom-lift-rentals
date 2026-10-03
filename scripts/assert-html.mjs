#!/usr/bin/env node
/**
 * Asserts that the build emitted correct, server-rendered static HTML.
 *
 * The failures this exists to catch are silent. A stray `client:only`, a missing
 * prerender or a bad adapter all produce a green build and a correct-looking
 * dist/ -- while shipping an empty <main> that no crawler can read. Likewise a
 * canonical without its trailing slash, a share image that 404s, or a spec that
 * stopped rendering all look fine until someone checks the live page.
 *
 * So this checks rendered output, not source. It reads its expectations from
 * constants.ts and astro.config.mjs so it cannot drift from the real data.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = process.argv[2] || 'dist';
// Visible characters inside <main>. An unrendered shell has 0; the sparsest real
// page (404: heading plus links to the machines) has ~107; content pages have thousands.
const MIN_MAIN_TEXT = 100;

const constants = readFileSync('constants.ts', 'utf8');
const config = readFileSync('astro.config.mjs', 'utf8');

const SITE = (config.match(/site:\s*'([^']+)'/) || [])[1]?.replace(/\/$/, '');
if (!SITE) throw new Error('could not read `site` from astro.config.mjs');

// Every model name, from the source of truth. A page must name at least one: the
// homepage and /fleet list them all, a machine page names only its own.
const models = [...constants.matchAll(/model: "([^"]+)"/g)].map((m) => m[1]);
if (models.length === 0) throw new Error('no model names found in constants.ts');

// Per-machine display specs. Each chunk runs from one `slug:` to the next, so a
// field missing from one entry cannot be borrowed from its neighbour.
const SPEC_FIELDS = ['platformHeight', 'horizontalOutreach', 'platformCapacity', 'weight'];
const lifts = constants.split(/\bslug: "/).slice(1).map((chunk) => {
  const slug = chunk.slice(0, chunk.indexOf('"'));
  const specs = SPEC_FIELDS.map((f) => {
    const m = chunk.match(new RegExp(`\\b${f}: "([^"]+)"`));
    if (!m) throw new Error(`could not read ${f} for ${slug} from constants.ts`);
    return m[1];
  });
  return { slug, specs };
});
if (lifts.length !== models.length) {
  throw new Error(`constants.ts has ${models.length} models but ${lifts.length} slugs`);
}

// Phone numbers, as their last ten digits, so a hardcoded copy is caught whatever
// its spacing or country-code prefix.
const phoneDigits = [...constants.matchAll(/\b(?:phone2?|whatsapp): "([^"]+)"/g)]
  .map((m) => m[1].replace(/\D/g, '').slice(-10));
if (phoneDigits.length === 0) throw new Error('no phone numbers found in constants.ts');

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};

const distFiles = walk(DIST);
const htmlFiles = distFiles.filter((p) => p.endsWith('.html'));
// public/ is copied wholesale, and Finder recreates .DS_Store the moment anyone
// opens the folder, so this needs catching at build time, not once by hand.
const junkFiles = distFiles.filter((p) => p.endsWith(`${sep}.DS_Store`));

if (htmlFiles.length === 0) {
  console.error(`FAIL  no .html files in ${DIST}/ -- did the build run?`);
  process.exit(1);
}

let failures = 0;
const fail = (file, msg) => { failures++; console.error(`  FAIL  ${file}  ${msg}`); };

// Netlify Forms registers a form from the deployed HTML and merges every form with
// the same name, keeping only the fields it saw. So each quote form must carry the
// Netlify markers, and all of them must have the identical field set.
let quoteFields = null; // { names, file } from the first quote form seen

for (const junk of junkFiles) {
  fail(relative(DIST, junk), 'junk file copied into the build -- delete it from public/');
}

const decodeEntities = (s) => s
  .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/** dist/fleet/x/index.html -> /fleet/x/ ; dist/index.html -> / ; dist/404.html -> /404 */
const routeOf = (rel) => {
  const p = rel.split(sep).join('/');
  if (p === 'index.html') return '/';
  if (p.endsWith('/index.html')) return `/${p.slice(0, -'index.html'.length)}`;
  return `/${p.slice(0, -'.html'.length)}`;
};

for (const file of htmlFiles) {
  const rel = relative(DIST, file);
  const html = readFileSync(file, 'utf8');
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);

  // The shell failure mode is an empty <main>: check its visible text, not file size.
  const main = (html.match(/<main id="main-content"[^>]*>([\s\S]*?)<\/main>/) || [])[1];
  if (main === undefined) fail(rel, 'has no <main id="main-content"> -- content did not server-render');
  else {
    const text = main.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length < MIN_MAIN_TEXT) {
      fail(rel, `<main> has ${text.length} chars of text < ${MIN_MAIN_TEXT} -- looks like an unrendered shell`);
    }
  }

  // Zero client JS: nothing on this site needs hydration.
  if (html.includes('astro-island')) fail(rel, 'contains an <astro-island> -- a client:* directive crept in');
  if (html.includes('<script type="module"')) fail(rel, 'ships a <script type="module"> -- the site is meant to be zero-JS');

  // Titles and descriptions are brand-visible in search results, so keep them
  // inside the lengths Google will actually render rather than discovering the
  // truncation live.
  const title = (html.match(/<title>(.*?)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="(.*?)"/) || [])[1] || '';
  const decode = (s) => s.replace(/&#\d+;|&amp;/g, 'x');
  if (!title) fail(rel, 'has no <title>');
  else if (decode(title).length > 60) fail(rel, `title is ${decode(title).length} chars, over 60`);
  if (!desc) fail(rel, 'has no meta description');
  else if (decode(desc).length > 160) fail(rel, `meta description is ${decode(desc).length} chars, over 160`);

  if (!models.some((m) => html.includes(m))) {
    fail(rel, 'names none of the machines in constants.ts -- fleet data missing from served HTML');
  }

  // Canonical must be the exact URL Netlify answers with a 200: origin + route,
  // trailing slash included (Pretty URLs 301s the slashless form).
  if (!noindex) {
    const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    const expected = SITE + routeOf(rel);
    if (!canonical) fail(rel, 'has no canonical');
    else {
      if (!canonical.endsWith('/')) fail(rel, `canonical ${canonical} lacks a trailing slash`);
      if (canonical !== expected) fail(rel, `canonical ${canonical} != expected ${expected}`);
    }
    const ogUrl = (html.match(/<meta property="og:url" content="([^"]*)"/) || [])[1];
    if (ogUrl !== canonical) fail(rel, `og:url ${ogUrl} != canonical ${canonical}`);
  }

  // Internal links must hit the 200 URL directly, not a 301.
  for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
    const path = href.split('?')[0];
    if (!path.endsWith('/') && !href.includes('#') && !/\.[a-z0-9]+$/i.test(path)) {
      fail(rel, `internal link ${href} has no trailing slash`);
    }
  }

  // Share images: a 404 here is a blank WhatsApp preview.
  for (const [, url] of html.matchAll(/<meta (?:property="og:image"|name="twitter:image") content="([^"]*)"/g)) {
    if (!/\.(jpe?g|png)$/i.test(url)) fail(rel, `share image ${url} is not JPEG/PNG -- WhatsApp previews are unreliable with WebP`);
    if (!url.startsWith(SITE + '/')) fail(rel, `share image ${url} is not on ${SITE}`);
    else if (!existsSync(join(DIST, decodeURIComponent(url.slice(SITE.length))))) {
      fail(rel, `share image ${url} does not exist in ${DIST}/`);
    }
  }

  for (const [, open, body] of html.matchAll(/(<form\b[^>]*\bname="quote"[^>]*>)([\s\S]*?)<\/form>/g)) {
    if (!open.includes('data-netlify="true"')) fail(rel, 'quote form lacks data-netlify="true"');
    if (!/<input[^>]*name="form-name"[^>]*value="quote"/.test(body)) fail(rel, 'quote form lacks hidden form-name=quote');
    const action = (open.match(/\baction="([^"]*)"/) || [])[1];
    if (!action || !existsSync(join(DIST, action, 'index.html'))) fail(rel, `quote form action ${action} is not a built page`);
    const names = [...new Set([...body.matchAll(/\bname="([^"]+)"/g)].map((m) => m[1]))].sort().join(',');
    if (!quoteFields) quoteFields = { names, file: rel };
    else if (names !== quoteFields.names) {
      fail(rel, `quote form fields [${names}] differ from ${quoteFields.file} [${quoteFields.names}]`);
    }
  }

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch (e) { fail(rel, `JSON-LD does not parse: ${e.message}`); }
  }
}

// Each machine page must carry all four of its specs in the served HTML.
for (const { slug, specs } of lifts) {
  const rel = join('fleet', slug, 'index.html');
  const file = join(DIST, rel);
  if (!existsSync(file)) { fail(rel, `missing -- no page for slug ${slug}`); continue; }
  const html = decodeEntities(readFileSync(file, 'utf8'));
  for (const s of specs) if (!html.includes(s)) fail(rel, `does not contain spec "${s}"`);
}

// constants.ts is the only place a phone number may live. Separators between
// digits are dropped first so "92210 28139" and "92210-28139" are caught too.
for (const file of walk('src')) {
  const digits = readFileSync(file, 'utf8').replace(/(\d)[\s-]+(?=\d)/g, '$1');
  for (const d of phoneDigits) {
    if (digits.includes(d)) fail(file, `hardcodes phone number ${d} -- reference CONTACT_INFO instead`);
  }
}

const checked = `${htmlFiles.length} HTML file${htmlFiles.length === 1 ? '' : 's'}`;
if (failures) {
  console.error(`\n  ${failures} assertion(s) failed across ${checked}.`);
  process.exit(1);
}
console.log(`  PASS  ${checked}: server-rendered, zero-JS, canonicals, links, share images, JSON-LD, specs, no stray phone numbers.`);
