import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Search, ArrowUpRight, FolderCode, UserRound, Mail, Award, BriefcaseBusiness } from 'lucide-react';

const actions = [
  { label: 'Open projects', hint: 'View engineering work', target: '#projects', icon: FolderCode },
  { label: 'Read about Hadi', hint: 'Background and focus', target: '#about', icon: UserRound },
  { label: 'View experience', hint: 'Professional field work', target: '#experience', icon: BriefcaseBusiness },
  { label: 'View certifications', hint: 'Credentials and simulations', target: '#certifications', icon: Award },
  { label: 'Start a conversation', hint: 'Contact Hadi', target: '#contact', icon: Mail },
  { label: 'Open GitHub', hint: 'github.com/Matrified', target: 'https://github.com/Matrified', icon: ArrowUpRight, external: true },
];

export default function CommandDeck() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const results = useMemo(() => actions.filter(action => `${action.label} ${action.hint}`.toLowerCase().includes(query.toLowerCase())), [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(value => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => setActive(0), [query]);

  const run = (index: number) => {
    const action = results[index];
    if (!action) return;
    if (action.external) window.open(action.target, '_blank', 'noopener,noreferrer');
    else document.querySelector(action.target)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
    setQuery('');
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 rounded-full border border-dark-border bg-black/70 px-4 py-2.5 font-mono text-xs text-gray-400 shadow-xl backdrop-blur-xl hover:border-matrix/40 hover:text-matrix transition-all">
        <Command className="w-4 h-4" /> Command deck <kbd className="rounded border border-dark-border bg-dark-surface px-1.5 py-0.5 text-[9px]">Ctrl K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 px-4 pt-[15vh] backdrop-blur-md" onClick={() => setOpen(false)}>
            <motion.div initial={{ opacity: 0, y: -24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.98 }} className="w-full max-w-xl overflow-hidden rounded-2xl border border-matrix/20 bg-[#080b09] shadow-[0_0_100px_rgba(0,255,65,0.12)]" onClick={event => event.stopPropagation()}>
              <div className="flex items-center gap-3 border-b border-dark-border px-5 py-4">
                <Search className="w-5 h-5 text-matrix" />
                <input autoFocus value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setActive(value => Math.min(value + 1, results.length - 1)); } if (event.key === 'ArrowUp') { event.preventDefault(); setActive(value => Math.max(value - 1, 0)); } if (event.key === 'Enter') run(active); }} placeholder="Navigate the system..." className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600" />
                <kbd className="rounded border border-dark-border px-2 py-1 font-mono text-[10px] text-gray-600">ESC</kbd>
              </div>

              <div className="p-2">
                {results.length ? results.map((action, index) => (
                  <button key={action.label} onMouseEnter={() => setActive(index)} onClick={() => run(index)} className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-all ${active === index ? 'bg-matrix/10 text-white' : 'text-gray-400 hover:bg-white/[0.03]'}`}>
                    <div className={`rounded-lg border p-2 ${active === index ? 'border-matrix/30 text-matrix' : 'border-dark-border text-gray-600'}`}><action.icon className="w-4 h-4" /></div>
                    <div className="flex-1"><div className="text-sm font-medium">{action.label}</div><div className="mt-0.5 text-xs text-gray-600">{action.hint}</div></div>
                    <span className="font-mono text-[10px] text-gray-700">0{index + 1}</span>
                  </button>
                )) : <div className="px-4 py-10 text-center font-mono text-sm text-gray-600">No command found.</div>}
              </div>
              <div className="flex items-center justify-between border-t border-dark-border bg-black/30 px-5 py-3 font-mono text-[10px] text-gray-700">
                <span>↑↓ navigate · enter execute</span><span>HADI_OS v2.0</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
