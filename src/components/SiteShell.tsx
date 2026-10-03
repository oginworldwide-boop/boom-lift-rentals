import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HomeSections from './HomeSections';
import FleetSections from './FleetSections';
import LiftDetail from './LiftDetail';
import { CONTACT_INFO, BOOM_LIFTS } from '../../constants';
import { Phone } from 'lucide-react';

interface SiteShellProps {
  page: 'home' | 'fleet' | 'lift' | 'notfound';
  /** Required when page is 'lift'. */
  liftId?: string;
}

/**
 * The single React island for a page: shared chrome plus one page body, server-rendered
 * to full static HTML by Astro and then hydrated.
 *
 * Keep props scalar. Astro serializes island props into the HTML, so passing a
 * BoomLift record in would embed its description and features twice, on top of the
 * rendered markup. Pass an id and look it up instead.
 */
const SiteShell: React.FC<SiteShellProps> = ({ page, liftId }) => (
  <div className="min-h-dvh flex flex-col">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-slate-900 focus:px-4 focus:py-3 focus:rounded-lg focus:font-semibold"
    >
      Skip to content
    </a>
    <Header />

    <main id="main-content" className="flex-grow">
      {page === 'home' && <HomeSections />}
      {page === 'fleet' && <FleetSections />}
      {page === 'lift' && <LiftDetail liftId={liftId!} />}
      {page === 'notfound' && (
        <section className="max-w-3xl mx-auto px-4 pt-28 pb-24">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Page not found</h1>
          <p className="mb-6">
            <a href="/" className="underline mr-6">Home</a>
            <a href="/fleet" className="underline">Fleet</a>
          </p>
          <ul className="space-y-1">
            {BOOM_LIFTS.map((l) => (
              <li key={l.slug}><a href={`/fleet/${l.slug}`} className="underline">{l.brand} {l.model}</a></li>
            ))}
          </ul>
        </section>
      )}
    </main>

    <Footer />

    {/* Mobile Sticky Call Button */}
    <div className="fixed bottom-6 right-6 z-40 sm:hidden">
      <a
        href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
        aria-label={`Call us at ${CONTACT_INFO.phone}`}
        className="flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full shadow-2xl motion-safe:animate-bounce"
      >
        <Phone size={28} aria-hidden="true" />
      </a>
    </div>
  </div>
);

export default SiteShell;
