import { useRef, type ReactNode } from 'react';
import './ProjectFolder.css';

interface ProjectFolderProps {
  title: string;
  color: string;          // folder accent color
  icon: ReactNode;        // logo on the front
  papers: ReactNode[];    // up to 3 tech tags shown as peeking papers
  year: string;
  onOpen: () => void;
}

// A folder card that pops toward the screen and tilts in 3D toward the cursor
// on hover. The project logo sits on the front flap.
export default function ProjectFolder({ title, color, icon, papers, year, onOpen }: ProjectFolderProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const items = papers.slice(0, 3);
  while (items.length < 3) items.push(null);

  const darken = (hex: string, p: number) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    const n = parseInt(c, 16);
    const r = Math.max(0, Math.floor(((n >> 16) & 255) * (1 - p)));
    const g = Math.max(0, Math.floor(((n >> 8) & 255) * (1 - p)));
    const b = Math.max(0, Math.floor((n & 255) * (1 - p)));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const handleMove = (e: React.MouseEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotX = (0.5 - py) * 22;
    const rotY = (px - 0.5) * 22;
    el.style.setProperty('--rx', `${rotX}deg`);
    el.style.setProperty('--ry', `${rotY}deg`);
  };
  const reset = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="folder-stage" ref={stageRef} onMouseMove={handleMove} onMouseLeave={reset}>
      <div
        className="project-folder cursor-target"
        style={{
          // @ts-expect-error custom props
          '--folder-color': color,
          '--folder-back': darken(color, 0.15),
        }}
        onClick={onOpen}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
        role="button"
        tabIndex={0}
        aria-label={`Open ${title}`}
      >
        <div className="project-folder__back">
          {items.map((item, i) => (
            <div key={i} className={`project-paper project-paper-${i + 1}`}>{item}</div>
          ))}
          <div className="project-folder__front">
            <div className="project-folder__logo">{icon}</div>
          </div>
          <div className="project-folder__front right" />
        </div>
      </div>

      <div className="mt-4 text-center">
        <h3 className="font-display text-lg font-bold text-white">{title}</h3>
        <span className="font-mono text-xs text-gray-500">{year}</span>
      </div>
    </div>
  );
}
