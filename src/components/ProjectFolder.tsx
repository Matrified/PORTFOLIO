import { useRef, type ReactNode } from 'react';
import './ProjectFolder.css';

interface ProjectFolderProps {
  title: string;
  color: string;
  icon: ReactNode;
  papers: ReactNode[];  // tech tags
  year: string;
  onOpen: () => void;
}

// A folder-SHAPED card (tab + body) with the project logo clearly on the front.
// Pops toward the screen and tilts in 3D toward the cursor on hover.
export default function ProjectFolder({ title, color, icon, papers, year, onOpen }: ProjectFolderProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const tags = papers.slice(0, 3);

  const handleMove = (e: React.MouseEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--rx', `${(0.5 - py) * 16}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * 16}deg`);
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
        className="folder-card cursor-target"
        style={{ ['--folder-color' as string]: color }}
        onClick={onOpen}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
        role="button"
        tabIndex={0}
        aria-label={`Open ${title}`}
      >
        <span className="folder-card__tab" />
        <div className="folder-card__body">
          <div className="folder-card__logo">{icon}</div>
          <h3 className="folder-card__title">{title}</h3>
          <span className="folder-card__year">{year}</span>
          <div className="folder-card__tags">
            {tags.map((t, i) => (
              <span key={i} className="folder-card__tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
