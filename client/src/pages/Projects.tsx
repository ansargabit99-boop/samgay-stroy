import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleField from '@/components/ParticleField';
import ProjectDrawer from '@/components/ProjectDrawer';
import { presentationProjects, ssgSitePhotos, ProjectData, SSG_LOGO, getLocalizedProject } from '@/data/presentationContent';
import { Calendar, MapPin, User, ArrowDown, ChevronRight, X, ZoomIn, Eye, Sparkles, Filter } from 'lucide-react';
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
  onOpenModal,
}: {
  project: ProjectData;
  index: number;
  onOpenModal: (project: ProjectData) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const [, setLocation] = useLocation();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.4, 1], [1.02, 1, 1.02]);

  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const isEven = index % 2 === 0;
  const { t } = useLang();
  
  const palette = CAT[(project.category as CatKey)] ?? { bg: '#0d0d0d', accent: '#e03a00', label: project.category };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden min-h-[36rem] lg:min-h-[85vh] group"
      style={{ background: palette.bg }}
      id={`chapter-${project.id}`}
    >
      {/* ── Parallax photo background ── */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 cursor-pointer"
        onClick={() => onOpenModal(project)}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
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

            {/* Year + category pill */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-4"
            >
              <span
                className="font-mono text-xs font-bold px-3 py-1 rounded"
                style={{ background: palette.accent + '22', color: palette.accent, border: `1px solid ${palette.accent}55` }}
              >
                {t.projects.categories[project.category as CatKey] || palette.label}
              </span>
              <span className="font-mono text-xs" style={{ color: 'rgba(247,243,234,0.4)' }}>
                {project.id}
              </span>
            </motion.div>

            {/* Title - clickable */}
            <div className="overflow-hidden mb-4 cursor-pointer" onClick={() => onOpenModal(project)}>
              <motion.h2
                initial={{ y: '110%' }}
                animate={inView ? { y: 0 } : { y: '110%' }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-bold leading-tight hover:text-ember transition-colors"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
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
              className="text-sm leading-relaxed mb-6 sm:text-base"
              style={{ color: 'rgba(247,243,234,0.65)', maxWidth: '30rem' }}
            >
              {project.details}
            </motion.p>

            {/* Meta chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {[
                { Icon: User,     text: project.client,   label: t.projects.client },
                { Icon: MapPin,   text: project.location, label: t.projects.location },
                { Icon: Calendar, text: String(project.year), label: t.projects.year },
              ].map(({ Icon, text, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg sm:px-4"
                  style={{
                    background: 'rgba(247,243,234,0.06)',
                    border: '1px solid rgba(247,243,234,0.1)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <Icon size={13} style={{ color: palette.accent }} />
                  <div>
                    <div className="font-mono text-[8px] uppercase tracking-widest mb-0.5 sm:text-[9px]" style={{ color: 'rgba(247,243,234,0.38)' }}>
                      {label}
                    </div>
                    <div className="text-[11px] font-semibold sm:text-xs" style={{ color: 'rgba(247,243,234,0.85)' }}>{text}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Open Detail Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => onOpenModal(project)}
                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-lg"
                style={{
                  background: palette.accent,
                  color: '#fff',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                }}
              >
                <Eye size={15} />
                {t.projects.viewCaseStudy}
              </button>
              
              <button
                onClick={() => setLocation(`/projects/${project.id}`)}
                className="inline-flex items-center gap-2 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                style={{
                  background: 'rgba(247,243,234,0.06)',
                  border: '1px solid rgba(247,243,234,0.12)',
                  color: 'rgba(247,243,234,0.8)',
                }}
              >
                Page View <ChevronRight size={14} />
              </button>
            </motion.div>
          </div>

          {/* Year display block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`hidden lg:flex items-center justify-center cursor-pointer ${isEven ? 'order-2' : 'order-1'}`}
            onClick={() => onOpenModal(project)}
          >
            <div className="relative group/year">
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
                className="absolute -top-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-sm transition-transform group-hover/year:scale-110"
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
    </motion.section>
  );
}

/* ── Main Projects page ── */
export default function Projects() {
  const { t, lang } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<ProjectData | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
  const [modalActivePhoto, setModalActivePhoto] = useState<number>(0);

  const localizedProjects = presentationProjects.map((p) => getLocalizedProject(p, lang));

  const filteredProjects = selectedCategory === 'ALL'
    ? localizedProjects
    : localizedProjects.filter((p) => p.category === selectedCategory);

  const localizedModalProject = activeModalProject ? getLocalizedProject(activeModalProject, lang) : null;

  const categories = [
    { key: 'ALL', label: t.projects.filterAll },
    { key: 'INDUSTRIAL', label: t.projects.categories.INDUSTRIAL },
    { key: 'GAS', label: t.projects.categories.GAS },
    { key: 'MECHANICAL', label: t.projects.categories.MECHANICAL },
    { key: 'PIPELINES', label: t.projects.categories.PIPELINES },
    { key: 'DRILLING', label: t.projects.categories.DRILLING },
    { key: 'WELDING', label: t.projects.categories.WELDING },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* ═══ CINEMATIC HERO ═══ */}
      <motion.section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: '100svh', minHeight: 'clamp(34rem, 100svh, 48rem)' }}
      >
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 scale-100 md:scale-110">
          <img
            src="/photos/WhatsApp Image 2026-07-25 at 09.54.32.jpeg"
            alt="Samgau project site"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%)' }} />
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
            className="text-lg mx-auto max-w-2xl mb-8 text-sand/60"
          >
            {t.projects.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs text-ember bg-ember/10 border border-ember/30 mb-8"
          >
            <Sparkles size={14} />
            {t.projects.clickDetails}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-sand/30">
              {t.projects.scrollExplore}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={20} className="text-sand/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══ CATEGORY FILTER BAR ═══ */}
      <section className="sticky top-16 z-30 bg-black/90 backdrop-blur-md border-y border-sand/10 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar">
          <Filter size={16} className="text-ember shrink-0" />
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
                  selectedCategory === cat.key
                    ? 'bg-ember text-sand shadow-lg shadow-ember/20'
                    : 'bg-sand/5 text-sand/60 hover:bg-sand/10 hover:text-sand'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECT CHAPTERS ═══ */}
      {filteredProjects.map((project, i) => (
        <ProjectChapter
          key={project.id}
          project={project}
          index={i}
          onOpenModal={(proj) => {
            setActiveModalProject(proj);
            setModalActivePhoto(0);
          }}
        />
      ))}

      {/* ═══ SITE PHOTOS GALLERY (20 PHOTOS FROM PHOTOS FOLDER) ═══ */}
      <section className="py-24 px-4 md:px-8 bg-[#0b0b0b] relative overflow-hidden border-t border-sand/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-ember">
              {t.projects.photoCount}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-sand" style={{ fontFamily: 'Oswald, sans-serif' }}>
              {t.projects.galleryTitle}
            </h2>
            <p className="text-sm md:text-base text-sand/60">
              {t.projects.gallerySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ssgSitePhotos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setLightboxPhoto(photo.src)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-sand/5 border border-sand/10"
              >
                <img
                  src={photo.src}
                  alt={lang === 'ru' ? photo.titleRu : photo.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="font-mono text-[10px] uppercase text-ember font-bold mb-1">
                    Photo #{i + 1}
                  </span>
                  <p className="text-xs text-sand font-semibold line-clamp-2">
                    {lang === 'ru' ? photo.titleRu : photo.titleEn}
                  </p>
                  <ZoomIn size={16} className="text-sand/80 absolute top-3 right-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
          <p className="text-lg mb-10 text-sand/60">
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

      {/* ═══ PROJECT DRAWER (SLIDE-OVER) ═══ */}
      <ProjectDrawer project={activeModalProject} onClose={() => setActiveModalProject(null)} />

      {/* ═══ INTERACTIVE PROJECT DETAIL MODAL ═══ */}
      <AnimatePresence>
        {localizedModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProject(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#111] border border-sand/15 rounded-3xl overflow-hidden shadow-2xl my-auto text-sand"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-sand/20 flex items-center justify-center text-sand hover:bg-ember transition-colors"
              >
                <X size={20} />
              </button>

              {/* Modal Content */}
              <div className="max-h-[85vh] overflow-y-auto p-6 md:p-10 space-y-8">
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded font-mono text-xs font-bold uppercase bg-ember/20 text-ember border border-ember/30">
                      {t.projects.categories[localizedModalProject.category as CatKey] || localizedModalProject.category}
                    </span>
                    <span className="font-mono text-xs text-sand/40">{localizedModalProject.id}</span>
                    <span className="font-mono text-xs text-sand/40">• {localizedModalProject.year}</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    {localizedModalProject.title}
                  </h2>

                  <p className="text-base text-sand/75 max-w-3xl leading-relaxed">
                    {localizedModalProject.details}
                  </p>
                </div>

                {/* Main Photo Gallery Carousel in Modal */}
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-black border border-sand/10">
                    <img
                      src={localizedModalProject.gallery[modalActivePhoto]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setLightboxPhoto(localizedModalProject.gallery[modalActivePhoto])}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 border border-sand/20 flex items-center justify-center text-sand hover:bg-ember transition-colors"
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>

                  {/* Thumbnail Row */}
                  {localizedModalProject.gallery.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {localizedModalProject.gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setModalActivePhoto(i)}
                          className={`relative rounded-lg overflow-hidden shrink-0 w-20 h-14 border-2 transition-all ${
                            i === modalActivePhoto ? 'border-ember scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Specs & Scope */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-sand/10">
                  {/* Meta info & Specs */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold uppercase text-sand" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {t.projects.techSpecsTitle}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-sand/5 text-xs">
                        <span className="font-mono text-sand/50">{t.projects.client}</span>
                        <span className="font-semibold text-sand/90">{localizedModalProject.client}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-sand/5 text-xs">
                        <span className="font-mono text-sand/50">{t.projects.location}</span>
                        <span className="font-semibold text-sand/90">{localizedModalProject.location}</span>
                      </div>
                      {localizedModalProject.specs.map((spec, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-sand/5 text-xs">
                          <span className="font-mono text-sand/50">{spec.label}</span>
                          <span className="font-semibold text-sand/90">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scope of Work */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold uppercase text-sand" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {t.projects.scopeTitle}
                    </h3>
                    <ul className="space-y-2.5">
                      {localizedModalProject.scope.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-sand/5 text-xs text-sand/80">
                          <span className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-ember text-white font-mono font-bold text-[10px]">
                            {i + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Modal Footer CTA */}
                <div className="pt-6 border-t border-sand/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-ember text-white rounded-lg hover:brightness-110 transition-all"
                  >
                    {t.projects.inquireSimilar} <ChevronRight size={15} />
                  </a>

                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="px-5 py-3 font-mono text-xs font-semibold uppercase text-sand/60 hover:text-sand"
                  >
                    {t.projects.closeModal}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ LIGHTBOX FOR PHOTOS ═══ */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-ember transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src={lightboxPhoto}
              alt=""
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
