import type { BoomLift } from '../types';
import { BOOM_LIFTS, CONTACT_INFO } from '../constants';

/**
 * Figures derived from BOOM_LIFTS, so copy never carries a typed number.
 * Add a machine to constants.ts and every range, count and list here follows.
 */

/** Ascending by measured platform height (heightM), never by display string. */
export const byHeight: BoomLift[] = [...BOOM_LIFTS].sort((a, b) => a.heightM - b.heightM);

/**
 * Platform height in whole feet, floored from heightM so a stated height never
 * exceeds the measured one. Use this wherever copy says "platform height";
 * nominalHeightFt is a model-naming term (660SJ -> 66), not a spec.
 * Today this gives 60, 66, 85, 85, 120, 135, 150: the JLG 860SJ (26.21 m =
 * 85.99 ft) floors to 85 while its datasheet rounds to 86, so per-machine chips
 * that sit under the model name keep nominalHeightFt and are not labelled
 * "platform height".
 */
export const platformFt = (l: BoomLift) => Math.floor(l.heightM / 0.3048);

/** Machines above 100 ft platform height. */
export const highReach = byHeight.filter((l) => platformFt(l) >= 100);
const lowReach = byHeight.filter((l) => platformFt(l) < 100);

/** ["120", "135", "150"] -> "120, 135 and 150" */
const joinAnd = (xs: (string | number)[]) =>
  xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;

const heightsFt = BOOM_LIFTS.map(platformFt);
const kg = (n: number) => n.toLocaleString('en-IN');
const weights = (ls: BoomLift[]) => ls.map((l) => l.weightKg);

export const FLEET_VARS: Record<string, string | number> = {
  fleetCount: BOOM_LIFTS.length,
  // No fleet-wide capacity figure: the highest capacityKg is a restricted-envelope
  // rating on dual-rated machines, so it is stated only per machine, with a note.
  minHeightFt: Math.min(...heightsFt),
  maxHeightFt: Math.max(...heightsFt),
  highReachCount: highReach.length,
  highReachHeightsFt: joinAnd(highReach.map(platformFt)),
  highReachMinFt: Math.min(...highReach.map(platformFt)),
  highReachWeightRange: `${kg(Math.min(...weights(highReach)))}–${kg(Math.max(...weights(highReach)))} kg`,
  lowCount: lowReach.length,
  // Model-designation heights (60, 66, 85 and 86): the copy using this does not call them platform height.
  lowHeightsFt: joinAnd(lowReach.map((l) => l.nominalHeightFt)),
  minWeightKg: kg(Math.min(...weights(BOOM_LIFTS))),
  maxWeightKg: kg(Math.max(...weights(BOOM_LIFTS))),
  phone: CONTACT_INFO.phone,
};

export const liftVars = (lift: BoomLift) => ({ 'lift.brand': lift.brand, 'lift.model': lift.model });

/** Fills {placeholders}. An unknown one throws, so a typo fails the build instead of shipping "{foo}". */
export const fill = (s: string, extra: Record<string, string | number> = {}) => {
  const vars = { ...FLEET_VARS, ...extra };
  return s.replace(/\{([\w.]+)\}/g, (_, k: string) => {
    if (!(k in vars)) throw new Error(`fill(): no value for {${k}} in "${s}"`);
    return String(vars[k]);
  });
};

/** "20.12 m (66 ft)" -> ["20.12 m", "66 ft"]; "11,476 kg" -> ["11,476 kg", ""]. Display split only. */
export const splitSpec = (s: string): [string, string] => {
  const m = s.match(/^(.*?)\s*\((.*)\)$/);
  return m ? [m[1], m[2]] : [s, ''];
};

/** The -640 copy written by scripts/responsive-images.mjs, plus the original. */
export const liftSrcSet = (lift: BoomLift) =>
  `${lift.imageUrl.replace(/\.webp$/, '-640.webp')} 640w, ${lift.imageUrl} ${lift.imageWidth}w`;

/** Neighbours by platform height, for "next size down / up". */
export const neighbours = (lift: BoomLift) => {
  const i = byHeight.findIndex((l) => l.id === lift.id);
  return { down: byHeight[i - 1], up: byHeight[i + 1] };
};
