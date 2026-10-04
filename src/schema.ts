import type { BoomLift } from '../types';
import { CONTACT_INFO } from '../constants';
import { addressLocality, e164 } from './seo';

/**
 * JSON-LD, built only from constants.ts.
 *
 * What is deliberately absent, and why:
 *   - No `Product` node. Google only grants product snippets with a price, a
 *     review or a rating, and this site may state none of them, so a Product
 *     would be an invalid item. Each machine is described as a `Service` instead.
 *   - No `price` or `priceSpecification`. Pricing is quote-based; inventing a
 *     number or a range would be a commercial claim nobody has made.
 *   - No `aggregateRating` or `review`. There are no reviews.
 *   - No `availability`. Asserting InStock for every machine is a claim about
 *     fleet status that nothing in the repo supports.
 *   - No `geo`. The registered office address was supplied by the client on
 *     2026-10-03; coordinates were not, and are not guessed.
 *   - No certification, standards-compliance or inspection properties of any
 *     kind, and no GST or LLP registration number.
 */

const NAME = 'OG-IN Worldwide LLP';
const INDIA = { '@type': 'Country', name: 'India' };

export const businessId = (site: URL) => new URL('#business', site).href;

export const localBusiness = (site: URL) => {
  const a = CONTACT_INFO.address;
  return {
    '@type': 'LocalBusiness',
    '@id': businessId(site),
    name: NAME,
    url: site.href,
    telephone: [e164(CONTACT_INFO.phone), e164(CONTACT_INFO.phone2)],
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: addressLocality(a),
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: 'IN',
    },
    areaServed: INDIA,
    // Taken from the hours the site already publishes (TRANSLATIONS.cta_hours,
    // "Mon–Sun, 9:00 AM–6:00 PM", client-supplied 2026-10-04), not from an assumption.
    openingHours: 'Mo-Su 09:00-18:00',
  };
};

export const webSite = (site: URL) => ({
  '@type': 'WebSite',
  '@id': new URL('#website', site).href,
  name: NAME,
  url: site.href,
  publisher: { '@id': businessId(site) },
});

export const breadcrumbs = (items: { name: string; url: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

export const liftService = (lift: BoomLift, site: URL, pageUrl: string) => ({
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  name: `${lift.brand} ${lift.model} boom lift rental`,
  serviceType: 'Boom lift rental',
  description: lift.description,
  image: new URL(lift.imageUrl, site).href,
  url: pageUrl,
  provider: { '@id': businessId(site) },
  areaServed: INDIA,
});

export const graph = (nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
