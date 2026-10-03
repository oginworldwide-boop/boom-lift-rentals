
import React from 'react';
import { Phone } from 'lucide-react';
import { CONTACT_INFO, TRANSLATIONS as t } from '../../constants';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2" aria-label="OG-IN Worldwide, home">
          <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white font-bold text-xl">O</div>
          <span className="font-bold text-lg tracking-tight text-slate-900">OG-IN <span className="text-slate-500 font-medium hidden sm:inline">WORLDWIDE</span></span>
        </a>
        
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="/fleet"
            className="text-slate-600 hover:text-orange-600 transition-colors text-sm font-bold uppercase tracking-wider hidden sm:inline"
          >
            {t.fleet_title}
          </a>


          <a 
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
            aria-label={`Call us at ${CONTACT_INFO.phone}`}
            className="flex items-center justify-center gap-2 min-h-11 min-w-11 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors duration-300"
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
