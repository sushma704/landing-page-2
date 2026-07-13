// Animated billing-period switcher (pricing page + home teaser).
// One config object is the single source of truth for prices; the toggle
// slides its indicator, and MorphPrice runs the two-phase swap (fade-drop →
// rise-in while CountUp morphs 249 → 207). All timings honor ?slowmo=N.

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { CountUp, slowmoFactor, usePrefersReducedMotion } from '../lib/animations';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';
import { trackEvent } from '../lib/analytics';

export type BillingPeriod = 'monthly' | 'annual';

// ── single source of truth ───────────────────────────────────────────────────
export const PRICING = {
  team: { monthly: 249, annual: 207 }, // annual = −17%, billed annually
  annualDiscountLabel: '−17%',
};

const L10N: Record<string, Record<Language, string>> = {
  monthly: { de: 'Monatlich', en: 'Monthly', fr: 'Mensuel', ar: 'شهريًا' },
  annual: { de: 'Jährlich', en: 'Annual', fr: 'Annuel', ar: 'سنويًا' },
  billedAnnually: {
    de: 'bei jährlicher Abrechnung',
    en: 'billed annually',
    fr: 'facturation annuelle',
    ar: 'بفوترة سنوية',
  },
  perMonthPre: { de: 'Ab €', en: 'From €', fr: 'Dès €', ar: 'ابتداءً من €' },
  perMonthPost: { de: ' / Monat', en: ' / month', fr: ' / mois', ar: ' / شهريًا' },
};

export const teamPriceParts = (language: Language, period: BillingPeriod) => ({
  value: `${L10N.perMonthPre[language] ?? L10N.perMonthPre.en}${PRICING.team[period]}${
    L10N.perMonthPost[language] ?? L10N.perMonthPost.en
  }`,
  note: L10N.billedAnnually[language] ?? L10N.billedAnnually.en,
});

// ── segmented toggle with sliding indicator ─────────────────────────────────
export const BillingToggle = ({
  period,
  onChange,
  className = '',
}: {
  period: BillingPeriod;
  onChange: (p: BillingPeriod) => void;
  className?: string;
}) => {
  const { language } = useLanguage();
  const l = (k: keyof typeof L10N) => L10N[k][language] ?? L10N[k].en;
  const idx = period === 'monthly' ? 0 : 1;

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(period === 'monthly' ? 'annual' : 'monthly');
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      onKeyDown={onKey}
      className={`no-fill relative inline-grid grid-cols-2 rounded-full border border-charcoal/15 bg-white p-1 shadow-subtle ${className}`}
    >
      {/* sliding indicator — slides, never jump-cuts */}
      <span
        aria-hidden
        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-gradient-golden transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          insetInlineStart: '4px',
          transform: idx === 1 ? 'translateX(calc(100% + 0px))' : 'translateX(0)',
        }}
      />
      {(['monthly', 'annual'] as const).map((p) => {
        const active = period === p;
        return (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => {
              if (!active) {
                onChange(p);
                trackEvent('pricing_period_toggle', { period: p });
              }
            }}
            className={`relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-250 focus-visible:outline focus-visible:outline-2 focus-visible:outline-golden ${
              active ? 'text-[#1E1B16]' : 'text-slate hover:text-charcoal'
            }`}
          >
            {l(p === 'monthly' ? 'monthly' : 'annual')}
            {p === 'annual' && (
              <span className={`ms-1.5 text-xs font-bold ${active ? 'text-[#1E1B16]/70' : 'text-golden'}`}>
                {PRICING.annualDiscountLabel}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// ── morphing price block (Team card) ────────────────────────────────────────
// Zero layout shift: the block has a fixed height and the annual note always
// occupies its line (invisible when monthly). Two phases: current values
// fade-drop 8px (150ms), then new values rise in (250ms) while the number
// morphs via CountUp. aria-live announces the change.
export const MorphPrice = ({
  period,
  size = 'lg',
  entranceDelay = 0,
}: {
  period: BillingPeriod;
  size?: 'lg' | 'sm';
  entranceDelay?: number;
}) => {
  const { language } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState<BillingPeriod>(period);
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');

  useEffect(() => {
    if (period === shown) return;
    if (reduced) {
      setShown(period);
      return;
    }
    const slow = slowmoFactor();
    setPhase('out');
    const t1 = window.setTimeout(() => {
      setShown(period);
      setPhase('in');
    }, 150 * slow);
    const t2 = window.setTimeout(() => setPhase('idle'), (150 + 250) * slow);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [period, shown, reduced]);

  const parts = teamPriceParts(language, shown);
  const noteVisible = shown === 'annual';
  const cls =
    phase === 'out'
      ? 'opacity-0 translate-y-2'
      : phase === 'in'
        ? 'opacity-100 translate-y-0'
        : 'opacity-100 translate-y-0';

  return (
    <div
      aria-live="polite"
      className={size === 'lg' ? 'min-h-[4.6rem]' : 'min-h-[3.4rem]'}
      style={{ contain: 'layout' }}
    >
      <div
        className={`transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${cls}`}
        style={{ transitionDuration: `calc(var(--slowmo, 1) * ${phase === 'out' ? 150 : 250}ms)` }}
      >
        <p
          className={
            size === 'lg'
              ? 'font-heading text-3xl md:text-4xl text-charcoal'
              : 'font-heading text-xl text-charcoal'
          }
        >
          <CountUp value={parts.value} duration={800} morphMs={500} delay={entranceDelay} />
        </p>
        <p
          className={`mt-1 text-xs text-warm-gray ${noteVisible ? '' : 'invisible'}`}
          aria-hidden={!noteVisible}
        >
          {parts.note}
        </p>
      </div>
    </div>
  );
};
