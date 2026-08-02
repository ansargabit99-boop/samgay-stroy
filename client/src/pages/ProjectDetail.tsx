import { useState } from 'react';
import { useRoute, useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleField from '@/components/ParticleField';
import { presentationProjects, ProjectData, SSG_LOGO, getLocalizedProject } from '@/data/presentationContent';
import { useLang } from '@/context/LanguageContext';
import {
  ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight,
  ExternalLink, MapPin, ShieldCheck, User, X, ZoomIn
} from 'lucide-react';

/* Category Badge Colors */
const CAT_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  INDUSTRIAL: { bg: 'rgba(208, 48, 48, 0.15)', border: 'rgba(208, 48, 48, 0.4)', text: '#f87171' },
  GAS:        { bg: 'rgba(224, 80, 0, 0.15)',  border: 'rgba(224, 80, 0, 0.4)',  text: '#fb923c' },
  MECHANICAL: { bg: 'rgba(224, 112, 32, 0.15)', border: 'rgba(224, 112, 32, 0.4)', text: '#facc15' },
  PIPELINES:  { bg: 'rgba(58, 139, 209, 0.15)', border: 'rgba(58, 139, 209, 0.4)', text: '#38bdf8' },
  DRILLING:   { bg: 'rgba(48, 160, 96, 0.15)',  border: 'rgba(48, 160, 96, 0.4)',  text: '#4ade80' },
  WELDING:    { bg: 'rgba(144, 96, 208, 0.15)', border: 'rgba(144, 96, 208, 0.4)', text: '#c084fc' },
};

