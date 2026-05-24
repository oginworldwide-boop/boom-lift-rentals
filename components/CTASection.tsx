import React from 'react';
import { Phone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const CTASection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto bg-orange-600 rounded-[2rem] p-8 md:p-16 text-center text-white shadow-2xl shadow-orange-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.cta_title}</h2>
          <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">{t.cta_desc}</p>
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
            aria-label={`Call us at ${CONTACT_INFO.phone}`}
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl"
          >
            <Phone size={24} aria-hidden="true" />
            {CONTACT_INFO.phone}
          </a>
          <p className="mt-6 text-orange-200 text-sm font-medium">{t.cta_hours}</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
