import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShieldCheck, FileText, CheckCircle, ExternalLink, ZoomIn } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { SSG_LICENSE_MAIN } from '@/data/presentationContent';

interface LicenseModalProps {
  children?: React.ReactNode;
}

export default function LicenseModal({ children }: LicenseModalProps) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[var(--ember)] text-xs font-mono font-bold text-zinc-200 transition-all">
            <ShieldCheck size={16} className="text-[var(--ember)]" />
            <span>{lang === 'ru' ? 'Проверить Лицензию 15-GSL-001485-1' : lang === 'kk' ? 'Лицензияны тексеру' : 'Verify State License 15-GSL-001485-1'}</span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-[#0b0d12] border-zinc-800 text-zinc-100 p-0 overflow-hidden rounded-2xl">
        <DialogHeader className="p-6 pb-4 border-b border-zinc-800">
          <DialogTitle className="text-2xl font-bold font-display flex items-center gap-3" style={{ fontFamily: 'Oswald, sans-serif' }}>
            <ShieldCheck size={24} className="text-[var(--ember)]" />
            <span>Государственная Лицензия ТОО SSG (Category II)</span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* High Res Document Preview */}
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white border border-zinc-800 shadow-2xl group cursor-zoom-in">
            <img src={SSG_LICENSE_MAIN} alt="SSG License Document" className="w-full h-full object-contain p-2" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono gap-2">
              <ZoomIn size={18} />
              <span>Официальный Документ</span>
            </div>
          </div>

          {/* Legal Details & Verification */}
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2">
              <CheckCircle size={16} />
              <span>ЛИЦЕНЗИЯ ДЕЙСТВИТЕЛЬНА · КАТЕГОРИЯ II</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="text-zinc-500">Номер Лицензии / License №</div>
                <div className="text-sm font-bold text-white">15-GSL №001485-1</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="text-zinc-500">Организация / Enterprise</div>
                <div className="text-sm font-bold text-white">ТОО "SAMGAU STROY GROUP" (SSG)</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="text-zinc-500">БИН / BIN Identification</div>
                <div className="text-sm font-bold text-white">090340019007</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1">
                <div className="text-zinc-500">Выдано / Date of Issue</div>
                <div className="text-sm font-bold text-white">26 Марта 2024 года</div>
              </div>
            </div>

            <a
              href="/Лицензия  ТОО SSG.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[var(--ember)] text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-[var(--ember-glow)]"
            >
              <FileText size={16} />
              <span>Скачать Полную Лицензию PDF</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
