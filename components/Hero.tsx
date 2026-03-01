
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../App';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://www.lectura-specs.com/models/renamed/orig/telescopic-work-platforms-on-wheels-1350sjp-jlg.jpg" 
          alt="JLG Boom Lift in action" 
          className="w-full h-full object-cover"
        />
        {/* Sophisticated Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl z-10"
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 rounded-full bg-orange-600 text-white text-xs font-bold uppercase tracking-widest mb-8 shadow-lg shadow-orange-900/20"
        >
          {t.hero_badge}
        </motion.span>
        
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
          {t.hero_title_1} <span className="text-orange-500">{t.hero_title_2}</span> {t.hero_title_3}
        </h1>
        
        <p className="text-lg md:text-xl text-slate-200 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
          {t.hero_desc}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <a 
            href="#fleet" 
            className="w-full sm:w-auto bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-500 transition-all shadow-xl shadow-orange-900/40 hover:-translate-y-1 active:translate-y-0"
          >
            {t.hero_cta_1}
          </a>
          <a 
            href="#why-us" 
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all hover:-translate-y-1 active:translate-y-0"
          >
            {t.hero_cta_2}
          </a>
        </div>
      </motion.div>

      {/* Scroll Indicator - Fixed Centering */}
      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-12 inset-x-0 flex justify-center text-white/60 z-10"
      >
        <ChevronDown size={40} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
};

export default Hero;
