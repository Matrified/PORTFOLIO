import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';
import { ExternalLink, Play, X, Route, Swords, MessageSquareText } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import DecryptText from './DecryptText';
import ProjectFolder from './ProjectFolder';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  highlights: string[];
  tech: string[];
  language: string;
  github: string;
  demo?: string;
  category: string;
  maturity: string;
  year: string;
  gradient: string;
  folderColor: string;
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Voidfall',
    description: 'A natural-language RPG engine where a deterministic engine — not the AI — holds authority over the game world',
    longDescription: 'A natural-language RPG engine where a deterministic Python engine holds sole authority over game state, using an LLM (OpenAI, Gemini, or local Ollama) only to narrate outcomes. This split of authority means the AI can never invent items, contradict world state, or overrule combat and quest logic.',
    highlights: [
      'Entity Component System with a custom SplitMix64 RNG serialized as (seed, cursor) for fully reproducible runs',
      'Property-based tests (pytest + hypothesis) verifying save/load round-trip equality and deterministic combat',
      'FastAPI backend with JWT auth, per-user cloud saves, and Redis-backed caching with read-through invalidation',
      '3 self-contained playable story campaigns on one shared engine, each with unique rooms, enemies, and quests',
      'React 18/TypeScript frontend with a custom vector-to-ASCII scene renderer and a procedural Web Audio sound engine',
    ],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'React', 'TypeScript', 'pytest'],
    language: 'Python',
    github: 'https://github.com/Matrified/Voidfall-Natural-Language-RPG-Engine',
    category: 'Full-Stack',
    maturity: 'Personal Project',
    year: '2026',
    gradient: 'from-purple-700 to-indigo-600',
    folderColor: '#7c5cff',
    icon: <Swords className="w-16 h-16" />,
  },
  {
    id: 2,
    title: 'RouteWise',
    description: 'A multi-stop route optimizer for the Klang Valley built on real road data, not straight-line guesses',
    longDescription: 'A full-stack route planning tool for multi-stop trips around Kuala Lumpur and the Klang Valley. Solves the actual vehicle routing problem with Google OR-Tools using real driving/cycling/walking times pulled from OSRM for every stop pair, instead of straight-line approximations.',
    highlights: [
      '3 trip modes (round trip, one-way, fixed start/end) with workload balancing across up to 5 vehicles',
      'Nearest-branch lookup that ranks locations by real travel time, not straight-line distance',
      'REST API with 8 endpoints covering optimization, strategy comparison, geocoding, and health checks',
      'Fully offline unit test suite (zero live network calls), with automatic fallback if the routing server is down',
      'Containerized with Docker and gunicorn for production deployment',
    ],
    tech: ['Python', 'Flask', 'Google OR-Tools', 'OSRM', 'Docker'],
    language: 'Python',
    github: 'https://github.com/Matrified/RouteWise-Route-Optimizer',
    category: 'Full-Stack',
    maturity: 'Personal Project',
    year: '2026',
    gradient: 'from-emerald-600 to-teal-600',
    folderColor: '#10b981',
    icon: <Route className="w-16 h-16" />,
  },
  {
    id: 3,
    title: 'PrepAI',
    description: 'An AI-driven mock interview platform that generates tailored technical questions on the fly',
    longDescription: 'An interactive, AI-driven mock interview platform designed to help software engineers practice technical questions. Built with Next.js and powered by the Gemini API, the application dynamically generates interview questions tailored to a candidate\u2019s chosen topic and difficulty level.',
    highlights: [
      'Dynamic question generation via the Gemini API, tailored to topic and difficulty',
      'Next.js frontend with serverless API routes handling real-time generation',
      'Deployed live on Vercel',
    ],
    tech: ['Next.js', 'TypeScript', 'Gemini API'],
    language: 'TypeScript',
    github: 'https://github.com/Matrified/PrepAI',
    demo: 'https://prep-ai-ten-lake.vercel.app/',
    category: 'Frontend',
    maturity: 'Personal Project',
    year: '2026',
    gradient: 'from-green-600 to-emerald-500',
    folderColor: '#00d4ff',
    icon: <MessageSquareText className="w-16 h-16" />,
  },
];

const categories = ['All', 'Full-Stack', 'Frontend'];

export default function NetflixProjects() {
  const { ref, isInView } = useInView(0.1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-matrix text-sm">03.</span>
            <DecryptText as="h2" text="Featured Projects" className="text-3xl sm:text-4xl font-display font-bold text-white" />
            <div className="flex-1 h-[1px] bg-dark-border ml-4" />
          </div>
          <p className="text-gray-500 font-mono text-sm mt-2">// things I've built end to end</p>

          {/* Category tabs */}
          <div className="flex items-center gap-3 mt-6 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-mono whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-black'
                    : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Folders */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <ProjectFolder
                title={project.title}
                year={project.year}
                color={project.folderColor}
                icon={project.icon}
                onOpen={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </div>

        {/* View all on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Matrified"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-matrix/30 text-matrix font-mono text-sm hover:bg-matrix/10 hover:border-matrix/60 transition-all"
          >
            <SiGithub className="w-4 h-4" />
            View All on GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-netflix-dark rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`relative h-56 bg-gradient-to-br ${selectedProject.gradient}`}>
                <div className="absolute inset-0 flex items-center justify-center text-white/90">
                  {selectedProject.icon}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-display font-bold text-white">{selectedProject.title}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-gray-400 text-sm">{selectedProject.year}</span>
                    <span className="px-1.5 py-0.5 rounded text-xs border border-gray-500 text-gray-300">{selectedProject.maturity}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex gap-4">
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                    >
                      <Play className="w-5 h-5" fill="black" />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-700/50 text-white hover:bg-gray-700 transition-colors"
                  >
                    <SiGithub className="w-5 h-5" />
                    GitHub
                  </a>
                </div>

                <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>

                <div>
                  <h4 className="text-sm font-mono text-gray-500 mb-3">Highlights</h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h) => (
                      <li key={h} className="text-sm text-gray-300 leading-relaxed flex gap-2">
                        <span className="text-matrix mt-1">&#8226;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-mono text-gray-500 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-lg bg-dark-surface text-sm text-matrix font-mono border border-dark-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
