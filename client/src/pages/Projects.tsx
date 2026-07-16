import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { presentationProjects, SSG_LOGO } from '@/data/presentationContent';
import { Calendar, MapPin, User, ArrowDown, ChevronRight } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

/* ── Category palette ── */
const CAT = {
  PIPELINES:  { bg: '#0a1628', accent: '#3a8bd1', label: 'Pipeline Works' },
  MECHANICAL: { bg: '#1a0e08', accent: '#e07020', label: 'Mechanical Works' },
  DRILLING:   { bg: '#071510', accent: '#30a060', label: 'Drilling & Boring' },
  GAS:        { bg: '#1a0a00', accent: '#e05000', label: 'Gas Infrastructure' },
  WELDING:    { bg: '#120818', accent: '#9060d0', label: 'Welding Works' },
  INDUSTRIAL: { bg: '#180808', accent: '#d03030', label: 'Industrial Overhaul' },
} as const;
type CatKey = keyof typeof CAT;

/* ── Number counter on enter ── */
function Counter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(value.replace(/\D/g, ''), 10);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {inView && !isNaN(num)
        ? <motion.span
            initial={0}
            animate={num}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* We'll just show animated via CSS below */}
            {value}{suffix}
          </motion.span>
        : value + suffix}
    </motion.span>
  );
}

/* ── Chapter number that animates in ── */
function ChapterNum({ n }: { n: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '110%' }}
        animate={inView ? { y: 0 } : { y: '110%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: 'Oswald, sans-serif',
          fontSize: 'clamp(5rem, 12vw, 9rem)',
          fontWeight: 700,
          lineHeight: 1,
          color: 'rgba(255,255,255,0.04)',
          userSelect: 'none',
        }}
      >
        {String(n).padStart(2, '0')}
      </motion.div>
    </div>
  );
}

/* ── Horizontal reveal line ── */
function RevealLine({ color, delay = 0 }: { color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <div ref={ref} style={{ height: 2, overflow: 'hidden' }}>
      <motion.div
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: '100%', background: color }}
      />
    </div>
  );
}

