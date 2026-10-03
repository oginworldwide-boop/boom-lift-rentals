import React from 'react';
import { TRANSLATIONS as t } from '../../constants';
import { byHeight } from '../fleet';

interface QuoteFormProps {
  /** Path of the page the form sits on, sent with the submission. */
  page: string;
  /** Preselects this machine in the dropdown (machine pages). */
  selectedLiftId?: string;
  /** Element id, and prefix for every field id, so #quote can anchor to it. */
  id?: string;
}

const field =
  'block w-full min-h-12 rounded-sm border border-steel-500 bg-white px-3 py-2 text-base text-ink focus-visible:border-safety';
const label = 'block self-end font-semibold text-ink mb-1.5';
const help = 'mt-1.5 text-sm text-steel-500';
// Each field spans three rows (label, control, help) of the form's grid, so in a
// two-column pair the controls line up even when one label wraps.
const row = 'grid grid-rows-subgrid row-span-3 gap-y-0';

/**
 * The one quote form. Netlify Forms merges every form named "quote" and keeps only
 * the fields it saw at deploy time, so every page must render exactly this field set
 * (scripts/assert-html.mjs checks it). Plain HTML POST: no client JS, browser-native
 * required-field validation.
 */
const QuoteForm: React.FC<QuoteFormProps> = ({ page, selectedLiftId, id = 'quote' }) => {
  const f = (name: string) => `${id}-${name}`;
  const required = <span className="ml-1 text-sm font-normal text-steel-500">({t.form_required})</span>;

  // privacy link added with /privacy/
  return (
    <form
      id={id}
      name="quote"
      method="POST"
      action="/quote/thanks/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="grid gap-5 border border-steel-100 border-t-4 border-t-safety bg-white p-5 text-left sm:grid-cols-2 sm:p-7"
    >
      <input type="hidden" name="form-name" value="quote" />
      <input type="hidden" name="page" value={page} />
      <p hidden>
        <label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>

      <div className="sm:col-span-2">
        <h2 className="font-display text-[2rem] leading-none">{t.form_title}</h2>
        <p className="mt-2 text-steel-500">{t.form_intro}</p>
      </div>

      <div className={row}>
        <label htmlFor={f('name')} className={label}>{t.form_name}{required}</label>
        <input id={f('name')} name="name" required autoComplete="name" className={field} />
      </div>

      <div className={row}>
        <label htmlFor={f('phone')} className={label}>{t.form_phone}{required}</label>
        <input
          id={f('phone')} name="phone" type="tel" inputMode="tel" required autoComplete="tel"
          aria-describedby={f('phone-help')} className={field}
        />
        <p id={f('phone-help')} className={help}>{t.form_phone_help}</p>
      </div>

      <div className={row}>
        <label htmlFor={f('company')} className={label}>{t.form_company}</label>
        <input id={f('company')} name="company" autoComplete="organization" className={field} />
      </div>

      <div className={row}>
        <label htmlFor={f('city')} className={label}>{t.form_city}{required}</label>
        <input
          id={f('city')} name="city" required autoComplete="address-level2"
          aria-describedby={f('city-help')} className={field}
        />
        <p id={f('city-help')} className={help}>{t.form_city_help}</p>
      </div>

      <div className={`${row} sm:col-span-2`}>
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

      <div className={row}>
        <label htmlFor={f('start')} className={label}>{t.form_start}</label>
        <input id={f('start')} name="start-date" type="date" className={field} />
      </div>

      <div className={row}>
        <label htmlFor={f('duration')} className={label}>{t.form_duration}</label>
        {/* Defaults to "Not sure yet" so an untouched select does not record a duration. */}
        <select id={f('duration')} name="duration" defaultValue={t.form_duration_opts[t.form_duration_opts.length - 1]} className={field}>
          {t.form_duration_opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div className={`${row} sm:col-span-2`}>
        <label htmlFor={f('conditions')} className={label}>{t.form_conditions}</label>
        <textarea
          id={f('conditions')} name="conditions" rows={4}
          aria-describedby={f('conditions-help')} className={field}
        />
        <p id={f('conditions-help')} className={help}>{t.form_conditions_help}</p>
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-safety-ink px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-safety-ink-dark active:translate-y-px sm:w-auto"
        >
          {t.form_submit}
        </button>
        <p className="mt-3 text-sm text-steel-500">{t.form_privacy_note}</p>
      </div>
    </form>
  );
};

export default QuoteForm;
