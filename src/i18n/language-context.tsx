import React, { createContext, useContext, useState } from 'react';
import { TRANSLATIONS } from '../../constants';
import type { Language } from '../../types';

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

/**
 * Holds the active language for the whole tree.
 *
 * `language` must stay real state and `setLanguage` must stay in the context value:
 * the Hindi toggle in Header reads both, and the full Hindi translation in
 * TRANSLATIONS is only reachable through them. A previous refactor (origin/dev,
 * commit d964a3d) replaced this value with a hardcoded `{ t: TRANSLATIONS.en }`,
 * which silently made the site English-only. Derive `t` from state; never pin it
 * to a locale.
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
