// Scene 2 — an empty lead card fills with qualification chips (Budget ✓,
// Zeitraum ✓, Finanzierung ✓, 400ms apart), then the card border tints to
// the accent and a "HOT" tag drops in.

import { Flame, Check, User } from 'lucide-react';
import { useLanguage } from '../../i18n';
import type { Language } from '../../i18n';
import { Scene } from './Scene';

const T: Record<string, Record<Language, string>> = {
  window: {
    de: 'immob24 · Lead-Qualifizierung',
    en: 'immob24 · Lead qualification',
    fr: 'immob24 · Qualification du lead',
    ar: 'immob24 · تأهيل العملاء',
  },
  name: { de: 'Familie Weber', en: 'Weber family', fr: 'Famille Weber', ar: 'عائلة فيبر' },
  meta: {
    de: 'ImmoScout24 · 3-Zi-Whg, Frankfurt',
    en: 'ImmoScout24 · 3-room flat, Frankfurt',
    fr: 'ImmoScout24 · 3 pièces, Francfort',
    ar: 'ImmoScout24 · شقة 3 غرف، فرانكفورت',
  },
  chip1: { de: 'Budget', en: 'Budget', fr: 'Budget', ar: 'الميزانية' },
  chip2: { de: 'Zeitraum', en: 'Timeframe', fr: 'Période', ar: 'الإطار الزمني' },
  chip3: { de: 'Finanzierung', en: 'Financing', fr: 'Financement', ar: 'التمويل' },
  hot: { de: 'HOT', en: 'HOT', fr: 'HOT', ar: 'HOT' },
};

// step 0 empty · 1 card · 2/3/4 chips (400ms apart) · 5 accent border + HOT
const DURATIONS = [500, 700, 400, 400, 400, 2600];

export const SceneQualification = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();
  const L = (k: keyof typeof T) => T[k][language] ?? T[k].en;
  const chips: Array<keyof typeof T> = ['chip1', 'chip2', 'chip3'];

  return (
    <Scene durations={DURATIONS} label={L('window')} className={className}>
      {(step) => (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div
            className={`tr-scene duration-500 relative w-full max-w-[19rem] rounded-2xl border-2 bg-white p-4 shadow-subtle ${
              step >= 5 ? 'border-golden shadow-card' : 'border-charcoal/10'
            } ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          >
            {/* HOT tag drops in */}
            <span
              className={`tr-scene absolute -top-2.5 -end-2 inline-flex items-center gap-1 rounded-full bg-gradient-golden px-2.5 py-0.5 text-[10px] font-bold text-[#1E1B16] shadow-subtle ${
                step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
            >
              <Flame className="h-3 w-3" />
              {L('hot')}
            </span>

            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-teal-wash text-teal">
                <User className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-charcoal">{L('name')}</p>
                <p className="truncate text-[11px] text-warm-gray">{L('meta')}</p>
              </div>
            </div>

            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {chips.map((k, i) => (
                <span
                  key={k}
                  className={`tr-scene inline-flex items-center gap-1 rounded-full border border-honey-green/30 bg-honey-green/10 px-2.5 py-1 text-[11px] font-medium text-honey-green ${
                    step >= 2 + i ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.8]'
                  }`}
                >
                  {L(k)}
                  <Check className="h-3 w-3" />
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Scene>
  );
};
