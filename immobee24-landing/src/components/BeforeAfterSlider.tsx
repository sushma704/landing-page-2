// Before/after comparison slider (v4 Part 8, blueprint §06):
// "Your inbox today" (cluttered email list) vs "With Immob24" (clean
// pipeline), revealed by a draggable vertical divider. Pointer + touch +
// keyboard; teach-in animates 0 → 50% on first scroll-into-view.
// Positioning/clipping CSS lives in index.css (.ba-slider/.ba-after/
// .ba-divider/.ba-handle driven by --ba-pos). Both panes are built from
// theme tokens only, so light and dark both render correctly.

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight, Mail, CalendarCheck2 } from 'lucide-react';
import { useInView, usePrefersReducedMotion } from '../lib/animations';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';

type Copy = Record<Language, string>;

const L10N: Record<string, Copy> = {
  before: {
    de: 'Ihr Posteingang heute',
    en: 'Your inbox today',
    fr: 'Votre boîte mail aujourd’hui',
    ar: 'بريدكم الوارد اليوم',
  },
  after: { de: 'Mit Immob24', en: 'With Immob24', fr: 'Avec Immob24', ar: 'مع Immob24' },
  inbox: { de: 'Posteingang', en: 'Inbox', fr: 'Boîte de réception', ar: 'صندوق الوارد' },
  unanswered: {
    de: 'seit 2 Tagen unbeantwortet',
    en: 'unanswered for 2 days',
    fr: 'sans réponse depuis 2 jours',
    ar: 'دون رد منذ يومين',
  },
  sliderLabel: {
    de: 'Vorher-Nachher-Regler',
    en: 'Before/after slider',
    fr: 'Curseur avant/après',
    ar: 'شريط المقارنة قبل/بعد',
  },
  colNew: { de: 'Neu', en: 'New', fr: 'Nouveau', ar: 'جديد' },
  colQualified: { de: 'Qualifiziert', en: 'Qualified', fr: 'Qualifié', ar: 'مؤهل' },
  colViewing: { de: 'Besichtigung', en: 'Viewing', fr: 'Visite', ar: 'معاينة' },
  beeReplied: { de: 'Bee antwortete · 3s', en: 'Bee replied · 3s', fr: 'Bee a répondu · 3s', ar: 'رد Bee · 3 ثوانٍ' },
  budget: { de: 'Budget ✓', en: 'Budget ✓', fr: 'Budget ✓', ar: 'الميزانية ✓' },
  timeframe: { de: 'Zeitraum ✓', en: 'Timeframe ✓', fr: 'Période ✓', ar: 'الإطار الزمني ✓' },
};

const SUBJECTS: Array<{ from: string; subject: Copy; unread: boolean; stale?: boolean }> = [
  {
    from: 'ImmoScout24',
    subject: { de: 'ImmoScout24-Anfrage: 3-Zi-Whg Friedrichshain', en: 'ImmoScout24 inquiry: 3-room flat', fr: 'Demande ImmoScout24 : 3 pièces', ar: 'استفسار ImmoScout24: شقة 3 غرف' },
    unread: true,
  },
  {
    from: 'M. Weber',
    subject: { de: 'AW: AW: Besichtigung??', en: 'RE: RE: Viewing??', fr: 'RE: RE: Visite ??', ar: 'رد: رد: معاينة؟؟' },
    unread: true,
    stale: true,
  },
  {
    from: 'ImmoScout24',
    subject: { de: 'Weitere Anfrage: Neubau Kladow', en: 'Another inquiry: new-build Kladow', fr: 'Nouvelle demande : Kladow', ar: 'استفسار آخر: كلادو' },
    unread: true,
  },
  {
    from: 'S. Krüger',
    subject: { de: 'Unterlagen? Energieausweis?', en: 'Documents? Energy certificate?', fr: 'Documents ? DPE ?', ar: 'مستندات؟ شهادة الطاقة؟' },
    unread: false,
  },
  {
    from: 'Portal-Mail',
    subject: { de: 'Anfrage eingegangen — bitte antworten', en: 'Inquiry received — please reply', fr: 'Demande reçue — merci de répondre', ar: 'وصل استفسار — يرجى الرد' },
    unread: true,
  },
  {
    from: 'A. Öztürk',
    subject: { de: 'Ist die Wohnung noch frei???', en: 'Is the flat still available???', fr: 'Encore disponible ???', ar: 'هل الشقة متاحة؟؟؟' },
    unread: true,
  },
  {
    from: 'ImmoScout24',
    subject: { de: 'Erinnerung: 4 unbeantwortete Anfragen', en: 'Reminder: 4 unanswered inquiries', fr: 'Rappel : 4 demandes sans réponse', ar: 'تذكير: 4 استفسارات دون رد' },
    unread: true,
  },
];

const clamp = (v: number) => Math.min(95, Math.max(5, v));

