import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleField from '@/components/ParticleField';
import BlueprintHeroCanvas from '@/components/BlueprintHeroCanvas';
import LicenseModal from '@/components/LicenseModal';
import { licensedScopes } from '@/data/licenseScope';
import {
  SSG_LOGO, SSG_HERO_WORKER, SSG_HERO_HELMET,
  SSG_PHOTO_TEAM_SITE, SSG_PHOTO_DRILLING_DAY,
  SSG_PHOTO_GAS_PIPELINE, SSG_PHOTO_DRILLING_NIGHT,
  SSG_LICENSE_MAIN, SSG_HSE_DIAGRAM,
  companyHighlights, keyClients, presentationProjects, hsePrinciples,
} from '@/data/presentationContent';
import { ArrowRight, BadgeCheck, Calendar, ChevronDown, MapPin, Shield, Users, Zap } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

/* ── animated counter ── */
function Counter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value.replace(/\D/g, ''), 10);
    if (isNaN(num)) { setDisplay(value); return; }
    const dur = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.floor(ease * num) + suffix);
      if (t < 1) requestAnimationFrame(tick);
      else setDisplay(value + suffix);
    };
    requestAnimationFrame(tick);
  }, [inView, value, suffix]);
  return <span ref={ref}>{display}</span>;
}

const up = (i = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12 } },
});

