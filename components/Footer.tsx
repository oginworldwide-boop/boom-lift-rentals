
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../App';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white font-bold text-xl">O</div>
              <span className="font-bold text-lg tracking-tight text-slate-900">OG-IN <span className="text-slate-500 font-medium">WORLDWIDE</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.footer_desc}
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-6">{t.footer_links}</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-orange-600 transition-colors">Home</a></li>
              <li><a href="#fleet" className="hover:text-orange-600 transition-colors">Our Fleet</a></li>
              <li><a href="#why-us" className="hover:text-orange-600 transition-colors">Why Choose Us</a></li>
              <li><a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-orange-600 transition-colors">Contact Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-6">{t.footer_contact}</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-orange-600 flex-shrink-0" />
                <div className="flex flex-col">
                  <span>{CONTACT_INFO.phone}</span>
                  <span>{CONTACT_INFO.phone2}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-orange-600 flex-shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-600 flex-shrink-0" />
                <span>{CONTACT_INFO.address[language]}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} OG-IN Worldwide LLP. {t.footer_rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
