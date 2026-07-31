// Hero "live inquiry" moment — a lightweight JSX/CSS animation showing what
// the product actually does: portal inquiry arrives → AI types → reply lands
// in 3 seconds → lead flips to qualified. No video, no libraries.
//
// Layout safety: the card reserves a fixed height (no shift while phases
// change) and is tested at 390px. Respects prefers-reduced-motion by
// rendering the final state statically. Loops every ~10s.

import { useEffect, useRef, useState } from 'react';
import { Bot, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';

const COPY: Record<
  Language,
  {
    header: string;
    inquiry: string;
    typing: string;
    reply: string;
    answered: string;
    newLead: string;
    qualified: string;
  }
> = {
  de: {
    header: 'Neue Anfrage · ImmoScout24',
    inquiry: 'Ist die 3-Zimmer-Wohnung in Schwabing noch verfügbar?',
    typing: 'Immob24 AI antwortet …',
    reply:
      'Ja, die Wohnung ist verfügbar! Gerne schlage ich Ihnen zwei Besichtigungstermine vor: Do 17:30 oder Sa 11:00. Was passt Ihnen besser?',
    answered: 'Beantwortet in 3 Sekunden',
    newLead: 'Neuer Lead',
    qualified: 'Lead qualifiziert ✓',
  },
  en: {
    header: 'New inquiry · ImmoScout24',
    inquiry: 'Is the 3-room apartment in Schwabing still available?',
    typing: 'Immob24 AI is replying …',
    reply:
      'Yes, the apartment is available! I can offer two viewing slots: Thu 5:30 pm or Sat 11:00 am. Which works better for you?',
    answered: 'Answered in 3 seconds',
    newLead: 'New lead',
    qualified: 'Lead qualified ✓',
  },
  fr: {
    header: 'Nouvelle demande · ImmoScout24',
    inquiry: 'L’appartement de 3 pièces à Schwabing est-il encore disponible ?',
    typing: 'L’IA Immob24 répond …',
    reply:
      'Oui, l’appartement est disponible ! Je peux vous proposer deux créneaux de visite : jeu 17 h 30 ou sam 11 h 00. Lequel vous convient ?',
    answered: 'Réponse en 3 secondes',
    newLead: 'Nouveau lead',
    qualified: 'Lead qualifié ✓',
  },
  ar: {
    header: 'استفسار جديد · ImmoScout24',
    inquiry: 'هل ما زالت شقة الغرف الثلاث في شفابينغ متاحة؟',
    typing: '…يرد ذكاء Immob24 الاصطناعي',
    reply:
      'نعم، الشقة متاحة! يسعدني اقتراح موعدين للمعاينة: الخميس 17:30 أو السبت 11:00. أيهما يناسبكم أكثر؟',
    answered: 'تمت الإجابة خلال 3 ثوانٍ',
    newLead: 'عميل محتمل جديد',
    qualified: 'تم تأهيل العميل ✓',
  },
};

// Animation phases: 0 idle · 1 inquiry visible · 2 typing · 3 reply · 4 qualified
const TIMELINE: Array<[number, number]> = [
  [300, 1],
  [1500, 2],
  [2800, 3],
  [4200, 4],
  [10000, 0], // restart
];

export const LiveInquiryCard = () => {
  const { language } = useLanguage();
  const c = COPY[language] ?? COPY.en;
  const [phase, setPhase] = useState(0);
  const [reduced, setReduced] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return; // static final state, no timers
    let cancelled = false;
    const run = () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = TIMELINE.map(([ms, ph]) =>
        window.setTimeout(() => {
          if (cancelled) return;
          setPhase(ph);
          if (ph === 0) run(); // loop
        }, ms),
      );
    };
    run();
    return () => {
      cancelled = true;
      timers.current.forEach((t) => window.clearTimeout(t));
    };
  }, [reduced]);

  // Reduced motion: everything in its final state.
  const p = reduced ? 4 : phase;

  const show = (min: number) => (p >= min ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2');

  return (
    <div
      aria-hidden
      className="mt-12 mx-auto w-full max-w-xl rounded-2xl bg-white border border-charcoal/5 shadow-card text-start select-none"
    >
      {/* header */}
      <div className="flex items-center justify-between gap-3 border-b border-charcoal/5 px-5 py-3">
        <span className="flex items-center gap-2 text-xs font-medium text-slate">
          <span className="h-2 w-2 rounded-full bg-honey-green" />
          {c.header}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-500 ${
            p >= 4 ? 'bg-honey-green/15 text-honey-green' : 'bg-muted text-warm-gray'
          }`}
        >
          {p >= 4 ? c.qualified : c.newLead}
        </span>
      </div>

      {/* conversation — fixed height so phase changes never shift the page */}
      <div className="relative h-[330px] sm:h-[230px] overflow-hidden px-5 py-4">
        {/* buyer inquiry */}
        <div className={`transition-all duration-500 ${show(1)}`}>
          <div className="max-w-[85%] rounded-2xl rounded-ss-md bg-cream border border-charcoal/5 px-4 py-2.5 text-sm text-charcoal">
            {c.inquiry}
          </div>
        </div>

        {/* typing indicator (only during phase 2) */}
        <div
          className={`mt-3 flex items-center gap-2 text-xs text-warm-gray transition-opacity duration-300 ${
            p === 2 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Bot className="h-3.5 w-3.5 text-golden-dark" />
          {c.typing}
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full bg-golden ${reduced ? '' : 'animate-bounce'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        </div>

        {/* AI reply */}
        <div className={`mt-3 flex justify-end transition-all duration-500 ${show(3)}`}>
          <div className="max-w-[88%]">
            <div className="rounded-2xl rounded-se-md bg-charcoal px-4 py-2.5 text-sm text-white">
              {c.reply}
            </div>
            <div className="mt-2 flex justify-end">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-honey-green/10 px-2.5 py-1 text-[11px] font-semibold text-honey-green">
                <Zap className="h-3 w-3" />
                {c.answered}
              </span>
            </div>
          </div>
        </div>

        {/* qualified check (bottom-left, phase 4) */}
        <div
          className={`absolute bottom-4 start-5 flex items-center gap-1.5 text-xs font-medium text-honey-green transition-all duration-500 ${show(4)}`}
        >
          <CheckCircle2 className="h-4 w-4" />
          {c.qualified}
        </div>
      </div>
    </div>
  );
};
