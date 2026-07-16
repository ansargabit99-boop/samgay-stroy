import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLang();

  const footerLinks = [
    {
      heading: t.footer.services,
      links: [
        { label: t.footer.engNetworks, href: '/services' },
        { label: t.footer.roadsRailways, href: '/services' },
        { label: t.footer.groundFoundation, href: '/services' },
        { label: t.footer.loadBearing, href: '/services' },
        { label: t.footer.linearFacilities, href: '/services' },
      ],
    },
    {
      heading: t.footer.company,
      links: [
        { label: t.footer.aboutUs, href: '/about' },
        { label: t.nav.projects, href: '/projects' },
        { label: t.footer.leadership, href: '/team' },
        { label: t.nav.contact, href: '/contact' },
      ],
    },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: '#0d0d0d' }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(rgba(247,243,234,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(247,243,234,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ember glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px opacity-60"
        style={{ background: 'linear-gradient(90deg, transparent, var(--ember), transparent)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 md:px-8">
        {/* Main footer grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex h-10 w-10 items-center justify-center"
                style={{
                  background: 'var(--ember)',
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
              >
                <span className="font-mono text-xs font-bold" style={{ color: 'var(--sand)' }}>SSG</span>
              </div>
              <div>
                <div
                  className="font-bold leading-none tracking-wider"
                  style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1rem', color: 'var(--sand)' }}
                >
                  SAMGAU STROY-GROUP
                </div>
                <div className="font-mono text-[9px] tracking-widest mt-0.5" style={{ color: 'var(--ember)' }}>
                  TOO · BIN 090340019007
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'rgba(247,243,234,0.55)' }}>
              {t.footer.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--ember)' }} />
                <div>
                  <div className="font-mono text-xs mb-0.5" style={{ color: 'rgba(247,243,234,0.4)' }}>{t.footer.regOffice.toUpperCase()}</div>
                  <div className="text-sm" style={{ color: 'rgba(247,243,234,0.65)' }}>
                    Qabanbay Batyr Ave. 51/52, Astana
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--ember)' }} />
                <div>
                  <div className="font-mono text-xs mb-0.5" style={{ color: 'rgba(247,243,234,0.4)' }}>{t.footer.prodBase.toUpperCase()}</div>
                  <div className="text-sm" style={{ color: 'rgba(247,243,234,0.65)' }}>
                    Temirlan hwy 18/6, Turan dist., Shymkent
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--ember)' }} />
                <a
                  href="mailto:contract@samgau.kz"
                  className="text-sm transition-colors hover:text-ember"
                  style={{ color: 'rgba(247,243,234,0.65)' }}
                >
                  contract@samgau.kz
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <div className="font-mono text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: 'var(--ember)' }}>
                {col.heading}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <a
                        className="text-sm transition-colors flex items-center gap-1 group"
                        style={{ color: 'rgba(247,243,234,0.5)' }}
                      >
                        <span className="group-hover:text-ember transition-colors">{link.label}</span>
                        <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--ember)' }} />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* License bar */}
        <div
          className="rounded px-5 py-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{
            background: 'rgba(247,243,234,0.04)',
            border: '1px solid rgba(247,243,234,0.08)',
          }}
        >
          {[
            { label: t.footer.licenseNum, value: '15-GSL No. 001485-1' },
            { label: t.footer.category, value: 'Category II — All Construction & Installation Works' },
            { label: t.footer.issuedDate, value: '13.10.2009 / 26.03.2024' },
          ].map((item) => (
            <div key={item.label}>
              <div className="font-mono text-xs mb-1" style={{ color: 'rgba(247,243,234,0.35)' }}>{item.label}</div>
              <div className="font-mono text-xs font-semibold" style={{ color: 'rgba(247,243,234,0.75)' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t"
          style={{ borderColor: 'rgba(247,243,234,0.08)' }}
        >
          <p className="font-mono text-xs" style={{ color: 'rgba(247,243,234,0.3)' }}>
            © {year} TOO SAMGAU STORY GROUP. {t.footer.allRights}
          </p>
          <p className="font-mono text-xs" style={{ color: 'rgba(247,243,234,0.3)' }}>
            {t.footer.generalContractor} · AKTOBE · ASTANA · SHYMKENT
          </p>
        </div>
      </div>
    </footer>
  );
}
