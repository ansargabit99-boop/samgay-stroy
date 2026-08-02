import { motion, type Variants } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleField from '@/components/ParticleField';
import { Briefcase, HardHat, Users } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08 },
  }),
};

const team = [
  {
    name: 'G. Zh. Tazhiev',
    role: 'General Director',
    expertise: 'Licensed works oversight and client strategy',
    department: 'EXECUTIVE',
    initials: 'GT',
  },
  {
    name: 'A. K. Nurgaliyev',
    role: 'Chief Engineer',
    expertise: 'Structural engineering and utility systems design',
    department: 'ENGINEERING',
    initials: 'AN',
  },
  {
    name: 'B. M. Orazov',
    role: 'Operations Manager',
    expertise: 'Site sequencing, resource allocation and delivery',
    department: 'OPERATIONS',
    initials: 'BO',
  },
  {
    name: 'D. S. Bekbayev',
    role: 'Lead Surveyor',
    expertise: 'Ground works, geotechnical control and measurement',
    department: 'SURVEY',
    initials: 'DB',
  },
];

const departments = [
  { icon: Briefcase, name: 'Executive & Administration', headcount: '5+' },
  { icon: HardHat, name: 'Construction & Site Works', headcount: '60+' },
  { icon: Users, name: 'Production & Fabrication', headcount: '30+' },
];

export default function Team() {
  const { t } = useLang();

  // Combine static logic (initials, icons, headcount) with translated strings
  const translatedTeam = t.team.members.map((m, i) => ({
    ...m,
    initials: ['GT', 'AN', 'BO', 'DB'][i],
  }));

  const translatedDepts = t.team.departments.map((d, i) => ({
    ...d,
    icon: [Briefcase, HardHat, Users][i],
    headcount: ['5+', '60+', '30+'][i],
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--sand)' }}>
      <Header />

      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 pt-28 pb-16 sm:pt-32 sm:pb-20 md:px-8 md:pt-40 md:pb-24"
        style={{ background: 'linear-gradient(160deg, #0d0d0d 0%, #1a1a1a 60%, #0f1a2e 100%)' }}
      >
        <div className="absolute inset-0 grid-texture-dark" />
        <ParticleField count={20} dark />
        <div className="relative mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <div className="kicker" style={{ color: 'var(--ember)' }}>{t.team.ourPeople}</div>
            <h1 className="text-4xl font-bold mb-5 sm:text-5xl md:text-6xl" style={{ color: 'var(--sand)' }}>
              {t.team.title}
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: 'rgba(247,243,234,0.65)' }}>
              {t.team.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team cards */}
      <section className="px-4 py-16 md:px-8 md:py-20" style={{ backgroundColor: 'var(--sand)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {translatedTeam.map((member, i) => (
              <motion.article
                key={member.name}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i * 0.5}
                className="group rounded-xl overflow-hidden"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(13,13,13,0.08)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                }}
                id={`team-${member.name.toLowerCase().replace(/\s|\./g, '-')}`}
              >
                {/* Avatar */}
                <div
                  className="flex items-center justify-center pt-10 pb-6 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, var(--charcoal) 0%, var(--steel) 100%)' }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold transition-transform duration-300 group-hover:scale-110"
                    style={{
                      fontFamily: 'Oswald, sans-serif',
                      background: 'var(--ember)',
                      color: 'var(--sand)',
                      boxShadow: '0 8px 30px var(--ember-glow)',
                    }}
                  >
                    {member.initials}
                  </div>
                  <div
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded font-mono text-[9px] tracking-widest"
                    style={{ background: 'rgba(224,58,0,0.2)', color: 'var(--ember)', border: '1px solid rgba(224,58,0,0.3)' }}
                  >
                    {member.department}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--charcoal)' }}>
                    {member.name}
                  </h3>
                  <div className="font-mono text-xs font-semibold mb-3" style={{ color: 'var(--ember)' }}>
                    {member.role}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-60)' }}>
                    {member.expertise}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Departments & headcount */}
      <section className="px-4 py-16 md:px-8" style={{ backgroundColor: 'var(--sand-dark)' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <div className="kicker">{t.team.org}</div>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--charcoal)' }}>{t.team.orgTitle}</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {translatedDepts.map((dept, i) => (
              <motion.div
                key={dept.name}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i * 0.4}
                className="rounded-xl p-6 flex items-center gap-4"
                style={{ background: '#fff', border: '1px solid rgba(13,13,13,0.08)' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'var(--ember)', boxShadow: '0 4px 16px var(--ember-glow)' }}
                >
                  <dept.icon size={22} style={{ color: 'var(--sand)' }} />
                </div>
                <div>
                  <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--ember)' }}>
                    {dept.headcount}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>{dept.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
