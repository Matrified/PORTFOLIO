import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Mail, MapPin, Send, ArrowUpRight } from 'lucide-react';
import Radar from './Radar';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Matrified',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: 'hover:text-white hover:border-white/40',
    description: '@Matrified',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/hadi-abdulla-586464324/',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: 'hover:text-blue-400 hover:border-blue-400/40',
    description: 'Connect with me',
  },
];

export default function Contact() {
  const { ref, isInView } = useInView(0.1);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`);
    window.open(`mailto:hadiabdulla464@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-matrix/3 rounded-full blur-[200px]" />

      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-matrix text-sm">06.</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-4">
            Let's <span className="text-gradient-matrix">Connect</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            Have a project, engineering challenge, or technical idea worth discussing?
            Send a message and I'll get back to you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Info cards */}
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-matrix/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-matrix" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-gray-400 text-sm">Cyberjaya, Malaysia</p>
                  <p className="text-gray-500 text-xs font-mono mt-1">Based in Cyberjaya</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-cyber-cyan" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-gray-400 text-sm">Reach out via the form</p>
                  <p className="text-gray-500 text-xs font-mono mt-1">Typically responds within 24h</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <h4 className="font-mono text-sm text-gray-500">
                <span className="text-matrix">#</span> find_me_online
              </h4>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 glass-card rounded-xl transition-all group ${link.color}`}
                >
                  <div className="text-gray-400 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{link.name}</div>
                    <div className="text-gray-500 text-xs">{link.description}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-current transition-colors" />
                </a>
              ))}
            </div>

            {/* Radar */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-mono text-sm text-gray-500"><span className="text-matrix">#</span> signal_radar</h4>
                <span className="font-mono text-[10px] text-matrix animate-pulse">ONLINE</span>
              </div>
              <Radar />
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2 pb-4 border-b border-dark-border">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 font-mono text-xs text-gray-500">contact_form.tsx</span>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2">
                  <span className="text-matrix">const</span> name <span className="text-matrix">=</span>
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Your Name"
                  required
                  className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-matrix/50 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2">
                  <span className="text-matrix">const</span> email <span className="text-matrix">=</span>
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-matrix/50 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2">
                  <span className="text-matrix">const</span> message <span className="text-matrix">=</span>
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Hey Hadi, I'd love to chat about..."
                  required
                  rows={5}
                  className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-matrix/50 transition-colors font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-matrix text-dark-bg font-mono font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] transition-all relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-matrix to-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  {sent ? '✓ Message Prepared!' : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
