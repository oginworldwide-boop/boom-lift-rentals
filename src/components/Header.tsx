import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { CONTACT_INFO, TRANSLATIONS as t } from '../../constants';
import { fill } from '../fleet';
import { telHref, waPrefill, whatsappHref } from '../seo';
import { BTN_PRIMARY, BTN_WA, CONTAINER, cx } from './ui';

export const Wordmark: React.FC<{ full?: boolean }> = ({ full }) => (
  <span className="flex items-center gap-2">
    <span aria-hidden="true" className="grid size-8 place-items-center bg-safety font-display text-xl text-white">O</span>
    <span className="font-display text-2xl leading-none tracking-wide text-white">OG-IN</span>
    <span className={`micro-label text-steel-300 ${full ? '' : 'hidden sm:inline'}`}>Worldwide</span>
  </span>
);

const NAV = [
  { href: '/fleet/', label: t.fleet_title },
  { href: '/contact/', label: t.nav_contact },
];

const Header: React.FC<{ path: string }> = ({ path }) => (
  <header className="sticky top-0 z-50 border-b border-steel-800 bg-ink text-white">
    <div className={`${CONTAINER} flex h-14 items-center justify-between gap-2 sm:h-16`}>
      <a href="/" aria-label="OG-IN Worldwide, home" className="inline-flex min-h-12 items-center">
        <Wordmark />
      </a>

      <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
        {NAV.map(({ href, label }) => {
          const active = path.startsWith(href);
          return (
            <a
              key={href}
              href={href}
              aria-current={path === href ? 'page' : undefined}
              className={`relative inline-flex min-h-12 items-center whitespace-nowrap px-2 text-sm font-semibold transition-colors duration-150 hover:text-white ${
                active ? 'text-white after:absolute after:inset-x-2 after:bottom-2 after:h-0.5 after:bg-safety' : 'text-steel-300'
              }`}
            >
              {label}
            </a>
          );
        })}
        <a
          href={telHref(CONTACT_INFO.phone)}
          aria-label={fill(t.cta_call_aria)}
          className={cx(BTN_PRIMARY, 'ml-2 px-4 text-sm tabular-nums max-sm:hidden')}
        >
          <Phone size={18} aria-hidden="true" />
          {t.nav_call}
          <span className="hidden lg:inline">{CONTACT_INFO.phone}</span>
        </a>
        <a
          href={whatsappHref(waPrefill())}
          aria-label={t.cta_whatsapp_aria}
          className={cx(BTN_WA, 'w-12 px-0 max-sm:hidden')}
        >
          <MessageCircle size={20} aria-hidden="true" />
        </a>
      </nav>
    </div>
  </header>
);

export default Header;