export const BeforeAfterSlider = () => {
  const { language } = useLanguage();
  const L = (k: keyof typeof L10N) => L10N[k][language] ?? L10N[k].en;
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inViewRef, inView] = useInView<HTMLDivElement>();
  const [pos, setPos] = useState(0);
  const taught = useRef(false);
  const dragging = useRef(false);
  const raf = useRef(0);

  const setRefs = (el: HTMLDivElement | null) => {
    rootRef.current = el;
    (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  // teach-in: 0 → 50% on first scroll-into-view (rAF, house-ease approx)
  useEffect(() => {
    if (!inView || taught.current) return;
    taught.current = true;
    if (reduced) {
      setPos(50);
      return;
    }
    const t0 = performance.now();
    const dur = 800;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setPos(Math.round(eased * 50));
      if (k < 1 && !dragging.current) raf.current = requestAnimationFrame(tick);
      else raf.current = 0; // clear — a stale id would jam the drag throttle
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, reduced]);

  const posFromEvent = (e: PointerEvent) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return pos;
    return clamp(((e.clientX - rect.left) / rect.width) * 100);
  };

  const onPointerDown = (e: PointerEvent) => {
    dragging.current = true;
    cancelAnimationFrame(raf.current);
    raf.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setPos(posFromEvent(e));
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!dragging.current) return;
    if (raf.current) return; // rAF throttle
    const next = posFromEvent(e);
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      setPos(next);
    });
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPos((p) => clamp(p - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPos((p) => clamp(p + 5));
    }
  };

  const rowText = 'text-[10px] sm:text-xs';

  return (
    <div
      ref={setRefs}
      className="no-fill ba-slider aspect-[4/3] sm:aspect-[16/9] w-full rounded-2xl border border-charcoal/10 bg-white shadow-card"
      style={{ '--ba-pos': `${pos}%` } as React.CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* ── BEFORE: cluttered inbox ── */}
      <div className="absolute inset-0 flex flex-col p-3 sm:p-4">
        <span className="absolute top-2 start-2 z-10 rounded-full border border-health-crit/30 bg-white px-2.5 py-0.5 text-[10px] font-semibold text-health-crit shadow-subtle">
          {L('before')}
        </span>
        <div className="mt-7 flex items-center gap-2 border-b border-charcoal/10 pb-2">
          <Mail className="h-3.5 w-3.5 text-slate" />
          <span className={`font-semibold text-charcoal ${rowText}`}>{L('inbox')}</span>
          <span className="ms-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-health-crit px-1 text-[9px] font-bold text-white">
            23
          </span>
        </div>
        <div className="flex-1 overflow-hidden">
          {SUBJECTS.map((m, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 border-b border-charcoal/5 py-1.5 ${rowText}`}
            >
              <span
                className={`h-1.5 w-1.5 flex-none rounded-full ${
                  m.unread ? 'bg-golden' : 'bg-charcoal/15'
                }`}
              />
              <span
                className={`w-14 sm:w-20 flex-none truncate ${
                  m.unread ? 'font-bold text-charcoal' : 'text-slate'
                }`}
              >
                {m.from}
              </span>
              <span className={`truncate ${m.unread ? 'font-semibold text-charcoal' : 'text-slate'}`}>
                {m.subject[language] ?? m.subject.en}
              </span>
              {m.stale && (
                <span className="ms-auto hidden flex-none text-[9px] font-semibold text-health-crit sm:block">
                  {L('unanswered')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── AFTER: clean pipeline (clipped by --ba-pos) ── */}
      <div className="ba-after flex flex-col bg-cream p-3 sm:p-4">
        <span className="absolute top-2 end-2 z-10 rounded-full border border-teal/30 bg-white px-2.5 py-0.5 text-[10px] font-semibold text-teal shadow-subtle">
          {L('after')}
        </span>
        <div className="mt-7 grid flex-1 grid-cols-3 gap-2">
          {(
            [
              ['colNew', 1],
              ['colQualified', 2],
              ['colViewing', 1],
            ] as const
          ).map(([col, cards], ci) => (
            <div key={col} className="flex flex-col rounded-lg border border-charcoal/5 bg-white/70 p-1.5">
              <span className="px-1 pb-1 text-[9px] font-semibold uppercase tracking-wide text-warm-gray">
                {L(col)}
              </span>
              {Array.from({ length: cards }, (_, j) => (
                <div
                  key={j}
                  className="mb-1.5 rounded-md border border-charcoal/10 bg-white p-1.5 shadow-subtle"
                >
                  <p className={`truncate font-semibold text-charcoal ${rowText}`}>
                    {['Fam. Weber', 'S. Krüger', 'A. Öztürk', 'M. Klein'][ci + j]}
                  </p>
                  {ci === 0 && j === 0 && (
                    <span className="mt-1 inline-flex rounded-full bg-gradient-golden px-1.5 py-0.5 text-[8px] font-bold text-[#1E1B16]">
                      {L('beeReplied')}
                    </span>
                  )}
                  {ci === 1 && (
                    <span className="mt-1 inline-flex rounded-full border border-teal/25 bg-teal-wash px-1.5 py-0.5 text-[8px] font-medium text-teal">
                      {j === 0 ? L('budget') : L('timeframe')}
                    </span>
                  )}
                  {ci === 2 && (
                    <span className="mt-1 inline-flex items-center gap-0.5 rounded-full border border-honey-green/30 bg-honey-green/10 px-1.5 py-0.5 text-[8px] font-medium text-honey-green">
                      <CalendarCheck2 className="h-2.5 w-2.5" /> Di 14:30
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* divider + grip */}
      <div className="ba-divider" aria-hidden />
      <div
        className="ba-handle"
        role="slider"
        tabIndex={0}
        aria-label={L('sliderLabel')}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKey}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 bg-white shadow-card">
          <ChevronLeft className="h-3.5 w-3.5 text-charcoal" />
          <ChevronRight className="h-3.5 w-3.5 text-charcoal" />
        </span>
      </div>
    </div>
  );
};
