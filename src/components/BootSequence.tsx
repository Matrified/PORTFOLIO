import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

// A CRT monitor power-on animation: a bright dot/line blooms open,
// the screen flickers to life with a green phosphor glow, then powers down
// (fades) to reveal the site. No text — purely the CRT switch-on effect.
export default function BootSequence() {
  const [phase, setPhase] = useState<'on' | 'done'>('on');

  useEffect(() => {
    const start = () => sound.boot();
    // Boot sound needs a gesture on some browsers; try immediately and on first interaction.
    start();
    window.addEventListener('pointerdown', start, { once: true });

    const timer = window.setTimeout(() => setPhase('done'), 2100);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', start);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase === 'on' && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          {/* Vertical bloom: thin bright line expands to full height */}
          <motion.div
            className="absolute left-0 right-0 mx-auto bg-white"
            style={{ boxShadow: '0 0 60px 12px rgba(0,255,65,0.55)' }}
            initial={{ height: 3, width: '2%', opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 1],
              width: ['2%', '108%', '108%', '108%'],
              height: [3, 3, '100%', '100%'],
            }}
            transition={{ duration: 0.9, times: [0, 0.25, 0.7, 1], ease: 'easeInOut' }}
          />

          {/* Phosphor green flood + flicker after the screen "opens" */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at center, rgba(0,255,65,0.16), rgba(0,10,4,0.9))' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.9, 0.5, 0.85, 0.6] }}
            transition={{ duration: 1.6, times: [0, 0.5, 0.6, 0.72, 0.82, 1] }}
          />

          {/* Scanlines */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 4px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.5] }}
            transition={{ duration: 1.6, times: [0, 0.6, 1] }}
          />

          {/* Rolling horizontal band, like a CRT syncing */}
          <motion.div
            className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-matrix/15 to-transparent"
            initial={{ top: '-20%', opacity: 0 }}
            animate={{ top: ['-20%', '120%'], opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.1, delay: 0.7, ease: 'linear' }}
          />

          {/* Vignette for CRT curvature feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 160px 40px rgba(0,0,0,0.9)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