export default function Home() {
  const { t } = useLang();
  const translatedScopes = t.services.scopes.map((scope, i) => ({
    ...scope,
    icon: licensedScopes[i].icon,
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--sand)' }}>
      <Header />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #080808 0%, #141414 45%, #0b1628 100%)' }}>
        <div className="absolute inset-0 grid-texture-dark" />
        <ParticleField count={28} dark />
        <BlueprintHeroCanvas />

        {/* Real hero photo — right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <img src={SSG_HERO_WORKER} alt="SSG engineer" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #080808 0%, transparent 50%, #080808 100%)' }} />
        </div>

        {/* Ember orb */}
        <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] rounded-full pointer-events-none hidden lg:block"
          style={{ background: 'radial-gradient(circle, rgba(224,58,0,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-16 sm:pt-32 sm:pb-20 md:px-8 md:pt-36 md:pb-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── LEFT: copy ── */}
            <div className="space-y-8 z-10">
              {/* Real logo */}
              <motion.div variants={up(0)} initial="hidden" animate="visible">
                <img src={SSG_LOGO} alt="Samgau Stroy Group" className="h-14 brightness-0 invert" />
              </motion.div>

              <motion.h1 variants={up(1)} initial="hidden" animate="visible"
                className="text-5xl font-bold leading-none sm:text-6xl md:text-7xl lg:text-8xl max-w-xl"
                style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--sand)' }}>
                {t.hero.title1}<br />
                <span className="gradient-text">{t.hero.title2}</span><br />
                {t.hero.title3}
              </motion.h1>

              <motion.p variants={up(2)} initial="hidden" animate="visible"
                className="text-lg leading-relaxed max-w-md"
                style={{ color: 'rgba(247,243,234,0.6)' }}>
                {t.hero.description}
              </motion.p>

              <motion.div variants={up(3)} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
                <Link href="/services">
                  <a id="hero-services-btn" className="btn btn-primary">{t.hero.servicesBtn} <ArrowRight size={14} /></a>
                </Link>
                <Link href="/projects">
                  <a id="hero-projects-btn" className="btn btn-ghost-light">{t.hero.projectsBtn}</a>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={up(4)} initial="hidden" animate="visible"
                className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-6 border-t"
                style={{ borderColor: 'rgba(247,243,234,0.1)' }}>
                {[
                  { icon: Calendar, v: '2009', s: '', lbl: t.hero.statFounded },
                  { icon: Users,    v: '100',  s: '+', lbl: t.hero.statEmployees },
                  { icon: BadgeCheck, v: 'II', s: '', lbl: t.hero.statLicense },
                  { icon: MapPin,   v: '3',    s: '', lbl: t.hero.statLocations },
                ].map(({ icon: Icon, v, s, lbl }) => (
                  <div key={lbl} className="space-y-1">
                    <Icon size={15} style={{ color: 'var(--ember)' }} />
                    <div className="text-3xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--sand)' }}>
                      {isNaN(parseInt(v)) ? v : <Counter value={v} suffix={s} />}
                    </div>
                    <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(247,243,234,0.38)' }}>{lbl}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: profile card ── */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block">

              {/* Big site photo */}
              <div className="relative overflow-hidden rounded-2xl"
                style={{ border: '1px solid rgba(247,243,234,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
                <img src={SSG_PHOTO_TEAM_SITE} alt="Samgau team on site" className="w-full aspect-[4/5] lg:aspect-auto lg:h-[420px] object-cover object-center" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #080808 0%, transparent 55%)' }} />

                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-xl p-4 backdrop-blur-md"
                    style={{ background: 'rgba(13,13,13,0.75)', border: '1px solid rgba(247,243,234,0.1)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <Shield size={14} style={{ color: 'var(--ember)' }} />
                      <span className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--ember)' }}>
                        LICENSE 15-GSL-001485-1 · ACTIVE
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {companyHighlights.slice(0,2).map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Zap size={10} className="mt-1 shrink-0" style={{ color: 'var(--ember)' }} />
                          <p className="text-xs leading-tight" style={{ color: 'rgba(247,243,234,0.6)' }}>{h}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating mini-card: clients */}
              <div className="absolute -bottom-6 -left-6 rounded-xl p-4 w-56"
                style={{ background: 'var(--ember)', boxShadow: '0 16px 50px rgba(224,58,0,0.4)' }}>
                <div className="font-mono text-xs font-bold mb-2" style={{ color: 'rgba(247,243,234,0.8)' }}>KEY CLIENTS</div>
                {keyClients.slice(0, 3).map((c) => (
                  <div key={c} className="text-xs py-0.5 font-semibold" style={{ color: 'var(--sand)' }}>· {c}</div>
                ))}
                <div className="text-xs mt-1" style={{ color: 'rgba(247,243,234,0.55)' }}>+{keyClients.length - 3} more</div>
              </div>
            </motion.div>
          </div>

          {/* scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <span className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(247,243,234,0.25)' }}>SCROLL</span>
            <ChevronDown size={16} style={{ color: 'rgba(247,243,234,0.25)' }} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════ PHOTO STRIP ═══════════ */}
      <section className="py-0 overflow-hidden" style={{ backgroundColor: 'var(--charcoal)' }}>
        <div className="flex h-32 sm:h-40 md:h-56">
          {[SSG_PHOTO_DRILLING_NIGHT, SSG_PHOTO_GAS_PIPELINE, SSG_PHOTO_DRILLING_DAY, SSG_HERO_HELMET].map((src, i) => (
            <div key={i} className="flex-1 relative overflow-hidden group">
              <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="py-20 px-4 md:px-8 md:py-28" style={{ backgroundColor: 'var(--sand)' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div variants={up()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
            <div className="kicker">{t.sections.licensedWork}</div>
            <h2 className="text-5xl font-bold mb-4 md:text-6xl" style={{ color: 'var(--charcoal)' }}>
              {t.sections.sixCategories.split(' ').slice(0, -2).join(' ')}<br />
              {t.sections.sixCategories.split(' ').slice(-2).join(' ')}
            </h2>
            <p className="text-lg max-w-xl" style={{ color: 'var(--ink-60)' }}>
              {t.sections.sixCategoriesDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {translatedScopes.map((svc, i) => (
              <motion.div key={svc.title} variants={up(i * 0.1)} initial="hidden" whileInView="visible"
                viewport={{ once: true }}
                className="group card-ember p-7"
                id={`svc-card-${i}`}>
                <div className="mb-5 w-13 h-13 flex items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
                  style={{ width: 52, height: 52, background: 'var(--ember)', boxShadow: '0 6px 24px var(--ember-glow)' }}>
                  <svc.icon size={24} style={{ color: 'var(--sand)' }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--charcoal)' }}>{svc.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-60)' }}>{svc.summary}</p>
                <ul className="space-y-1.5">
                  {svc.items.slice(0, 2).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: 'var(--ink-60)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--ember)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services">
              <a id="home-services-all" className="btn btn-outline">{t.sections.fullScope} <ArrowRight size={14} /></a>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ PROJECTS PREVIEW ═══════════ */}
      <section className="py-28 px-4 md:px-8 relative" style={{ backgroundColor: '#0d0d0d' }}>
        <div className="absolute inset-0 grid-texture-dark opacity-60" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div variants={up()} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="kicker" style={{ color: 'var(--ember)' }}>{t.sections.portfolio}</div>
              <h2 className="text-5xl font-bold md:text-6xl" style={{ color: 'var(--sand)' }}>
                {t.sections.selectedProjects}
              </h2>
            </div>
            <Link href="/projects">
              <a id="home-projects-all" className="btn btn-ghost-light shrink-0">{t.sections.allProjects} <ArrowRight size={14} /></a>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {presentationProjects.slice(0, 3).map((proj, i) => (
              <motion.article key={proj.id} variants={up(i * 0.1)} initial="hidden" whileInView="visible"
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl"
                style={{ border: '1px solid rgba(247,243,234,0.06)' }}>
                {/* Real photo */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={proj.image} alt={proj.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0d0d0d 0%, transparent 55%)' }} />
                  <div className="absolute top-3 left-3">
                    <span className="tag">{proj.category}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 font-bold text-3xl"
                    style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--ember)' }}>
                    {proj.year}
                  </div>
                </div>
                <div className="p-5" style={{ background: 'var(--charcoal-light)' }}>
                  <h3 className="text-lg font-bold mb-1.5" style={{ color: 'var(--sand)' }}>{proj.title}</h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(247,243,234,0.5)' }}>{proj.details}</p>
                  <div className="font-mono text-xs font-semibold" style={{ color: 'rgba(247,243,234,0.35)' }}>{proj.client}</div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════ HSE ═══════════ */}
      <section className="py-20 px-4 md:px-8 md:py-28" style={{ background: 'var(--sand)' }}>
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={up()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="kicker">{t.sections.safetyFirst}</div>
            <h2 className="text-5xl font-bold mb-6 md:text-6xl" style={{ color: 'var(--charcoal)' }}>
              {t.sections.hseTitle}
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--ink-60)' }}>
              {t.sections.hseDesc}
            </p>
            <div className="space-y-4">
              {hsePrinciples.map((p, i) => (
                <motion.div key={i} variants={up(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: '#fff', border: '1px solid rgba(13,13,13,0.08)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm"
                    style={{ background: 'var(--ember)', color: 'var(--sand)', fontFamily: 'Oswald, sans-serif' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-60)' }}>{p}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* HSE diagram + license thumbnail */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="space-y-4">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4]"
              style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.15)', border: '1px solid rgba(13,13,13,0.08)' }}>
              <img src={SSG_HSE_DIAGRAM} alt="HSE Safety Health Wellbeing diagram" className="w-full h-full object-contain bg-white p-4" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <LicenseModal>
                <div className="rounded-xl overflow-hidden cursor-pointer group relative border border-black/10 shadow-md">
                  <img src={SSG_LICENSE_MAIN} alt="License document" className="w-full aspect-[3/4] object-contain bg-white p-2 group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono font-bold">
                    Проверить
                  </div>
                </div>
              </LicenseModal>
              <LicenseModal>
                <div className="rounded-xl p-5 flex flex-col justify-center cursor-pointer group border border-white/10 hover:border-[var(--ember)] transition-colors"
                  style={{ background: 'linear-gradient(135deg, var(--charcoal), var(--steel))', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                  <div className="font-mono text-xs mb-2 text-[var(--ember)] flex items-center justify-between">
                    <span>CATEGORY II LICENSE</span>
                    <Shield size={14} />
                  </div>
                  <div className="font-bold text-lg mb-1" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--sand)' }}>
                    15-GSL №001485-1
                  </div>
                  <div className="font-mono text-xs" style={{ color: 'rgba(247,243,234,0.45)' }}>
                    Issued: 26.03.2024<br />BIN: 090340019007
                  </div>
                </div>
              </LicenseModal>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CLIENTS ═══════════ */}
      <section className="py-16 px-4 md:px-8" style={{ backgroundColor: 'var(--sand-dark)' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div variants={up()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <div className="kicker">{t.sections.clientExp}</div>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--charcoal)' }}>
              {t.sections.trustedBy}
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {keyClients.map((client, i) => (
              <motion.div key={client} variants={up(i * 0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-xl px-4 py-5 text-center font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                style={{ background: '#fff', border: '1px solid rgba(13,13,13,0.1)', color: 'var(--charcoal)' }}>
                {client}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-20 px-4 md:px-8 md:py-28 relative overflow-hidden" style={{ background: 'var(--ember)' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-20">
          <img src={SSG_HERO_HELMET} alt="" className="w-full h-full object-cover" />
        </div>
        <motion.div variants={up()} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative mx-auto max-w-4xl text-center">
          <img src={SSG_LOGO} alt="Samgau Stroy Group" className="h-12 mx-auto mb-8 brightness-0 invert opacity-80" />
          <h2 className="text-5xl font-bold mb-5 md:text-7xl" style={{ color: 'var(--sand)' }}>
            {t.sections.readyToBuild}
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(247,243,234,0.8)' }}>
            {t.sections.readyDesc}
          </p>
          <Link href="/contact">
            <a id="home-cta-contact" className="btn" style={{
              background: 'var(--sand)', color: 'var(--ember)',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', padding: '1rem 2.5rem',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}>
              {t.sections.getInTouch} <ArrowRight size={16} />
            </a>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
