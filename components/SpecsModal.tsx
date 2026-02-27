
import React from 'react';
import { X, Phone, CheckCircle2, UserCheck } from 'lucide-react';
import { BoomLift } from '../types';
import { CONTACT_INFO } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../App';

interface SpecsModalProps {
  lift: BoomLift | null;
  onClose: () => void;
}

const SpecsModal: React.FC<SpecsModalProps> = ({ lift, onClose }) => {
  const { language, t } = useLanguage();
  if (!lift) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="overflow-y-auto">
            <div className="h-64 sm:h-80 relative bg-slate-50 flex items-center justify-center p-8">
              <img 
                src={lift.imageUrl} 
                alt={lift.model} 
                className="max-w-full max-h-full object-contain" 
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/90 to-transparent">
                <h2 className="text-3xl font-bold text-slate-900">{lift.brand} {lift.model}</h2>
                <div className="flex items-center justify-between w-full">
                  <p className="text-slate-600 font-medium">
                    Telescopic Boom Lift 
                  </p>
                  <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">
                    <UserCheck size={12} />
                    {t.with_operator}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6 sm:p-8">
              <p className="text-slate-600 mb-8 leading-relaxed">
                {lift.description[language]}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest border-b border-slate-100 pb-2">{t.modal_tech_specs}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">{t.card_height}</span>
                      <span className="font-semibold text-slate-900">{lift.platformHeight}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">{t.card_outreach}</span>
                      <span className="font-semibold text-slate-900">{lift.horizontalOutreach}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Capacity</span>
                      <span className="font-semibold text-slate-900">{lift.platformCapacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Weight</span>
                      <span className="font-semibold text-slate-900">{lift.weight}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest border-b border-slate-100 pb-2">{t.modal_features}</h4>
                  <ul className="space-y-2">
                    {lift.features[language].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-orange-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{t.modal_rent_prompt}</p>
                  <p className="text-lg font-bold text-slate-900">{t.modal_contact_desk}</p>
                </div>
                <a 
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
                >
                  <Phone size={18} />
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SpecsModal;
