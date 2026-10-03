import React from 'react';
import { FleetGrid } from './LiftCard';
import { TRANSLATIONS as t } from '../../constants';
import { byHeight, fill } from '../fleet';
import { liftPath } from '../seo';
import { CONTAINER, LINK, Label, PageHero } from './ui';

const TH = 'px-4 py-3 text-left micro-label text-steel-500 whitespace-nowrap';
const TD = 'px-4 py-4 whitespace-nowrap';

/**
 * Every machine's four specs side by side in one ruled table (the IndiaMART
 * density), by height. Used on /fleet/ and the working-height guide.
 */
export const FleetTable: React.FC<{ caption?: string }> = ({ caption }) => (
  <>
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
    {/* Outside the scroller so it wraps to the viewport, not the table's min-width. */}
    {caption && <p className="mt-2 text-sm text-steel-500">{caption}</p>}
  </>
);

/** The /fleet catalogue: the spec table, then the same plates as the homepage. All from constants.ts. */
const FleetSections: React.FC = () => (
  <>
    <PageHero title={t.fleet_title} crumb={t.fleet_title} intro={fill(t.fleet_desc)} />

    <section className={`${CONTAINER} py-10 sm:py-14`}>
      <FleetTable />
      <a href="/guides/boom-lift-working-height/" className={`${LINK} mt-3 inline-flex min-h-12 items-center font-semibold`}>{t.guide_link}</a>

      <div className="mt-12">
        <Label as="h2">{t.lift_type}</Label>
        <FleetGrid className="mt-5" />
      </div>
    </section>
  </>
);

export default FleetSections;
