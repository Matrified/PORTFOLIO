import { useEffect, useRef } from 'react';
import { playRadarPing, startRadarAmbient, stopRadarAmbient } from '../utils/sound';

interface Blip {
  angle: number;   // radians, position around center
  radius: number;  // 0..1 fraction of max radius
  label: string;
  lit: number;     // brightness 0..1, spikes when sweep passes
  pinged: boolean; // guards one ping per sweep pass
}

const blips: Blip[] = [
  { angle: -Math.PI / 4, radius: 0.55, label: 'Backend', lit: 0, pinged: false },
  { angle: Math.PI / 6, radius: 0.78, label: 'Full-Stack', lit: 0, pinged: false },
  { angle: (Math.PI * 3) / 4, radius: 0.42, label: 'AI', lit: 0, pinged: false },
  { angle: Math.PI, radius: 0.68, label: 'Systems', lit: 0, pinged: false },
  { angle: -(Math.PI * 2) / 3, radius: 0.3, label: 'APIs', lit: 0, pinged: false },
];

export default function Radar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 300;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const maxR = size / 2 - 10;
    const sin45 = Math.sin(Math.PI / 4);
    let sweep = 0;
    let raf = 0;
    let visible = false;

    // Start/stop scanning sounds based on whether the radar is on screen.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visible) {
            visible = true;
            startRadarAmbient();
          } else if (!entry.isIntersecting && visible) {
            visible = false;
            stopRadarAmbient();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Base disc
      const disc = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      disc.addColorStop(0, 'rgba(0,255,65,0.06)');
      disc.addColorStop(1, 'rgba(0,20,8,0.35)');
      ctx.fillStyle = disc;
      ctx.beginPath();
      ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
      ctx.fill();

      // Range rings
      ctx.strokeStyle = 'rgba(0,255,65,0.18)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (maxR / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Cross hairs
      ctx.strokeStyle = 'rgba(0,255,65,0.12)';
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR);
      // Diagonals
      const d = maxR * sin45;
      ctx.moveTo(cx - d, cy - d); ctx.lineTo(cx + d, cy + d);
      ctx.moveTo(cx - d, cy + d); ctx.lineTo(cx + d, cy - d);
      ctx.stroke();

      // Sweep trail (gradient wedge)
      const trail = 1.1; // radians of fade tail
      for (let i = 0; i < trail; i += 0.05) {
        const a = sweep - i;
        const alpha = (1 - i / trail) * 0.28;
        ctx.strokeStyle = `rgba(0,255,65,${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
        ctx.stroke();
      }

      // Leading sweep line
      ctx.strokeStyle = 'rgba(120,255,150,0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweep) * maxR, cy + Math.sin(sweep) * maxR);
      ctx.stroke();

      // Blips
      blips.forEach((blip) => {
        const bx = cx + Math.cos(blip.angle) * blip.radius * maxR;
        const by = cy + Math.sin(blip.angle) * blip.radius * maxR;

        // Distance (angular) between sweep and blip
        const diff = Math.abs(((sweep - blip.angle + Math.PI) % (Math.PI * 2)) - Math.PI);
        if (diff < 0.04) {
          blip.lit = 1;
          if (!blip.pinged && visible) {
            playRadarPing();
            blip.pinged = true;
          }
        }
        if (diff > 0.5) blip.pinged = false; // re-arm once sweep moves away
        blip.lit *= 0.99; // fade out slowly

        if (blip.lit > 0.02) {
          const glow = ctx.createRadialGradient(bx, by, 0, bx, by, 16 * blip.lit);
          glow.addColorStop(0, `rgba(0,255,65,${0.7 * blip.lit})`);
          glow.addColorStop(1, 'rgba(0,255,65,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(bx, by, 16 * blip.lit, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = '9px monospace';
          ctx.fillStyle = `rgba(180,255,190,${blip.lit})`;
          ctx.fillText(blip.label, bx + 8, by - 6);
        }

        // Constant faint dot
        ctx.fillStyle = 'rgba(0,255,65,0.35)';
        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Center hub
      ctx.fillStyle = 'rgba(0,255,65,0.9)';
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      if (!reduce) {
        sweep += 0.007;
        if (sweep > Math.PI * 2) sweep -= Math.PI * 2;
        raf = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      stopRadarAmbient();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <canvas ref={canvasRef} style={{ width: 300, height: 300 }} className="drop-shadow-[0_0_25px_rgba(0,255,65,0.15)]" />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-3">
        <span className="font-mono text-[9px] tracking-[0.3em] text-matrix/50">SCANNING</span>
      </div>
    </div>
  );
}
