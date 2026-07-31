// Scene 5 — mini kanban: a deal card lifts, slides to the next column and
// settles; the header deal value ticks upward (existing CountUp) on the move.

import { useLanguage } from '../../i18n';
import type { Language } from '../../i18n';
import { CountUp } from '../../lib/animations';
import { Scene } from './Scene';

const T: Record<string, Record<Language, string>> = {
  window: {
    de: 'immob24 · Deal-Pipeline',
    en: 'immob24 · Deal pipeline',
    fr: 'immob24 · Pipeline de transactions',
    ar: 'immob24 · مسار الصفقات',
  },
  title: { de: 'Pipeline', en: 'Pipeline', fr: 'Pipeline', ar: 'مسار الصفقات' },
  col1: { de: 'Neu', en: 'New', fr: 'Nouveau', ar: 'جديد' },
  col2: { de: 'Qualifiziert', en: 'Qualified', fr: 'Qualifié', ar: 'مؤهل' },
  col3: { de: 'Besichtigung', en: 'Viewing', fr: 'Visite', ar: 'معاينة' },
  card: {
    de: 'Fam. Weber · 3-Zi-Whg',
    en: 'Weber · 3-room flat',
    fr: 'Weber · 3 pièces',
    ar: 'فيبر · شقة 3 غرف',
  },
};

// step 0 rest · 1 lift · 2 slide to next column · 3 settle + value ticks
const DURATIONS = [800, 500, 700, 2800];

export const ScenePipeline = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();
  const L = (k: keyof typeof T) => T[k][language] ?? T[k].en;
  const rtl = language === 'ar';
  const cols: Array<keyof typeof T> = ['col1', 'col2', 'col3'];

  return (
    <Scene durations={DURATIONS} label={L('window')} className={className}>
      {(step) => {
        const moved = step >= 2;
        const lifted = step === 1 || step === 2;
        // one column width + the 8px gap, in the reading direction
        const shift = moved ? `translateX(${rtl ? '-' : ''}calc(100% + 8px))` : 'translateX(0)';
        return (
          <div className="absolute inset-0 flex flex-col p-3.5">
            <div className="flex items-baseline justify-between px-0.5">
              <span className="text-xs font-semibold text-charcoal">{L('title')}</span>
              <span className="font-metric text-sm font-bold text-golden-dark">
                <CountUp key={step >= 3 ? 'after' : 'before'} value={step >= 3 ? '€96k' : '€84k'} duration={800} />
              </span>
            </div>

            <div className="relative mt-2.5 grid flex-1 grid-cols-3 gap-2">
              {cols.map((c, i) => (
                <div key={c} className="flex flex-col rounded-lg border border-charcoal/5 bg-cream p-1.5">
                  <span className="px-1 pb-1 text-[9px] font-semibold uppercase tracking-wide text-warm-gray">
                    {L(c)}
                  </span>
                  {/* ghost cards give the board depth */}
                  {(i === 0 ? [1] : i === 1 ? [1, 2] : [1]).map((g) => (
                    <div key={g} className="mb-1.5 h-7 rounded-md border border-charcoal/5 bg-white/70" />
                  ))}
                  {/* reserved slot the moving card starts from */}
                  {i === 0 && <div className="h-12 rounded-md" />}
                </div>
              ))}

              {/* the moving deal card — absolute overlay, transform-only motion */}
              <div className="pointer-events-none absolute inset-x-0 bottom-1.5 grid grid-cols-3 gap-2 px-1.5">
                <div
                  className={`tr-scene duration-700 col-start-1 rounded-md border bg-white p-2 ${
                    lifted ? 'border-golden/50 shadow-card' : 'border-charcoal/10 shadow-subtle'
                  }`}
                  style={{ transform: `${shift}${lifted ? ' translateY(-4px) scale(1.05)' : ''}` }}
                >
                  <p className="truncate text-[10px] font-semibold text-charcoal">{L('card')}</p>
                  <p className="mt-0.5 text-[9px] text-warm-gray">€ 12k</p>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Scene>
  );
};
