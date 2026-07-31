// Scene 7 — human-in-the-loop: an AI-drafted message travels toward "Send",
// stops at the approval gate, a checkmark tap approves it, the card continues
// and is sent; an audit-log line appends below.

import { Check, FileText, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../i18n';
import type { Language } from '../../i18n';
import { Scene } from './Scene';

const T: Record<string, Record<Language, string>> = {
  window: {
    de: 'immob24 · Freigabe-Center',
    en: 'immob24 · Approval center',
    fr: 'immob24 · Centre de validation',
    ar: 'immob24 · مركز الموافقات',
  },
  draft: { de: 'KI-Entwurf', en: 'AI draft', fr: 'Brouillon IA', ar: 'مسودة الذكاء الاصطناعي' },
  cardBody: {
    de: 'Exposé-Versand an Fam. Weber',
    en: 'Send exposé to the Webers',
    fr: 'Envoi du dossier à la famille Weber',
    ar: 'إرسال العرض إلى عائلة فيبر',
  },
  gate: {
    de: 'Freigabe erforderlich',
    en: 'Approval required',
    fr: 'Validation requise',
    ar: 'الموافقة مطلوبة',
  },
  sent: { de: 'Gesendet', en: 'Sent', fr: 'Envoyé', ar: 'تم الإرسال' },
  log: {
    de: 'Aktion protokolliert — 14:32',
    en: 'Action logged — 14:32',
    fr: 'Action journalisée — 14 h 32',
    ar: 'تم تسجيل الإجراء — 14:32',
  },
};

// step 0 empty · 1 card in · 2 slides to gate · 3 approve tap · 4 continues + sent · 5 log line
const DURATIONS = [500, 900, 1100, 900, 1200, 2400];

export const SceneApprovalGate = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();
  const L = (k: keyof typeof T) => T[k][language] ?? T[k].en;
  const rtl = language === 'ar';
  const dir = rtl ? -1 : 1;

  // card travel in card-widths (card is w-[38%] of the track)
  const x = (step: number) => (step >= 4 ? 158 : step >= 2 ? 82 : 0) * dir;

  return (
    <Scene durations={DURATIONS} label={L('window')} aspect={16 / 9} className={className}>
      {(step) => (
        <div className="absolute inset-0 flex flex-col p-4">
          {/* the gate — a dashed line mid-track */}
          <div className="relative flex-1">
            <div className="absolute inset-y-1 start-[52%] w-0 border-s-2 border-dashed border-charcoal/15" />
            <span
              className={`tr-scene absolute -top-0.5 start-[52%] -translate-x-1/2 rtl:translate-x-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold ${
                step === 2 || step === 3
                  ? 'border-golden bg-gradient-golden text-[#1E1B16]'
                  : 'border-charcoal/15 bg-white text-warm-gray'
              }`}
            >
              <ShieldCheck className="me-1 inline h-3 w-3" />
              {L('gate')}
            </span>

            {/* approve tap button at the gate */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              className={`tr-scene pointer-events-none absolute bottom-0 start-[52%] -translate-x-1/2 rtl:translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full border ${
                step >= 3
                  ? 'border-honey-green bg-honey-green text-white'
                  : 'border-charcoal/15 bg-white text-warm-gray'
              } ${step === 3 ? 'scale-125' : 'scale-100'} ${
                step >= 2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Check className="h-3.5 w-3.5" />
            </button>

            {/* the travelling draft card */}
            <div
              className={`tr-scene duration-700 absolute top-1/2 start-1 w-[38%] -translate-y-1/2 rounded-xl border bg-white p-2.5 shadow-subtle ${
                step >= 4 ? 'border-honey-green/40' : 'border-charcoal/10'
              } ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: `translateY(-50%) translateX(${x(step)}%)` }}
            >
              <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-teal">
                <FileText className="h-3 w-3" />
                {L('draft')}
              </p>
              <p className="mt-1 truncate text-[10px] sm:text-[11px] text-charcoal">{L('cardBody')}</p>
              <span
                className={`tr-scene mt-1.5 inline-flex items-center gap-1 rounded-full bg-honey-green/10 px-2 py-0.5 text-[9px] font-bold text-honey-green ${
                  step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                {L('sent')} ✓
              </span>
            </div>
          </div>

          {/* audit log line appends */}
          <div
            className={`tr-scene duration-500 mt-2 flex items-center gap-1.5 rounded-lg border border-charcoal/5 bg-cream px-2.5 py-1.5 text-[10px] text-slate ${
              step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <Check className="h-3 w-3 text-honey-green" />
            {L('log')}
          </div>
        </div>
      )}
    </Scene>
  );
};
