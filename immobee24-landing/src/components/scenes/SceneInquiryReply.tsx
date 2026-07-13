// Scene 1 — a portal inquiry arrives, the AI types, replies in 3 seconds,
// the lead is qualified. Loop: empty → inquiry in → typing → reply + badge
// → qualified chip.

import { Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../i18n';
import type { Language } from '../../i18n';
import { Scene } from './Scene';

const T: Record<string, Record<Language, string>> = {
  window: {
    de: 'immob24 · Posteingang',
    en: 'immob24 · Inbox',
    fr: 'immob24 · Boîte de réception',
    ar: 'immob24 · صندوق الوارد',
  },
  source: {
    de: 'Anfrage über ImmoScout24',
    en: 'Inquiry via ImmoScout24',
    fr: 'Demande via ImmoScout24',
    ar: 'استفسار عبر ImmoScout24',
  },
  inquiry: {
    de: '„Ist die 3-Zimmer-Wohnung noch verfügbar?“',
    en: '“Is the 3-room flat still available?”',
    fr: '« L’appartement de 3 pièces est-il toujours disponible ? »',
    ar: '”هل الشقة المكوّنة من 3 غرف ما زالت متاحة؟“',
  },
  reply: {
    de: 'Ja, die Wohnung ist verfügbar! Gerne sende ich Ihnen das Exposé und schlage Besichtigungstermine vor.',
    en: 'Yes, the flat is available! I’ll gladly send you the exposé and suggest viewing slots.',
    fr: 'Oui, l’appartement est disponible ! Je vous envoie volontiers le dossier et vous propose des créneaux de visite.',
    ar: 'نعم، الشقة متاحة! يسعدني إرسال العرض واقتراح مواعيد للمعاينة.',
  },
  badge: {
    de: 'Beantwortet in 3 Sekunden',
    en: 'Answered in 3 seconds',
    fr: 'Répondu en 3 secondes',
    ar: 'تم الرد خلال 3 ثوانٍ',
  },
  qualified: {
    de: 'Lead qualifiziert',
    en: 'Lead qualified',
    fr: 'Lead qualifié',
    ar: 'تم تأهيل العميل',
  },
};

// step 0 empty · 1 inquiry · 2 typing · 3 reply + badge · 4 qualified
const DURATIONS = [500, 900, 1400, 1800, 2400];

export const SceneInquiryReply = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();
  const L = (k: keyof typeof T) => T[k][language] ?? T[k].en;

  return (
    <Scene durations={DURATIONS} label={L('window')} aspect={16 / 11} className={className}>
      {(step) => (
        <div className="absolute inset-0 flex flex-col gap-2.5 p-4">
          {/* inquiry bubble — slides in from the start side */}
          <div
            className={`tr-scene max-w-[85%] self-start rounded-2xl rounded-ss-md border border-charcoal/10 bg-cream px-3.5 py-2.5 ${
              step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 rtl:translate-x-4'
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-warm-gray">
              {L('source')}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-charcoal leading-snug">{L('inquiry')}</p>
          </div>

          {/* AI reply zone — a neutral wrapper reserves the space; the reply
              fades up inside it and the typing indicator is an absolute
              overlay, so nothing ever reflows (CLS 0) */}
          <div className="relative max-w-[85%] self-end">
            <div
              className={`tr-scene absolute top-0 end-0 z-10 rounded-2xl rounded-ee-md border border-teal/20 bg-teal-wash px-3.5 py-2.5 ${
                step === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              aria-hidden={step !== 2}
            >
              <span className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="scene-typing-dot h-1.5 w-1.5 rounded-full bg-teal"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </span>
            </div>
            <div
              className={`tr-scene duration-500 rounded-2xl rounded-ee-md border border-teal/20 bg-teal-wash px-3.5 py-2.5 ${
                step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
            <p className="text-xs sm:text-sm text-charcoal leading-snug">{L('reply')}</p>
            <span
              className={`tr-scene mt-2 inline-flex items-center gap-1 rounded-full bg-gradient-golden px-2.5 py-0.5 text-[10px] font-semibold text-[#1E1B16] ${
                step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{ transitionDelay: step >= 3 ? '250ms' : '0ms' }}
            >
              <Zap className="h-3 w-3" />
              {L('badge')}
            </span>
            </div>
          </div>

          {/* qualified status chip */}
          <div className="mt-auto flex justify-center">
            <span
              className={`tr-scene inline-flex items-center gap-1.5 rounded-full border border-honey-green/30 bg-honey-green/10 px-3 py-1 text-[11px] font-semibold text-honey-green ${
                step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {L('qualified')}
            </span>
          </div>
        </div>
      )}
    </Scene>
  );
};
