import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleField from '@/components/ParticleField';
import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  const { t } = useLang();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', scope: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = formData.scope
      ? `Project inquiry — ${formData.scope}`
      : 'Project inquiry';
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || 'Not provided'}`,
      `Project scope: ${formData.scope || 'Not selected'}`,
      '',
      'Project details:',
      formData.message,
    ].join('\n');

    window.location.href = `mailto:contract@samgau.kz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', scope: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactItems = [
    {
      icon: Mail,
      label: t.contact.email,
      value: 'contract@samgau.kz',
      href: 'mailto:contract@samgau.kz',
      note: t.contact.emailNote,
    },
    {
      icon: MapPin,
      label: t.contact.regOffice,
      value: t.contact.regOfficeValue,
      note: t.contact.headquartersNote,
    },
    {
      icon: MapPin,
      label: t.contact.prodBase,
      value: t.contact.prodBaseValue,
      note: t.contact.opsNote,
    },
  ];

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
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-3xl">
            <div className="kicker" style={{ color: 'var(--ember)' }}>{t.contact.getInTouch}</div>
            <h1 className="text-4xl font-bold mb-5 sm:text-5xl md:text-6xl" style={{ color: 'var(--sand)' }}>
              {t.contact.title}
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(247,243,234,0.65)' }}>
              {t.contact.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact content */}
      <section className="px-4 py-16 md:px-8 md:py-20" style={{ backgroundColor: 'var(--sand)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">

            {/* Left: contact info */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <div className="kicker">{t.contact.contactDetails}</div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--charcoal)' }}>
                  {t.contact.reachUs}
                </h2>
              </div>

              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-5 flex items-start gap-4"
                  style={{ background: '#fff', border: '1px solid rgba(13,13,13,0.08)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--ember)', boxShadow: '0 4px 16px var(--ember-glow)' }}
                  >
                    <item.icon size={18} style={{ color: 'var(--sand)' }} />
                  </div>
                  <div>
                    <div className="font-mono text-xs mb-0.5 font-semibold" style={{ color: 'var(--ember)' }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-semibold hover:underline" style={{ color: 'var(--charcoal)' }}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>{item.value}</p>
                    )}
                    <p className="text-xs mt-0.5" style={{ color: 'var(--ink-40)' }}>{item.note}</p>
                  </div>
                </div>
              ))}

              {/* License quick card */}
              <div
                className="rounded-xl p-5"
                style={{ background: 'linear-gradient(135deg, var(--charcoal) 0%, var(--steel) 100%)' }}
              >
                <div className="font-mono text-xs mb-3" style={{ color: 'var(--ember)' }}>{t.contact.licenseRef.toUpperCase()}</div>
                <div className="space-y-2">
                  {[
                    { l: t.services.facts.license, v: '15-GSL No. 001485-1' },
                    { l: t.services.facts.category, v: t.contact.licenseCategoryValue },
                    { l: t.services.facts.bin, v: '090340019007' },
                  ].map(({ l, v }) => (
                    <div key={l} className="flex items-center justify-between gap-4 text-xs">
                      <span className="font-mono" style={{ color: 'rgba(247,243,234,0.45)' }}>{l}</span>
                      <span className="font-semibold text-right" style={{ color: 'rgba(247,243,234,0.85)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={1}
            >
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center gap-4 rounded-xl p-16 text-center h-full"
                  style={{ background: '#fff', border: '1px solid rgba(13,13,13,0.08)' }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--ember)', boxShadow: '0 8px 30px var(--ember-glow)' }}
                  >
                    <CheckCircle size={32} style={{ color: 'var(--sand)' }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--charcoal)' }}>{t.contact.successTitle}</h3>
                  <p className="text-sm" style={{ color: 'var(--ink-60)' }}>
                    {t.contact.successDesc}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-xl p-8 space-y-5"
                  style={{ background: '#fff', border: '1px solid rgba(13,13,13,0.08)', boxShadow: '0 4px 30px rgba(0,0,0,0.08)' }}
                  id="contact-form"
                >
                  <div>
                    <div className="kicker">{t.contact.inquiryForm}</div>
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--charcoal)' }}>{t.contact.sendInquiry}</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="form-label" htmlFor="contact-name">{t.contact.fullName}</label>
                      <input
                        id="contact-name"
                        type="text"
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contact.namePlaceholder}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="contact-email">{t.contact.email}</label>
                      <input
                        id="contact-email"
                        type="email"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.emailPlaceholder}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="form-label" htmlFor="contact-phone">{t.contact.phone}</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        className="form-input"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.contact.phonePlaceholder}
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="contact-scope">{t.contact.projectScope}</label>
                      <select
                        id="contact-scope"
                        className="form-input"
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      >
                        <option value="">{t.contact.selectScope}</option>
                        {t.contact.scopeOptions.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="contact-message">{t.contact.projectDetails}</label>
                    <textarea
                      id="contact-message"
                      className="form-input"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.detailsPlaceholder}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full justify-center">
                    {t.contact.sendBtn} <Send size={14} />
                  </button>

                  <p className="text-xs text-center" style={{ color: 'var(--ink-40)' }}>
                    {t.contact.responseNote}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
