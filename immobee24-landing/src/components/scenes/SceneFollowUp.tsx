// Scene 4 — follow-up timeline: dots for Day 1/3/7. The Day-3 dot fires a
// reminder bubble; the lead status chip crossfades "Inaktiv" → "Reaktiviert".

import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../../i18n';
import type { Language } from '../../i18n';
import { Scene } from './Scene';

const T: Record<string, Record<Language, string>> = {
  window: {
    de: 'immob24 · Follow-up',
    en: 'immob24 · Follow-up',
    fr: 'immob24 · Relance',
    ar: 'immob24 · المتابعة',
  },
  day: { de: 'Tag', en: 'Day', fr: 'Jour', ar: 'اليوم' },
  bubble: {
    de: 'Kurze Erinnerung: Sind Sie noch an der Wohnung interessiert?',
    en: 'Quick reminder: are you still interested in the flat?',
    fr: 'Petit rappel : êtes-vous toujours intéressé par l’appartement ?',
    ar: 'تذكير سريع: هل ما زلتم مهتمين بالشقة؟',
  },
  inactive: { de: 'Inaktiv', en: 'Inactive', fr: 'Inactif', ar: 'غير نشط' },
  reactivated: { de: 'Reaktiviert', en: 'Reactivated', fr: 'Réactivé', ar: 'أُعيد تنشيطه' },
};

const DAYS = [1, 3, 7];

// step 0 empty · 1 timeline in ("Inaktiv") · 2 Day-3 fires bubble · 3 "Reaktiviert"
const DURATIONS = [500, 1300, 1600, 2800];

export const SceneFollowUp = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();
  const L = (k: keyof typeof T) => T[k][language] ?? T[k].en;

  return (
    <Scene durations={DURATIONS} label={L('window')} className={className}>
      {(step) => (
        <div className="absolute inset-0 flex flex-col p-4">
          {/* status chip — two stacked chips crossfading */}
          <div className="flex justify-end">
            <span className="relative grid">
              <span
                className={`tr-scene duration-500 col-start-1 row-start-1 inline-flex items-center rounded-full border border-charcoal/15 bg-cream px-2.5 py-1 text-[11px] font-semibold text-warm-gray ${
                  step >= 1 && step < 3 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {L('inactive')}
              </span>
              <span
                className={`tr-scene duration-500 col-start-1 row-start-1 inline-flex items-center rounded-full border border-honey-green/30 bg-honey-green/10 px-2.5 py-1 text-[11px] font-semibold text-honey-green ${
                  step >= 3 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {L('reactivated')} ✓
              </span>
            </span>
          </div>

          {/* timeline */}
          <div className="relative mx-2 mt-auto mb-8">
            <div
              className={`tr-scene h-0.5 w-full origin-left rtl:origin-right rounded bg-charcoal/10 ${
                step >= 1 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50'
              }`}
            />
            <div className="absolute inset-x-0 -top-[13px] flex justify-between">
              {DAYS.map((d, i) => {
                const firing = d === 3 && step >= 2;
                return (
                  <div key={d} className="relative flex flex-col items-center">
                    {/* the Day-3 reminder bubble */}
                    {d === 3 && (
                      <div
                        className={`tr-scene duration-500 absolute bottom-full mb-2.5 w-40 sm:w-48 -translate-x-1/2 rtl:translate-x-1/2 start-1/2 rounded-xl rounded-b-md border border-teal/20 bg-teal-wash px-3 py-2 text-[10px] sm:text-[11px] leading-snug text-charcoal shadow-subtle ${
                          firing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        }`}
                      >
                        <MessageCircle className="mb-1 h-3 w-3 text-teal" />
                        {L('bubble')}
                      </div>
                    )}
                    <span
                      className={`tr-scene flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 text-[9px] font-bold ${
                        firing
                          ? 'border-golden bg-gradient-golden text-[#1E1B16] scale-110'
                          : 'border-charcoal/15 bg-white text-warm-gray'
                      } ${step >= 1 ? 'opacity-100' : 'opacity-0 scale-75'}`}
                      style={{ transitionDelay: step === 1 ? `${i * 120}ms` : '0ms' }}
                    >
                      {d}
                    </span>
                    <span className="mt-1.5 text-[9px] font-medium uppercase tracking-wide text-warm-gray">
                      {L('day')} {d}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Scene>
  );
};
