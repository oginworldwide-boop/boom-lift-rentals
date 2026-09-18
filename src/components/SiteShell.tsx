
import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import LiftCard from './LiftCard';
import SpecsModal from './SpecsModal';
import TrustSection from './TrustSection';
import Footer from './Footer';
import { BOOM_LIFTS, CONTACT_INFO } from '../../constants';
import type { BoomLift } from '../../types';
import { Phone } from 'lucide-react';
import { LanguageProvider, useLanguage } from '../i18n/language-context';

const SiteShellContent: React.FC = () => {
  const { t } = useLanguage();
  const [selectedLift, setSelectedLift] = useState<BoomLift | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Hero />

        <section id="fleet" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.fleet_title}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t.fleet_desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BOOM_LIFTS.map((lift) => (
              <LiftCard
                key={lift.id}
                lift={lift}
                onSelect={setSelectedLift}
              />
            ))}
          </div>
        </section>

        <TrustSection />

        <section className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto bg-orange-600 rounded-[2rem] p-8 md:p-16 text-center text-white shadow-2xl shadow-orange-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.cta_title}</h2>
              <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
                {t.cta_desc}
              </p>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                aria-label={`Call us at ${CONTACT_INFO.phone}`}
                className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl"
              >
                <Phone size={24} aria-hidden="true" />
                {CONTACT_INFO.phone}
              </a>
              <p className="mt-6 text-orange-200 text-sm font-medium">
                {t.cta_hours}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <SpecsModal
        lift={selectedLift}
        onClose={() => setSelectedLift(null)}
      />

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
  );
};

/**
 * The single React island for a page.
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
 * Keep props minimal and scalar. Astro serializes island props into the HTML, so
 * passing BOOM_LIFTS in would embed every machine description twice, in both
 * languages, on top of the rendered markup.
 */
const SiteShell: React.FC = () => (
  <LanguageProvider>
    <SiteShellContent />
  </LanguageProvider>
);

export default SiteShell;
