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

const skillCategories = [
  {
    title: 'Languages',
    icon: <Code2 className="w-5 h-5 text-matrix" />,
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
    icon: <Server className="w-5 h-5 text-cyber-cyan" />,
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
    icon: <Database className="w-5 h-5 text-cyber-purple" />,
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
    icon: <Wrench className="w-5 h-5 text-yellow-400" />,
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
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Skills & Tech</h2>
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
              className="glass-card spotlight-card rounded-2xl p-6 group hover:border-matrix/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                {category.icon}
                <h3 className="text-lg font-display font-semibold text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: catIndex * 0.15 + skillIndex * 0.05 + 0.3 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-surface border border-dark-border hover:border-matrix/40 transition-all"
                  >
                    <skill.Icon className="w-4 h-4 text-matrix" />
                    <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 glass-card rounded-2xl p-6"
        >
          <h3 className="font-mono text-sm text-gray-500 mb-4">
            <span className="text-matrix animate-pulse">&#9679;</span> currently_learning
          </h3>
          <div className="flex flex-wrap gap-3">
            {['Data Structures', 'Algorithms', 'System Design', 'Operating Systems', 'Distributed Systems'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-matrix/5 border border-matrix/20 text-sm text-matrix font-mono hover:bg-matrix/10 hover:border-matrix/40 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
