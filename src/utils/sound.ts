// Procedural UI sound engine using the Web Audio API (no audio files).
// A single AudioContext is lazily created on the first user gesture,
// since browsers block audio until the user interacts with the page.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.12; // keep everything subtle
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

interface ToneOptions {
  freq: number;
  type?: OscillatorType;
  duration?: number;
  gain?: number;
  sweepTo?: number;
}

function tone({ freq, type = 'sine', duration = 0.09, gain = 1, sweepTo }: ToneOptions) {
  const audio = ensureContext();
  if (!audio || !master) return;

  const osc = audio.createOscillator();
  const env = audio.createGain();
  const now = audio.currentTime;

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, now + duration);

  env.gain.setValueAtTime(0.0001, now);
  env.gain.exponentialRampToValueAtTime(gain, now + 0.008);
  env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(env);
  env.connect(master);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export const sound = {
  hover() {
    tone({ freq: 620, type: 'sine', duration: 0.045, gain: 0.5 });
  },
  click() {
    tone({ freq: 300, type: 'square', duration: 0.06, gain: 0.6, sweepTo: 520 });
  },
  open() {
    tone({ freq: 420, type: 'triangle', duration: 0.12, gain: 0.7, sweepTo: 720 });
  },
  close() {
    tone({ freq: 520, type: 'triangle', duration: 0.1, gain: 0.6, sweepTo: 260 });
  },
  boot() {
    const audio = ensureContext();
    if (!audio) return;
    // Low power-on hum rising into a soft chime
    tone({ freq: 90, type: 'sawtooth', duration: 0.5, gain: 0.5, sweepTo: 240 });
    window.setTimeout(() => tone({ freq: 880, type: 'sine', duration: 0.18, gain: 0.5 }), 380);
  },
  type() {
    tone({ freq: 1200 + Math.random() * 400, type: 'square', duration: 0.02, gain: 0.25 });
  },
};

// Attach subtle sounds globally to interactive elements.
export function initGlobalSounds() {
  if (typeof window === 'undefined') return;

  const isInteractive = (el: Element | null) =>
    el?.closest('a, button, [data-sound]');

  document.addEventListener(
    'pointerover',
    (e) => {
      const target = isInteractive(e.target as Element);
      if (target) sound.hover();
    },
    { passive: true }
  );

  document.addEventListener(
    'pointerdown',
    (e) => {
      const target = isInteractive(e.target as Element);
      if (target) sound.click();
    },
    { passive: true }
  );
}
