import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Award, ExternalLink, Shield } from 'lucide-react';
import { SiGithub, SiGoogle } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import DecryptText from './DecryptText';

interface Cert {
  title: string;
  issuer: string;
  date: string;
  image: string;
  logo: React.ReactNode;
  accent: string;
}

const certs: Cert[] = [
  {
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    date: 'July 2026',
    image: '/certs/aws.png',
    logo: <FaAws className="w-6 h-6" />,
    accent: 'border-yellow-500/30 text-yellow-400',
  },
  {
    title: 'Advanced SWE Job Simulation',
    issuer: 'Walmart',
    date: 'June 2026',
    image: '/certs/walmart.png',
    logo: <Award className="w-6 h-6" />,
    accent: 'border-blue-500/30 text-blue-400',
  },
  {
    title: 'SWE Job Simulation',
    issuer: 'JPMorgan Chase & Co.',
    date: 'June 2026',
    image: '/certs/jpmorgan.png',
    logo: <Shield className="w-6 h-6" />,
    accent: 'border-sky-500/30 text-sky-400',
  },
  {
    title: 'SWE Job Simulation',
    issuer: 'HPE',
    date: 'June 2026',
    image: '/certs/hpe.png',
    logo: <Award className="w-6 h-6" />,
    accent: 'border-green-500/30 text-green-400',
  },
  {
    title: 'Google AI Essentials',
    issuer: 'Google',
    date: 'June 2026',
    image: '/certs/google-ai.png',
    logo: <SiGoogle className="w-6 h-6" />,
    accent: 'border-cyber-cyan/30 text-cyber-cyan',
  },
  {
    title: 'GitHub Foundations',
    issuer: 'GitHub',
    date: 'June 2026',
    image: '/certs/github-foundations.png',
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
            <span className="font-mono text-matrix text-sm">04.</span>
            <DecryptText as="h2" text="Certifications" className="text-3xl sm:text-4xl font-display font-bold text-white" />
            <div className="flex-1 h-[1px] bg-dark-border ml-4" />
          </div>
          <p className="text-gray-500 font-mono text-sm mt-2">// verified credentials</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert, i) => (
            <motion.a
              key={cert.title + cert.issuer}
              href={cert.image}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`cursor-target group glass-card block rounded-xl border ${cert.accent.split(' ')[0]} overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)]`}
            >
              {/* Certificate image */}
              <div className="relative overflow-hidden border-b border-dark-border bg-white/[0.02]">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  loading="lazy"
                  className="h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-card/80 to-transparent opacity-60" />
                <div className="absolute right-2 top-2 rounded-md bg-black/60 p-1.5 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <ExternalLink className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
              {/* Details */}
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div className={cert.accent.split(' ')[1]}>{cert.logo}</div>
                </div>
                <h3 className="text-sm font-semibold leading-snug text-white">{cert.title}</h3>
                <p className="mt-1.5 text-xs text-gray-400">{cert.issuer}</p>
                <p className="mt-2 font-mono text-xs text-gray-600">{cert.date}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
