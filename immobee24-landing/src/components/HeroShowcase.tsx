// Hero showcase carousel (HomeLead-style): rotates three product moments —
// the live inquiry chat, the 4-step lead journey, and a real dashboard
// screenshot — with slide/fade transitions and dot navigation. Auto-advances
// every 8s, pauses on hover, and disables auto-rotation (keeping the dots
// functional) under prefers-reduced-motion.

import { useEffect, useRef, useState } from 'react';
import { Bot, CalendarCheck2, LineChart, Mail } from 'lucide-react';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';
import { SceneInquiryReply } from './scenes';

type Step = {
  icon: typeof Mail;
  title: Record<Language, string>;
  body: Record<Language, string>;
};

const JOURNEY: Step[] = [
  {
    icon: Mail,
    title: { de: 'Anfrage erkannt', en: 'Lead detected', fr: 'Demande détectée', ar: 'تم رصد الاستفسار' },
    body: {
      de: 'Neue Anfrage aus Portal, E-Mail oder Website — sofort erfasst.',
      en: 'New inquiry from a portal, email or your site — captured instantly.',
      fr: 'Nouvelle demande depuis un portail, un e-mail ou votre site — captée instantanément.',
      ar: 'استفسار جديد من بوابة عقارية أو بريد أو موقعكم — يُلتقط فورًا.',
    },
  },
  {
    icon: Bot,
    title: { de: 'KI qualifiziert', en: 'AI qualifies', fr: 'L’IA qualifie', ar: 'الذكاء الاصطناعي يؤهل' },
    body: {
      de: 'Bee antwortet in 3 Sekunden und qualifiziert im Gespräch.',
      en: 'Bee replies in 3 seconds and qualifies in conversation.',
      fr: 'Bee répond en 3 secondes et qualifie au fil de la conversation.',
      ar: 'يرد Bee خلال 3 ثوانٍ ويؤهل العميل أثناء المحادثة.',
    },
  },
  {
    icon: CalendarCheck2,
    title: { de: 'Termin gebucht', en: 'Viewing booked', fr: 'Visite réservée', ar: 'تم حجز المعاينة' },
    body: {
      de: 'Die Besichtigung landet — nach Ihrer Freigabe — im Kalender.',
      en: 'The viewing lands on the calendar — after your approval.',
      fr: 'La visite arrive au calendrier — après votre validation.',
      ar: 'تُضاف المعاينة إلى التقويم — بعد موافقتكم.',
    },
  },
  {
    icon: LineChart,
    title: { de: 'Alles protokolliert', en: 'Insights captured', fr: 'Tout est consigné', ar: 'كل شيء موثق' },
    body: {
      de: 'Score, Verlauf und nächste Schritte — sauber dokumentiert.',
      en: 'Score, history and next steps — cleanly documented.',
      fr: 'Score, historique et prochaines étapes — proprement documentés.',
      ar: 'التقييم والسجل والخطوات التالية — موثقة بدقة.',
    },
  },
];

const CAPTION: Record<Language, string> = {
  de: 'Aus dem Produkt: das Immob24 Dashboard',
  en: 'From the product: the immob24 dashboard',
  fr: 'Extrait du produit : le tableau de bord Immob24',
  ar: 'من المنتج: لوحة تحكم Immob24',
};

const SLIDE_LABELS: Record<Language, [string, string, string]> = {
  de: ['Live-Anfrage', 'Der Weg zum Termin', 'Das Dashboard'],
  en: ['Live inquiry', 'Lead journey', 'The dashboard'],
  fr: ['Demande en direct', 'Parcours du lead', 'Le tableau de bord'],
  ar: ['استفسار مباشر', 'رحلة العميل', 'لوحة التحكم'],
};

export const HeroShowcase = () => {
  const { language } = useLanguage();
  const L = <T,>(v: Record<Language, T>): T => v[language] ?? v.en;
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const hover = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return; // no auto-rotation; dots still work
    const id = window.setInterval(() => {
      if (!hover.current) setActive((a) => (a + 1) % 3);
    }, 8000);
    return () => window.clearInterval(id);
  }, [reduced]);

  const slideCls = (i: number) =>
    `col-start-1 row-start-1 transition-all duration-700 ease-out ${
      active === i
        ? 'opacity-100 translate-x-0 pointer-events-auto'
        : `opacity-0 pointer-events-none ${reduced ? '' : active > i ? '-translate-x-8' : 'translate-x-8'}`
    }`;

  return (
    <div
      onMouseEnter={() => {
        hover.current = true;
      }}
      onMouseLeave={() => {
        hover.current = false;
      }}
    >
      <div className="grid">
        {/* Slide 1 — live inquiry scene (the animated product moment) */}
        <div className={slideCls(0)} aria-hidden={active !== 0}>
          <div className="mt-12 mx-auto w-full max-w-xl">
            <SceneInquiryReply />
          </div>
        </div>

        {/* Slide 2 — the lead journey, 4 steps */}
        <div className={slideCls(1)} aria-hidden={active !== 1}>
          <div className="mt-12 mx-auto w-full max-w-xl rounded-2xl bg-white border border-charcoal/5 shadow-card p-6 select-none">
            <div className="grid grid-cols-2 gap-4">
              {JOURNEY.map((st, i) => (
                <div
                  key={st.title.en}
                  className="rounded-xl border border-charcoal/5 bg-cream p-4 text-start"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-golden/15 text-golden-dark">
                      <st.icon className="h-4 w-4" />
                    </span>
                    <span className="font-metric text-xs font-bold text-warm-gray">0{i + 1}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-charcoal">{L(st.title)}</p>
                  <p className="mt-1 text-xs text-slate leading-snug">{L(st.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 3 — real dashboard screenshot in a browser frame */}
        <div className={slideCls(2)} aria-hidden={active !== 2}>
          <div className="mt-12 mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#211D16] shadow-card select-none">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-health-crit/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-health-warn/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-honey-green/80" />
              <span className="ms-3 truncate rounded-md bg-white/5 px-3 py-0.5 text-[10px] text-white/50">
                app.immob24.com/dashboard
              </span>
            </div>
            <div className="relative">
              <img
                src="/videos/features/dashboard-properties.jpg"
                alt={L(CAPTION)}
                width={1920}
                height={1080}
                loading="lazy"
                className="aspect-[16/8.4] w-full object-cover object-top"
              />
              <span className="absolute bottom-2.5 start-3 rounded-full bg-charcoal/80 px-3 py-1 text-[11px] font-medium text-white">
                {L(CAPTION)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={SLIDE_LABELS[language]?.[i] ?? SLIDE_LABELS.en[i]}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i ? 'w-6 bg-golden' : 'w-2 bg-white/25 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
