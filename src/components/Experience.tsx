import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';
import { Code2, MonitorCog, MapPin, Radio, ArrowUpRight } from 'lucide-react';
import DecryptText from './DecryptText';

const roles = [
  {
    company: 'IQ-Tech Solutions',
    role: 'Junior Software Developer',
    period: 'Sep. 2025 — June 2026',
    location: 'Bangalore, India · Remote',
    icon: Code2,
    color: 'text-matrix',
    border: 'border-matrix/30',
    stack: ['JavaScript', 'PHP', 'MySQL', 'Git', 'Agile'],
    impact: [
      'Developed and maintained 8+ responsive web application modules for client projects.',
      'Worked with a cross-functional team to implement features, review code, and ship updates.',
    ],
  },
  {
    company: 'RBN Group of Companies',
    role: 'IT Support & Systems Assistant',
    period: 'March 2024 — July 2024',
    location: 'Doha, Qatar',
    icon: MonitorCog,
    color: 'text-cyber-cyan',
    border: 'border-cyber-cyan/30',
    stack: ['Windows', 'Networking', 'IT Support', 'Systems'],
    impact: [
      'Supported 40+ employees across hardware, software, and network issues.',
      'Streamlined software installation, system maintenance, and digital records workflows.',
    ],
  },
];

export default function Experience() {
  const { ref, isInView } = useInView(0.1);
  const [active, setActive] = useState(0);
  const selected = roles[active];
  const Icon = selected.icon;

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-matrix/5 blur-[160px]" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-matrix text-sm">05.</span>
            <DecryptText as="h2" text="Field Experience" className="text-3xl sm:text-4xl font-display font-bold text-white" />
            <div className="flex-1 h-px bg-dark-border ml-4" />
          </div>
          <p className="text-gray-500 font-mono text-sm">// real environments, real users, real delivery</p>
        </motion.div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-6">
          <div className="space-y-3">
            {roles.map((item, index) => (
              <button key={item.company} onClick={() => setActive(index)} className={`w-full text-left rounded-xl border p-5 transition-all ${active === index ? `${item.border} bg-white/[0.04] shadow-[0_0_35px_rgba(0,255,65,0.06)]` : 'border-dark-border bg-dark-card/60 hover:border-gray-700'}`}>
                <div className="flex items-center justify-between gap-3">
                  <div className={`p-2 rounded-lg bg-white/[0.03] ${item.color}`}><item.icon className="w-5 h-5" /></div>
                  <Radio className={`w-4 h-4 ${active === index ? `${item.color} animate-pulse` : 'text-gray-700'}`} />
                </div>
                <h3 className="text-white font-semibold mt-4">{item.company}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.role}</p>
              </button>
            ))}
          </div>

          <div className="relative rounded-2xl border border-dark-border bg-black/60 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-dark-border bg-dark-surface/80 px-5 py-3">
              <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-500" /><span className="h-2.5 w-2.5 rounded-full bg-green-500" /></div>
              <span className="font-mono text-[11px] text-gray-600">experience.runtime</span>
              <span className="font-mono text-[10px] text-matrix">LIVE</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={selected.company} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="p-7 sm:p-9">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                  <div>
                    <div className={`inline-flex rounded-xl border ${selected.border} bg-white/[0.03] p-3 ${selected.color}`}><Icon className="w-7 h-7" /></div>
                    <h3 className="mt-5 text-2xl font-display font-bold text-white">{selected.role}</h3>
                    <p className={`mt-1 font-mono text-sm ${selected.color}`}>{selected.company}</p>
                  </div>
                  <div className="font-mono text-xs text-gray-500 sm:text-right space-y-2">
                    <p>{selected.period}</p>
                    <p className="flex sm:justify-end items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{selected.location}</p>
                  </div>
                </div>

                <div className="my-7 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
                <div className="font-mono text-xs text-gray-600 mb-4">$ impact --verbose</div>
                <div className="space-y-4">
                  {selected.impact.map((line, index) => (
                    <motion.div key={line} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.12 }} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                      <span className={selected.color}>0{index + 1}</span><p>{line}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {selected.stack.map((item) => <span key={item} className="rounded-full border border-dark-border bg-dark-surface px-3 py-1.5 font-mono text-[11px] text-gray-400">{item}</span>)}
                </div>
                <a href="#contact" className={`mt-8 inline-flex items-center gap-2 font-mono text-xs ${selected.color} hover:gap-3 transition-all`}>Start a conversation <ArrowUpRight className="w-4 h-4" /></a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
