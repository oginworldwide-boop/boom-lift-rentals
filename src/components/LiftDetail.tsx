import React from 'react';
import { ArrowDown, ArrowUp, UserCheck } from 'lucide-react';
import QuoteForm from './QuoteForm';
import type { BoomLift } from '../../types';
import { TRANSLATIONS as t } from '../../constants';
import { fill, liftSrcSet, liftVars, neighbours, splitSpec } from '../fleet';
import { liftImageAlt, liftPath } from '../seo';
import { BrandFlag, CONTAINER, CtaRow, Label } from './ui';

const LiftDetail: React.FC<{ lift: BoomLift }> = ({ lift }) => {
  // Specs are in the served HTML, exactly as written in constants.ts: the table
  // carries the full display strings, the big grid only splits metric from imperial.
  const specs = [
    { label: t.card_height, value: lift.platformHeight },
    { label: t.card_outreach, value: lift.horizontalOutreach },
    { label: t.spec_capacity, value: lift.platformCapacity },
    { label: t.spec_weight, value: lift.weight },
  ];
  const { down, up } = neighbours(lift);
  const next = [
    down && { lift: down, label: 'Next size down', Icon: ArrowDown },
    up && { lift: up, label: 'Next size up', Icon: ArrowUp },
  ].filter(Boolean) as { lift: BoomLift; label: string; Icon: typeof ArrowUp }[];

  return (
    <article>
      <div className={`${CONTAINER} pt-4 pb-14 sm:pb-20`}>
        <nav aria-label="Breadcrumb">
          <ol className="micro-label flex flex-wrap items-center gap-x-2 text-steel-500">
            <li><a href="/" className="inline-flex min-h-12 items-center hover:text-ink">Home</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/fleet/" className="inline-flex min-h-12 items-center hover:text-ink">{t.fleet_title}</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">{lift.brand} {lift.model}</li>
          </ol>
        </nav>

        <div className="mt-2 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="border border-steel-100 border-t-4 border-t-safety bg-white p-6 lg:sticky lg:top-24">
            <img
              src={lift.imageUrl}
              srcSet={liftSrcSet(lift)}
              sizes="(min-width: 1152px) 540px, (min-width: 1024px) 45vw, 100vw"
              alt={liftImageAlt(lift)}
              width={lift.imageWidth}
              height={lift.imageHeight}
              className="mx-auto max-h-[18rem] w-auto object-contain sm:max-h-[26rem]"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <BrandFlag brand={lift.brand} />
              <span className="micro-label inline-flex items-center gap-1.5 border border-safety-ink px-2 py-[3px] text-safety-ink">
                <UserCheck size={14} aria-hidden="true" />
                {t.with_operator}
              </span>
            </div>
            <h1 className="mt-4 font-display text-[2.75rem] leading-none sm:text-[3.5rem]">{lift.brand} {lift.model}</h1>
            <p className="mt-2 text-lg text-steel-500">{t.lift_type}</p>

            <dl className="mt-6 grid grid-cols-2 gap-px border border-steel-100 bg-steel-100 tabular-nums">
              {specs.map((s, i) => {
                const [metric, imperial] = splitSpec(s.value);
                return (
                  <div key={s.label} className="bg-white p-4">
                    <dt className="micro-label text-steel-500">{s.label}</dt>
                    <dd className={`mt-1 font-display text-[2rem] leading-none ${i === 0 ? 'text-safety-ink' : ''}`}>{metric}</dd>
                    {imperial && <dd className="mt-1 text-sm text-steel-500">{imperial}</dd>}
                  </div>
                );
              })}
            </dl>

            <div className="mt-6 border-l-4 border-safety bg-white p-5">
              <p className="font-semibold">{fill(t.modal_rent_prompt, liftVars(lift))}</p>
              <p className="mt-1 text-sm text-steel-500">{t.modal_contact_desk}</p>
              <CtaRow lift={lift} className="mt-4 lg:grid lg:grid-cols-1" />
            </div>

            <h2 className="mt-10 micro-label text-steel-500">{t.spec_heading}</h2>
            <table className="mt-3 w-full text-sm tabular-nums">
              <tbody>
                <tr className="border-y border-steel-100">
                  <th scope="row" className="py-3 pr-4 text-left font-normal text-steel-500">{t.spec_model}</th>
                  <td className="py-3 text-right font-semibold">{lift.brand} {lift.model}</td>
                </tr>
                {specs.map((s) => (
                  <tr key={s.label} className="border-b border-steel-100">
                    <th scope="row" className="py-3 pr-4 text-left font-normal text-steel-500">{s.label}</th>
                    <td className="py-3 text-right font-semibold">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="mt-10 micro-label text-steel-500">{t.features_heading}</h2>
            <ul className="mt-3 space-y-2">
              {lift.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-2 shrink-0 bg-safety" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[60ch] leading-relaxed text-steel-500">{lift.description}</p>
          </div>
        </div>
      </div>

      <section className="border-t border-steel-100 bg-white py-14 sm:py-20">
        <div className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16`}>
          <QuoteForm page={liftPath(lift)} selectedLiftId={lift.id} />
          {next.length > 0 && (
            <div>
              <Label as="h2">{t.fleet_title}</Label>
              <ul className="mt-4 grid gap-3">
                {next.map(({ lift: l, label, Icon }) => (
                  <li key={l.id}>
                    <a href={liftPath(l)} className="flex items-center gap-4 border border-steel-100 bg-paper p-4 transition-colors duration-150 hover:border-ink">
                      <Icon size={20} aria-hidden="true" className="shrink-0 text-safety" />
                      <span className="flex-1">
                        <span className="block text-sm text-steel-500">{label}</span>
                        <span className="block font-display text-2xl leading-tight">{l.brand} {l.model}</span>
                      </span>
                      <span className="text-right text-sm font-semibold tabular-nums">{splitSpec(l.platformHeight)[0]}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </article>
  );
};

export default LiftDetail;
