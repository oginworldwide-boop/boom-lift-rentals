import React from 'react';
import { FileText, MessageCircle, Phone } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { CONTACT_INFO, TRANSLATIONS as t } from '../../constants';
import { fill } from '../fleet';
import { telHref, waPrefill, whatsappHref } from '../seo';

const CELL = 'flex h-14 items-center justify-center gap-2 text-[0.9375rem] font-semibold active:translate-y-px';

/**
 * Shared chrome for every page. Each .astro page passes its body as children.
 * Rendered to static HTML at build time with no client directive: zero JS ships.
 * Props stay scalar: `path` marks the active nav link, `quoteHref` points the
 * mobile "Get a quote" cell at this page's form or, without one, the contact page's.
 */
const SiteShell: React.FC<{ children: React.ReactNode; path: string; quoteHref?: string }> = ({
  children, path, quoteHref = '/contact/#quote',
}) => (
  <div className="flex min-h-dvh flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-ink"
    >
      Skip to content
    </a>
    <Header path={path} />

    <main id="main-content" className="flex-grow">
      {children}
    </main>

    <Footer />

    {/* Mobile action bar: the three ways to enquire, always one tap away. */}
    <nav
      aria-label="Contact options"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-steel-700 bg-ink pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <a href={telHref(CONTACT_INFO.phone)} aria-label={fill(t.cta_call_aria)} className={`${CELL} text-white`}>
        <Phone size={20} aria-hidden="true" />
        {t.cta_call}
      </a>
      <a href={whatsappHref(waPrefill())} className={`${CELL} bg-wa text-ink`}>
        <MessageCircle size={20} aria-hidden="true" />
        {t.cta_whatsapp}
      </a>
      <a href={quoteHref} className={`${CELL} bg-safety-ink text-white`}>
        <FileText size={20} aria-hidden="true" />
        {t.cta_quote}
      </a>
    </nav>
  </div>
);

export default SiteShell;
