// Animated hero background — flowing contour-line mesh (HomeLead-style),
// re-tinted to the immob24 brand (teal → amber). Pure <canvas>, no library:
// ~16 curved lines whose phases drift slowly. Practically free on the GPU,
// pauses when the tab is hidden, and renders a single static frame under
// prefers-reduced-motion.

import { useEffect, useRef } from 'react';

export const HeroWaves = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const LINES = 18;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let r = 0; r < LINES; r++) {
        const p = r / (LINES - 1);
        // spread across the full canvas, slightly denser mid-screen
        const yBase = h * (0.06 + 0.9 * p);
        const amp1 = 30 + 42 * Math.sin(p * Math.PI); // strongest mid-screen
        const amp2 = 16 + 12 * p;

        // teal on the left drifting into amber on the right
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        const a = 0.1 + 0.12 * Math.sin(p * Math.PI);
        grad.addColorStop(0, `rgba(63, 187, 166, ${a})`);
        grad.addColorStop(0.55, `rgba(63, 187, 166, ${a * 0.5})`);
        grad.addColorStop(1, `rgba(245, 166, 35, ${a * 0.85})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        for (let x = -20; x <= w + 20; x += 22) {
          const y =
            yBase +
            Math.sin(x * 0.0038 + t * 0.00042 + r * 0.65) * amp1 +
            Math.cos(x * 0.0016 - t * 0.00027 + r * 1.3) * amp2;
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    if (reduced) {
      draw(0); // one static frame, no motion
    } else {
      const loop = (t: number) => {
        if (!running) return;
        draw(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      // save cycles when the tab is hidden
      const onVis = () => {
        running = document.visibilityState === 'visible';
        if (running) raf = requestAnimationFrame(loop);
        else cancelAnimationFrame(raf);
      };
      document.addEventListener('visibilitychange', onVis);
      return () => {
        running = false;
        cancelAnimationFrame(raf);
        document.removeEventListener('visibilitychange', onVis);
        ro.disconnect();
      };
    }
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
};
