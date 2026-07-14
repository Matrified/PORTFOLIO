import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const points = Array.from({ length: 6 }, () => ({ x, y }));
    let frame = 0;

    const move = (event: MouseEvent) => { x = event.clientX; y = event.clientY; };
    const animate = () => {
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${x - 220}px, ${y - 220}px, 0)`;
      points.forEach((point, index) => {
        const leader = index === 0 ? { x, y } : points[index - 1];
        point.x += (leader.x - point.x) * 0.32;
        point.y += (leader.y - point.y) * 0.32;
        const dot = dotRefs.current[index];
        if (dot) dot.style.transform = `translate3d(${point.x - 2}px, ${point.y - 2}px, 0) scale(${1 - index * 0.11})`;
      });
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', move, { passive: true });
    frame = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden md:block" aria-hidden="true">
      <div ref={glowRef} className="absolute h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(0,255,65,.07),transparent_67%)] will-change-transform" />
      {Array.from({ length: 6 }, (_, index) => <span key={index} ref={node => { dotRefs.current[index] = node; }} className="absolute left-0 top-0 h-1 w-1 rounded-full bg-matrix will-change-transform" style={{ opacity: (6 - index) / 12 }} />)}
    </div>
  );
}
