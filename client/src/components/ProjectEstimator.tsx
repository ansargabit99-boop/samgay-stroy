import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, HardHat, Pickaxe, Compass, ArrowRight, CheckCircle2, ChevronLeft, Send, Sparkles } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

interface ProjectEstimatorProps {
  compact?: boolean;
  onComplete?: () => void;
}

export default function ProjectEstimator({ compact = false, onComplete }: ProjectEstimatorProps) {
  const { lang } = useLang();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<string>('engineering');
  const [area, setArea] = useState<number>(5000);
  const [urgency, setUrgency] = useState<string>('standard');
  const [location, setLocation] = useState<string>('astana');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    {
      id: 'engineering',
      icon: HardHat,
      title: lang === 'ru' ? 'Инженерные сети и Мониторинг' : lang === 'kk' ? 'Инженерлік желілер' : 'Engineering & Networks',
      desc: lang === 'ru' ? 'Бурение, ГНБ, прокладка газопроводов, кабелей' : lang === 'kk' ? 'Бұрғылау, ГНБ, газ құбырын жүргізу' : 'Drilling, HDD, gas pipelines, utility trunking',
      multiplier: 12000,
    },
    {
      id: 'civil',
      icon: Building2,
      title: lang === 'ru' ? 'Промышленное & Гражданское Строительство' : lang === 'kk' ? 'Өнеркәсіптік құрылыс' : 'Civil & Industrial Construction',
      desc: lang === 'ru' ? 'Бетонирование, металлоконструкции, цеха' : lang === 'kk' ? 'Бетондау, металл конструкциялар' : 'Concrete structures, industrial complexes',
      multiplier: 25000,
    },
    {
      id: 'earthwork',
      icon: Pickaxe,
      title: lang === 'ru' ? 'Земляные работы & Инфраструктура' : lang === 'kk' ? 'Жер жұмыстары' : 'Earthworks & Infrastructure',
      desc: lang === 'ru' ? 'Разработка котлованов, дорожные сети' : lang === 'kk' ? 'Шұңқырлар, жол желілері' : 'Excavation, grading, road networks',
      multiplier: 8000,
    },
    {
      id: 'turnkey',
      icon: Compass,
      title: lang === 'ru' ? 'Проектирование "Под Ключ" (EPC)' : lang === 'kk' ? 'Дайын жоба (EPC)' : 'Turnkey Design-Build (EPC)',
      desc: lang === 'ru' ? 'Полный цикл: от изысканий до сдачи государству' : lang === 'kk' ? 'Толық цикл: зерттеуден тапсыруға дейін' : 'Complete cycle: surveys to commissioning',
      multiplier: 35000,
    },
  ];

  const selectedCat = categories.find((c) => c.id === category) || categories[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onComplete) {
      setTimeout(onComplete, 2500);
    }
  };

  return (
    <div className={`w-full ${compact ? '' : 'p-6 md:p-10 rounded-3xl bg-[#0f1218] border border-white/10 shadow-2xl'}`}>
      {!compact && (
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--ember)]/10 border border-[var(--ember)]/30 text-[var(--ember)] text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Sparkles size={14} />
            <span>{lang === 'ru' ? 'Интерактивный Калькулятор' : lang === 'kk' ? 'Интерактивті Калькулятор' : 'Interactive Estimator'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
            {lang === 'ru' ? 'Расчитайте ориентировочный объем и стоимость' : lang === 'kk' ? 'Құны мен көлемін есептеңіз' : 'Estimate Project Scope & Investment'}
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            {lang === 'ru' ? 'Выберите тип работ и параметры объекта для получения предварительной оценки' : lang === 'kk' ? 'Нысан параметрлерін таңдаңыз' : 'Select parameters to calculate preliminary scope and budget'}
          </p>
        </div>
      )}

      {/* Steps Indicator */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-zinc-800 -translate-y-1/2 -z-0" />
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all relative z-10 ${
              step >= s ? 'bg-[var(--ember)] text-white shadow-lg shadow-[var(--ember-glow)] scale-105' : 'bg-zinc-800 text-zinc-500'
            }`}
          >
            {step > s ? <CheckCircle2 size={16} /> : s}
          </div>
        ))}
      </div>

      {submitted ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>
          <h3 className="text-2xl font-bold text-white font-display" style={{ fontFamily: 'Oswald, sans-serif' }}>
            {lang === 'ru' ? 'Заявка Успешно Отправлена!' : lang === 'kk' ? 'Өтінім Сәтті Жіберілді!' : 'Proposal Request Submitted!'}
          </h3>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            {lang === 'ru'
              ? 'Наши инженеры изучат параметры вашего объекта и свяжутся с вами в течение 30 минут с КП.'
              : lang === 'kk'
              ? 'Біздің инженерлер 30 минут ішінде сізбен хабарласады.'
              : 'Our chief engineers will review your parameters and respond with a formal commercial offer within 30 minutes.'}
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <h3 className="text-sm font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3">
                1. {lang === 'ru' ? 'Выберите Вид Работ' : lang === 'kk' ? 'Жұмыс түрін таңдаңыз' : 'Select Service Category'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-4 rounded-2xl text-left border transition-all flex items-start gap-3.5 group ${
                        isSelected
                          ? 'bg-[var(--ember)]/15 border-[var(--ember)] text-white shadow-lg shadow-[var(--ember-glow)]/20'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/60'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[var(--ember)] text-white' : 'bg-zinc-800 text-zinc-400 group-hover:text-white'
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white mb-0.5">{cat.title}</div>
                        <div className="text-xs text-zinc-400 leading-snug">{cat.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[var(--ember)] text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 hover:brightness-110 transition-all"
                >
                  <span>{lang === 'ru' ? 'Далее' : lang === 'kk' ? 'Келесі' : 'Next Step'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h3 className="text-sm font-mono font-bold text-zinc-300 uppercase tracking-wider mb-2">
                2. {lang === 'ru' ? 'Параметры и Масштаб Объекта' : lang === 'kk' ? 'Нысан масштабтары' : 'Site Scale & Timeline'}
              </h3>

              {/* Area Slider */}
              <div className="space-y-3 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">{lang === 'ru' ? 'Площадь / Длина трассы' : lang === 'kk' ? 'Аумағы / Ұзындығы' : 'Area / Route Distance'}</span>
                  <span className="text-[var(--ember)] font-bold text-base">{area.toLocaleString()} m² / m</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full accent-[var(--ember)] bg-zinc-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>500 m²</span>
                  <span>25,000 m²</span>
                  <span>50,000+ m²</span>
                </div>
              </div>

              {/* Region Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400">{lang === 'ru' ? 'Локация Объекта' : lang === 'kk' ? 'Нысанның орны' : 'Project Location'}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'astana', label: 'Астана (Astana)' },
                    { id: 'almaty', label: 'Алматы (Almaty)' },
                    { id: 'atyrau', label: 'Атырау / Запад' },
                    { id: 'region', label: 'Другой регион РК' },
                  ].map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setLocation(loc.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono text-center border transition-all ${
                        location === loc.id ? 'bg-[var(--ember)] border-[var(--ember)] text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400">{lang === 'ru' ? 'Срочность Реализации' : lang === 'kk' ? 'Орындау мерзімі' : 'Execution Urgency'}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('standard')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono border transition-all ${
                      urgency === 'standard' ? 'bg-zinc-800 border-[var(--ember)] text-white' : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    {lang === 'ru' ? 'Стандартный график' : lang === 'kk' ? 'Стандартты кесте' : 'Standard Schedule'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('urgent')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono border transition-all ${
                      urgency === 'urgent' ? 'bg-[var(--ember)]/20 border-[var(--ember)] text-white' : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    ⚡ {lang === 'ru' ? 'Ускоренный (24/7 смена)' : lang === 'kk' ? 'Жедел (24/7 ауысым)' : 'Accelerated (24/7 shifts)'}
                  </button>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-mono text-xs flex items-center gap-1 hover:bg-zinc-700 transition-all"
                >
                  <ChevronLeft size={14} />
                  <span>{lang === 'ru' ? 'Назад' : lang === 'kk' ? 'Кері' : 'Back'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-[var(--ember)] text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 hover:brightness-110 transition-all"
                >
                  <span>{lang === 'ru' ? 'Получить Расчет' : lang === 'kk' ? 'Есеп алу' : 'Calculate Estimate'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              {/* Result Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-[var(--ember)]/40 relative overflow-hidden">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  {lang === 'ru' ? 'Подготовка Предложения' : lang === 'kk' ? 'Ұсыныс дайындалуда' : 'Scope Review Ready'}
                </div>
                <div className="text-xl md:text-2xl font-bold font-display text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {lang === 'ru' ? 'Оставьте контактные данные для официального КП' : lang === 'kk' ? 'Ресми КП үшін контакт ақпаратын қалдырыңыз' : 'Share your details to receive the formal commercial offer'}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-2">
                  * {lang === 'ru' ? 'Точная смета формируется после изучения ТЗ и геодезии.' : lang === 'kk' ? 'Нақты смета ТЗ негізінде есептеледі.' : 'Final quotation provided upon review of technical drawings.'}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  {lang === 'ru' ? 'Отправить запрос на официальное коммерческое предложение:' : lang === 'kk' ? 'Коммерциялық ұсынысқа өтінім:' : 'Request official technical quotation:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ru' ? 'Ваше Имя / Организация' : lang === 'kk' ? 'Атыңыз / Ұйым' : 'Your Name / Company'}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[var(--ember)]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={lang === 'ru' ? '+7 (700) 000-00-00' : lang === 'kk' ? '+7 (700) 000-00-00' : '+7 (700) 000-00-00'}
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[var(--ember)]"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-mono text-xs flex items-center gap-1 hover:bg-zinc-700 transition-all"
                  >
                    <ChevronLeft size={14} />
                    <span>{lang === 'ru' ? 'Изменить параметры' : lang === 'kk' ? 'Өзгерту' : 'Edit Inputs'}</span>
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[var(--ember)] text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-[var(--ember-glow)]"
                  >
                    <Send size={14} />
                    <span>{lang === 'ru' ? 'Получить КП в PDF' : lang === 'kk' ? 'PDF түрінде КП алу' : 'Request Commercial Offer'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
