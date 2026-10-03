#!/usr/bin/env node
/**
 * Generates the WhatsApp / social share images and the Apple touch icon.
 * Run by hand (`npm run og`) after a machine or its photo changes; NOT part of
 * the build. Outputs are committed under public/og/ and public/.
 *
 * Images carry no spec figures and no phone numbers on purpose: those live in
 * constants.ts and the page text, and a baked-in figure cannot be corrected by
 * editing the data. WhatsApp often crops previews to a square, so everything that
 * matters sits inside the centre 630x630 of the 1200x630 canvas.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const W = 1200, H = 630, SQ = H, SQ_X = (W - SQ) / 2; // centre square: x 285..915
const BG = '#0d1117';
const ORANGE = '#ea580c'; // favicon.svg and Tailwind orange-600, the site's orange
const FONT = 'Helvetica Neue, Arial, sans-serif';
const MAX_BYTES = 150 * 1024;
const FLEET_IDS = ['1500sj', '1350sjp', 's85xc', 's60j']; // shown on fleet.jpg

const constants = readFileSync('constants.ts', 'utf8');
// One chunk per BOOM_LIFTS entry, split on `id: "` so fields cannot leak between entries.
const lifts = constants.split(/\bid: "/).slice(1).map((chunk) => {
  const field = (f) => {
    const m = chunk.match(new RegExp(`\\b${f}: "([^"]+)"`));
    if (!m) throw new Error(`could not read ${f} near id "${chunk.slice(0, 20)}" in constants.ts`);
    return m[1];
  };
  return { id: chunk.slice(0, chunk.indexOf('"')), slug: field('slug'), model: field('model'), brand: field('brand'), imageUrl: field('imageUrl') };
});
if (lifts.length === 0) throw new Error('no lifts found in constants.ts');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const text = (y, size, str, { fill = '#fff', weight = 700, spacing = 0 } = {}) =>
  `<text x="${W / 2}" y="${y}" text-anchor="middle" font-family="${FONT}" font-weight="${weight}" font-size="${size}" letter-spacing="${spacing}" fill="${fill}">${esc(str)}</text>`;
const svg = (body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${body}</svg>`);
const bar = `<rect width="${W}" height="6" fill="${ORANGE}"/>`;
const wordmark = text(600, 20, 'OG-IN WORLDWIDE', { fill: '#94a3b8', spacing: 5 });
const taglines = (y, a, b) =>
  text(y, 28, a, { fill: '#cbd5e1', weight: 400 }) + text(y + 42, 28, b, { fill: ORANGE });

/** A white rounded plate with the product photo letterboxed inside it (contain, never crop). */
async function plate(imageUrl, w, h, pad = 20) {
  const photo = await sharp(`public${imageUrl}`)
    .resize(w - 2 * pad, h - 2 * pad, { fit: 'contain', background: '#ffffff' })
    .toBuffer();
  const mask = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="14" fill="#fff"/></svg>`);
  return sharp({ create: { width: w, height: h, channels: 4, background: '#ffffff' } })
    .composite([{ input: photo, left: pad, top: pad }, { input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

/** Encode as JPEG at the highest quality that fits under MAX_BYTES. */
async function writeJpeg(pipeline, out) {
  const raw = await pipeline.flatten({ background: BG }).png().toBuffer();
  for (let q = 85; q >= 50; q -= 5) {
    const buf = await sharp(raw).jpeg({ quality: q, mozjpeg: true }).toBuffer();
    if (buf.length < MAX_BYTES) {
      writeFileSync(out, buf);
      console.log(`  ${out}  ${(buf.length / 1024).toFixed(1)} KB  q${q}`);
      return;
    }
  }
  throw new Error(`${out} stays over ${MAX_BYTES} bytes even at q50`);
}

const canvas = () => sharp({ create: { width: W, height: H, channels: 3, background: BG } });

mkdirSync('public/og', { recursive: true });

// Machine pages: plate, brand + model, two taglines, wordmark -- all inside the centre square.
for (const lift of lifts) {
  const pw = SQ - 90, ph = 340;
  await writeJpeg(
    canvas().composite([
      { input: await plate(lift.imageUrl, pw, ph), left: SQ_X + 45, top: 36 },
      { input: svg(bar + text(440, 54, `${lift.brand} ${lift.model}`) + taglines(492, 'Telescopic boom lift', 'Operator included') + wordmark) },
    ]),
    `public/og/${lift.slug}.jpg`,
  );
}

// Homepage: hero photo cover-cropped under a dark gradient.
const shade = `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${BG}" stop-opacity="0.55"/><stop offset="1" stop-color="${BG}" stop-opacity="0.92"/>
</linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/>`;
await writeJpeg(
  sharp('public/images/homebg.webp').resize(W, H, { fit: 'cover' }).composite([
    { input: svg(shade + bar + text(330, 72, 'Boom lift rental') + taglines(400, 'JLG & Genie telescopic boom lifts', 'Operator included with every hire') + wordmark) },
  ]),
  'public/og/home.jpg',
);

// Fleet page: a row of plates (the middle two fall inside the square crop) and the heading.
const fleet = FLEET_IDS.map((id) => {
  const lift = lifts.find((l) => l.id === id);
  if (!lift) throw new Error(`FLEET_IDS names "${id}", which is not in constants.ts`);
  return lift;
});
const gap = 20, pw = (W - 2 * 30 - gap * (fleet.length - 1)) / fleet.length;
const plates = await Promise.all(fleet.map((l, i) => plate(l.imageUrl, pw, 280, 16).then((input) => ({ input, left: 30 + i * (pw + gap), top: 40 }))));
await writeJpeg(
  canvas().composite([
    ...plates,
    { input: svg(bar + text(420, 64, 'Boom lift fleet') + taglines(475, 'JLG & Genie telescopic boom lifts', 'Operator included with every hire') + wordmark) },
  ]),
  'public/og/fleet.jpg',
);

// Apple touch icon: the favicon itself, full-bleed (iOS applies its own corner mask).
const favicon = readFileSync('public/favicon.svg', 'utf8').replace(/\s+rx="[^"]*"/, '');
await sharp(Buffer.from(favicon), { density: (180 / 32) * 72 })
  .resize(180, 180)
  .flatten({ background: ORANGE })
  .png()
  .toFile('public/apple-touch-icon.png');
console.log('  public/apple-touch-icon.png');