export default function ProjectDetail() {
  const [, params] = useRoute('/projects/:id');
  const [, setLocation] = useLocation();
  const { t, lang } = useLang();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const projectId = params?.id;
  const currentIndex = presentationProjects.findIndex((p) => p.id === projectId);
  const rawProject: ProjectData | undefined = presentationProjects[currentIndex] ?? presentationProjects[0];

  if (!rawProject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>{lang === 'ru' ? 'Проект не найден' : 'Project not found'}</p>
      </div>
    );
  }

  const project = getLocalizedProject(rawProject, lang);
  const prevProject = getLocalizedProject(presentationProjects[(currentIndex - 1 + presentationProjects.length) % presentationProjects.length], lang);
  const nextProject = getLocalizedProject(presentationProjects[(currentIndex + 1) % presentationProjects.length], lang);

  const catStyle = CAT_STYLES[project.category] ?? { bg: 'rgba(224,58,0,0.15)', border: 'rgba(224,58,0,0.4)', text: 'var(--ember)' };
  const categoryLabel = t.projects.categories[project.category as keyof typeof t.projects.categories] || project.category;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-sand">
      <Header />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#121212] via-[#0d0d0d] to-[#0a0a0a]">
        <div className="absolute inset-0 grid-texture-dark opacity-40" />
        <ParticleField count={18} dark />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          {/* Back button */}
          <button
            onClick={() => setLocation('/projects')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider mb-8 transition-colors hover:text-ember"
            style={{ background: 'rgba(247,243,234,0.06)', border: '1px solid rgba(247,243,234,0.1)' }}
          >
            <ArrowLeft size={14} />
            {t.projects.backToProjects}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider"
                  style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}`, color: catStyle.text }}
                >
                  {categoryLabel}
                </span>
                <span className="font-mono text-xs text-sand/40">{project.id}</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-ember/20 text-ember border border-ember/30">
                  {project.year}
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-sand"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-sand/70 max-w-2xl leading-relaxed">
                {project.details}
              </p>
            </div>

            {/* Quick Meta Card */}
            <div className="lg:col-span-4">
              <div
                className="rounded-2xl p-6 space-y-4"
                style={{
                  background: 'rgba(247,243,234,0.03)',
                  border: '1px solid rgba(247,243,234,0.08)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-center gap-3 pb-3 border-b border-sand/10">
                  <User size={16} className="text-ember shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-sand/40 tracking-wider">{t.projects.client}</div>
                    <div className="text-sm font-semibold text-sand/90">{project.client}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-3 border-b border-sand/10">
                  <MapPin size={16} className="text-ember shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-sand/40 tracking-wider">{t.projects.location}</div>
                    <div className="text-sm font-semibold text-sand/90">{project.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-ember shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase text-sand/40 tracking-wider">{t.projects.year}</div>
                    <div className="text-sm font-semibold text-sand/90">{project.year}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Photo Gallery */}
      <section className="py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
        {/* Photo Gallery Viewer */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
              {t.projects.photoGalleryTitle}
            </h2>
            <span className="font-mono text-xs text-sand/40">
              {activePhotoIdx + 1} / {project.gallery.length}
            </span>
          </div>

          {/* Main Large Photo Display */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-black border border-sand/10 group">
            <img
              src={project.gallery[activePhotoIdx]}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />

            <button
              onClick={() => setLightboxImg(project.gallery[activePhotoIdx])}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-sand/20 flex items-center justify-center text-sand hover:bg-ember transition-colors"
              title="Expand Photo"
            >
              <ZoomIn size={18} />
            </button>

            {project.gallery.length > 1 && (
              <>
                <button
                  onClick={() => setActivePhotoIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-sand/20 flex items-center justify-center text-sand hover:bg-ember transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setActivePhotoIdx((prev) => (prev + 1) % project.gallery.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-sand/20 flex items-center justify-center text-sand hover:bg-ember transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {project.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {project.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhotoIdx(i)}
                  className={`relative rounded-lg overflow-hidden shrink-0 w-24 h-16 border-2 transition-all ${
                    i === activePhotoIdx ? 'border-ember scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Description & Scope & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Scope of Work */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-bold uppercase border-b border-sand/10 pb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              {t.projects.scopeTitle}
            </h2>
            <ul className="space-y-4">
              {project.scope.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: 'rgba(247,243,234,0.03)', border: '1px solid rgba(247,243,234,0.06)' }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold"
                    style={{ background: 'var(--ember)', color: '#fff' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <p className="text-sm leading-relaxed text-sand/80">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specs & Inquiry */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl font-bold uppercase border-b border-sand/10 pb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              {t.projects.techSpecsTitle}
            </h2>

            <div className="space-y-3">
              {project.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ background: 'rgba(247,243,234,0.03)', border: '1px solid rgba(247,243,234,0.06)' }}
                >
                  <span className="font-mono text-xs uppercase text-sand/50">{spec.label}</span>
                  <span className="text-sm font-semibold text-sand/90">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(224,58,0,0.2) 0%, rgba(13,13,13,0.9) 100%)', border: '1px solid rgba(224,58,0,0.4)' }}
            >
              <ShieldCheck size={32} className="text-ember mb-3" />
              <h3 className="text-xl font-bold mb-2 uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
                {t.projects.inquireSimilar}
              </h3>
              <p className="text-xs text-sand/65 mb-6">
                Category II licensed execution across Kazakhstan. Get feasibility analysis & preliminary estimate within 48 hours.
              </p>
              <Link href="/contact">
                <a
                  className="inline-flex items-center justify-center gap-2 w-full py-3 font-mono text-xs font-bold uppercase tracking-widest transition-all hover:brightness-110"
                  style={{
                    background: 'var(--ember)',
                    color: '#fff',
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                  }}
                >
                  {t.projects.startConvo} <ArrowRight size={14} />
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Prev / Next Navigation Footer */}
        <div className="pt-10 border-t border-sand/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setLocation(`/projects/${prevProject.id}`)}
            className="flex items-center gap-3 p-4 rounded-xl w-full sm:w-auto text-left transition-colors hover:bg-sand/5"
            style={{ border: '1px solid rgba(247,243,234,0.08)' }}
          >
            <ChevronLeft size={20} className="text-ember shrink-0" />
            <div>
              <div className="font-mono text-[10px] uppercase text-sand/40">{t.projects.prevProject}</div>
              <div className="text-sm font-bold text-sand/90">{prevProject.title}</div>
            </div>
          </button>

          <button
            onClick={() => setLocation(`/projects/${nextProject.id}`)}
            className="flex items-center justify-end gap-3 p-4 rounded-xl w-full sm:w-auto text-right transition-colors hover:bg-sand/5"
            style={{ border: '1px solid rgba(247,243,234,0.08)' }}
          >
            <div>
              <div className="font-mono text-[10px] uppercase text-sand/40">{t.projects.nextProject}</div>
              <div className="text-sm font-bold text-sand/90">{nextProject.title}</div>
            </div>
            <ChevronRight size={20} className="text-ember shrink-0" />
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-ember transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src={lightboxImg}
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
