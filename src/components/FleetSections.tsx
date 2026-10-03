import React from 'react';
import { FleetGrid } from './LiftCard';
import { TRANSLATIONS as t } from '../../constants';
import { byHeight, fill } from '../fleet';
import { liftPath } from '../seo';
import { CONTAINER, Label } from './ui';

const TH = 'px-4 py-3 text-left micro-label text-steel-500 whitespace-nowrap';
const TD = 'px-4 py-4 whitespace-nowrap';

/**
 * The /fleet catalogue: every machine's four specs side by side in one ruled table
 * (the IndiaMART density), then the same plates as the homepage. All from constants.ts.
 */
const FleetSections: React.FC = () => (
  <>
    <div className="bg-ink py-10 text-white sm:py-14">
      <div className={CONTAINER}>
        <nav aria-label="Breadcrumb">
          <ol className="micro-label flex items-center gap-2 text-steel-300">
            <li><a href="/" className="inline-flex min-h-12 items-center hover:text-white">Home</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">{t.fleet_title}</li>
          </ol>
        </nav>
        <h1 className="mt-2 font-display text-[2.5rem] leading-[1.02] sm:text-[3.5rem]">{t.fleet_title}</h1>
        <p className="mt-3 max-w-[60ch] text-[1.0625rem] leading-relaxed text-steel-100">{fill(t.fleet_desc)}</p>
      </div>
    </div>

    <section className={`${CONTAINER} py-10 sm:py-14`}>
      <div className="overflow-x-auto border border-steel-100 border-t-4 border-t-safety bg-white">
        <table className="w-full min-w-[44rem] text-sm tabular-nums">
          <thead>
            <tr className="border-b border-steel-100">
              <th scope="col" className={`${TH} sticky left-0 bg-white shadow-[1px_0_0_var(--color-steel-100)]`}>{t.spec_model}</th>
              <th scope="col" className={TH}>{t.card_height}</th>
              <th scope="col" className={TH}>{t.card_outreach}</th>
              <th scope="col" className={TH}>{t.spec_capacity}</th>
              <th scope="col" className={TH}>{t.spec_weight}</th>
            </tr>
          </thead>
          <tbody>
            {byHeight.map((lift) => (
              <tr key={lift.id} className="border-b border-steel-100 last:border-0">
                <th scope="row" className="sticky left-0 bg-white p-0 text-left shadow-[1px_0_0_var(--color-steel-100)]">
                  <a href={liftPath(lift)} className="flex min-h-12 items-center px-4 font-semibold whitespace-nowrap text-ink underline decoration-steel-300 underline-offset-4 hover:decoration-safety">
                    {lift.brand} {lift.model}
                  </a>
                </th>
                <td className={`${TD} font-semibold`}>{lift.platformHeight}</td>
                <td className={TD}>{lift.horizontalOutreach}</td>
                <td className={TD}>{lift.platformCapacity}</td>
                <td className={TD}>{lift.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p aria-hidden="true" className="mt-2 text-xs text-steel-500 md:hidden">Scroll the table sideways for all specs →</p>

      <div className="mt-14">
        <Label as="h2">{t.lift_type}</Label>
        <FleetGrid className="mt-5" />
      </div>
    </section>
  </>
);

export default FleetSections;
