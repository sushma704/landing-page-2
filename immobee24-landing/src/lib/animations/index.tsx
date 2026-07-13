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
  useLayoutEffect,
  useRef,
  useState,
  Children,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

export const REVEAL_MS = 650;
export const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const STAGGER_MS = 80;

// Entrance-choreography slot: literal delay/duration for .chor/.chor-scale
// elements (multiplied by ?slowmo=N in dev). Usage:
//   <div className="chor" style={chorSlot(280, 500)}>
// ?slowmo=N multiplier (dev/localhost flag set in main.tsx) for JS-driven timings
export const slowmoFactor = (): number =>
  Number(getComputedStyle(document.documentElement).getPropertyValue('--slowmo') || 1) || 1;

export const chorSlot = (delayMs: number, durMs = 600): CSSProperties =>
  ({ '--chor-delay': `${delayMs}ms`, '--chor-dur': `${durMs}ms` }) as CSSProperties;

export type RevealDirection = 'up' | 'left' | 'right' | 'scale';

// pre-reveal transform per direction (Part B.2): up = 28px rise,
// left/right = slide in from that side, scale = 0.94 → 1.
// `distance` lets subtle contexts (footer: 16px) shorten the travel.
const hiddenTransform = (direction: RevealDirection, distance: number): string =>
  ({
    up: `translateY(${distance}px)`,
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    scale: 'scale(0.94)',
  })[direction];

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

  // useLayoutEffect: measure synchronously before first paint, so the
  // already-in-viewport check can't race a scroll that happens between
  // paint and effect flush.
  useLayoutEffect(() => {
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
        rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
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
  direction?: RevealDirection;
  /** travel in px for up/left/right (default 28) */
  distance?: number;
};

// Scroll reveal: opacity 0 + direction offset → final. 650ms, precise ease.
// will-change is set only while hidden and dropped once revealed (Part B.6).
export const Reveal = ({
  children,
  delay = 0,
  as = 'div',
  className = '',
  direction = 'up',
  distance = 28,
}: RevealProps) => {
  const reduced = usePrefersReducedMotion();
  const [ref, inView, immediate] = useInView<HTMLElement>();
  const show = reduced || inView;
  const style: CSSProperties =
    reduced || immediate
      ? {}
      : {
          opacity: show ? 1 : 0,
          transform: show ? 'none' : hiddenTransform(direction, distance),
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
  direction?: RevealDirection;
  /** per-child stagger in ms (default 80; footer uses a subtler 60) */
  stagger?: number;
};

// Applies Reveal to each direct child with a stagger.
export const RevealGroup = ({
  children,
  as = 'div',
  className = '',
  baseDelay = 0,
  direction = 'up',
  stagger = STAGGER_MS,
}: RevealGroupProps) => {
  const items = Children.toArray(children);
  return createElement(
    as,
    { className },
    items.map((child, i) => (
      <Reveal key={i} delay={baseDelay + i * stagger} direction={direction}>
        {child}
      </Reveal>
    )),
  );
};

type CountUpProps = {
  value: string; // e.g. "€249", "3s", "24/7", "94%"
  duration?: number;
  className?: string;
  /** ms before counting starts once triggered (choreography slot) */
  delay?: number;
  /** duration when morphing between successive values (price toggle) */
  morphMs?: number;
};

// Animated count-up for numeric stats. Parses prefix/number/suffix from the
// value string ("€249" → "€" + 249, "24/7" → 24 + "/7"); renders integers
// with tabular numerals so surrounding text never reflows.
export const CountUp = ({
  value,
  duration = 1200,
  className = '',
  delay = 0,
  morphMs = 500,
}: CountUpProps) => {
  const reduced = usePrefersReducedMotion();
  // Unlike Reveal, elements visible on mount DO count up — it's a mount
  // entrance (like the hero), and tabular-nums means zero layout shift.
  const [ref, inView] = useInView<HTMLSpanElement>();
  const m = /^([^0-9]*)(\d+)(.*)$/.exec(value);
  const target = m ? parseInt(m[2], 10) : 0;
  const prefix = m ? m[1] : '';
  const suffix = m ? m[3] : '';
  const [n, setN] = useState(reduced ? target : 0);
  const nRef = useRef(n);
  nRef.current = n;
  const ranOnce = useRef(false);

  useEffect(() => {
    if (!m) return;
    if (reduced) {
      setN(target);
      return;
    }
    if (!inView) return;
    let raf = 0;
    let timer = 0;
    const slowmo = slowmoFactor();
    // first trigger counts 0 → target; later target changes MORPH from the
    // currently displayed value (price toggle: 249 → 207), never reflowing.
    const from = ranOnce.current ? nRef.current : 0;
    const dur = (ranOnce.current ? morphMs : duration) * slowmo;
    const start = () => {
      ranOnce.current = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3); // ease-out cubic
        setN(Math.round(from + eased * (target - from)));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (delay > 0 && !ranOnce.current) timer = window.setTimeout(start, delay * slowmo);
    else start();
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
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

type TypeCycleProps = {
  /** words typed/erased in a loop; words[0] renders statically under reduced motion */
  words: string[];
  className?: string;
  typeMs?: number;
  eraseMs?: number;
  holdMs?: number;
};

// Typewriter word rotation (HomeLead-style hero): types a word, holds,
// erases, types the next. An invisible sizer containing the longest word
// reserves the box, so the surrounding layout never shifts (CLS 0).
export const TypeCycle = ({
  words,
  className = '',
  typeMs = 70,
  eraseMs = 45,
  holdMs = 1800,
}: TypeCycleProps) => {
  const reduced = usePrefersReducedMotion();
  const [wi, setWi] = useState(0);
  const [len, setLen] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (reduced || words.length === 0) return;
    const word = words[wi];
    let t: number;
    if (!erasing) {
      if (len < word.length) t = window.setTimeout(() => setLen(len + 1), typeMs);
      else t = window.setTimeout(() => setErasing(true), holdMs);
    } else if (len > 0) {
      t = window.setTimeout(() => setLen(len - 1), eraseMs);
    } else {
      setErasing(false);
      setWi((wi + 1) % words.length);
    }
    return () => window.clearTimeout(t);
  }, [len, erasing, wi, reduced, words, typeMs, eraseMs, holdMs]);

  if (!words.length) return null;
  if (reduced) return <span className={className}>{words[0]}</span>;
  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b));
  return (
    <span className={`relative inline-grid align-baseline ${className}`} aria-label={words[wi]}>
      {/* sizer: reserves the widest/tallest state so nothing reflows.
          text-start anchors typing so characters append without
          re-centering the word (a centered word shifts every keystroke). */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-pre text-start">
        {longest}
      </span>
      <span aria-hidden className="col-start-1 row-start-1 whitespace-pre text-start">
        {words[wi].slice(0, len)}
        <span className="type-caret" />
      </span>
    </span>
  );
};

type TypeOnceProps = {
  text: string;
  className?: string;
  charMs?: number;
  startDelay?: number;
};

// One-shot typewriter for page headings: characters REVEAL in place
// (visibility, not insertion), so centered multi-line headings never
// reflow — zero CLS. A caret rides the newest character while typing.
// Under reduced motion the text renders complete and static.
export const TypeOnce = ({ text, className = '', charMs = 45, startDelay = 150 }: TypeOnceProps) => {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [len, setLen] = useState(0);
  const done = len >= text.length;

  useEffect(() => {
    if (reduced || !inView || done) return;
    const t = window.setTimeout(() => setLen((n) => n + 1), len === 0 ? startDelay : charMs);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, len, reduced, done, charMs, startDelay]);

  if (reduced) return <span className={className}>{text}</span>;
  const chars = [...text];
  return (
    <span ref={ref} className={className} aria-label={text}>
      {chars.map((c, i) =>
        c === ' ' ? (
          ' '
        ) : (
          <span
            key={i}
            aria-hidden
            className={`${i < len ? '' : 'invisible'} ${!done && i === len - 1 ? 'type-head' : ''}`}
          >
            {c}
          </span>
        ),
      )}
    </span>
  );
};

type SkeletonRevealProps = {
  children: ReactNode;
  className?: string;
  /** shimmer duration before the real content crossfades in */
  holdMs?: number;
};

// "Data loading in": neutral shimmer blocks hold for ~400ms, then the real
// content crossfades over them. Space is reserved by the children themselves
// (they render at opacity 0 underneath) — zero layout shift. Use sparingly:
// hero mockups and at most one dashboard visual per page.
export const SkeletonReveal = ({ children, className = '', holdMs = 400 }: SkeletonRevealProps) => {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(reduced);
  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    const t = window.setTimeout(() => setReady(true), holdMs);
    return () => window.clearTimeout(t);
  }, [reduced, holdMs]);
  return (
    <div className={`relative ${className}`}>
      <div className={`transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
      {!ready && (
        <div aria-hidden className="absolute inset-0 flex flex-col gap-3 p-5">
          <div className="skel-block h-6 w-1/3" />
          <div className="skel-block h-4 w-2/3" />
          <div className="skel-block h-4 w-1/2" />
          <div className="skel-block flex-1" />
        </div>
      )}
    </div>
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
