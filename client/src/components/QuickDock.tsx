import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, ChevronUp, Globe } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { type Lang } from '@/data/translations';

export default function QuickDock() {
  const { lang, setLang } = useLang();
  const [showDock, setShowDock] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowDock(true);
      } else {
        setShowDock(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languages: { code: Lang; label: string }[] = [
    { code: 'ru', label: 'РУ' },
    { code: 'kk', label: 'ҚАЗ' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <AnimatePresence>
      {showDock && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9000] px-3 py-2 rounded-2xl flex flex-wrap items-center justify-center gap-2 backdrop-blur-xl border border-white/10 shadow-2xl max-w-[calc(100vw-1rem)] sm:max-w-none sm:rounded-full sm:px-4 sm:py-2.5 sm:gap-3"
          style={{
            background: 'rgba(15, 17, 21, 0.82)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(224, 58, 0, 0.15)',
          }}
        >
          {/* Quick Call */}
          <a
            href="tel:+77172570000"
            aria-label="Direct Phone Call"
            className="p-2.5 rounded-full transition-colors text-zinc-300 hover:text-white hover:bg-white/10 flex items-center gap-2 text-xs font-mono group"
            title="Call SSG Office"
          >
            <Phone size={16} className="text-[var(--ember)] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline-block text-[11px] font-bold tracking-wider">+7 (7172) SSG</span>
          </a>

          <div className="w-[1px] h-4 bg-white/10" />

          {/* WhatsApp */}
          <a
            href="https://wa.me/77015700000"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Chat"
            className="p-2.5 rounded-full transition-colors text-emerald-400 hover:bg-emerald-500/10 flex items-center gap-2 text-xs font-mono group"
            title="Chat on WhatsApp"
          >
            <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline-block text-[11px] font-bold text-zinc-300 tracking-wider">WhatsApp</span>
          </a>

          <div className="w-[1px] h-4 bg-white/10" />

          <div className="w-[1px] h-4 bg-white/10" />

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase"
            >
              <Globe size={14} className="text-[var(--ember)]" />
              <span>{lang}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-[#12151c] border border-white/10 rounded-xl p-1 shadow-xl flex flex-col gap-1 min-w-[70px]">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-center transition-colors ${
                      lang === l.code ? 'bg-[var(--ember)] text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-[1px] h-4 bg-white/10" />

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Scroll to Top"
          >
            <ChevronUp size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
