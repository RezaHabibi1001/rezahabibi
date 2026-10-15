"use client";

import { useEffect, useRef } from "react";

const BLOBS = [
  { c: [46, 113, 241], r: 0.55, ax: 0.35, ay: 0.4, fx: 0.00021, fy: 0.00033, p: 0 },
  { c: [46, 113, 241], r: 0.45, ax: 0.3, ay: 0.5, fx: 0.00017, fy: 0.00027, p: 2 },
  { c: [228, 86, 132], r: 0.35, ax: 0.4, ay: 0.35, fx: 0.00025, fy: 0.00019, p: 4 },
  { c: [28, 124, 245], r: 0.5, ax: 0.25, ay: 0.45, fx: 0.00013, fy: 0.00023, p: 1 },
];

// Soft drifting gradient blobs on Lissajous paths. Paused when off screen.
export default function AuroraCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const b of BLOBS) {
        const x = w * (0.5 + b.ax * Math.sin(t * b.fx + b.p));
        const y = h * (0.5 + b.ay * Math.cos(t * b.fy + b.p));
        const r = Math.max(w, h) * b.r;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${b.c.join(",")},0.35)`);
        g.addColorStop(1, `rgba(${b.c.join(",")},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (t: number) => {
      draw(t);
      if (visible) raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(4000);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    });

    if (reduce) draw(4000);
    else io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
