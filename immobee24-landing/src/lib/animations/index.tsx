// Site-wide premium animation system (Steps 0/3/6 of the animation spec).
//
// Constants — single source of truth for motion feel. B2B-precise: no bounce,
// nothing longer than 800ms.
//   REVEAL_DISTANCE 24px · REVEAL_MS 600 · EASE cubic-bezier(0.22,1,0.36,1)
//   STAGGER_MS 80 · HOVER_MS 200
//
// Rules enforced here:
// - prefers-reduced-motion → everything renders in its final state, no
//   transitions, no auto-motion (centralized in usePrefersReducedMotion).
// - Only transform/opacity are animated — zero layout shift.
// - Elements already visible on mount do NOT scroll-animate.

import {
  createElement,
  useEffect,
  useRef,
  useState,
  Children,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

export const REVEAL_MS = 600;
export const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const STAGGER_MS = 80;

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

type InViewOptions = {
  rootMargin?: string;
  threshold?: number;
};

// IntersectionObserver hook — fires once, then unobserves. Elements already
// in the viewport on mount report inView immediately WITHOUT animating
// (the caller checks `immediate`).
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: InViewOptions = {},
): [React.RefObject<T | null>, boolean, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const [immediate, setImmediate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already visible on load → final state instantly, no animation.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setImmediate(true);
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      {
        rootMargin: options.rootMargin ?? '0px 0px -12% 0px',
        threshold: options.threshold ?? 0.15,
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView, immediate];
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
};

// Fade-up reveal: opacity 0 + translateY(24px) → visible. 600ms, precise ease.
export const Reveal = ({ children, delay = 0, as = 'div', className = '' }: RevealProps) => {
  const reduced = usePrefersReducedMotion();
  const [ref, inView, immediate] = useInView<HTMLElement>();
  const show = reduced || inView;
  const style: CSSProperties =
    reduced || immediate
      ? {}
      : {
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity ${REVEAL_MS}ms ${EASE} ${delay}ms, transform ${REVEAL_MS}ms ${EASE} ${delay}ms`,
          willChange: show ? undefined : 'opacity, transform',
        };
  return createElement(as, { ref, style, className }, children);
};

type RevealGroupProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  baseDelay?: number;
};

// Applies Reveal to each direct child with an 80ms stagger.
export const RevealGroup = ({
  children,
  as = 'div',
  className = '',
  baseDelay = 0,
}: RevealGroupProps) => {
  const items = Children.toArray(children);
  return createElement(
    as,
    { className },
    items.map((child, i) => (
      <Reveal key={i} delay={baseDelay + i * STAGGER_MS}>
        {child}
      </Reveal>
    )),
  );
};

type CountUpProps = {
  value: string; // e.g. "€249", "3s", "24/7", "94%"
  duration?: number;
  className?: string;
};

// Animated count-up for numeric stats. Parses prefix/number/suffix from the
// value string ("€249" → "€" + 249, "24/7" → 24 + "/7"); renders integers
// with tabular numerals so surrounding text never reflows.
export const CountUp = ({ value, duration = 1200, className = '' }: CountUpProps) => {
  const reduced = usePrefersReducedMotion();
  // Unlike Reveal, elements visible on mount DO count up — it's a mount
  // entrance (like the hero), and tabular-nums means zero layout shift.
  const [ref, inView] = useInView<HTMLSpanElement>();
  const m = /^([^0-9]*)(\d+)(.*)$/.exec(value);
  const target = m ? parseInt(m[2], 10) : 0;
  const prefix = m ? m[1] : '';
  const suffix = m ? m[3] : '';
  const [n, setN] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!m) return;
    if (reduced) {
      setN(target);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 3); // ease-out cubic
      setN(Math.round(eased * target));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, target, duration]);

  if (!m) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
};

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  durationS?: number;
};

// Infinite horizontal marquee: track duplicated, translateX(-50%) keyframe
// loop, pause on hover. Under reduced motion: a static wrapped row.
export const Marquee = ({ children, className = '', durationS = 30 }: MarqueeProps) => {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div>;
  }
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track" style={{ animationDuration: `${durationS}s` }}>
        <div className="marquee-seg">{children}</div>
        <div className="marquee-seg" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};
