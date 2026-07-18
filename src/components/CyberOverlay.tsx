import { useEffect, useState } from 'react';

// Full-screen CRT treatment: scanlines, a slow rolling scan band, screen
// vignette/curvature, subtle flicker, plus a scroll-progress signal bar.
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
    <div className="crt-overlay pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      {/* Scroll-progress signal bar */}
      <div
        className="absolute left-0 top-0 h-[2px] bg-gradient-to-r from-matrix via-cyber-cyan to-cyber-purple shadow-[0_0_12px_#00ff41]"
        style={{ width: `${progress}%` }}
      />
      {/* Soft vignette only (scanlines removed) */}
      <div className="crt-vignette absolute inset-0" />

      <span className="hud-corner hud-corner-tl" /><span className="hud-corner hud-corner-tr" />
      <span className="hud-corner hud-corner-bl" /><span className="hud-corner hud-corner-br" />
    </div>
  );
}
