import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleField from '@/components/ParticleField';
import {
  SSG_LOGO, SSG_PHOTO_TEAM_SITE, SSG_PHOTO_DRILLING_DAY,
  SSG_LICENSE_MAIN, SSG_KZ_ORNAMENT,
  companyHighlights, keyClients,
} from '@/data/presentationContent';
import { licenseFacts } from '@/data/licenseScope';
import { Award, Building2, MapPin, ShieldCheck, Target, Zap } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

const up = (i = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] } },
});

export default function About() {
  const { t } = useLang();

  const timeline = [
    { year: '2009', label: t.about.timelineData?.[0]?.label ?? 'Company Founded & First License', desc: t.about.timelineData?.[0]?.desc ?? 'TOO Samgau Stroy-Group established as a 100% Kazakhstan-local construction company. Category II license first issued 13.10.2009.' },
    { year: '2021', label: t.about.timelineData?.[1]?.label ?? 'Bozoy Compressor Pipeline', desc: t.about.timelineData?.[1]?.desc ?? 'Delivered water pipeline works for the reconstruction of the Bozoy compressor station for TOO DO KNISG.' },
    { year: '2022', label: t.about.timelineData?.[2]?.label ?? 'Multi-Client Expansion', desc: t.about.timelineData?.[2]?.desc ?? 'Completed five concurrent projects for KMK Munay, KazTransGas Aimak, Radzha LTD, and Aktobe city Akimat.' },
    { year: '2024', label: t.about.timelineData?.[3]?.label ?? 'License Renewed · Aktobe TPP', desc: t.about.timelineData?.[3]?.desc ?? 'License reissued 26.03.2024 as 15-GSL №001485-1 (Category II). Completed chemical water treatment building overhaul at Aktobe TPP.' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--sand)' }}>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-28 pb-16 sm:pt-32 sm:pb-20 md:px-8 md:pt-40 md:pb-28"
        style={{ background: 'linear-gradient(155deg, #080808 0%, #141414 50%, #0b1628 100%)' }}>
        <div className="absolute inset-0 grid-texture-dark" />
        <ParticleField count={22} dark />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-25">
          <img src={SSG_PHOTO_TEAM_SITE} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #080808 30%, transparent 70%)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <motion.div variants={up()} initial="hidden" animate="visible" className="max-w-3xl">
            <img src={SSG_LOGO} alt="SSG" className="h-10 mb-6 brightness-0 invert opacity-70" />
            <div className="kicker" style={{ color: 'var(--ember)' }}>{t.about.ourStory}</div>
            <h1 className="text-5xl font-bold mb-5 sm:text-6xl md:text-7xl" style={{ color: 'var(--sand)' }}>
              {t.about.title.split(' ').slice(0, 2).join(' ')}<br />
              {t.about.title.split(' ').slice(2).join(' ')}
            </h1>
            <p className="text-lg" style={{ color: 'rgba(247,243,234,0.6)' }}>
              {t.about.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core facts */}
      <section className="px-4 py-16 md:px-8 md:py-20" style={{ backgroundColor: 'var(--sand)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {[
              { icon: Award, title: t.about.cat2, desc: t.about.cat2Desc },
              { icon: MapPin, title: t.about.threeLocations, desc: t.about.threeLocationsDesc },
              { icon: Building2, title: t.about.local, desc: t.about.localDesc },
            ].map((card, i) => (
              <motion.div key={card.title} variants={up(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid rgba(13,13,13,0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'var(--ember)', boxShadow: '0 4px 20px var(--ember-glow)' }}>
                  <card.icon size={22} style={{ color: 'var(--sand)' }} />
                </div>
                <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--charcoal)' }}>{card.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-60)' }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split: Photo + Values */}
      <section className="px-4 py-16 md:px-8 md:py-20" style={{ backgroundColor: 'var(--sand-dark)' }}>
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Photo side */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4]" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.18)' }}>
              <img src={SSG_PHOTO_DRILLING_DAY} alt="Samgau site operations" className="w-full h-full object-cover object-center" />
            </div>
            {/* floating badge */}
            <div className="absolute -bottom-5 -right-5 rounded-2xl p-5 shadow-2xl"
              style={{ background: 'var(--ember)', boxShadow: '0 16px 50px rgba(224,58,0,0.4)' }}>
              <div className="font-bold text-4xl" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--sand)' }}>2009</div>
              <div className="font-mono text-xs mt-1" style={{ color: 'rgba(247,243,234,0.75)' }}>FOUNDED</div>
            </div>
            {/* KZ ornament decoration */}
            <div className="absolute -top-6 -left-6 w-24 h-24 opacity-20">
              <img src={SSG_KZ_ORNAMENT} alt="" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          {/* Values */}
          <motion.div variants={up()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="kicker">{t.about.values}</div>
            <h2 className="text-4xl font-bold mb-8" style={{ color: 'var(--charcoal)' }}>{t.about.whatDrives}</h2>
            <div className="space-y-4">
              {[
                { icon: Target, title: t.about.precision, desc: t.about.precisionDesc },
                { icon: Zap, title: t.about.responsiveness, desc: t.about.responsivenessDesc },
                { icon: ShieldCheck, title: t.about.accountability, desc: t.about.accountabilityDesc },
              ].map((val, i) => (
                <motion.div key={val.title} variants={up(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="flex items-start gap-4 rounded-xl p-5"
                  style={{ background: '#fff', border: '1px solid rgba(13,13,13,0.08)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--ember-subtle)', border: '1.5px solid var(--ember)' }}>
                    <val.icon size={18} style={{ color: 'var(--ember)' }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: 'var(--charcoal)' }}>{val.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-60)' }}>{val.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-16 md:px-8 md:py-20" style={{ backgroundColor: 'var(--sand)' }}>
        <div className="mx-auto max-w-5xl">
          <motion.div variants={up()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <div className="kicker">{t.about.history}</div>
            <h2 className="text-4xl font-bold" style={{ color: 'var(--charcoal)' }}>{t.about.timeline}</h2>
          </motion.div>
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div key={i} variants={up(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="timeline-item pl-8">
                <div className="font-mono text-xs font-bold mb-1" style={{ color: 'var(--ember)' }}>{item.year}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--charcoal)' }}>{item.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-60)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* License doc display */}
      <section className="px-4 py-16 md:px-8" style={{ background: 'linear-gradient(135deg, var(--charcoal) 0%, var(--steel) 100%)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={up()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="kicker" style={{ color: 'var(--ember)' }}>{t.about.officialDoc}</div>
              <h2 className="text-4xl font-bold mb-5" style={{ color: 'var(--sand)' }}>{t.about.licenseRecord}</h2>
              <div className="space-y-4">
                {[
                  { label: t.services.facts.license, value: '15-GSL No. 001485-1' },
                  { label: t.services.facts.issued, value: '26.03.2024' },
                  { label: t.services.facts.primaryIssue, value: '13.10.2009' },
                  { label: t.services.facts.category, value: 'II' },
                  { label: t.services.facts.bin, value: '090340019007' },
                  { label: t.services.facts.regOffice, value: t.services.facts.regOfficeVal },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b"
                    style={{ borderColor: 'rgba(247,243,234,0.1)' }}>
                    <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'rgba(247,243,234,0.45)' }}>{label}</span>
                    <span className="font-semibold text-sm" style={{ color: 'rgba(247,243,234,0.9)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: '1px solid rgba(247,243,234,0.1)', maxWidth: 400, margin: '0 auto' }}>
                <img src={SSG_LICENSE_MAIN} alt="Official Kazakhstan construction license" className="w-full h-auto object-contain bg-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="px-4 py-16 md:px-8" style={{ backgroundColor: 'var(--sand-dark)' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div variants={up()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <div className="kicker">{t.about.clients}</div>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--charcoal)' }}>{t.about.clientsTitle}</h2>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {keyClients.map((client, i) => (
              <motion.div key={client} variants={up(i * 0.06)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-xl px-4 py-5 text-center font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                style={{ background: '#fff', border: '1px solid rgba(13,13,13,0.1)', color: 'var(--charcoal)' }}>
                {client}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
