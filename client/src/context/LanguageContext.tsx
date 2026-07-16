import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Lang } from '@/data/translations';

const STORAGE_KEY = 'ssg-lang';

interface LangCtx {
  lang: Lang;
  t: (typeof translations)[Lang];
  setLang: (l: Lang) => void;
  splashDone: boolean;
  confirmSplash: () => void;
}

const LangContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Keep the selected language, but always show the language choice on a new visit.
  const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) as Lang | null : null;

  const [lang, setLangState] = useState<Lang>(saved ?? 'en');
  const [splashDone, setSplashDone] = useState(false);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const confirmSplash = () => {
    setSplashDone(true);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, t, setLang, splashDone, confirmSplash }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
