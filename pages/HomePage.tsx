import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Boom Lift Rental & Hiring Services | OG-IN Worldwide';
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = 'OG-IN Worldwide LLP provides India\'s most reliable fleet of JLG and Genie boom lifts with certified operators. Pan-India delivery. Call for same-day quotes.';
  }, []);

  return (
    <>
      <Hero />
      <CTASection />
    </>
  );
};

export default HomePage;
