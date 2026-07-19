import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { MapPin, GraduationCap, Code2, Layers3 } from 'lucide-react';
import { Suspense, lazy } from 'react';
import DecryptText from './DecryptText';
import ErrorBoundary from './ErrorBoundary';
import Interests from './Interests';

const Lanyard = lazy(() => import('./Lanyard'));

// Static fallback shown if the 3D lanyard fails to load (e.g. WebGL/driver issues).
function PhotoFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative overflow-hidden rounded-2xl border border-matrix/30 bg-dark-card">
        <img src="/images/hadi.png" alt="Hadi Abdulla" className="h-64 w-64 object-cover" loading="lazy" />
        <span className="hud-corner hud-corner-tl" /><span className="hud-corner hud-corner-tr" />
        <span className="hud-corner hud-corner-bl" /><span className="hud-corner hud-corner-br" />
      </div>
    </div>
  );
}

const facts = [
  { icon: <MapPin className="w-5 h-5" />, label: 'Based In', value: 'Cyberjaya, Malaysia', color: 'text-matrix' },
  { icon: <GraduationCap className="w-5 h-5" />, label: 'University', value: 'MMU Cyberjaya', color: 'text-cyber-cyan' },
  { icon: <Code2 className="w-5 h-5" />, label: 'Focus', value: 'Software Engineering', color: 'text-cyber-purple' },
  { icon: <Layers3 className="w-5 h-5" />, label: 'Currently', value: 'Seeking Internship', color: 'text-yellow-400' },
];

export default function About() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-matrix text-sm">01.</span>
            <DecryptText as="h2" text="About Me" className="text-3xl sm:text-4xl font-display font-bold text-white" />
            <div className="flex-1 h-[1px] bg-dark-border ml-4" />
          </div>
          <p className="text-gray-500 font-mono text-sm mt-2">// getting to know me</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start relative">
          {/* Left column — bio, quick facts, interests */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-dark-border">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 font-mono text-xs text-gray-500">about_hadi.md</span>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <span className="text-matrix font-mono">$</span> Hey there! I'm{' '}
                  <span className="text-white font-semibold">Hadi Abdulla</span>, a
                  Computer Science student passionate about building software that makes a difference.
                </p>
                <p>
                  I'm currently pursuing my{' '}
                  <span className="text-white">BSc in Computer Science (Hons) with
                  Software Engineering</span> at <span className="text-matrix">MMU Cyberjaya</span>,
                  while building full-stack projects beyond my coursework.
                </p>
                <p>
                  I like taking projects further than the assignment brief asks for — building
                  a real routing engine instead of a toy demo, or a deterministic game engine
                  instead of a simple chat wrapper around an LLM.
                </p>
                <p>
                  My work spans backend architecture, API design, interactive interfaces, testing,
                  and deployment. I care about clear systems and software that stays understandable as it grows.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-matrix/10 to-transparent" />
            </div>

            {/* Quick facts */}
            <div>
              <h3 className="font-mono text-sm text-gray-500 mb-4">
                <span className="text-matrix">#</span> quick_facts
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {facts.map((fact, i) => (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="glass-card rounded-xl p-4 group hover:border-matrix/30 transition-all cursor-default"
                  >
                    <div className={`${fact.color} mb-2 group-hover:scale-110 transition-transform inline-block`}>
                      {fact.icon}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">{fact.label}</div>
                    <div className="text-sm text-white font-medium mt-1">{fact.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <h3 className="font-mono text-sm text-gray-500 mb-4">
                <span className="text-matrix">#</span> interests
              </h3>
              <Interests />
            </div>
          </motion.div>

          {/* Right column — lanyard overflows container, overlays content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:sticky lg:top-24 hidden lg:block"
            style={{ height: 0 }}
          >
            {/* Overflows vertically past sibling cards; zIndex sits above the text content */}
            <div style={{ position: 'absolute', top: '-60px', left: 0, right: 0, height: '800px', zIndex: 20, pointerEvents: 'auto' }}>
              <ErrorBoundary fallback={<PhotoFallback />}>
                <Suspense fallback={<div className="flex h-full items-center justify-center font-mono text-xs text-gray-600">loading badge...</div>}>
                  {isInView && <Lanyard />}
                </Suspense>
              </ErrorBoundary>
            </div>
          </motion.div>

          {/* Mobile — normal flow lanyard */}
          <div className="lg:hidden h-[500px]">
            <ErrorBoundary fallback={<PhotoFallback />}>
              <Suspense fallback={<div className="flex h-full items-center justify-center font-mono text-xs text-gray-600">loading badge...</div>}>
                {isInView && <Lanyard />}
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  );
}
