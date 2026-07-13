import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { GraduationCap, Rocket, Code, Award } from 'lucide-react';

const timeline = [
  {
    year: '2024',
    title: 'Started BSc Computer Science @ MMU Cyberjaya',
    description: 'Began my BSc in Computer Science (Hons) with a specialization in Software Engineering at Multimedia University, Cyberjaya, Malaysia.',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    year: '2024 - 2026',
    title: 'Building Real Projects',
    description: 'Shipped three full-stack projects beyond coursework: a route optimization engine, a natural-language RPG engine, and an AI-driven interview prep platform.',
    icon: <Code className="w-5 h-5" />,
    color: 'from-matrix to-cyber-cyan',
  },
  {
    year: '2026',
    title: 'Job Simulations & Certifications',
    description: 'Completed software engineering job simulations with HPE, JPMorgan Chase & Co., and Walmart via Forage, alongside Google AI Essentials and GitHub Foundations certifications.',
    icon: <Award className="w-5 h-5" />,
    color: 'from-cyber-purple to-pink-500',
  },
  {
    year: 'Next Sem',
    title: 'Internship',
    description: 'Getting ready for my upcoming internship semester. Looking to apply what I have built and learned in a real-world engineering team.',
    icon: <Rocket className="w-5 h-5" />,
    color: 'from-yellow-500 to-orange-500',
  },
];

export default function Journey() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="journey" className="relative py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-purple/3 rounded-full blur-[200px]" />

      <div className="max-w-4xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-matrix text-sm">04.</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">My Journey</h2>
            <div className="flex-1 h-[1px] bg-dark-border ml-4" />
          </div>
          <p className="text-gray-500 font-mono text-sm mt-2">// education, projects, and what's next</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-matrix/50 via-cyber-cyan/30 to-cyber-purple/50 hidden sm:block" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative flex gap-6 sm:gap-8"
              >
                {/* Icon circle */}
                <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 text-white shadow-lg`}>
                  {item.icon}
                  {/* Pulse ring */}
                  {i === timeline.length - 1 && (
                    <div className="absolute inset-0 rounded-full bg-cyber-purple/30 animate-ping" />
                  )}
                </div>

                {/* Content card */}
                <div className="glass-card rounded-xl p-6 flex-1 hover:border-matrix/30 transition-all group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-matrix bg-matrix/10 px-2 py-0.5 rounded">{item.year}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-matrix transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
