import { useEffect, useRef, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface DecryptTextProps {
  text: string;
  className?: string;
  /** ms between reveal steps */
  speed?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

// Reveals text with a "decrypting" scramble effect the first time it
// scrolls into view. Each character locks in left-to-right while the
// unresolved tail keeps flickering through random glyphs.
export default function DecryptText({ text, className, speed = 28, as = 'span' }: DecryptTextProps) {
  const [output, setOutput] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setOutput(text);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            run();
          }
        });
      },
      { threshold: 0.4 }
    );

    let revealed = 0;
    let raf = 0;
    let last = 0;

    const frame = (time: number) => {
      if (time - last >= speed) {
        last = time;
        revealed += 1;
        const next = text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < revealed) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');
        setOutput(next);
      }
      if (revealed <= text.length) raf = requestAnimationFrame(frame);
      else setOutput(text);
    };

    const run = () => {
      raf = requestAnimationFrame(frame);
    };

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, speed]);

  const Tag = as;
  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className} aria-label={text}>
      {output}
    </Tag>
  );
}
