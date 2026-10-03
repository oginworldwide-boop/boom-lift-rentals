import React from 'react';
import { MessageCircle } from 'lucide-react';
import type { BoomLift } from '../../types';
import { TRANSLATIONS as t } from '../../constants';
import { byHeight, liftSrcSet, splitSpec } from '../fleet';
import { liftImageAlt, liftPath, waPrefill, whatsappHref } from '../seo';
import { BTN_LINE, BTN_WA, BrandFlag, CtaRow, cx } from './ui';

/** Metric figure first, the imperial part beneath it in steel. */
export const SpecFigure: React.FC<{ value: string }> = ({ value }) => {
  const [metric, imperial] = splitSpec(value);
  return (
    <>
      <span className="block font-semibold text-ink">{metric}</span>
      {imperial && <span className="block text-xs text-steel-500">{imperial}</span>}
    </>
  );
};

/**
 * A fleet plate: photo, model, the three numbers people compare on, and the two
 * actions. Compact row on phones (photo beside the model), card from md up.
 */
const LiftCard: React.FC<{ lift: BoomLift }> = ({ lift }) => {
  const specs = [
    { label: t.card_height, value: lift.platformHeight },
    { label: t.card_outreach, value: lift.horizontalOutreach },
    { label: t.spec_capacity, value: lift.platformCapacity },
  ];
  return (
    <article className="grid grid-cols-[7.5rem_1fr] border border-steel-100 bg-white md:grid-cols-1 md:grid-rows-[auto_auto_auto_1fr]">
      <a href={liftPath(lift)} tabIndex={-1} aria-hidden="true" className="block aspect-square border-r border-steel-100 p-3 md:aspect-[4/3] md:border-r-0 md:border-b md:p-6">
        <img
          src={lift.imageUrl}
          srcSet={liftSrcSet(lift)}
          sizes="(min-width: 1024px) 340px, (min-width: 768px) 45vw, 120px"
          alt={liftImageAlt(lift)}
          width={lift.imageWidth}
          height={lift.imageHeight}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </a>

      <div className="self-center px-4 py-3 md:px-5 md:pt-5 md:pb-0">
        <BrandFlag brand={lift.brand} />
        <h3 className="mt-2 font-display text-[1.75rem] leading-none md:text-[2rem]">
          <a href={liftPath(lift)} className="hover:text-safety-ink">{lift.model}</a>
        </h3>
        <p className="mt-1 text-sm text-steel-500">{t.lift_type}</p>
      </div>

      <dl className="col-span-2 mx-4 mt-1 grid grid-cols-3 border-y border-steel-100 text-sm tabular-nums md:col-span-1 md:mx-5 md:mt-4">
        {specs.map((s, i) => (
          <div key={s.label} className={`py-3 ${i ? 'border-l border-steel-100 pl-3' : 'pr-2'}`}>
            <dt className="mb-1 text-[0.6875rem] leading-tight font-semibold tracking-wide text-steel-500 uppercase">{s.label}</dt>
            <dd><SpecFigure value={s.value} /></dd>
          </div>
        ))}
      </dl>

      <div className="col-span-2 grid grid-cols-2 gap-2 self-end p-4 md:col-span-1 md:p-5">
        <a href={liftPath(lift)} className={cx(BTN_LINE, 'px-3 text-[0.9375rem]')}>{t.card_btn}</a>
        <a href={whatsappHref(waPrefill(lift))} className={cx(BTN_WA, 'px-3 text-[0.9375rem]')}>
          <MessageCircle size={18} aria-hidden="true" />
          {t.cta_whatsapp}
        </a>
      </div>
    </article>
  );
};

/**
 * Every machine by height, then a quote plate for people who don't know which
 * machine they need. The plate spans two columns on lg, so 7 machines + plate
 * fill a 3-column grid with no orphan.
 */
export const FleetGrid: React.FC<{ quoteHref?: string; className?: string }> = ({ quoteHref = '/contact/#quote', className = '' }) => (
  <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
    {byHeight.map((lift) => <LiftCard key={lift.id} lift={lift} />)}
    <div className="flex flex-col justify-between gap-6 border-t-4 border-safety bg-ink p-6 text-white sm:p-8 lg:col-span-2">
      <div>
        <p className="font-display text-[2rem] leading-[1.05]">{t.form_machine_unsure}</p>
        <p className="mt-3 max-w-[50ch] leading-relaxed text-steel-100">{t.step_1_desc}</p>
      </div>
      <CtaRow dark quoteHref={quoteHref} />
    </div>
  </div>
);

export default LiftCard;
