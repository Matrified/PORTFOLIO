// @ts-nocheck
import { useEffect, useRef } from 'react';

interface ParticleNameProps {
  text?: string;
  colors?: string[];
  className?: string;
  height?: number;
  fontWeight?: number;
}

// Renders text as interactive particles that scatter away from the cursor and
// spring back. Container-sized (not full-window), DPR-aware, and pauses its
// animation loop when scrolled out of view for smooth performance.
export default function ParticleName({
  text = 'HADI ABDULLA',
  colors = ['00ff41', '39ff77', '00d4ff', '8affc1'],
  className = '',
  height = 200,
  fontWeight = 800,
}: ParticleNameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: any[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let inView = true;
    let radius = 90;

    const rand = (max = 1, min = 0) => min + Math.random() * (max - min);

    const build = () => {
      const w = wrap.clientWidth;
      const h = height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw text to sample pixels — start big, then shrink to fit within padding
      const padX = w * 0.06;
      const maxW = w - padX * 2;
      let fontSize = Math.min(h * 0.72, maxW / (text.length * 0.5));
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Fit loop: ensure the rendered text width stays inside maxW
      for (let guard = 0; guard < 24; guard++) {
        ctx.font = `${fontWeight} ${fontSize}px 'Space Grotesk', Verdana, sans-serif`;
        if (ctx.measureText(text).width <= maxW || fontSize <= 24) break;
        fontSize -= 4;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${fontWeight} ${fontSize}px 'Space Grotesk', Verdana, sans-serif`;
      const grad = ctx.createLinearGradient(0, 0, w, h);
      colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), `#${c}`));
      ctx.fillStyle = grad;
      ctx.fillText(text, w / 2, h / 2);

      const gap = Math.max(3, Math.round(fontSize / 26)); // density scales with size
      radius = Math.max(70, fontSize * 0.9);
      const img = ctx.getImageData(0, 0, w * dpr, h * dpr).data;
      particles = [];
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const idx = (Math.floor(y * dpr) * (w * dpr) + Math.floor(x * dpr)) * 4;
          if (img[idx + 3] > 128) {
            const r = img[idx], g = img[idx + 1], b = img[idx + 2];
            particles.push({ ox: x, oy: y, x, y, r: rand(1.6, 0.9), c: `rgb(${r},${g},${b})`, vx: 0, vy: 0 });
          }
        }
      }
      ctx.clearRect(0, 0, w, h);
    };

    const step = () => {
      const w = wrap.clientWidth;
      ctx.clearRect(0, 0, w, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius && dist > 0) {
            const force = (radius - dist) / radius;
            p.vx += (dx / dist) * force * 6;
            p.vy += (dy / dist) * force * 6;
          }
        }
        // spring home
        p.vx += (p.ox - p.x) * 0.06;
        p.vy += (p.oy - p.y) * 0.06;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, p.r * 2, p.r * 2);
      }
      raf = requestAnimationFrame(step);
    };

    const start = () => { if (!raf && !reduce) raf = requestAnimationFrame(step); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

    build();
    if (reduce) {
      // draw static text once
      const w = wrap.clientWidth;
      particles.forEach((p) => { ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, p.r * 2, p.r * 2); });
    } else {
      start();
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; pointer.x = -9999; pointer.y = -9999; };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });

    const io = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      if (inView) start(); else stop();
    }, { threshold: 0 });
    io.observe(wrap);

    let resizeRaf = 0;
    const onResize = () => { cancelAnimationFrame(resizeRaf); resizeRaf = requestAnimationFrame(build); };
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [text, height, fontWeight]);

  return (
    <div ref={wrapRef} className={className} style={{ width: '100%', height }}>
      <canvas ref={canvasRef} aria-label={text} />
    </div>
  );
}
