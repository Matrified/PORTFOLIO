import type { ComponentType } from 'react';
import {
  SiPython, SiTypescript, SiReact, SiNextdotjs, SiVite,
  SiFlask, SiFastapi, SiPostgresql, SiRedis, SiDocker,
  SiGit, SiGithubactions, SiPytest, SiLinux, SiMysql,
  SiJavascript, SiPhp, SiNodedotjs, SiTailwindcss,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const logos: { Icon: ComponentType<{ className?: string }>; label: string }[] = [
  { Icon: SiPython, label: 'Python' },
  { Icon: FaJava, label: 'Java' },
  { Icon: SiTypescript, label: 'TypeScript' },
  { Icon: SiJavascript, label: 'JavaScript' },
  { Icon: SiPhp, label: 'PHP' },
  { Icon: SiReact, label: 'React' },
  { Icon: SiNextdotjs, label: 'Next.js' },
  { Icon: SiNodedotjs, label: 'Node.js' },
  { Icon: SiVite, label: 'Vite' },
  { Icon: SiTailwindcss, label: 'Tailwind' },
  { Icon: SiFlask, label: 'Flask' },
  { Icon: SiFastapi, label: 'FastAPI' },
  { Icon: SiPostgresql, label: 'PostgreSQL' },
  { Icon: SiMysql, label: 'MySQL' },
  { Icon: SiRedis, label: 'Redis' },
  { Icon: SiDocker, label: 'Docker' },
  { Icon: SiGithubactions, label: 'GitHub Actions' },
  { Icon: SiLinux, label: 'Linux' },
  { Icon: SiGit, label: 'Git' },
  { Icon: SiPytest, label: 'pytest' },
];

// Seamless infinite marquee (duplicated track, CSS translate loop).
export default function LogoMarquee() {
  return (
    <div className="logo-marquee group relative overflow-hidden">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-dark-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-dark-bg to-transparent" />

      <div className="logo-marquee-track flex w-max gap-10 py-2">
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 text-gray-500 transition-colors duration-300 hover:text-matrix"
          >
            <logo.Icon className="h-7 w-7" />
            <span className="font-mono text-sm">{logo.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
