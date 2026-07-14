import { useEffect, useState } from 'react';

export default function CyberOverlay() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <div className="absolute left-0 top-0 h-[2px] bg-gradient-to-r from-matrix via-cyber-cyan to-cyber-purple shadow-[0_0_12px_#00ff41]" style={{ width: `${progress}%` }} />
      <div className="scanline-overlay absolute inset-0 opacity-[0.035]" />
      <div className="absolute bottom-3 right-3 hidden font-mono text-[8px] tracking-[0.3em] text-matrix/20 lg:block">SIGNAL_STABLE // {Math.round(progress).toString().padStart(3, '0')}%</div>
      <span className="hud-corner hud-corner-tl" /><span className="hud-corner hud-corner-tr" />
      <span className="hud-corner hud-corner-bl" /><span className="hud-corner hud-corner-br" />
    </div>
  );
}
