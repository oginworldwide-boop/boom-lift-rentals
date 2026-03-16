
import React, { useState, createContext, useContext } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LiftCard from './components/LiftCard';
import SpecsModal from './components/SpecsModal';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import { BOOM_LIFTS, CONTACT_INFO, TRANSLATIONS } from './constants';
import { BoomLift, Language } from './types';
import { Phone } from 'lucide-react';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedLift, setSelectedLift] = useState<BoomLift | null>(null);

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          
          <section id="fleet" className="py-24 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.fleet_title}</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                {t.fleet_desc}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BOOM_LIFTS.map((lift) => (
                <LiftCard 
                  key={lift.id} 
                  lift={lift} 
                  onSelect={setSelectedLift} 
                />
              ))}
            </div>
          </section>
          
          <TrustSection />
          
          <section className="py-24 px-4 bg-white">
            <div className="max-w-4xl mx-auto bg-orange-600 rounded-[2rem] p-8 md:p-16 text-center text-white shadow-2xl shadow-orange-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.cta_title}</h2>
                <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
                  {t.cta_desc}
                </p>
                <a 
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  aria-label={`Call us at ${CONTACT_INFO.phone}`}
                  className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl"
                >
                  <Phone size={24} aria-hidden="true" />
                  {CONTACT_INFO.phone}
                </a>
                <p className="mt-6 text-orange-200 text-sm font-medium">
                  {t.cta_hours}
                </p>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
        
        <SpecsModal 
          lift={selectedLift} 
          onClose={() => setSelectedLift(null)} 
        />

        {/* Mobile Sticky Call Button */}
        <div className="fixed bottom-6 right-6 z-40 sm:hidden">
          <a 
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
            aria-label={`Call us at ${CONTACT_INFO.phone}`}
            className="flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full shadow-2xl animate-bounce"
          >
            <Phone size={28} aria-hidden="true" />
          </a>
        </div>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;