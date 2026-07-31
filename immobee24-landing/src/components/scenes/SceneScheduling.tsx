// Scene 3 — a mini week grid renders (40ms/cell stagger), free slots pulse,
// one slot books itself with the lead's name, a confirmation toast slides up.

import { CalendarCheck2 } from 'lucide-react';
import { useLanguage } from '../../i18n';
import type { Language } from '../../i18n';
import { Scene } from './Scene';

const T: Record<string, Record<Language, string>> = {
  window: {
    de: 'immob24 · Terminplanung',
    en: 'immob24 · Scheduling',
    fr: 'immob24 · Planification',
    ar: 'immob24 · جدولة المواعيد',
  },
  booked: { de: 'M. Weber', en: 'M. Weber', fr: 'M. Weber', ar: 'م. فيبر' },
  toast: {
    de: 'Besichtigung bestätigt — Di 14:30',
    en: 'Viewing confirmed — Tue 14:30',
    fr: 'Visite confirmée — mar. 14 h 30',
    ar: 'تم تأكيد المعاينة — الثلاثاء 14:30',
  },
};

const DAYS: Record<Language, string[]> = {
  de: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
  en: ['Mo', 'Tu', 'We', 'Th', 'Fr'],
  fr: ['Lu', 'Ma', 'Me', 'Je', 'Ve'],
  ar: ['ن', 'ث', 'ر', 'خ', 'ج'],
};

const FREE = new Set([3, 6, 11]); // free slots (col-major feel in a 5×3 grid)
const BOOKED_CELL = 6; // Tue 14:30

// step 0 empty · 1 grid renders · 2 free slots pulse · 3 slot books · 4 toast
const DURATIONS = [400, 1000, 1600, 1400, 2400];

export const SceneScheduling = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();
  const L = (k: keyof typeof T) => T[k][language] ?? T[k].en;
  const days = DAYS[language] ?? DAYS.en;

  return (
    <Scene durations={DURATIONS} label={L('window')} className={className}>
      {(step) => (
        <div className="absolute inset-0 flex flex-col p-4">
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {days.map((d) => (
              <span key={d} className="text-[10px] font-semibold uppercase text-warm-gray">
                {d}
              </span>
            ))}
            {Array.from({ length: 15 }, (_, i) => {
              const free = FREE.has(i);
              const isBooked = i === BOOKED_CELL && step >= 3;
              return (
                <div
                  key={i}
                  className={`tr-scene relative h-7 sm:h-8 rounded-md border ${
                    isBooked
                      ? 'border-golden bg-gradient-golden'
                      : free
                        ? 'border-teal/25 bg-teal-wash'
                        : 'border-charcoal/5 bg-cream'
                  } ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  style={{ transitionDelay: step === 1 ? `${i * 40}ms` : '0ms' }}
                >
                  {/* soft pulse on free slots while the AI "picks" */}
                  {free && step === 2 && (
                    <span
                      className="scene-ring absolute -inset-0.5 rounded-lg border-2 border-golden/70"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  )}
                  {i === BOOKED_CELL && (
                    <span
                      className={`tr-scene absolute inset-0 flex items-center justify-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-[#1E1B16] ${
                        isBooked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}
                    >
                      {L('booked')} ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* confirmation toast slides up from the bottom */}
          <div className="mt-auto flex justify-center pb-0.5">
            <span
              className={`tr-scene duration-500 inline-flex items-center gap-1.5 rounded-full border border-honey-green/30 bg-white px-3 py-1.5 text-[11px] font-semibold text-honey-green shadow-card ${
                step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <CalendarCheck2 className="h-3.5 w-3.5" />
              {L('toast')}
            </span>
          </div>
        </div>
      )}
    </Scene>
  );
};
