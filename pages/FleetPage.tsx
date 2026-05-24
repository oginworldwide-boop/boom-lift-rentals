import React, { useState, useEffect } from 'react';
import LiftCard from '../components/LiftCard';
import SpecsModal from '../components/SpecsModal';
import CTASection from '../components/CTASection';
import { BOOM_LIFTS } from '../constants';
import { BoomLift } from '../types';
import { useLanguage } from '../context/LanguageContext';

const FleetPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedLift, setSelectedLift] = useState<BoomLift | null>(null);

  useEffect(() => {
    document.title = 'Our Fleet | JLG & Genie Boom Lifts | OG-IN Worldwide';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = 'Browse our premium fleet of JLG 860SJ, 1200SJP, 1350SJP, Genie S-85 XC and more. All boom lifts rented with certified professional operators across India.';
  }, []);

  return (
    <div className="pt-16">
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.fleet_title}</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">{t.fleet_desc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BOOM_LIFTS.map((lift) => (
            <LiftCard key={lift.id} lift={lift} onSelect={setSelectedLift} />
          ))}
        </div>
      </section>

      <CTASection />

      <SpecsModal lift={selectedLift} onClose={() => setSelectedLift(null)} />
    </div>
  );
};

export default FleetPage;
