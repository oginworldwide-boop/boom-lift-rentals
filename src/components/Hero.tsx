import React from 'react';
import { TRANSLATIONS as t } from '../../constants';
import { fill } from '../fleet';
import { CONTAINER, CtaRow, LINK, Label, cx } from './ui';

/**
 * Dark hero. Phones: copy and the three CTAs fit the first screen, the photo is a
 * 16:9 strip below them. lg+: the photo fills the right ~58% under an ink gradient.
 * One <img>, so React emits exactly one preload, carrying the same srcset/sizes.
 */
const Hero: React.FC = () => (
  <section className="relative overflow-hidden bg-ink text-white lg:min-h-[36rem]">
    <div className={`${CONTAINER} relative z-10 pt-8 pb-8 lg:py-20`}>
      <div className="lg:max-w-[40rem]">
        <Label dark>{t.hero_eyebrow}</Label>
        <h1 className="mt-4 font-display text-[2.5rem] leading-[1.02] lg:text-[4rem]">{t.hero_h1}</h1>
        <p className="mt-5 max-w-[60ch] text-[1.0625rem] leading-relaxed text-steel-100">{fill(t.hero_subhead)}</p>
        <CtaRow dark className="mt-7" />
        <a href="#fleet" className={cx(LINK, 'mt-2 inline-flex min-h-12 items-center font-semibold text-steel-100 decoration-steel-500')}>
          {t.hero_cta_1}
        </a>
      </div>
    </div>
    <img
      src="/images/homebg.webp"
      srcSet="/images/homebg-800.webp 800w, /images/homebg-1200.webp 1200w, /images/homebg.webp 1600w"
      sizes="(min-width: 1024px) 58vw, 100vw"
      alt="JLG Boom Lift in action"
      width="1600"
      height="1200"
      fetchPriority="high"
      className="block aspect-video w-full object-cover lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:h-full lg:w-[58%]"
    />
    <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[58%] bg-linear-to-r from-ink via-ink/50 to-transparent lg:block" />
  </section>
);

export default Hero;
