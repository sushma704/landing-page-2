import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';

// Product demo video (10:15) with clickable chapter markers. The chapter
// table mirrors the video's actual scene order (see the content script that
// accompanied immob24_India_v2). Clicking a chapter seeks the <video>.
//
// DRAFT NOTE: the video is served from /videos/immob24-demo.mp4 (gitignored —
// 317 MB stays out of git). Before production go-live it moves to a proper
// video host (Bunny / Cloudflare Stream); only the src below changes.

const CHAPTERS: Array<{ t: number; label: Record<Language, string> }> = [
  {
    t: 0,
    label: {
      de: 'Intro — der Makleralltag',
      en: "Intro — the agent's daily chaos",
      fr: 'Intro — le quotidien de l’agent immobilier',
      ar: 'مقدمة — يوميات الوكيل العقاري',
    },
  },
  {
    t: 50,
    label: {
      de: 'Was Immob24 macht',
      en: 'What immob24 does',
      fr: 'Ce que fait Immob24',
      ar: 'ما الذي يقدمه Immob24',
    },
  },
  {
    t: 125,
    label: {
      de: 'PDF → KI-Exposé in 30 Sek.',
      en: 'PDF to AI listing in 30s',
      fr: 'Du PDF à l’annonce IA en 30 s',
      ar: 'من PDF إلى عرض بالذكاء الاصطناعي في 30 ثانية',
    },
  },
  {
    t: 195,
    label: {
      de: 'KI-Objektanreicherung',
      en: 'AI property enrichment',
      fr: 'Enrichissement immobilier par IA',
      ar: 'إثراء بيانات العقارات بالذكاء الاصطناعي',
    },
  },
  {
    t: 255,
    label: {
      de: 'B-Link Objekt-Sharing',
      en: 'Smart B-Link sharing',
      fr: 'Partage de biens B-Link',
      ar: 'مشاركة العقارات عبر B-Link',
    },
  },
  {
    t: 295,
    label: {
      de: '24/7 mehrsprachiger KI-Assistent',
      en: '24/7 multilingual AI assistant',
      fr: 'Assistant IA multilingue 24 h/24',
      ar: 'مساعد ذكاء اصطناعي متعدد اللغات على مدار الساعة',
    },
  },
  {
    t: 415,
    label: {
      de: 'KI-Chat mit menschlicher Kontrolle',
      en: 'AI chat with human control',
      fr: 'Chat IA sous contrôle humain',
      ar: 'محادثة ذكاء اصطناعي بإشراف بشري',
    },
  },
  {
    t: 455,
    label: {
      de: 'Smarte Deal-Pipeline',
      en: 'Smart deal pipeline',
      fr: 'Pipeline de transactions intelligent',
      ar: 'مسار صفقات ذكي',
    },
  },
  {
    t: 515,
    label: {
      de: 'KI-Marketing-Kampagnen',
      en: 'AI marketing campaigns',
      fr: 'Campagnes marketing IA',
      ar: 'حملات تسويقية بالذكاء الاصطناعي',
    },
  },
  {
    t: 605,
    label: {
      de: 'Abschluss',
      en: 'Outro',
      fr: 'Conclusion',
      ar: 'الخاتمة',
    },
  },
];

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export const DemoVideoPlayer = () => {
  const { language } = useLanguage();
  const L = <T,>(v: Record<Language, T>): T => v[language] ?? v.en;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(0);

  const seekTo = (idx: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = CHAPTERS[idx].t;
    v.play().catch(() => undefined);
    setStarted(true);
    setActive(idx);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    // highlight the chapter the playhead is inside
    let idx = 0;
    for (let i = 0; i < CHAPTERS.length; i++) {
      if (v.currentTime >= CHAPTERS[i].t) idx = i;
    }
    setActive(idx);
  };

  return (
    <div className="grid lg:grid-cols-[1fr,320px] gap-6 items-start">
      <div className="no-fill relative rounded-2xl overflow-hidden bg-charcoal shadow-card">
        <video
          ref={videoRef}
          className="w-full aspect-video"
          controls={started}
          preload="none"
          poster="/videos/demo-poster.jpg"
          onTimeUpdate={onTimeUpdate}
          onPlay={() => setStarted(true)}
        >
          {/* Web-optimised encode (H.264 1080p two-pass, faststart, <40MB).
              The 317MB master stays out of the page entirely. */}
          <source src="/videos/immob24-demo-web.mp4" type="video/mp4" />
        </video>
        {!started && (
          <button
            type="button"
            aria-label={L({
              de: 'Demo-Video abspielen',
              en: 'Play demo video',
              fr: 'Lire la vidéo de démonstration',
              ar: 'تشغيل الفيديو التوضيحي',
            })}
            onClick={() => seekTo(0)}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <span className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-golden shadow-golden transition-transform group-hover:scale-105">
              <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
            </span>
            <span className="absolute bottom-4 left-4 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-medium text-white">
              10:15 ·{' '}
              {L({
                de: 'Produkt-Demo',
                en: 'Product demo',
                fr: 'Démo produit',
                ar: 'عرض توضيحي للمنتج',
              })}
            </span>
          </button>
        )}
      </div>

      <div className="no-fill rounded-2xl border border-charcoal/5 bg-white shadow-subtle p-4">
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-warm-gray">
          {L({ de: 'Kapitel', en: 'Chapters', fr: 'Chapitres', ar: 'الفصول' })}
        </p>
        <ol className="max-h-[380px] overflow-y-auto">
          {CHAPTERS.map((c, i) => (
            <li key={c.t}>
              <button
                type="button"
                onClick={() => seekTo(i)}
                className={`w-full flex items-baseline gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                  active === i && started
                    ? 'bg-golden/10 text-charcoal font-medium'
                    : 'text-slate hover:bg-cream'
                }`}
              >
                <span className="font-metric text-xs text-golden-dark w-9 flex-none">
                  {fmt(c.t)}
                </span>
                {L(c.label)}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
