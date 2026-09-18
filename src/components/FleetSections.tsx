import React from 'react';
import LiftCard from './LiftCard';
import { BOOM_LIFTS } from '../../constants';
import { useLanguage } from '../i18n/language-context';

/**
 * The /fleet catalogue.
 *
 * Deliberately not a copy of the homepage grid. The homepage sells; this page is
 * for comparing, so it leads with every machine's four specs side by side in one
 * table. That is the density this audience is used to from IndiaMART listings, and
 * it is built entirely from constants.ts -- no new copy, no new figures.
 */
const FleetSections: React.FC = () => {
  const { t } = useLanguage();

  // Ascending by platform height, so the table reads as a range rather than an
  // arbitrary order. Sorted on the numeric field, not by parsing display strings.
  const byHeight = [...BOOM_LIFTS].sort((a, b) => a.heightM - b.heightM);

  return (
    <section className="max-w-7xl mx-auto px-4 pt-28 pb-24">
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.fleet_title}</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">{t.fleet_desc}</p>
      </div>

      <div className="overflow-x-auto mb-20 rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-sm min-w-[40rem]">
          <thead>
            <tr className="border-b border-slate-100 text-left">
              <th scope="col" className="px-5 py-4 font-bold text-slate-900">Model</th>
              <th scope="col" className="px-5 py-4 font-bold text-slate-900">{t.card_height}</th>
              <th scope="col" className="px-5 py-4 font-bold text-slate-900">{t.card_outreach}</th>
              <th scope="col" className="px-5 py-4 font-bold text-slate-900">Capacity</th>
              <th scope="col" className="px-5 py-4 font-bold text-slate-900">Weight</th>
            </tr>
          </thead>
          <tbody>
            {byHeight.map((lift) => (
              <tr key={lift.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <th scope="row" className="px-5 py-4 text-left font-semibold text-slate-900 whitespace-nowrap">
                  <a href={`/fleet/${lift.slug}`} className="hover:text-orange-600 transition-colors">
                    {lift.brand} {lift.model}
                  </a>
                </th>
                <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{lift.platformHeight}</td>
                <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{lift.horizontalOutreach}</td>
                <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{lift.platformCapacity}</td>
                <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{lift.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BOOM_LIFTS.map((lift) => (
          <LiftCard key={lift.id} lift={lift} />
        ))}
      </div>
    </section>
  );
};

export default FleetSections;
