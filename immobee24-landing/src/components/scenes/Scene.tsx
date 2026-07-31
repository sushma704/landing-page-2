// Self-playing product scenario vignettes — shared foundation.
//
// <Scene> renders a realistic mini app window (top bar + dots) with a fixed
// aspect ratio (zero layout shift) and drives a step index through a
// setTimeout chain. Scenes loop with a 2s idle pause between cycles, start
// only when scrolled into view, and pause when out of view or the tab is
// hidden. Under prefers-reduced-motion the final step renders statically.
//
// ScenePlaybackManager (module singleton below): only ONE scene plays at a
// time — the visible scene whose center is closest to the viewport center.

import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { usePrefersReducedMotion } from '../../lib/animations';

const IDLE_MS = 2000;

// ---------------------------------------------------------------------------
// ScenePlaybackManager
// ---------------------------------------------------------------------------

type Slot = {
  el: HTMLElement;
  visible: boolean;
  lastPlayedAt: number;
  set: (active: boolean) => void;
};

const slots = new Set<Slot>();
let raf = 0;
let listening = false;
let rotateTimer = 0;
let activeSlot: Slot | null = null;
let activeSince = 0;

// Scenes sitting side by side (e.g. a 2-col grid) are equally close to the
// viewport center; without rotation the first-registered one would starve
// its neighbour forever. Near-ties therefore take turns every ROTATE_MS.
const NEAR_PX = 120;
const ROTATE_MS = 9000;

const recompute = () => {
  raf = 0;
  const hidden = document.hidden;
  const center = window.innerHeight / 2;
  const dist = new Map<Slot, number>();
  let bestD = Infinity;
  slots.forEach((s) => {
    if (!s.visible) return;
    const r = s.el.getBoundingClientRect();
    const d = Math.abs((r.top + r.bottom) / 2 - center);
    dist.set(s, d);
    if (d < bestD) bestD = d;
  });

  let next: Slot | null = null;
  if (!hidden && dist.size) {
    const now = Date.now();
    const candidates = [...dist.entries()].filter(([, d]) => d <= bestD + NEAR_PX);
    const activeIsCandidate = activeSlot != null && candidates.some(([s]) => s === activeSlot);
    if (activeIsCandidate && now - activeSince < ROTATE_MS) {
      next = activeSlot;
    } else {
      // least-recently-played candidate; distance breaks ties
      candidates.sort((a, b) => a[0].lastPlayedAt - b[0].lastPlayedAt || a[1] - b[1]);
      next = candidates[0][0];
    }
    if (next !== activeSlot) {
      activeSlot = next;
      activeSince = now;
      next.lastPlayedAt = now;
    }
  } else {
    activeSlot = null;
  }
  slots.forEach((s) => s.set(s === next));
};

const schedule = () => {
  if (!raf) raf = requestAnimationFrame(recompute);
};

const listen = (on: boolean) => {
  if (on === listening) return;
  listening = on;
  if (on) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    rotateTimer = window.setInterval(schedule, 2500); // drives rotation while idle
  } else {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    document.removeEventListener('visibilitychange', schedule);
    window.clearInterval(rotateTimer);
    activeSlot = null;
  }
};

function useSceneSlot(): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const slot: Slot = { el, visible: false, lastPlayedAt: 0, set: setActive };
    slots.add(slot);
    listen(true);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          slot.visible = e.isIntersecting;
        });
        schedule();
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      slots.delete(slot);
      if (!slots.size) listen(false);
      else schedule(); // hand playback to another scene
    };
  }, []);

  return [ref, active];
}

// ---------------------------------------------------------------------------
// Step engine
// ---------------------------------------------------------------------------

// Step 0 is each scene's empty/reset state, so wrapping back to 0 after the
// idle pause replays the cycle from a clean slate. Pausing freezes the chain
// at the current step (the cleanup clears the pending timeout). Until a scene
// plays for the first time it rests at its FINAL step — a fully composed
// still — so a scene that hasn't won playback yet never shows a blank window.
export function useSceneSteps(durations: number[], playing: boolean, reduced: boolean): number {
  const last = durations.length - 1;
  const started = useRef(false);
  const [step, setStep] = useState(last);

  useEffect(() => {
    if (reduced) {
      setStep(last);
      return;
    }
    if (!playing) return;
    if (!started.current) {
      // first activation: restart from the empty state, then chain
      started.current = true;
      setStep(0);
      return;
    }
    const t = window.setTimeout(
      () => setStep((s) => (s >= last ? 0 : s + 1)),
      durations[step] + (step === last ? IDLE_MS : 0),
    );
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, reduced, step, last]);

  return step;
}

// ---------------------------------------------------------------------------
// Scene window
// ---------------------------------------------------------------------------

type SceneProps = {
  durations: number[];
  label: string;
  /** width / height, e.g. 16 / 10 */
  aspect?: number;
  className?: string;
  children: (step: number, reduced: boolean) => ReactNode;
};

export const Scene = ({
  durations,
  label,
  aspect = 16 / 10,
  className = '',
  children,
}: SceneProps) => {
  const reduced = usePrefersReducedMotion();
  const [ref, active] = useSceneSlot();
  const step = useSceneSteps(durations, active, reduced);

  return (
    <div
      ref={ref}
      className={`no-fill overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-card select-none ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-charcoal/10 bg-cream/70 px-3.5 py-2">
        <span className="h-2 w-2 rounded-full bg-health-crit/70" />
        <span className="h-2 w-2 rounded-full bg-health-warn/70" />
        <span className="h-2 w-2 rounded-full bg-honey-green/70" />
        <span className="ms-2 truncate rounded-md bg-charcoal/5 px-2.5 py-0.5 text-[10px] text-slate">
          {label}
        </span>
      </div>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: String(aspect) }}>
        {children(step, reduced)}
      </div>
    </div>
  );
};
