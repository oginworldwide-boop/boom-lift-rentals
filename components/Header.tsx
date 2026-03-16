
import React from 'react';
import { Phone, Languages } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../App';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white font-bold text-xl">O</div>
          <span className="font-bold text-lg tracking-tight text-slate-900">OG-IN <span className="text-slate-500 font-medium hidden sm:inline">WORLDWIDE</span></span>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-2 text-slate-600 hover:text-orange-600 transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <Languages size={18} />
            <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
          </button>

          <a 
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
            aria-label={`Call us at ${CONTACT_INFO.phone}`}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors duration-300"
          >
            <Phone size={16} aria-hidden="true" />
            <span className="hidden sm:inline">{t.nav_call}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
