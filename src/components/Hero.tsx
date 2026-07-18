import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Download, GraduationCap, MapPin } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import FaultyTerminal from './FaultyTerminal';

const roles = ['Software Engineer', 'Full-Stack Developer', 'Backend Builder', 'Systems Thinker'];

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
      <div className="absolute inset-0 z-0 opacity-70">
        <FaultyTerminal
          scale={1.6}
          digitSize={1.3}
          timeScale={0.4}
          scanlineIntensity={0.7}
          glitchAmount={1}
          flickerAmount={0.8}
          curvature={0.12}
          tint="#00ff41"
          mouseReact
          brightness={0.75}
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,65,0.10),transparent_32%),radial-gradient(circle_at_76%_35%,rgba(0,212,255,0.07),transparent_26%),linear-gradient(to_bottom,rgba(5,5,5,.25),#050505_92%)]" />
      <div className="cyber-grid absolute inset-0 z-[1] opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center pb-20 pt-24 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs tracking-[0.35em] text-matrix/80">
          SOFTWARE ENGINEERING · FULL-STACK SYSTEMS
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.75 }} className="mt-7">
          <p className="mb-3 font-mono text-xs tracking-[0.28em] text-gray-600">HELLO, WORLD. I AM</p>
          <h1 className="font-display text-6xl font-black leading-[0.88] tracking-[-0.065em] text-white sm:text-8xl lg:text-[8.5rem]">
            HADI <span className="hero-gradient">ABDULLA</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mt-8 flex min-h-8 items-center justify-center font-mono text-lg sm:text-xl">
          <span className="mr-3 text-matrix">~/portfolio $</span><span className="text-gray-300">{displayText}</span><span className="ml-1 h-6 w-[2px] animate-pulse bg-matrix" />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="mt-6 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
          Computer Science student and software engineer building thoughtful full-stack products, backend systems, optimization tools, and AI-powered applications.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-7 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-2 rounded-full border border-dark-border bg-black/45 px-3 py-2 backdrop-blur-xl"><MapPin className="h-3.5 w-3.5 text-matrix" />Cyberjaya, Malaysia</span>
          <span className="flex items-center gap-2 rounded-full border border-dark-border bg-black/45 px-3 py-2 backdrop-blur-xl"><GraduationCap className="h-3.5 w-3.5 text-cyber-cyan" />Computer Science · MMU</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }} className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#projects" className="cursor-target magnetic-button group inline-flex items-center gap-2 rounded-lg bg-matrix px-6 py-3 font-mono text-sm font-bold text-black shadow-[0_0_35px_rgba(0,255,65,.18)]">Explore my work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
          <a href="https://github.com/Matrified" target="_blank" rel="noopener noreferrer" className="cursor-target inline-flex items-center gap-2 rounded-lg border border-dark-border bg-black/50 px-6 py-3 font-mono text-sm text-gray-300 backdrop-blur-xl hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all"><SiGithub className="h-4 w-4" />GitHub</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cursor-target inline-flex items-center gap-2 rounded-lg border border-dark-border bg-black/30 px-6 py-3 font-mono text-sm text-gray-400 backdrop-blur-xl hover:border-matrix/40 hover:text-matrix transition-all"><Download className="h-4 w-4" />Resume</a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45 }} className="absolute bottom-24 left-8 hidden font-mono text-[9px] tracking-[0.25em] text-matrix/20 lg:block">BUILD · TEST · ITERATE</motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.55 }} className="absolute bottom-24 right-8 hidden font-mono text-[9px] tracking-[0.25em] text-cyber-cyan/20 lg:block">DESIGN · SHIP · IMPROVE</motion.div>
      </div>

      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center font-mono text-[10px] tracking-[0.25em] text-gray-600">
        EXPLORE<ChevronDown className="mx-auto mt-2 h-5 w-5 animate-bounce text-matrix" />
      </motion.a>
    </section>
  );
}
