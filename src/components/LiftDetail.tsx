import React from 'react';
import { CheckCircle2, Phone, UserCheck } from 'lucide-react';
import { BOOM_LIFTS, CONTACT_INFO } from '../../constants';
import { useLanguage } from '../i18n/language-context';

interface LiftDetailProps {
  /** Only the id is passed in. Astro serializes island props into the HTML, so the
   *  component looks the machine up itself rather than having the whole record
   *  embedded in the page a second time. */
  liftId: string;
}

const LiftDetail: React.FC<LiftDetailProps> = ({ liftId }) => {
  const { language, t } = useLanguage();
  const lift = BOOM_LIFTS.find((l) => l.id === liftId);
  if (!lift) throw new Error(`Unknown lift id: ${liftId}`);

  // Specs are rendered as a table in the page rather than inside a modal, so they
  // are in the served HTML where a crawler can read them. Values come straight from
  // constants.ts; nothing here is computed or restated.
  const specs = [
    { label: t.card_height, value: lift.platformHeight },
    { label: t.card_outreach, value: lift.horizontalOutreach },
    // "Capacity" and "Weight" have no TRANSLATIONS keys and were hardcoded English
    // in SpecsModal too. Carried over as-is; adding Hindi for them is new copy and
    // belongs with the /hi/ routes.
    { label: 'Capacity', value: lift.platformCapacity },
    { label: 'Weight', value: lift.weight },
  ];

  return (
    <article className="max-w-5xl mx-auto px-4 pt-28 pb-24">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-orange-600 transition-colors">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/fleet" className="hover:text-orange-600 transition-colors">{t.fleet_title}</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 font-medium">{lift.brand} {lift.model}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm h-80 sm:h-[26rem] flex items-center justify-center p-8">
          <img
            src={lift.imageUrl}
            alt={`${lift.brand} ${lift.model} telescopic boom lift`}
            width="640"
            height="640"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div>
          <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">
            <UserCheck size={12} aria-hidden="true" />
            {t.with_operator}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 mb-2">
            {lift.brand} {lift.model}
          </h1>
          {/* Hardcoded English in SpecsModal as well; see the note on `specs` above. */}
          <p className="text-slate-600 font-medium mb-6">Telescopic Boom Lift</p>

          <p className="text-slate-600 leading-relaxed mb-8">{lift.description[language]}</p>

          <h2 className="font-bold text-slate-900 uppercase text-xs tracking-widest border-b border-slate-100 pb-2 mb-4">
            {t.modal_tech_specs}
          </h2>
          <table className="w-full mb-8 text-sm">
            <tbody>
              {specs.map((spec) => (
                <tr key={spec.label} className="border-b border-slate-100 last:border-0">
                  <th scope="row" className="text-left font-normal text-slate-500 py-2.5">{spec.label}</th>
                  <td className="text-right font-semibold text-slate-900 py-2.5">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="font-bold text-slate-900 uppercase text-xs tracking-widest border-b border-slate-100 pb-2 mb-4">
            {t.modal_features}
          </h2>
          <ul className="space-y-2 mb-8">
            {lift.features[language].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-orange-500 flex-shrink-0" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="bg-slate-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 font-medium">{t.modal_rent_prompt}</p>
              <p className="text-lg font-bold text-slate-900">{t.modal_contact_desk}</p>
            </div>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
              aria-label={`Call us at ${CONTACT_INFO.phone}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
            >
              <Phone size={18} aria-hidden="true" />
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LiftDetail;
