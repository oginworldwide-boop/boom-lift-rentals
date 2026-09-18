import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HomeSections from './HomeSections';
import LiftDetail from './LiftDetail';
import { CONTACT_INFO } from '../../constants';
import { Phone } from 'lucide-react';
import { LanguageProvider } from '../i18n/language-context';

interface SiteShellProps {
  page: 'home' | 'lift';
  /** Required when page is 'lift'. */
  liftId?: string;
}

/**
 * The single React island for a page: shared chrome plus one page body.
 *
 * Astro islands each run in their own React root, so a context provider in one
 * island is invisible to every other. Header owns setLanguage while Hero, Footer
 * and the fleet grid consume it, so splitting them into separate islands would
 * silently break the Hindi toggle. Keeping the whole page inside one island keeps
 * the context intact, and Astro still server-renders it to full static HTML.
 *
 * This is scaffolding, not the destination. When /hi/ routes land, language
 * becomes a route rather than client state, the toggle becomes a plain <a>, and
 * these components can be converted to .astro for a zero-JS page. Until then the
 * page hydrates, which is the same JS the site already ships today.
 *
 * Keep props scalar. Astro serializes island props into the HTML, so passing a
 * BoomLift record in would embed its description and features twice, in both
 * languages, on top of the rendered markup. Pass an id and look it up instead.
 */
const SiteShell: React.FC<SiteShellProps> = ({ page, liftId }) => (
  <LanguageProvider>
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {page === 'home' && <HomeSections />}
        {page === 'lift' && <LiftDetail liftId={liftId!} />}
      </main>

      <Footer />

      {/* Mobile Sticky Call Button */}
      <div className="fixed bottom-6 right-6 z-40 sm:hidden">
        <a
          href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
          aria-label={`Call us at ${CONTACT_INFO.phone}`}
          className="flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full shadow-2xl animate-bounce"
        >
          <Phone size={28} aria-hidden="true" />
        </a>
      </div>
    </div>
  </LanguageProvider>
);

export default SiteShell;
