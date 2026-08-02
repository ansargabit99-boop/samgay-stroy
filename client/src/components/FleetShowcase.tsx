import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Gauge, Wrench, ChevronRight } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { SSG_PHOTO_DRILLING_DAY, SSG_PHOTO_DRILLING_NIGHT, SSG_PHOTO_GAS_PIPELINE, SSG_HERO_WORKER } from '@/data/presentationContent';

interface FleetItem {
  id: string;
  name: string;
  category: string;
  count: string;
  image: string;
  specs: { label: string; value: string }[];
}

export default function FleetShowcase() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState<string>('all');

  const fleet: FleetItem[] = [
    {
      id: 'gnb-vermeer',
      name: 'Установки ГНБ Vermeer D36x50 / D100x120',
      category: 'drilling',
      count: '6 единиц',
      image: SSG_PHOTO_DRILLING_NIGHT,
      specs: [
        { label: 'Тяговое усилие', value: '45,000 кг' },
        { label: 'Макс. диаметр', value: 'до 1200 мм' },
        { label: 'Длина бурения', value: 'до 1500 м' },
      ],
    },
    {
      id: 'excavator-cat',
      name: 'Гусеничные Экскаваторы Komatsu PC300 / CAT 330',
      category: 'earthwork',
      count: '12 единиц',
      image: SSG_PHOTO_DRILLING_DAY,
      specs: [
        { label: 'Объем ковша', value: '1.6 - 2.1 m³' },
        { label: 'Глубина копания', value: '7.3 м' },
        { label: 'Мощность', value: '270 л.с.' },
      ],
    },
    {
      id: 'pipeline-welding',
      name: 'Самоходные Сварочные Комплексы и Трубоукладчики',
      category: 'pipeline',
      count: '8 единиц',
      image: SSG_PHOTO_GAS_PIPELINE,
      specs: [
        { label: 'Грузоподъемность', value: '35 - 70 тонн' },
        { label: 'Контроль шва', value: 'УЗК + Рентген' },
        { label: 'Рабочее давление', value: 'до 12.0 МПа' },
      ],
    },
    {
      id: 'crane-liebherr',
      name: 'Автокраны Liebherr LTM 1050 / 1100',
      category: 'lifting',
      count: '4 единицы',
      image: SSG_HERO_WORKER,
      specs: [
        { label: 'Грузоподъемность', value: '50 - 100 тонн' },
        { label: 'Длина стрелы', value: '60 м' },
        { label: 'Колесная формула', value: '6x6 / 8x8' },
      ],
    },
  ];

  const filteredFleet = activeTab === 'all' ? fleet : fleet.filter((f) => f.category === activeTab);

  return (
    <div className="w-full space-y-8">
      {/* Header & Category Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--ember)]/10 text-[var(--ember)] text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Truck size={14} />
            <span>{lang === 'ru' ? 'Технический Парк SSG' : lang === 'kk' ? 'Техникалық парк' : 'Machinery & Equipment Fleet'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
            {lang === 'ru' ? 'Собственная Спецтехника & Оборудование' : lang === 'kk' ? 'Арнайы техника паркі' : 'Owned Heavy Fleet & Rig Machinery'}
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: lang === 'ru' ? 'Вся техника' : lang === 'kk' ? 'Барлық техника' : 'All Fleet' },
            { id: 'drilling', label: lang === 'ru' ? 'ГНБ & Бурение' : lang === 'kk' ? 'Бұрғылау' : 'HDD Rigs' },
            { id: 'earthwork', label: lang === 'ru' ? 'Экскаваторы' : lang === 'kk' ? 'Экскаваторлар' : 'Excavators' },
            { id: 'pipeline', label: lang === 'ru' ? 'Трубоукладчики' : lang === 'kk' ? 'Құбыр төсегіштер' : 'Pipelines' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--ember)] text-white shadow-lg shadow-[var(--ember-glow)]'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFleet.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800 hover:border-[var(--ember)]/50 transition-all shadow-xl"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              <div className="absolute top-3 right-3 bg-[var(--ember)] text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full shadow-lg">
                {item.count}
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold font-display text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
                {item.name}
              </h3>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800">
                {item.specs.map((sp, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-0.5">
                    <div className="text-[10px] font-mono text-zinc-500">{sp.label}</div>
                    <div className="text-xs font-mono font-bold text-zinc-200">{sp.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
