
import React from 'react';
import { ShieldCheck, Clock, Truck, UserCheck } from 'lucide-react';
import { useLanguage } from '../App';

const TrustSection: React.FC = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: <UserCheck className="text-orange-600" size={32} />,
      title: t.trust_1_title,
      desc: t.trust_1_desc
    },
    {
      icon: <ShieldCheck className="text-orange-600" size={32} />,
      title: t.trust_2_title,
      desc: t.trust_2_desc
    },
    {
      icon: <Truck className="text-orange-600" size={32} />,
      title: t.trust_3_title,
      desc: t.trust_3_desc
    },
    {
      icon: <Clock className="text-orange-600" size={32} />,
      title: t.trust_4_title,
      desc: t.trust_4_desc
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.trust_title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t.trust_desc}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-orange-500/50 transition-colors">
              <div className="mb-6">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
