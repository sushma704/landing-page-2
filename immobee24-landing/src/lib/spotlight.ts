// Cursor-spotlight hook (v4 Part 6). Pairs with the .spotlight-card CSS:
// writes --mx/--my (px, card-relative) so the radial glow + border segment
// track the cursor. rAF-throttled; listeners attach on mouseenter and detach
// on mouseleave, so there is ZERO per-frame work while not hovered. Inert on
// touch/coarse pointers and under prefers-reduced-motion (matches the CSS
// gates). No dependencies.

import { useEffect, useRef, type RefObject } from 'react';

const spotlightCapable = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useSpotlight<T extends HTMLElement = HTMLDivElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !spotlightCapable()) return;

    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    const apply = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${lastX - r.left}px`);
      el.style.setProperty('--my', `${lastY - r.top}px`);
    };
    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onEnter = (e: MouseEvent) => {
      onMove(e); // position the glow before the fade-in completes
      el.addEventListener('mousemove', onMove);
    };
    const onLeave = () => {
      el.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      raf = 0;
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
