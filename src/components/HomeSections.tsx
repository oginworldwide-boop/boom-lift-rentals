import React from 'react';
import { Clock, Mail, MessageCircle, Phone } from 'lucide-react';
import Hero from './Hero';
import { FleetGrid } from './LiftCard';
import TrustSection from './TrustSection';
import QuoteForm from './QuoteForm';
import { CLIENTS, CONTACT_INFO, TRANSLATIONS as t } from '../../constants';
import { byHeight, fill, highReach } from '../fleet';
import { liftPath, telHref, waPrefill, whatsappHref } from '../seo';
import { CONTAINER, H2, LINK, Label, cx } from './ui';

const STRIP = [
  [t.strip_height_label, t.strip_height_value],
  [t.strip_capacity_label, t.strip_capacity_value],
  [t.strip_fleet_label, t.strip_fleet_value],
  [t.strip_operator_label, t.strip_operator_value],
  [t.strip_area_label, t.strip_area_value],
  [t.strip_pricing_label, t.strip_pricing_value],
];

/** FAQ text: "[label](/path/)" becomes a link; everything else is plain text. */
const withLinks = (s: string) =>
  fill(s).split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? <a key={i} href={m[2]} className={`${LINK} font-semibold`}>{m[1]}</a> : part;
  });

/** The homepage body; SiteShell supplies the header, footer and mobile action bar. */
const HomeSections: React.FC = () => (
  <>
    <Hero />

    {/* Spec strip: the IndiaMART-row facts, then one chip per machine by height. */}
    <div className="border-b border-steel-100 bg-white">
      <div className={CONTAINER}>
        <dl className="grid grid-cols-2 gap-px border-x border-steel-100 bg-steel-100 md:grid-cols-3 xl:grid-cols-6">
          {STRIP.map(([label, value], i) => (
            <div key={label} className="bg-white px-4 py-4">
              <dt className="micro-label text-steel-500">{label}</dt>
              <dd className={`mt-1 font-display text-xl leading-tight tabular-nums sm:text-2xl ${i === 0 ? 'text-safety-ink' : ''}`}>{fill(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>

    <nav aria-label={t.card_height} className="border-b border-steel-100 bg-paper">
      <div className={`${CONTAINER} py-5`}>
        <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:grid lg:grid-cols-7 lg:pb-0">
          {byHeight.map((l) => (
            <li key={l.id} className="shrink-0 snap-start">
              <a href={liftPath(l)} className="flex min-h-12 items-baseline gap-2 border border-steel-300 bg-white px-4 py-2 transition-colors duration-150 hover:border-ink lg:h-full lg:flex-col lg:gap-0.5">
                <span className="font-display text-2xl leading-none tabular-nums">{l.nominalHeightFt} ft</span>
                <span className="text-sm whitespace-nowrap text-steel-500">{l.brand} {l.model}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>

    <section id="fleet" className="py-16 sm:py-20">
      <div className={CONTAINER}>
        <Label>{t.strip_fleet_label}</Label>
        <H2 className="mt-3">{t.fleet_title}</H2>
        <p className="mt-3 max-w-[65ch] text-steel-500">{fill(t.fleet_desc)}</p>
        <FleetGrid quoteHref="#quote" className="mt-8" />
      </div>
    </section>

    <section className="bg-ink py-16 text-white sm:py-20">
      <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end`}>
        <div>
          <H2>{t.highreach_title}</H2>
          <p className="mt-3 max-w-[55ch] leading-relaxed text-steel-100">{fill(t.highreach_desc)}</p>
          <a href="/high-reach-boom-lift-rental/" className={cx(LINK, 'mt-2 inline-flex min-h-12 items-center font-semibold text-white decoration-steel-500')}>
            {t.highreach_link}
          </a>
        </div>
        <ul className="grid grid-cols-3 border-t border-steel-700">
          {highReach.map((l, i) => (
            <li key={l.id} className={i ? 'border-l border-steel-700' : ''}>
              <a href={liftPath(l)} className="block px-3 pt-4 pb-2 transition-colors duration-150 hover:bg-steel-900 sm:px-5">
                <span className="block font-display text-[3rem] leading-none text-safety tabular-nums sm:text-[4.5rem]">
                  {l.nominalHeightFt}<span className="ml-1 text-xl text-steel-300 sm:text-2xl">ft</span>
                </span>
                <span className="mt-2 block text-sm font-semibold text-steel-100">{l.brand} {l.model}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section aria-label={t.clients_label} className="border-b border-steel-100 bg-paper py-8">
      <div className={`${CONTAINER} flex flex-col gap-4 md:flex-row md:items-center md:gap-8`}>
        <Label>{t.clients_label}</Label>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3 md:flex md:flex-wrap md:gap-x-8">
          {CLIENTS.map((c) => (
            <li key={c} className="border-l-2 border-steel-300 pl-3 font-display text-2xl leading-tight text-steel-500">{c}</li>
          ))}
        </ul>
      </div>
    </section>

    <TrustSection />

    <section className="border-t border-steel-100 py-16 sm:py-20">
      <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16`}>
        <div>
          <Label>FAQ</Label>
          <H2 className="mt-3">Common questions</H2>
        </div>
        <dl className="border-t border-steel-100">
          {t.faq.map(({ q, a }) => (
            <div key={q} className="grid gap-2 border-b border-steel-100 py-6 md:grid-cols-[2fr_3fr] md:gap-8">
              <dt className="text-lg font-semibold">{q}</dt>
              <dd className="space-y-3 text-steel-500">
                {a.map((block, i) =>
                  typeof block === 'string'
                    ? <p key={i}>{withLinks(block)}</p>
                    : (
                      <ul key={i} className="space-y-1">
                        {block.map((li) => (
                          <li key={li} className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-safety" />{li}</li>
                        ))}
                      </ul>
                    ),
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    <section className="border-t border-steel-100 bg-white py-16 sm:py-20">
      <div className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16`}>
        <div>
          <Label>{t.nav_contact}</Label>
          <H2 className="mt-3">{t.cta_title}</H2>
          <p className="mt-3 max-w-[50ch] text-steel-500">{t.cta_desc}</p>
          <ul className="mt-6 divide-y divide-steel-100 border-y border-steel-100 tabular-nums">
            {[CONTACT_INFO.phone, CONTACT_INFO.phone2].map((p) => (
              <li key={p}>
                <a href={telHref(p)} className="flex min-h-14 items-center gap-3 font-semibold hover:text-safety-ink">
                  <Phone size={20} aria-hidden="true" className="text-safety" />{p}
                </a>
              </li>
            ))}
            <li>
              <a href={whatsappHref(waPrefill())} className="flex min-h-14 items-center gap-3 font-semibold hover:text-safety-ink">
                <MessageCircle size={20} aria-hidden="true" className="text-safety" />{t.cta_whatsapp_long}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex min-h-14 items-center gap-3 font-semibold break-all hover:text-safety-ink">
                <Mail size={20} aria-hidden="true" className="shrink-0 text-safety" />{CONTACT_INFO.email}
              </a>
            </li>
            <li className="flex min-h-14 items-center gap-3 text-steel-500">
              <Clock size={20} aria-hidden="true" className="text-safety" />{t.cta_hours}
            </li>
          </ul>
        </div>
        <QuoteForm page="/" />
      </div>
    </section>
  </>
);

export default HomeSections;
