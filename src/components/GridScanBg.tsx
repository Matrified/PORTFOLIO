import { useEffect, useRef } from 'react';

// Lightweight animated perspective grid with a scanning beam. Pure canvas 2D,
// no webcam / face-api / mouse tracking — just a static-style ambient effect.
export default function GridScanBg({ color = '0,255,65' }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, t = 0, visible = true;

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const horizon = h * 0.42;
      const spacing = 46;

      // Vertical lines converging to a center vanishing point
      ctx.lineWidth = 1;
      const cx = w / 2;
      for (let x = -w; x <= w * 2; x += spacing) {
        ctx.strokeStyle = `rgba(${color},0.10)`;
        ctx.beginPath();
        ctx.moveTo(cx + (x - cx) * 0.25, horizon);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      // Horizontal lines getting denser toward the horizon
      for (let i = 0; i < 22; i++) {
        const p = i / 22;
        const y = horizon + Math.pow(p, 2) * (h - horizon);
        ctx.strokeStyle = `rgba(${color},${0.05 + p * 0.08})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Scanning beam sweeping downward
      const scanY = horizon + ((t % 1) * (h - horizon));
      const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 20);
      grad.addColorStop(0, `rgba(${color},0)`);
      grad.addColorStop(0.7, `rgba(${color},0.12)`);
      grad.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 60, w, 80);

      if (!reduce && visible) t += 0.0025;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [color]);

  return <canvas ref={canvasRef} className="h-full w-full" style={{ display: 'block' }} aria-hidden="true" />;
}
