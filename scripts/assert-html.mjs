#!/usr/bin/env node
/**
 * Asserts that the build actually emitted server-rendered HTML.
 *
 * The failure this exists to catch is silent. A stray `client:only`, a missing
 * prerender, or a bad adapter all produce a green build and a correct-looking
 * dist/ -- while shipping an empty <div id="root"> that no crawler can read.
 * That is the exact state this site is in before the static port: index.html is
 * ~1.2 KB of shell, and all seven machines' specs exist only after React boots.
 *
 * So this checks rendered output, not source. It reads its expectations from
 * constants.ts so it cannot drift from the real data.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = process.argv[2] || 'dist';
const MIN_BYTES = 10_000; // the shell is ~1.2 KB; a real render of any page is >30 KB

const constants = readFileSync('constants.ts', 'utf8');
const pick = (re, label) => {
  const m = constants.match(re);
  if (!m) throw new Error(`could not read ${label} from constants.ts`);
  return m[1];
};
// Every model name, from the source of truth. A page must name at least one: the
// homepage and /fleet list them all, a machine page names only its own.
const models = [...constants.matchAll(/model: "([^"]+)"/g)].map((m) => m[1]);
if (models.length === 0) throw new Error('no model names found in constants.ts');

// The Devanagari label on the language toggle in Header. This is the correct probe
// for "did the toggle render": strings from TRANSLATIONS.hi only appear once the page
// is already in Hindi, whereas the toggle's own label renders on the English page,
// which is what the build emits.
const header = readFileSync('src/components/Header.tsx', 'utf8');
const toggleLabel = (header.match(/'([\u0900-\u097F]+)'/) || [])[1];
if (!toggleLabel) throw new Error('could not find the Devanagari toggle label in components/Header.tsx');

const htmlFiles = [];
const junkFiles = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith('.html')) htmlFiles.push(p);
    // public/ is copied wholesale, and Finder recreates .DS_Store the moment anyone
    // opens the folder, so this needs catching at build time, not once by hand.
    else if (e === '.DS_Store') junkFiles.push(p);
  }
})(DIST);

if (htmlFiles.length === 0) {
  console.error(`FAIL  no .html files in ${DIST}/ -- did the build run?`);
  process.exit(1);
}

let failures = 0;
const fail = (file, msg) => { failures++; console.error(`  FAIL  ${relative(DIST, file)}  ${msg}`); };

for (const junk of junkFiles) {
  failures++;
  console.error(`  FAIL  ${relative(DIST, junk)}  junk file copied into the build -- delete it from public/`);
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const bytes = Buffer.byteLength(html);

  if (bytes < MIN_BYTES) {
    fail(file, `${bytes} bytes < ${MIN_BYTES} floor -- looks like an unrendered shell`);
  }
  if (/<div id="root"><\/div>/.test(html)) {
    fail(file, 'contains an empty <div id="root"> -- content did not server-render');
  }
  // Titles and descriptions are brand-visible in search results, so keep them
  // inside the lengths Google will actually render rather than discovering the
  // truncation live.
  const title = (html.match(/<title>(.*?)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="(.*?)"/) || [])[1] || '';
  const decode = (s) => s.replace(/&#\d+;|&amp;/g, 'x');
  if (!title) fail(file, 'has no <title>');
  else if (decode(title).length > 60) fail(file, `title is ${decode(title).length} chars, over 60`);
  if (!desc) fail(file, 'has no meta description');
  else if (decode(desc).length > 160) fail(file, `meta description is ${decode(desc).length} chars, over 160`);

  if (!models.some((m) => html.includes(m))) {
    fail(file, 'names none of the machines in constants.ts -- fleet data missing from served HTML');
  }
  if (!html.includes(toggleLabel)) {
    fail(file, `does not contain Hindi text "${toggleLabel}" -- the language toggle did not render`);
  }
}

const checked = `${htmlFiles.length} HTML file${htmlFiles.length === 1 ? '' : 's'}`;
if (failures) {
  console.error(`\n  ${failures} assertion(s) failed across ${checked}.`);
  process.exit(1);
}
console.log(`  PASS  ${checked} ${htmlFiles.length === 1 ? 'contains' : 'contain'} server-rendered content, fleet data and Hindi text.`);
