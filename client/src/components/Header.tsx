import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import type { Lang } from '@/data/translations';

const SSG_LOGO = '/pptx-media/image4.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { lang, setLang, t } = useLang();

  const navItems = [
    { label: t.nav.home,     href: '/' },
    { label: t.nav.services, href: '/services' },
    { label: t.nav.projects, href: '/projects' },
    { label: t.nav.about,    href: '/about' },
    { label: t.nav.team,     href: '/team' },
    { label: t.nav.contact,  href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'var(--charcoal)' }}>
      {/* Top announcement strip */}
      <div
        className="hidden md:flex items-center justify-between px-8 py-1.5"
        style={{ background: '#111', borderBottom: '1px solid rgba(247,243,234,0.06)' }}
      >
        <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(247,243,234,0.4)' }}>
          TOO «SAMGAU STROY-GROUP» · BIN 090340019007 · ASTANA · AKTOBE · SHYMKENT
        </span>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--ember)' }}>
            15-GSL №001485-1 · {t.nav.licensed}
          </span>
          
          {/* Language Switcher Desktop */}
          <div className="flex items-center gap-2 border-l pl-4" style={{ borderColor: 'rgba(247,243,234,0.1)' }}>
            <Globe size={10} style={{ color: 'rgba(247,243,234,0.4)' }} />
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <button 
                onClick={() => setLang('en')}
                className="transition-colors uppercase tracking-widest"
                style={{ color: lang === 'en' ? 'var(--ember)' : 'rgba(247,243,234,0.3)' }}
              >
                EN
              </button>
              <span style={{ color: 'rgba(247,243,234,0.15)' }}>/</span>
              <button 
                onClick={() => setLang('ru')}
                className="transition-colors uppercase tracking-widest"
                style={{ color: lang === 'ru' ? 'var(--ember)' : 'rgba(247,243,234,0.3)' }}
              >
                RU
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8"
        style={{ borderBottom: '1px solid rgba(247,243,234,0.07)' }}
      >
        {/* Logo — show the icon mark only at small size, full logo hidden on mobile */}
        <Link href="/">
          <a id="header-logo" className="flex items-center shrink-0 group" aria-label="Samgau Stroy Group home">
            <img
              src={SSG_LOGO}
              alt="Samgau Stroy Group"
              className="block object-contain"
              style={{ height: '28px', width: 'auto', maxWidth: '126px' }}
            />
          </a>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  id={`nav-${item.href.replace('/', '') || 'home'}`}
                  className="relative px-3 py-2 font-mono text-xs font-semibold uppercase tracking-widest transition-colors duration-200"
                  style={{ color: isActive ? 'var(--ember)' : 'rgba(247,243,234,0.65)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded"
                      style={{ background: 'rgba(224,58,0,0.12)' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: 'var(--ember)' }}
                    />
                  )}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact">
            <a id="header-cta" className="btn btn-primary py-2 px-5 text-xs">
              {t.nav.getQuote} <ArrowRight size={12} />
            </a>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile language toggle */}
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <button 
              onClick={() => setLang('en')}
              className="px-1.5 py-1 rounded transition-colors uppercase tracking-widest"
              style={{ 
                background: lang === 'en' ? 'rgba(224,58,0,0.15)' : 'transparent',
                color: lang === 'en' ? 'var(--ember)' : 'rgba(247,243,234,0.4)' 
              }}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('ru')}
              className="px-1.5 py-1 rounded transition-colors uppercase tracking-widest"
              style={{ 
                background: lang === 'ru' ? 'rgba(224,58,0,0.15)' : 'transparent',
                color: lang === 'ru' ? 'var(--ember)' : 'rgba(247,243,234,0.4)' 
              }}
            >
              RU
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-9 h-9 rounded transition-colors"
            style={{
              color: 'rgba(247,243,234,0.8)',
              background: isOpen ? 'rgba(247,243,234,0.1)' : 'transparent',
            }}
            aria-label="Toggle navigation"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
            style={{ background: '#111', borderBottom: '1px solid rgba(247,243,234,0.08)' }}
          >
            <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item, idx) => {
                const isActive = location === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link href={item.href}>
                      <a
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between w-full rounded-lg px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200"
                        style={{
                          color: isActive ? 'var(--sand)' : 'rgba(247,243,234,0.55)',
                          background: isActive ? 'var(--ember)' : 'transparent',
                        }}
                      >
                        {item.label}
                        {isActive && <ArrowRight size={12} />}
                      </a>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="pt-3 mt-2 border-t" style={{ borderColor: 'rgba(247,243,234,0.08)' }}>
                <Link href="/contact">
                  <a onClick={() => setIsOpen(false)} className="btn btn-primary w-full justify-center">
                    {t.nav.getQuote} <ArrowRight size={13} />
                  </a>
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
