import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { CONTACT_INFO } from '../../constants';
import { telHref } from '../seo';
import { Phone } from 'lucide-react';

/**
 * Shared chrome for every page. Each .astro page passes its body as children.
 * Rendered to static HTML at build time with no client directive: zero JS ships.
 */
const SiteShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-dvh flex flex-col">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-slate-900 focus:px-4 focus:py-3 focus:rounded-lg focus:font-semibold"
    >
      Skip to content
    </a>
    <Header />

    <main id="main-content" className="flex-grow">
      {children}
    </main>

    <Footer />

    {/* Mobile Sticky Call Button */}
    <div className="fixed bottom-6 right-6 z-40 sm:hidden">
      <a
        href={telHref(CONTACT_INFO.phone)}
        aria-label={`Call us at ${CONTACT_INFO.phone}`}
        className="flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full shadow-2xl motion-safe:animate-bounce"
      >
        <Phone size={28} aria-hidden="true" />
      </a>
    </div>
  </div>
);

export default SiteShell;
