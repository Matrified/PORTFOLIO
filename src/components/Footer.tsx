import { Terminal, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-dark-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-matrix" />
            <span className="font-mono text-sm text-gray-400">
              hadi<span className="text-matrix">.</span>dev
            </span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>by Hadi Abdulla</span>
            <span className="text-matrix mx-1">•</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Tech stack */}
          <div className="flex items-center gap-2">
            {['React', 'TypeScript', 'Tailwind'].map((tech) => (
              <span key={tech} className="px-2 py-1 text-[10px] font-mono text-gray-500 bg-dark-surface rounded border border-dark-border">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ASCII art footer */}
        <div className="mt-8 text-center">
          <pre className="font-mono text-[8px] sm:text-[10px] text-matrix/30 leading-tight inline-block">
{`
 _   _           _ _   ____             
| | | | __ _  __| (_) |  _ \\  _____   __
| |_| |/ _\` |/ _\` | | | | | |/ _ \\ \\ / /
|  _  | (_| | (_| | |_| |_| |  __/\\ V / 
|_| |_|\\__,_|\\__,_|_(_)____/ \\___| \\_/  
`}
          </pre>
        </div>
      </div>
    </footer>
  );
}
