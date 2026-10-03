#!/usr/bin/env node
/**
 * Smaller copies of the product and hero photos for srcset. Run by hand
 * (`npm run images`) after a photo in public/images/ changes; NOT part of the
 * build. Outputs are committed next to their source.
 *
 *   <name>.webp  ->  <name>-640.webp               (product photos, cards)
 *   homebg.webp  ->  homebg-800.webp, homebg-1200.webp  (hero; 1600 = original)
 *
 * The original stays the largest srcset candidate, so nothing is ever upscaled.
 */
import { readdirSync } from 'node:fs';
import sharp from 'sharp';

const DIR = 'public/images';
const WIDTHS = { homebg: [800, 1200] };
const DEFAULT_WIDTHS = [640];

for (const file of readdirSync(DIR)) {
  // Sources only: skip anything this script wrote (name-640.webp etc.).
  if (!file.endsWith('.webp') || /-\d+\.webp$/.test(file)) continue;
  const name = file.slice(0, -'.webp'.length);
  for (const w of WIDTHS[name] ?? DEFAULT_WIDTHS) {
    const out = `${DIR}/${name}-${w}.webp`;
    const info = await sharp(`${DIR}/${file}`)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out);
    console.log(`  ${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
  }
}
