import React from 'react';
import { FileText, MessageCircle, Phone } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import type { BoomLift } from '../../types';
import { CONTACT_INFO, TRANSLATIONS as t } from '../../constants';
import { fill } from '../fleet';
import { telHref, waPrefill, whatsappHref } from '../seo';

/** Button styles. White text only ever sits on safety-ink (5.2:1), never on safety. */
const BTN =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-5 text-base font-semibold transition-colors duration-150 active:translate-y-px';
export const BTN_PRIMARY = `${BTN} bg-safety-ink text-white hover:bg-safety-ink-dark`;
export const BTN_WA = `${BTN} bg-wa text-ink hover:bg-wa-dark`;
export const BTN_LINE = `${BTN} border border-ink text-ink hover:bg-ink hover:text-white`;
export const BTN_LINE_DARK = `${BTN} border border-white/80 text-white hover:bg-white hover:text-ink`;

/** Joins classes so a later utility overrides a base one (px-0 over BTN's px-5). */
export const cx = (...c: string[]) => twMerge(c);

export const CONTAINER = 'mx-auto w-full max-w-6xl px-4 sm:px-6';
export const LINK = 'underline decoration-steel-300 underline-offset-4 hover:decoration-safety';

/** Micro label with a short safety rule before it. */
export const Label: React.FC<{ children: React.ReactNode; dark?: boolean; as?: 'p' | 'h2' }> = ({ children, dark, as: Tag = 'p' }) => (
  <Tag className={`micro-label flex items-center gap-3 ${dark ? 'text-steel-300' : 'text-steel-500'}`}>
    <span aria-hidden="true" className="h-0.5 w-6 shrink-0 bg-safety" />
    {children}
  </Tag>
);

export const H2: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({ children, id, className = '' }) => (
  <h2 id={id} className={`font-display text-[2rem] leading-[1.05] sm:text-[2.5rem] ${className}`}>{children}</h2>
);

export const BrandFlag: React.FC<{ brand: string }> = ({ brand }) => (
  <span className="micro-label inline-block bg-ink px-2 py-1 text-white">{brand}</span>
);

/** WhatsApp, Call, Get a quote: the three ways in, in that order everywhere. */
export const CtaRow: React.FC<{ lift?: BoomLift; quoteHref?: string; dark?: boolean; className?: string }> = ({
  lift, quoteHref = '#quote', dark, className = '',
}) => (
  <div className={cx('grid gap-3 sm:flex sm:flex-wrap', className)}>
    <a href={whatsappHref(waPrefill(lift))} className={BTN_WA}>
      <MessageCircle size={20} aria-hidden="true" />
      {t.cta_whatsapp_long}
    </a>
    <a href={telHref(CONTACT_INFO.phone)} className={`${BTN_PRIMARY} tabular-nums`}>
      <Phone size={20} aria-hidden="true" />
      {fill(t.cta_call_long)}
    </a>
    <a href={quoteHref} className={dark ? BTN_LINE_DARK : BTN_LINE}>
      <FileText size={20} aria-hidden="true" />
      {t.cta_quote}
    </a>
  </div>
);
