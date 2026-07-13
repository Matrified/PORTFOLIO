import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, GraduationCap } from 'lucide-react';
import MatrixRain from './MatrixRain';

const roles = [
  'Software Engineer',
  'CS Student @ MMU',
  'Full-Stack Developer',
  'Problem Solver',
  'Open Source Enthusiast',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.substring(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.substring(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MatrixRain />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-transparent to-dark-bg z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/80 via-transparent to-dark-bg/80 z-[1]" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-matrix/5 rounded-full blur-[120px] z-[1]" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Terminal-style greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-matrix/20 bg-matrix/5"
        >
          <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
          <span className="font-mono text-sm text-matrix">system.out.println("Welcome!");</span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold mb-2">
            <span className="text-white">Hi, I'm </span>
            <span className="text-gradient-matrix relative">
              Hadi
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-matrix to-cyber-cyan rounded-full" />
            </span>
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-light text-gray-400 mt-4">
            Abdulla
          </h2>
        </motion.div>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex items-center justify-center"
        >
          <div className="font-mono text-lg sm:text-xl lg:text-2xl">
            <span className="text-matrix mr-2">&gt;</span>
            <span className="text-gray-300">{displayText}</span>
            <span className="inline-block w-[3px] h-6 bg-matrix ml-1 animate-pulse" />
          </div>
        </motion.div>

        {/* Info badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-card border border-dark-border text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-matrix" />
            Malaysia
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-card border border-dark-border text-sm text-gray-400">
            <GraduationCap className="w-4 h-4 text-cyber-cyan" />
            BSc CS @ MMU Cyberjaya
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 rounded-lg bg-matrix text-dark-bg font-mono font-semibold text-sm overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.3)]"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-matrix to-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg border border-matrix/30 text-matrix font-mono font-semibold text-sm hover:bg-matrix/10 hover:border-matrix/60 transition-all"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          {[
            { value: '3+', label: 'Projects Shipped' },
            { value: '5', label: 'Certifications' },
            { value: '3.80', label: 'CGPA' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-matrix">{stat.value}</div>
              <div className="text-xs text-gray-500 font-mono mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-gray-500">scroll</span>
          <ChevronDown className="w-5 h-5 text-matrix" />
        </motion.div>
      </motion.div>
    </section>
  );
}
