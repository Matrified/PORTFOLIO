import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\+=_-~`!@#$%^&*()';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    // Randomize starting positions
    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Lead character is bright
        if (drops[i] > 0) {
          ctx.fillStyle = '#fff';
          ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
          ctx.fillText(char, x, y);

          // Trail characters
          ctx.fillStyle = `rgba(0, 255, 65, ${0.6 + Math.random() * 0.4})`;
          ctx.fillText(charArray[Math.floor(Math.random() * charArray.length)], x, y - fontSize);
          
          ctx.fillStyle = `rgba(0, 255, 65, ${0.3 + Math.random() * 0.3})`;
          ctx.fillText(charArray[Math.floor(Math.random() * charArray.length)], x, y - fontSize * 2);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  );
}
