import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleField from '@/components/ParticleField';
import { licensedScopes } from '@/data/licenseScope';
import { SSG_LOGO, SSG_HERO_HELMET, SSG_LICENSE_MAIN, SSG_LICENSE_APP1, SSG_LICENSE_APP2 } from '@/data/presentationContent';
import { CheckCircle2, FileCheck2, Shield, ChevronRight } from 'lucide-react';
import FleetShowcase from '@/components/FleetShowcase';
import { useLang } from '@/context/LanguageContext';

const up = (i = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.09 } },
});

export default function Services() {
  const { t } = useLang();

  // Map icons to the translated scopes
  const translatedScopes = t.services.scopes.map((scope, i) => ({
    ...scope,
    icon: licensedScopes[i].icon,
  }));

  const licenseFactsData = [
    { label: t.services.facts.license, value: '15-GSL No. 001485-1' },
    { label: t.services.facts.issued, value: '26.03.2024' },
    { label: t.services.facts.primaryIssue, value: '13.10.2009' },
    { label: t.services.facts.category, value: 'II' },
    { label: t.services.facts.bin, value: '090340019007' },
    { label: t.services.facts.regOffice, value: t.services.facts.regOfficeVal, wide: true },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--sand)' }}>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-28 pb-16 sm:pt-32 sm:pb-20 md:px-8 md:pt-40 md:pb-28"
        style={{ background: 'linear-gradient(155deg, #080808 0%, #141414 50%, #0b1628 100%)' }}>
        <div className="absolute inset-0 grid-texture-dark" />
        <ParticleField count={22} dark />
        <div className="absolute inset-0 opacity-15">
          <img src={SSG_HERO_HELMET} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.6), #080808)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <motion.div variants={up()} initial="hidden" animate="visible" className="max-w-3xl md:max-w-4xl">
            <img src={SSG_LOGO} alt="SSG" className="h-10 mb-6 brightness-0 invert opacity-70" />
            <div className="kicker" style={{ color: 'var(--ember)' }}>{t.services.licensed}</div>
            <h1 className="text-4xl font-bold mb-5 leading-none sm:text-5xl md:text-6xl xl:text-7xl" style={{ color: 'var(--sand)' }}>
              {t.services.hero}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: 'rgba(247,243,234,0.6)' }}>
              {t.services.heroDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* License details panel */}
      <section className="px-4 py-16 md:px-8" style={{ backgroundColor: 'var(--sand-dark)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 items-start xl:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] xl:gap-8">

            {/* License data table */}
            <motion.div variants={up()} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{ border: '1px solid rgba(13,13,13,0.1)' }}>
              <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:px-6"
                style={{ background: 'var(--charcoal)', borderBottom: '1px solid rgba(247,243,234,0.06)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--ember)' }}>
                  <FileCheck2 size={18} style={{ color: 'var(--sand)' }} />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-lg leading-tight" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--sand)' }}>
                    {t.services.licensePanel}
                  </div>
                  <div className="font-mono text-xs leading-relaxed" style={{ color: 'rgba(247,243,234,0.4)' }}>
                    15-GSL №001485-1 · {t.services.verified}
                  </div>
                </div>
                <div className="sm:ml-auto inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(224,58,0,0.15)', border: '1px solid rgba(224,58,0,0.3)' }}>
                  <Shield size={11} style={{ color: 'var(--ember)' }} />
                  <span className="font-mono text-xs font-bold" style={{ color: 'var(--ember)' }}>{t.services.active}</span>
                </div>
              </div>
              <div className="bg-white grid grid-cols-1 sm:grid-cols-2">
                {licenseFactsData.map((fact) => (
                  <div key={fact.label} className={`p-4 sm:p-5 border-b ${fact.wide ? 'sm:col-span-2' : ''}`}
                    style={{ borderColor: 'rgba(13,13,13,0.07)' }}>
                    <div className="font-mono text-[11px] uppercase tracking-wider mb-1.5" style={{ color: 'var(--ember)' }}>
                      {fact.label}
                    </div>
                    <div className="font-semibold text-sm leading-relaxed break-words" style={{ color: 'var(--charcoal)' }}>{fact.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* License document image */}
            <motion.div variants={up(1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-4 xl:sticky xl:top-24">
              <div className="font-mono text-xs mb-1 font-semibold" style={{ color: 'var(--ember)' }}>
                {t.services.licenseDocs}
              </div>

              <div className="rounded-xl overflow-hidden shadow-md group aspect-[3/4] bg-white max-w-[420px] mx-auto xl:max-w-none"
                style={{ border: '1px solid rgba(13,13,13,0.1)' }}>
                <img src={SSG_LICENSE_MAIN} alt="Official Kazakhstan construction license"
                  className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: 'top' }} />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {[{ src: SSG_LICENSE_APP1, alt: 'License appendix page 1' }, { src: SSG_LICENSE_APP2, alt: 'License appendix page 2' }].map((doc) => (
                  <div key={doc.src} className="rounded-xl overflow-hidden shadow-md bg-white group"
                    style={{ border: '1px solid rgba(13,13,13,0.1)' }}>
                    <div className="aspect-[3/4]">
                      <img src={doc.src} alt={doc.alt}
                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: 'top' }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="px-4 py-16 md:px-8 md:py-20" style={{ backgroundColor: 'var(--sand)' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div variants={up()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
            <div className="kicker">{t.services.serviceCategories}</div>
            <h2 className="text-5xl font-bold md:text-6xl" style={{ color: 'var(--charcoal)' }}>
              {t.services.what}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {translatedScopes.map((svc, i) => (
              <motion.article key={svc.title}
                variants={up(i * 0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden"
                style={{ background: '#fff', border: '1px solid rgba(13,13,13,0.08)', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}
                id={`service-${svc.title.toLowerCase().replace(/\s+/g, '-')}`}>

                <div className="flex items-center gap-4 px-6 py-5 border-b transition-all duration-300"
                  style={{ borderColor: 'rgba(13,13,13,0.07)', background: 'linear-gradient(135deg, rgba(224,58,0,0.05), transparent)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--ember)', boxShadow: '0 4px 16px var(--ember-glow)' }}>
                    <svc.icon size={22} style={{ color: 'var(--sand)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--charcoal)' }}>{svc.title}</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--ink-60)' }}>{svc.summary}</p>
                  </div>
                  <ChevronRight size={16} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    style={{ color: 'var(--ember)' }} />
                </div>

                <div className="p-6">
                  <ul className="space-y-3">
                    {svc.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'var(--ink-60)' }}>
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--ember)' }} />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Heavy Fleet Showcase */}
      <section className="px-4 py-20 md:px-8 bg-[#0a0c10]">
        <div className="mx-auto max-w-7xl">
          <FleetShowcase />
        </div>
      </section>

      <Footer />
    </div>
  );
}
