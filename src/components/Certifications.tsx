import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Award, ExternalLink, Shield, Cloud } from 'lucide-react';
import { SiGithub, SiGoogle } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

interface Cert {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  logo: React.ReactNode;
  accent: string;
}

const certs: Cert[] = [
  {
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    date: 'July 2026',
    logo: <FaAws className="w-6 h-6" />,
    accent: 'border-yellow-500/30 text-yellow-400',
  },
  {
    title: 'Advanced SWE Job Simulation',
    issuer: 'Walmart',
    date: 'June 2026',
    logo: <Award className="w-6 h-6" />,
    accent: 'border-blue-500/30 text-blue-400',
  },
  {
    title: 'SWE Job Simulation',
    issuer: 'JPMorgan Chase & Co.',
    date: 'June 2026',
    logo: <Shield className="w-6 h-6" />,
    accent: 'border-sky-500/30 text-sky-400',
  },
  {
    title: 'SWE Job Simulation',
    issuer: 'HPE',
    date: 'June 2026',
    logo: <Award className="w-6 h-6" />,
    accent: 'border-green-500/30 text-green-400',
  },
  {
    title: 'Google AI Essentials',
    issuer: 'Google',
    date: 'June 2026',
    logo: <SiGoogle className="w-6 h-6" />,
    accent: 'border-cyber-cyan/30 text-cyber-cyan',
  },
  {
    title: 'GitHub Foundations',
    issuer: 'GitHub',
    date: 'June 2026',
    logo: <SiGithub className="w-6 h-6" />,
    accent: 'border-matrix/30 text-matrix',
  },
];

export default function Certifications() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-matrix text-sm">05.</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Certifications</h2>
            <div className="flex-1 h-[1px] bg-dark-border ml-4" />
          </div>
          <p className="text-gray-500 font-mono text-sm mt-2">// verified credentials</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title + cert.issuer}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`glass-card rounded-xl p-5 border ${cert.accent.split(' ')[0]} hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cert.accent.split(' ')[1]}>{cert.logo}</div>
                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <h3 className="text-white font-semibold text-sm leading-snug">{cert.title}</h3>
              <p className="text-gray-400 text-xs mt-1.5">{cert.issuer}</p>
              <p className="text-gray-600 text-xs font-mono mt-2">{cert.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
