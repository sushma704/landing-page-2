// Scroll wayfinding (Part E): a scroll-progress ring with back-to-top, and a
// bouncing hero scroll cue. Progress is driven by requestAnimationFrame (the
// scroll listener only schedules a frame — no per-event layout reads).

import { useEffect, useRef, useState } from 'react';
import { ArrowUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';
import { usePrefersReducedMotion } from '../lib/animations';

// ── scroll-progress ring, fixed bottom-right ────────────────────────────────
const R = 20; // circle radius (viewBox units)
const CIRC = 2 * Math.PI * R;

export const ScrollProgressRing = () => {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const circleRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      // write straight to the DOM — no re-render per frame
      circleRef.current?.style.setProperty('stroke-dashoffset', String(CIRC * (1 - p)));
      setVisible(window.scrollY > 300);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
      className={`no-fill fixed bottom-6 end-6 z-40 h-12 w-12 rounded-full border border-charcoal/15 bg-white/90 backdrop-blur shadow-card transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <svg
        aria-hidden
        viewBox="0 0 48 48"
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle cx="24" cy="24" r={R} fill="none" strokeWidth="2.5" className="stroke-charcoal/10" />
        <circle
          ref={circleRef}
          cx="24"
          cy="24"
          r={R}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC}
          className="stroke-golden"
        />
      </svg>
      <ArrowUp className="absolute inset-0 m-auto h-4 w-4 text-charcoal" />
    </button>
  );
};

// ── hero scroll cue: bouncing down-arrow, disappears after first scroll ─────
const CUE_LABEL: Record<Language, string> = {
  de: 'Mehr entdecken',
  en: 'Discover more',
  fr: 'En découvrir plus',
  ar: 'اكتشفوا المزيد',
};

export const ScrollCue = ({
  targetId,
  onDark = false,
  className = '',
}: {
  /** id of the next section; falls back to scrolling one viewport down */
  targetId?: string;
  onDark?: boolean;
  className?: string;
}) => {
  const { language } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 60) setGone(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = () => {
    const el = targetId ? document.getElementById(targetId) : null;
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    else window.scrollBy({ top: window.innerHeight * 0.85, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={go}
      className={`group mx-auto flex flex-col items-center gap-1 transition-opacity duration-500 ${
        gone ? 'pointer-events-none opacity-0' : 'opacity-100'
      } ${onDark ? 'text-white/60 hover:text-white' : 'text-warm-gray hover:text-charcoal'} ${className}`}
    >
      <span className="text-[11px] font-medium uppercase tracking-wider">
        {CUE_LABEL[language] ?? CUE_LABEL.en}
      </span>
      <ChevronDown className={`h-5 w-5 ${reduced ? '' : 'scroll-cue'}`} />
    </button>
  );
};
