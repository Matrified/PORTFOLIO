import { useState, type ReactNode } from 'react';
import './ProjectFolder.css';

interface ProjectFolderProps {
  title: string;
  color: string;          // folder accent color
  icon: ReactNode;        // logo on the front
  papers: ReactNode[];    // up to 3 items shown as papers
  year: string;
  onOpen: () => void;
}

// A 3D interactive folder card. Hover lifts and peeks the papers; click opens
// the project detail. The project logo sits on the folder's front flap.
export default function ProjectFolder({ title, color, icon, papers, year, onOpen }: ProjectFolderProps) {
  const [open, setOpen] = useState(false);
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

  return (
    <div className="flex flex-col items-center gap-5 py-6">
      <div
        className={`project-folder cursor-target ${open ? 'open' : ''}`}
        style={{
          // @ts-expect-error custom props
          '--folder-color': color,
          '--folder-back': darken(color, 0.15),
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={onOpen}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
        role="button"
        tabIndex={0}
        aria-label={`Open ${title}`}
      >
        <div className="project-folder__back">
          {items.map((item, i) => (
            <div key={i} className={`project-paper project-paper-${i + 1}`}>
              {item}
            </div>
          ))}
          <div className="project-folder__front">
            <div className="project-folder__logo">{icon}</div>
          </div>
          <div className="project-folder__front right" />
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-display text-lg font-bold text-white">{title}</h3>
        <span className="font-mono text-xs text-gray-500">{year}</span>
      </div>
    </div>
  );
}
