import React from 'react';
import { TRANSLATIONS as t } from '../../constants';
import { fill } from '../fleet';
import { CONTAINER, H2, Label } from './ui';

const facts = [
  [t.trust_2_title, t.trust_2_desc],
  [t.trust_3_title, t.trust_3_desc],
  [t.trust_4_title, t.trust_4_desc],
];

// "1. Send the job details" -> ["01", "Send the job details"]: the number is drawn
// as a numeral, and the <ol> carries the order for screen readers.
const steps = [
  [t.step_1_title, t.step_1_desc],
  [t.step_2_title, t.step_2_desc],
  [t.step_3_title, t.step_3_desc],
].map(([title, desc]) => {
  const m = title.match(/^(\d+)\.\s*(.*)$/);
  return { n: (m ? m[1] : '').padStart(2, '0'), title: m ? m[2] : title, desc };
});

/** What you get (the operator first, as the core offer) beside how hiring works. */
const TrustSection: React.FC = () => (
  <section className="border-t border-steel-100 bg-white py-16 sm:py-20">
    <div className={`${CONTAINER} grid gap-14 lg:grid-cols-2 lg:gap-16`}>
      <div>
        <Label>{t.trust_title}</Label>
        <p className="mt-3 text-steel-500">{t.trust_desc}</p>
        <div className="mt-6 border-t-4 border-safety bg-ink p-6 text-white sm:p-8">
          <H2>{t.trust_1_title}</H2>
          <p className="mt-3 max-w-[50ch] leading-relaxed text-steel-100">{t.trust_1_desc}</p>
        </div>
        <dl className="divide-y divide-steel-100 border-b border-steel-100">
          {facts.map(([title, desc]) => (
            <div key={title} className="py-5">
              <dt className="font-display text-2xl leading-tight tabular-nums">{fill(title)}</dt>
              <dd className="mt-1 max-w-[60ch] text-steel-500">{fill(desc)}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <H2>{t.steps_title}</H2>
        <ol className="mt-6 border-t border-steel-100">
          {steps.map((s) => (
            <li key={s.n} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-steel-100 py-6">
              <span aria-hidden="true" className="font-display text-[2.5rem] leading-none text-safety tabular-nums">{s.n}</span>
              <div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 max-w-[55ch] text-steel-500">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default TrustSection;