/* ── Single project chapter ── */
function ProjectChapter({
  project,
  index,
}: {
  project: (typeof presentationProjects)[0];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.4, 1], [1.02, 1, 1.02]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.75, 0.55]);

  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const isEven = index % 2 === 0;
  const { t } = useLang();
  
  // Try to match the exact string from English or Russian back to a Category key, or fallback to the generic one
  const palette = CAT[(project.category as CatKey)] ?? { bg: '#0d0d0d', accent: '#e03a00', label: project.category };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden min-h-[36rem] lg:min-h-[85vh]"
      style={{ background: palette.bg }}
      id={`chapter-${project.id}`}
    >
      {/* ── Parallax photo background ── */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${isEven ? '90deg' : '270deg'}, ${palette.bg} 0%, ${palette.bg}cc 40%, ${palette.bg}66 70%, transparent 100%)`,
            opacity: 0.85,
          }}
        />
      </motion.div>

      {/* ── Grid texture ── */}
      <div className="absolute inset-0 grid-texture-dark opacity-30" />

      {/* ── Accent vertical stripe ── */}
      <div
        className={`absolute top-0 bottom-0 w-1 ${isEven ? 'left-0' : 'right-0'}`}
        style={{ background: `linear-gradient(to bottom, transparent, ${palette.accent}, transparent)` }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8 lg:py-20 flex items-center min-h-[36rem] lg:min-h-[85vh]">
        <div className={`w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center ${isEven ? '' : 'direction-rtl'}`}>

          {/* Text block */}
          <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
            {/* Ghost chapter number */}
            <ChapterNum n={index + 1} />

            {/* Year + category pill */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-4 -mt-4"
            >
              <span
                className="font-mono text-xs font-bold px-3 py-1 rounded"
                style={{ background: palette.accent + '22', color: palette.accent, border: `1px solid ${palette.accent}55` }}
              >
                {palette.label}
              </span>
              <span className="font-mono text-xs" style={{ color: 'rgba(247,243,234,0.4)' }}>
                {project.id}
              </span>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: '110%' }}
                animate={inView ? { y: 0 } : { y: '110%' }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-bold leading-none"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: 'var(--sand)',
                }}
              >
                {project.title}
              </motion.h2>
            </div>

            {/* Accent line */}
            <div className="mb-5">
              <RevealLine color={palette.accent} delay={0.3} />
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: 'rgba(247,243,234,0.65)', maxWidth: '30rem' }}
            >
              {project.details}
            </motion.p>

            {/* Meta chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { Icon: User,     text: project.client,   label: t.projects.client },
                { Icon: MapPin,   text: project.location, label: t.projects.location },
                { Icon: Calendar, text: String(project.year), label: t.projects.year },
              ].map(({ Icon, text, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{
                    background: 'rgba(247,243,234,0.06)',
                    border: '1px solid rgba(247,243,234,0.1)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <Icon size={13} style={{ color: palette.accent }} />
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(247,243,234,0.38)' }}>
                      {label}
                    </div>
                    <div className="text-xs font-semibold" style={{ color: 'rgba(247,243,234,0.85)' }}>{text}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Year display block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`hidden lg:flex items-center justify-center ${isEven ? 'order-2' : 'order-1'}`}
          >
            <div className="relative">
              {/* Year number */}
              <div
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: 'clamp(6rem, 14vw, 11rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: `2px ${palette.accent}`,
                  filter: `drop-shadow(0 0 40px ${palette.accent}55)`,
                  userSelect: 'none',
                }}
              >
                {project.year}
              </div>
              {/* Floating project number */}
              <div
                className="absolute -top-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-sm"
                style={{
                  background: palette.accent,
                  color: '#fff',
                  boxShadow: `0 8px 32px ${palette.accent}66`,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll-to-next arrow (not on last) */}
      {index < presentationProjects.length - 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={18} style={{ color: palette.accent }} />
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}

/* ── Main Projects page ── */
export default function Projects() {
  const { t } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* ═══ CINEMATIC HERO ═══ */}
      <motion.section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: '100svh', minHeight: 'clamp(34rem, 100svh, 48rem)' }}
      >
        {/* Parallax background — team site photo */}
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 scale-100 md:scale-110">
          <img
            src="/pptx-media/image8.jpg"
            alt="Samgau team on site"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)' }} />
        </motion.div>
        <div className="absolute inset-0 grid-texture-dark opacity-30" />

        {/* Hero text */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto"
        >
          <img src={SSG_LOGO} alt="SSG" className="h-10 mx-auto mb-8 brightness-0 invert opacity-60" />

          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-xs tracking-widest uppercase mb-2"
              style={{ color: 'var(--ember)' }}
            >
              {t.projects.chronicle} · {presentationProjects.length} {t.projects.stories}
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold leading-none mb-6 uppercase"
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: 'clamp(2.5rem, 7.5vw, 6.5rem)',
                color: 'var(--sand)',
              }}
            >
              {t.projects.hero.split(' ').slice(0, -1).join(' ')}<br />
              {t.projects.hero.split(' ').slice(-1).join(' ')}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg mx-auto max-w-xl mb-10"
            style={{ color: 'rgba(247,243,234,0.6)' }}
          >
            {t.projects.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(247,243,234,0.3)' }}>
              {t.projects.scrollExplore}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={20} style={{ color: 'rgba(247,243,234,0.4)' }} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Project count ticker */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2"
        >
          {presentationProjects.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{ background: i === 0 ? 'var(--ember)' : 'rgba(247,243,234,0.2)' }}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* ═══ PROJECT CHAPTERS ═══ */}
      {presentationProjects.map((project, i) => (
        <ProjectChapter key={project.id} project={project} index={i} />
      ))}

      {/* ═══ EPILOGUE BANNER ═══ */}
      <section
        className="relative py-20 px-4 md:px-8 md:py-28 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}
      >
        <div className="absolute inset-0 grid-texture-dark opacity-40" />
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: 'radial-gradient(circle at 50% 50%, var(--ember) 0%, transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-3xl">
          <img src={SSG_LOGO} alt="SSG" className="h-10 mx-auto mb-8 brightness-0 invert opacity-50" />
          <div className="kicker justify-center" style={{ color: 'var(--ember)' }}>{t.projects.moreProjects}</div>
          <h2
            className="text-4xl font-bold mb-5 md:text-6xl"
            style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--sand)' }}
          >
            {t.projects.yourNext}
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(247,243,234,0.55)' }}>
            {t.projects.yourNextDesc}
          </p>
          <a
            href="/contact"
            id="projects-cta"
            className="inline-flex items-center gap-2 px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-2xl"
            style={{
              background: 'var(--ember)',
              color: 'var(--sand)',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
          >
            {t.projects.startConvo} <ChevronRight size={15} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
