import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, GraduationCap, MapPin, ShieldCheck, Terminal } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import MatrixRain from './MatrixRain';

const roles = ['Software Engineer', 'Full-Stack Developer', 'Backend Builder', 'Systems Thinker'];
const terminalLines = [
  { key: 'identity', value: 'Hadi Abdulla' },
  { key: 'focus', value: 'Software Engineering' },
  { key: 'runtime', value: 'Python · TypeScript · Java · C++' },
  { key: 'status', value: 'Open for internships', live: true },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    const timeout = window.setTimeout(() => {
      if (!deleting && displayText.length < role.length) setDisplayText(role.slice(0, displayText.length + 1));
      else if (!deleting) setDeleting(true);
      else if (displayText.length) setDisplayText(displayText.slice(0, -1));
      else { setDeleting(false); setRoleIndex(index => (index + 1) % roles.length); }
    }, deleting ? 40 : displayText === role ? 1300 : 75);
    return () => window.clearTimeout(timeout);
  }, [displayText, deleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8">
      <MatrixRain />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_45%,rgba(0,255,65,0.10),transparent_28%),radial-gradient(circle_at_80%_35%,rgba(0,212,255,0.08),transparent_30%),linear-gradient(to_bottom,rgba(5,5,5,.3),#050505_92%)]" />
      <div className="cyber-grid absolute inset-0 z-[1] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      <div className="orbital-ring absolute left-[70%] top-1/2 z-[1] hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full lg:block" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-14 pt-24 pb-20 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 rounded-full border border-matrix/20 bg-black/50 px-4 py-2 backdrop-blur-xl">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-matrix opacity-60" /><span className="relative h-2 w-2 rounded-full bg-matrix" /></span>
            <span className="font-mono text-xs text-matrix">AVAILABLE_FOR_INTERNSHIP</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="mt-7">
            <p className="mb-3 font-mono text-sm tracking-[0.3em] text-gray-600">HELLO, WORLD. I AM</p>
            <h1 className="font-display text-6xl font-black leading-[0.9] tracking-[-0.06em] text-white sm:text-8xl xl:text-9xl">
              HADI <span className="hero-gradient">ABDULLA</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-7 flex items-center font-mono text-lg sm:text-xl">
            <span className="mr-3 text-matrix">~/hadi $</span><span className="text-gray-300">{displayText}</span><span className="ml-1 h-6 w-[2px] animate-pulse bg-matrix" />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            I design software where the interesting work lives: deterministic game engines, real-world route optimization, and AI products with structured feedback loops.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} className="mt-7 flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-2 rounded-full border border-dark-border bg-black/40 px-3 py-2"><MapPin className="h-3.5 w-3.5 text-matrix" />Cyberjaya, Malaysia</span>
            <span className="flex items-center gap-2 rounded-full border border-dark-border bg-black/40 px-3 py-2"><GraduationCap className="h-3.5 w-3.5 text-cyber-cyan" />BSc CS @ MMU</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="magnetic-button group inline-flex items-center gap-2 rounded-lg bg-matrix px-6 py-3 font-mono text-sm font-bold text-black shadow-[0_0_35px_rgba(0,255,65,.18)]">Explore my work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            <a href="https://github.com/Matrified" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-dark-border bg-black/50 px-6 py-3 font-mono text-sm text-gray-300 backdrop-blur-xl hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all"><SiGithub className="h-4 w-4" />GitHub</a>
            <a href="#contact" className="rounded-lg border border-dark-border px-6 py-3 font-mono text-sm text-gray-400 hover:border-matrix/40 hover:text-matrix transition-all">Contact</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.92, rotateY: 8 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ delay: 0.45, duration: 0.8 }} className="relative hidden lg:block">
          <div className="absolute -inset-12 rounded-full bg-gradient-to-br from-matrix/10 via-transparent to-cyber-cyan/10 blur-3xl" />
          <div className="terminal-shell relative overflow-hidden rounded-2xl border border-matrix/20 bg-black/75 shadow-[0_35px_100px_rgba(0,0,0,.8),0_0_60px_rgba(0,255,65,.08)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-dark-border bg-white/[0.025] px-5 py-4">
              <div className="flex gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-500" /><span className="h-2.5 w-2.5 rounded-full bg-green-500" /></div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-gray-600">IDENTITY_KERNEL</span><Terminal className="h-4 w-4 text-matrix" />
            </div>
            <div className="space-y-6 p-7 font-mono text-sm">
              <div className="text-gray-600"><span className="text-matrix">$</span> boot --profile hadi.dev</div>
              {terminalLines.map((line, index) => (
                <motion.div key={line.key} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + index * 0.16 }} className="grid grid-cols-[90px_1fr] gap-4">
                  <span className="text-cyber-cyan">{line.key}</span><span className="text-gray-300">{line.value}{line.live && <span className="ml-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-matrix" />}</span>
                </motion.div>
              ))}
              <div className="h-px bg-gradient-to-r from-matrix/30 via-dark-border to-transparent" />
              <div className="flex items-center gap-2 text-xs text-gray-500"><ShieldCheck className="h-4 w-4 text-matrix" />Portfolio signal verified. All systems operational.</div>
              <div className="text-gray-600"><span className="text-matrix">$</span> <span className="terminal-caret" /></div>
            </div>
            <div className="terminal-scan absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-matrix/[0.035] to-transparent" />
          </div>
          <span className="code-fragment -left-10 top-10">{'{ build: true }'}</span><span className="code-fragment -right-7 bottom-16">status: 200</span>
        </motion.div>
      </div>

      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center font-mono text-[10px] tracking-[0.25em] text-gray-600">
        SCROLL_TO_DECODE<ChevronDown className="mx-auto mt-2 h-5 w-5 animate-bounce text-matrix" />
      </motion.a>
    </section>
  );
}
