import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import type { Lang } from '@/data/translations';

const SSG_LOGO = '/pptx-media/image4.png';
const HERO_BG  = '/pptx-media/image8.jpg';

const LANGS: { code: Lang; native: string; english: string; flag: string }[] = [
  { code: 'en', native: 'English',  english: 'English', flag: '🇬🇧' },
  { code: 'ru', native: 'Русский',  english: 'Russian',  flag: '🇷🇺' },
];

export default function LanguageSplash() {
  const { lang, t, setLang, splashDone, confirmSplash } = useLang();
  const [selected, setSelected] = useState<Lang>(lang);
  const [confirming, setConfirming] = useState(false);

  if (splashDone) return null;

  const handleConfirm = () => {
    setConfirming(true);
    setLang(selected);
    // Brief pause for exit animation
    setTimeout(() => confirmSplash(), 600);
  };

  return (
    <AnimatePresence>
      {!confirming ? (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#0a0a0a' }}
        >
          {/* Parallax photo backdrop */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src={HERO_BG}
              alt=""
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.72) 50%, rgba(8,8,8,0.95) 100%)' }}
            />
          </div>

          {/* Grid texture */}
          <div className="absolute inset-0 grid-texture-dark opacity-40" />

          {/* Ember glow orb */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 700, height: 700,
              background: 'radial-gradient(circle, rgba(224,58,0,0.18) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl w-full">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-10"
            >
              <img src={SSG_LOGO} alt="Samgau Stroy Group" className="h-12 brightness-0 invert opacity-90 mx-auto mb-4" />
              <div
                className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: 'rgba(247,243,234,0.35)' }}
              >
                TOO «SAMGAU STROY-GROUP» · EST. 2009
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mb-8"
            >
              <div
                className="font-bold mb-2"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: 'clamp(1.6rem, 5vw, 2.6rem)',
                  color: 'var(--sand)',
                  letterSpacing: '0.04em',
                }}
              >
                {t.splash.chooseLanguage}
              </div>
              <div
                className="font-bold"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                  color: 'rgba(247,243,234,0.38)',
                  letterSpacing: '0.04em',
                }}
              >
                Выберите язык
              </div>
            </motion.div>

            {/* Language options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full mb-8"
            >
              {LANGS.map((l, i) => {
                const isActive = selected === l.code;
                return (
                  <motion.button
                    key={l.code}
                    onClick={() => setSelected(l.code)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.55 + i * 0.1 }}
                    className="flex-1 flex flex-col items-center gap-3 rounded-2xl px-5 py-6 sm:px-6 sm:py-7 transition-all duration-300 cursor-pointer"
                    style={{
                      background: isActive
                        ? 'rgba(224,58,0,0.12)'
                        : 'rgba(247,243,234,0.04)',
                      border: `2px solid ${isActive ? 'var(--ember)' : 'rgba(247,243,234,0.1)'}`,
                      boxShadow: isActive ? '0 0 40px rgba(224,58,0,0.2), inset 0 0 20px rgba(224,58,0,0.06)' : 'none',
                    }}
                  >
                    {/* Flag */}
                    <span className="text-4xl" role="img" aria-label={l.english}>{l.flag}</span>

                    {/* Native name */}
                    <div>
                      <div
                        className="font-bold text-xl"
                        style={{
                          fontFamily: 'Oswald, sans-serif',
                          color: isActive ? 'var(--sand)' : 'rgba(247,243,234,0.6)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {l.native}
                      </div>
                      <div
                        className="font-mono text-xs mt-1"
                        style={{ color: isActive ? 'var(--ember)' : 'rgba(247,243,234,0.3)' }}
                      >
                        {l.english}
                      </div>
                    </div>

                    {/* Selection indicator */}
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                      style={{
                        borderColor: isActive ? 'var(--ember)' : 'rgba(247,243,234,0.2)',
                        background: isActive ? 'var(--ember)' : 'transparent',
                      }}
                    >
                      {isActive && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          width="10" height="8" viewBox="0 0 10 8" fill="none"
                        >
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Confirm button */}
            <motion.button
              onClick={handleConfirm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.8 }}
              className="w-full font-mono font-bold text-sm uppercase tracking-widest py-4 transition-all duration-300"
              style={{
                background: 'var(--ember)',
                color: 'var(--sand)',
                clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
                boxShadow: '0 8px 40px rgba(224,58,0,0.35)',
                letterSpacing: '0.18em',
              }}
            >
              {t.splash.continue} →
            </motion.button>

            {/* Bottom footnote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 font-mono text-[10px] tracking-wider text-center"
              style={{ color: 'rgba(247,243,234,0.2)' }}
            >
              {t.splash.changeAnytime}
            </motion.p>
          </div>

          {/* Corner decorations */}
          <div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 opacity-20"
            style={{ borderColor: 'var(--ember)' }}
          />
          <div
            className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 opacity-20"
            style={{ borderColor: 'var(--ember)' }}
          />
          <div
            className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 opacity-20"
            style={{ borderColor: 'var(--ember)' }}
          />
          <div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 opacity-20"
            style={{ borderColor: 'var(--ember)' }}
          />
        </motion.div>
      ) : (
        /* Exit overlay */
        <motion.div
          key="exit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998]"
          style={{ background: 'var(--ember)' }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
}
