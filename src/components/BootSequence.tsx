import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playBoot } from '../utils/sound';

// CRT power-on: a thin bright line blooms open vertically, a quick white
// flash, then it snaps straight to the site. No lingering static screen.
export default function BootSequence() {
  const [phase, setPhase] = useState<'on' | 'done'>('on');

  useEffect(() => {
    playBoot();
    // Some browsers block audio before a gesture; retry the boot tone on the
    // first interaction so reloads/return visits still get the sound.
    const retry = () => playBoot();
    window.addEventListener('pointerdown', retry, { once: true });

    const timer = window.setTimeout(() => setPhase('done'), 1150);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', retry);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase === 'on' && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          {/* Thin bright line that blooms to full height, then collapses */}
          <motion.div
            className="absolute left-0 right-0 mx-auto bg-white"
            style={{ boxShadow: '0 0 80px 16px rgba(0,255,65,0.6)' }}
            initial={{ height: 2, width: '0%', opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              width: ['0%', '100%', '100%', '100%', '100%'],
              height: [2, 2, '100%', '100%', '100%'],
            }}
            transition={{ duration: 1.0, times: [0, 0.18, 0.5, 0.8, 1], ease: 'easeInOut' }}
          />

          {/* Brief white/green flash as the screen "catches" */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.85, 0] }}
            transition={{ duration: 1.0, times: [0, 0.48, 0.56, 0.75] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
