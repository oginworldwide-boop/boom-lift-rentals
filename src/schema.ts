import type { BoomLift } from '../types';
import { CONTACT_INFO } from '../constants';

/**
 * JSON-LD, built only from constants.ts.
 *
 * What is deliberately absent, and why:
 *   - No `price` or `priceSpecification`. Pricing is quote-based; inventing a
 *     number or a range would be a commercial claim nobody has made.
 *   - No `aggregateRating` or `review`. There are no reviews.
 *   - No `availability`. Asserting InStock for every machine is a claim about
 *     fleet status that nothing in the repo supports.
 *   - No `streetAddress`, `postalCode` or `geo`. CONTACT_INFO has only the city
 *     and state, and the registered address is still unconfirmed.
 *   - No certification, standards-compliance or inspection properties of any
 *     kind, and no GST or LLP registration number.
 *
 * Consequence to expect rather than be surprised by: a Product with no offers
 * price and no reviews will draw "missing field" warnings in Search Console and
 * will almost certainly not be granted rich results. The value here is entity
 * clarity -- telling search engines what these machines are and who lets them --
 * not stars.
 */

const tel = (n: string) => `+${n.replace(/\D/g, '')}`;

export const businessId = (site: URL) => new URL('#business', site).href;

export const localBusiness = (site: URL) => ({
  '@type': 'LocalBusiness',
  '@id': businessId(site),
  name: 'OG-IN Worldwide LLP',
  url: site.href,
  telephone: [tel(CONTACT_INFO.phone), tel(CONTACT_INFO.phone2)],
  email: CONTACT_INFO.email,
  address: {
    '@type': 'PostalAddress',
    // The full extent of what CONTACT_INFO.address actually states.
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  // Taken from the hours the site already publishes (TRANSLATIONS.en.cta_hours,
  // "Available Monday - Saturday, 9:00 AM - 7:00 PM"), not from an assumption.
  openingHours: 'Mo-Sa 09:00-19:00',
});

/** metre and kilogram, as UN/CEFACT codes. */
const quantity = (name: string, value: number, unitCode: 'MTR' | 'KGM', text: string) => ({
  '@type': 'PropertyValue',
  name,
  value,
  unitCode,
  // The display string from constants.ts, so the dual-unit figure the site shows
  // is what a consumer reads too.
  description: text,
});

export const liftGraph = (lift: BoomLift, site: URL, pageUrl: string) => {
  const image = new URL(lift.imageUrl, site).href;

  return [
    localBusiness(site),
    {
      '@type': 'Product',
      '@id': `${pageUrl}#product`,
      name: `${lift.brand} ${lift.model}`,
      brand: { '@type': 'Brand', name: lift.brand },
      category: 'Telescopic boom lift',
      image,
      description: lift.description.en,
      additionalProperty: [
        quantity('Platform height', lift.heightM, 'MTR', lift.platformHeight),
        quantity('Horizontal outreach', lift.outreachM, 'MTR', lift.horizontalOutreach),
        quantity('Platform capacity', lift.capacityKg, 'KGM', lift.platformCapacity),
        quantity('Machine weight', lift.weightKg, 'KGM', lift.weight),
      ],
      offers: {
        '@type': 'Offer',
        // Rented, not sold. No price and no availability: see the note above.
        businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
        seller: { '@id': businessId(site) },
        url: pageUrl,
      },
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      serviceType: 'Boom lift rental',
      name: `${lift.brand} ${lift.model} boom lift rental`,
      provider: { '@id': businessId(site) },
      areaServed: { '@type': 'Country', name: 'India' },
    },
  ];
};

export const graph = (nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
