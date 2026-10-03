import React from 'react';
import { CONTACT_INFO, TRANSLATIONS as t } from '../../constants';
import { byHeight, fill } from '../fleet';
import { formatAddress, liftPath, telHref, waPrefill, whatsappHref } from '../seo';
import { CONTAINER } from './ui';
import { Wordmark } from './Header';

// Rendered only once the client supplies the numbers (empty in constants.ts until then).
const companyIds = [
  CONTACT_INFO.gstin && `GSTIN ${CONTACT_INFO.gstin}`,
  CONTACT_INFO.llpin && `LLPIN ${CONTACT_INFO.llpin}`,
].filter(Boolean).join(' · ');

const HEAD = 'micro-label mb-3 text-white';
const A = 'inline-flex min-h-12 lg:min-h-9 items-center text-steel-300 transition-colors duration-150 hover:text-white';

const Footer: React.FC = () => (
  <footer className="border-t-4 border-safety bg-ink text-sm text-steel-300">
    <div className={`${CONTAINER} grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]`}>
      <div className="space-y-5">
        <Wordmark full />
        <p className="max-w-[48ch] leading-relaxed">{fill(t.footer_desc)}</p>
        <div>
          <p className={HEAD}>{t.footer_address_label}</p>
          <address className="not-italic leading-relaxed">
            {formatAddress(CONTACT_INFO.address).map((line) => <span key={line} className="block">{line}</span>)}
          </address>
        </div>
      </div>

      <div>
        <h2 className={HEAD}>{t.footer_links}</h2>
        <ul className="grid grid-cols-2 gap-x-4 md:grid-cols-1">
          <li className="col-span-2 md:col-span-1"><a href="/fleet/" className={`${A} font-semibold text-white`}>{t.fleet_title}</a></li>
          {byHeight.map((l) => (
            <li key={l.id}><a href={liftPath(l)} className={A}>{l.brand} {l.model}</a></li>
          ))}
          <li><a href="/contact/" className={A}>{t.nav_contact}</a></li>
        </ul>
      </div>

      <div>
        <h2 className={HEAD}>{t.footer_contact}</h2>
        <ul className="tabular-nums">
          {[CONTACT_INFO.phone, CONTACT_INFO.phone2].map((p) => (
            <li key={p}><a href={telHref(p)} className={A}>{p}</a></li>
          ))}
          <li><a href={whatsappHref(waPrefill())} className={A}>{t.cta_whatsapp}</a></li>
          <li><a href={`mailto:${CONTACT_INFO.email}`} className={`${A} break-all`}>{CONTACT_INFO.email}</a></li>
          <li className="pt-2">{t.footer_hours}</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-steel-800">
      <div className={`${CONTAINER} flex flex-col gap-2 py-6 text-xs md:flex-row md:justify-between`}>
        <p>© {new Date().getFullYear()} OG-IN Worldwide LLP. {t.footer_rights}</p>
        {companyIds && <p>{companyIds}</p>}
      </div>
    </div>
  </footer>
);

export default Footer;
