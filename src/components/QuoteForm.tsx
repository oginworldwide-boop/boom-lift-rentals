import React from 'react';
import { BOOM_LIFTS, TRANSLATIONS as t } from '../../constants';

interface QuoteFormProps {
  /** Path of the page the form sits on, sent with the submission. */
  page: string;
  /** Preselects this machine in the dropdown (machine pages). */
  selectedLiftId?: string;
  /** Element id, and prefix for every field id, so /#quote can anchor to it. */
  id?: string;
}

const field = 'block w-full min-h-12 rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900';
const label = 'block font-semibold text-slate-900 mb-1';
const help = 'mt-1 text-sm text-slate-500';

/**
 * The one quote form. Netlify Forms merges every form named "quote" and keeps only
 * the fields it saw at deploy time, so every page must render exactly this field set
 * (scripts/assert-html.mjs checks it). Plain HTML POST: no client JS, browser-native
 * required-field validation.
 */
const QuoteForm: React.FC<QuoteFormProps> = ({ page, selectedLiftId, id = 'quote' }) => {
  const byHeight = [...BOOM_LIFTS].sort((a, b) => a.heightM - b.heightM);
  const f = (name: string) => `${id}-${name}`;
  const required = <span className="ml-1 text-sm font-normal text-slate-500">({t.form_required})</span>;

  // privacy link added with /privacy/
  return (
    <form
      id={id}
      name="quote"
      method="POST"
      action="/quote/thanks/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="scroll-mt-20 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 text-left"
    >
      <input type="hidden" name="form-name" value="quote" />
      <input type="hidden" name="page" value={page} />
      <p hidden>
        <label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>

      <div>
        <h2 className="text-2xl font-bold text-slate-900">{t.form_title}</h2>
        <p className="mt-1 text-slate-600">{t.form_intro}</p>
      </div>

      <div>
        <label htmlFor={f('name')} className={label}>{t.form_name}{required}</label>
        <input id={f('name')} name="name" required autoComplete="name" className={field} />
      </div>

      <div>
        <label htmlFor={f('phone')} className={label}>{t.form_phone}{required}</label>
        <input
          id={f('phone')} name="phone" type="tel" inputMode="tel" required autoComplete="tel"
          aria-describedby={f('phone-help')} className={field}
        />
        <p id={f('phone-help')} className={help}>{t.form_phone_help}</p>
      </div>

      <div>
        <label htmlFor={f('company')} className={label}>{t.form_company}</label>
        <input id={f('company')} name="company" autoComplete="organization" className={field} />
      </div>

      <div>
        <label htmlFor={f('machine')} className={label}>{t.form_machine}</label>
        <select
          id={f('machine')} name="machine" defaultValue={selectedLiftId ?? 'not-sure'}
          aria-describedby={f('machine-help')} className={field}
        >
          <option value="not-sure">{t.form_machine_unsure}</option>
          {byHeight.map((lift) => (
            <option key={lift.id} value={lift.id}>{`${lift.brand} ${lift.model} (${lift.platformHeight})`}</option>
          ))}
        </select>
        <p id={f('machine-help')} className={help}>{t.form_machine_help}</p>
      </div>

      <div>
        <label htmlFor={f('city')} className={label}>{t.form_city}{required}</label>
        <input
          id={f('city')} name="city" required autoComplete="address-level2"
          aria-describedby={f('city-help')} className={field}
        />
        <p id={f('city-help')} className={help}>{t.form_city_help}</p>
      </div>

      <div>
        <label htmlFor={f('start')} className={label}>{t.form_start}</label>
        <input id={f('start')} name="start-date" type="date" className={field} />
      </div>

      <div>
        <label htmlFor={f('duration')} className={label}>{t.form_duration}</label>
        {/* Defaults to "Not sure yet" so an untouched select does not record a duration. */}
        <select id={f('duration')} name="duration" defaultValue={t.form_duration_opts[t.form_duration_opts.length - 1]} className={field}>
          {t.form_duration_opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor={f('conditions')} className={label}>{t.form_conditions}</label>
        <textarea
          id={f('conditions')} name="conditions" rows={4}
          aria-describedby={f('conditions-help')} className={field}
        />
        <p id={f('conditions-help')} className={help}>{t.form_conditions_help}</p>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto min-h-12 rounded-xl bg-orange-600 px-8 py-3 text-base font-bold text-white hover:bg-orange-700"
      >
        {t.form_submit}
      </button>

      <p className="text-sm text-slate-500">{t.form_privacy_note}</p>
    </form>
  );
};

export default QuoteForm;
