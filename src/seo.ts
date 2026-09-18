import type { BoomLift } from '../types';
import { CONTACT_INFO } from '../constants';

/**
 * Page titles and meta descriptions, assembled from constants.ts.
 *
 * Every figure here is read from the BoomLift record; nothing is restated, rounded
 * or invented. No claim about certification, compliance, pricing or availability
 * appears in any of these strings beyond what the site already says.
 */

const BRAND_SUFFIX = 'OG-IN Worldwide';

/** Google truncates around these lengths; exceeded values are reported by `npm run seo`. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

export const liftTitle = (lift: BoomLift) =>
  `${lift.brand} ${lift.model} Boom Lift Rental — ${lift.nominalHeightFt} ft | ${BRAND_SUFFIX}`;

export const liftDescription = (lift: BoomLift) =>
  `${lift.brand} ${lift.model} boom lift on hire pan-India. ` +
  `${lift.platformHeight} height, ${lift.platformCapacity} capacity, ` +
  `certified operator included. Call ${CONTACT_INFO.phone}.`;

export const FLEET_TITLE = `Boom Lift Fleet — JLG & Genie, 60–150 ft | ${BRAND_SUFFIX}`;

export const FLEET_DESCRIPTION =
  `Telescopic boom lifts for hire pan-India, 60 ft to 150 ft platform height, ` +
  `every machine with a certified operator. JLG and Genie. ` +
  `Call ${CONTACT_INFO.phone}.`;

export const HOME_TITLE = 'Boom Lift Rental & Hiring Services Pan-India';

export const HOME_DESCRIPTION =
  'Rent boom lifts Pan-India with certified operators. JLG 860SJ, 1200SJP, 1350SJP & more. ' +
  'Call OG-IN Worldwide for same-day quotes.';
