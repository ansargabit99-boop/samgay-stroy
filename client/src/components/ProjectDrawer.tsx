import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Building2, HardHat, ShieldCheck, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';
import { useLang } from '@/context/LanguageContext';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  year: number | string;
  client: string;
  location?: string;
  image: string;
  details: string;
  scopeItems?: string[];
  equipmentUsed?: string[];
}

interface ProjectDrawerProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const { lang } = useLang();

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9500]"
          />

          {/* Slide-Over Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-[#0c0e12] border-l border-white/10 text-zinc-100 z-[9600] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--ember)] tracking-widest uppercase">
                <ShieldCheck size={14} />
                <span>{project.category}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Photo Banner */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold font-display text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Quick Meta Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-zinc-500 flex items-center gap-1.5">
                    <Building2 size={13} className="text-[var(--ember)]" />
                    <span>Заказчик / Client</span>
                  </div>
                  <div className="text-zinc-200 font-bold">{project.client}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-zinc-500 flex items-center gap-1.5">
                    <Calendar size={13} className="text-[var(--ember)]" />
                    <span>Период / Year</span>
                  </div>
                  <div className="text-zinc-200 font-bold">{project.year}</div>
                </div>

                <div className="space-y-1 col-span-2 pt-2 border-t border-zinc-800">
                  <div className="text-zinc-500 flex items-center gap-1.5">
                    <MapPin size={13} className="text-[var(--ember)]" />
                    <span>Локация / Location</span>
                  </div>
                  <div className="text-zinc-200 font-bold">{project.location || 'Республика Казахстан (Kazakhstan)'}</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  {lang === 'ru' ? 'Описание Объекта' : lang === 'kk' ? 'Нысанның сипаттамасы' : 'Project Scope & Overview'}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80">
                  {project.details}
                </p>
              </div>

              {/* Equipment Used */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <HardHat size={14} className="text-[var(--ember)]" />
                  <span>{lang === 'ru' ? 'Задействованная Техника' : lang === 'kk' ? 'Пайдаланылған техника' : 'Machinery Deployed'}</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    project.equipmentUsed || [
                      'Установки ГНБ Vermeer / Ditch Witch',
                      'Экскаваторы KOMATSU PC-300',
                      'Буровые комплексы BAUER',
                      'Автокраны Liebherr 50t',
                    ]
                  ).map((eq, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--ember)]" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-white/10 bg-zinc-950 flex items-center justify-between shrink-0">
              <Link href={`/projects/${project.id}`}>
                <a
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[var(--ember)] text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-[var(--ember-glow)]"
                >
                  <span>{lang === 'ru' ? 'Полная страница проекта' : lang === 'kk' ? 'Толық жоба беті' : 'Full Project Page'}</span>
                  <ExternalLink size={14} />
                </a>
              </Link>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-400 font-mono text-xs hover:text-white hover:bg-zinc-700 transition-colors"
              >
                {lang === 'ru' ? 'Закрыть' : lang === 'kk' ? 'Жабу' : 'Close'}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
