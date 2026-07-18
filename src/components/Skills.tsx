import { motion } from 'framer-motion';
import { useInView } from './useInView';
import {
  SiPython, SiCplusplus, SiTypescript,
  SiHtml5, SiCss3, SiReact, SiNextdotjs, SiVite,
  SiFlask, SiFastapi, SiJsonwebtokens, SiPydantic, SiSqlalchemy,
  SiPostgresql, SiSqlite, SiRedis, SiDocker,
  SiGit, SiGithubactions, SiPytest, SiEslint, SiOpenai, SiGooglegemini,
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import { Code2, Server, Database, Wrench } from 'lucide-react';
import DecryptText from './DecryptText';
import LogoMarquee from './LogoMarquee';

const skillCategories = [
  {
    title: 'Languages',
    icon: <Code2 className="w-5 h-5" />,
    accent: {
      icon: 'text-matrix',
      title: 'text-matrix',
      cardBorder: 'border-matrix/30 hover:border-matrix/70',
      cardBg: 'bg-matrix/[0.04]',
      rgb: '0,255,65',
      cardGlow: '',
      chip: 'border-matrix/25 text-matrix hover:border-matrix/60 hover:bg-matrix/10',
    },
    skills: [
      { name: 'Python', Icon: SiPython },
      { name: 'Java', Icon: FaJava },
      { name: 'C++', Icon: SiCplusplus },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'HTML5', Icon: SiHtml5 },
      { name: 'CSS3', Icon: SiCss3 },
    ],
  },
  {
    title: 'Frameworks & Frontend',
    icon: <Server className="w-5 h-5" />,
    accent: {
      icon: 'text-cyber-cyan',
      title: 'text-cyber-cyan',
      cardBorder: 'border-cyber-cyan/30 hover:border-cyber-cyan/70',
      cardBg: 'bg-cyber-cyan/[0.04]',
      rgb: '0,212,255',
      cardGlow: '',
      chip: 'border-cyber-cyan/25 text-cyber-cyan hover:border-cyber-cyan/60 hover:bg-cyber-cyan/10',
    },
    skills: [
      { name: 'React', Icon: SiReact },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'Vite', Icon: SiVite },
      { name: 'Flask', Icon: SiFlask },
      { name: 'FastAPI', Icon: SiFastapi },
    ],
  },
  {
    title: 'Data & APIs',
    icon: <Database className="w-5 h-5" />,
    accent: {
      icon: 'text-cyber-purple',
      title: 'text-cyber-purple',
      cardBorder: 'border-cyber-purple/35 hover:border-cyber-purple/70',
      cardBg: 'bg-cyber-purple/[0.05]',
      rgb: '177,74,237',
      cardGlow: '',
      chip: 'border-cyber-purple/30 text-cyber-purple hover:border-cyber-purple/60 hover:bg-cyber-purple/10',
    },
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'SQLite', Icon: SiSqlite },
      { name: 'Redis', Icon: SiRedis },
      { name: 'SQLAlchemy', Icon: SiSqlalchemy },
      { name: 'Pydantic', Icon: SiPydantic },
      { name: 'JWT Auth', Icon: SiJsonwebtokens },
      { name: 'OpenAI API', Icon: SiOpenai },
      { name: 'Gemini API', Icon: SiGooglegemini },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: <Wrench className="w-5 h-5" />,
    accent: {
      icon: 'text-yellow-400',
      title: 'text-yellow-400',
      cardBorder: 'border-yellow-400/30 hover:border-yellow-400/70',
      cardBg: 'bg-yellow-400/[0.04]',
      rgb: '250,204,21',
      magic: true,
      cardGlow: '',
      chip: 'border-yellow-400/25 text-yellow-300 hover:border-yellow-400/60 hover:bg-yellow-400/10',
    },
    skills: [
      { name: 'Git', Icon: SiGit },
      { name: 'Docker', Icon: SiDocker },
      { name: 'GitHub Actions', Icon: SiGithubactions },
      { name: 'pytest', Icon: SiPytest },
      { name: 'ESLint', Icon: SiEslint },
      { name: 'Cloud (AWS)', Icon: FaAws },
    ],
  },
];

export default function Skills() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-matrix/3 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyber-cyan/3 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-matrix text-sm">02.</span>
            <DecryptText as="h2" text="Skills & Tech" className="text-3xl sm:text-4xl font-display font-bold text-white" />
            <div className="flex-1 h-[1px] bg-dark-border ml-4" />
          </div>
          <p className="text-gray-500 font-mono text-sm mt-2">// my technical toolkit</p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              style={{ boxShadow: `0 0 24px rgba(${category.accent.rgb},0.10), inset 0 0 22px rgba(${category.accent.rgb},0.05)` }}
              className={`spotlight-card dot-grid rounded-2xl p-6 group border backdrop-blur-md transition-all hover:-translate-y-1 ${category.accent.cardBorder} ${category.accent.cardBg} ${(category.accent as { magic?: boolean }).magic ? 'magic-edge' : ''}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className={category.accent.icon}>{category.icon}</span>
                <h3 className={`text-lg font-display font-semibold ${category.accent.title}`}>{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: catIndex * 0.15 + skillIndex * 0.05 + 0.3 }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-surface border transition-all ${category.accent.chip}`}
                  >
                    <skill.Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8"
        >
          <LogoMarquee />
        </motion.div>
      </div>
    </section>
  );
}
