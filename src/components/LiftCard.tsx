import React from 'react';
import { ArrowUpRight, Maximize2, Ruler } from 'lucide-react';
import type { BoomLift } from '../../types';
import { useLanguage } from '../i18n/language-context';

interface LiftCardProps {
  lift: BoomLift;
}

/** Both affordances link to the machine's own page. They used to open SpecsModal,
 *  which no crawler can do, so the seven machine pages had nothing linking to them
 *  and the specs were invisible to search. Styling is unchanged. */
const LiftCard: React.FC<LiftCardProps> = ({ lift }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      <div className="relative h-64 overflow-hidden bg-slate-50 flex items-center justify-center p-6">
        <img
          src={lift.imageUrl}
          alt={lift.model}
          width={lift.imageWidth}
          height={lift.imageHeight}
          loading="lazy"
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-xs font-bold text-slate-900 shadow-sm">
          {lift.brand}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-slate-900">{lift.model}</h3>
          <a
            href={`/fleet/${lift.slug}`}
            aria-label={`View specs for ${lift.model}`}
            className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-orange-600 group-hover:text-white transition-colors"
          >
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-slate-600">
            <Maximize2 size={16} className="text-orange-500" />
            <div className="text-xs">
              <p className="text-slate-400 uppercase font-semibold tracking-tighter">{t.card_height}</p>
              <p className="font-bold text-slate-800">{lift.platformHeight.split('(')[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Ruler size={16} className="text-orange-500" />
            <div className="text-xs">
              <p className="text-slate-400 uppercase font-semibold tracking-tighter">{t.card_outreach}</p>
              <p className="font-bold text-slate-800">{lift.horizontalOutreach.split('(')[0]}</p>
            </div>
          </div>
        </div>
        
        <a
          href={`/fleet/${lift.slug}`}
          className="mt-auto w-full py-3 rounded-xl border border-slate-200 text-slate-900 font-semibold hover:bg-slate-900 hover:text-white transition-all text-center"
        >
          {t.card_btn}
        </a>
      </div>
    </div>
  );
};

export default LiftCard;