// Scene 6 — the 7 AI co-workers arranged in a circle around the immob24 hub.
// Agents light up sequentially (1.4s each) with a one-line status; the
// connecting line to the active agent draws from the center
// (SVG stroke-dashoffset with pathLength normalisation).

import { Hexagon } from 'lucide-react';
import { useLanguage } from '../../i18n';
import type { Language } from '../../i18n';
import { Scene } from './Scene';

type Agent = { name: string; status: Record<Language, string> };

const AGENTS: Agent[] = [
  {
    name: 'Lead Responder',
    status: {
      de: 'Beantwortet eine neue Portal-Anfrage …',
      en: 'Answering a new portal inquiry …',
      fr: 'Répond à une nouvelle demande de portail …',
      ar: 'يجيب على استفسار جديد من البوابة …',
    },
  },
  {
    name: 'Conversation Agent',
    status: {
      de: 'Qualifiziert im Gespräch: Budget & Zeitraum',
      en: 'Qualifying in conversation: budget & timeframe',
      fr: 'Qualifie au fil de la conversation : budget & période',
      ar: 'يؤهل أثناء المحادثة: الميزانية والإطار الزمني',
    },
  },
  {
    name: 'Viewing Booker',
    status: {
      de: 'Schlägt 3 freie Besichtigungstermine vor',
      en: 'Proposing 3 free viewing slots',
      fr: 'Propose 3 créneaux de visite libres',
      ar: 'يقترح 3 مواعيد معاينة متاحة',
    },
  },
  {
    name: 'Listing Creator',
    status: {
      de: 'Erstellt Exposé-Entwurf aus dem PDF',
      en: 'Drafting the listing from the PDF',
      fr: 'Prépare l’annonce à partir du PDF',
      ar: 'يعدّ مسودة الإعلان من ملف PDF',
    },
  },
  {
    name: 'Deal Monitor',
    status: {
      de: 'Verschiebt Deal Weber nach „Besichtigung“',
      en: 'Moving deal Weber to “Viewing”',
      fr: 'Déplace le dossier Weber vers « Visite »',
      ar: 'ينقل صفقة فيبر إلى «معاينة»',
    },
  },
  {
    name: 'Daily Brief Agent',
    status: {
      de: 'Bereitet das Morgen-Briefing vor',
      en: 'Preparing the morning brief',
      fr: 'Prépare le brief du matin',
      ar: 'يحضّر الملخص الصباحي',
    },
  },
  {
    name: 'Compliance Guard',
    status: {
      de: 'Prüft Entwurf — wartet auf Ihre Freigabe',
      en: 'Checking draft — awaiting your approval',
      fr: 'Vérifie le brouillon — attend votre validation',
      ar: 'يفحص المسودة — بانتظار موافقتكم',
    },
  },
];

const WINDOW: Record<Language, string> = {
  de: 'immob24 · 7 KI-Co-Worker',
  en: 'immob24 · 7 AI co-workers',
  fr: 'immob24 · 7 co-workers IA',
  ar: 'immob24 · 7 مساعدين بالذكاء الاصطناعي',
};

// chip positions on a circle (percent coordinates; hub at 50/44, leaving the
// bottom strip for the status line). x is clamped so the widest chips never
// leave the window frame.
const POS = AGENTS.map((_, i) => {
  const a = ((i * 360) / AGENTS.length - 90) * (Math.PI / 180);
  return {
    x: Math.max(19, Math.min(81, 50 + 38 * Math.cos(a))),
    y: 44 + 31 * Math.sin(a),
  };
});

// step 0 idle · steps 1..7 = agent (step-1) active
const DURATIONS = [800, ...AGENTS.map(() => 1400)];

export const SceneAgents = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();

  return (
    <Scene durations={DURATIONS} label={WINDOW[language] ?? WINDOW.en} aspect={16 / 12} className={className}>
      {(step) => {
        const activeIdx = step - 1; // -1 while idle
        return (
          <div className="absolute inset-0">
            {/* connecting lines, drawn from the hub */}
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {POS.map((p, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="44"
                  x2={p.x}
                  y2={p.y}
                  pathLength={100}
                  strokeDasharray={100}
                  strokeDashoffset={activeIdx === i ? 0 : 100}
                  className="stroke-golden"
                  strokeWidth="0.5"
                  style={{
                    opacity: activeIdx === i ? 1 : 0,
                    transition:
                      'stroke-dashoffset 450ms cubic-bezier(0.22,1,0.36,1), opacity 250ms ease-out',
                  }}
                />
              ))}
            </svg>

            {/* hub */}
            <div
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ left: '50%', top: '44%' }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal text-white shadow-card">
                <Hexagon className="h-5 w-5" />
              </span>
            </div>

            {/* agent chips */}
            {AGENTS.map((agent, i) => {
              const on = activeIdx === i;
              return (
                <span
                  key={agent.name}
                  className={`tr-scene absolute max-w-[34%] -translate-x-1/2 -translate-y-1/2 truncate rounded-full border px-2 py-0.5 text-[8px] sm:text-[10px] font-medium ${
                    on
                      ? 'border-golden bg-gradient-golden text-[#1E1B16] shadow-subtle'
                      : 'border-charcoal/10 bg-white text-slate'
                  }`}
                  style={{
                    left: `${POS[i].x}%`,
                    top: `${POS[i].y}%`,
                    transform: `translate(-50%, -50%)${on ? ' scale(1.08)' : ''}`,
                  }}
                >
                  {agent.name}
                </span>
              );
            })}

            {/* status line — crossfades per agent */}
            <div className="absolute inset-x-3 bottom-2.5 grid text-center">
              {AGENTS.map((agent, i) => (
                <p
                  key={agent.name}
                  className={`tr-scene col-start-1 row-start-1 truncate text-[10px] sm:text-[11px] text-slate ${
                    activeIdx === i ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="font-semibold text-golden-dark">{agent.name}:</span>{' '}
                  {agent.status[language] ?? agent.status.en}
                </p>
              ))}
            </div>
          </div>
        );
      }}
    </Scene>
  );
};
