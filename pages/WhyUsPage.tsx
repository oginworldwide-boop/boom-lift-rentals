import React, { useEffect } from 'react';
import TrustSection from '../components/TrustSection';
import CTASection from '../components/CTASection';

const WhyUsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Why Choose Us | OG-IN Worldwide LLP';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = 'Expert certified operators, rigorous safety inspections, Pan-India delivery, and maximum uptime — the OG-IN advantage for your high-altitude projects.';
  }, []);

  return (
    <div className="pt-16">
      <TrustSection />
      <CTASection />
    </div>
  );
};

export default WhyUsPage;
