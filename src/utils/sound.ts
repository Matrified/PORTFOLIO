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
    master.gain.value = 0.16;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

// A crisp, tactile click: a short filtered noise transient + a soft body tone.
export function playClick() {
  const audio = ensureContext();
  if (!audio || !master) return;
  const now = audio.currentTime;

  // Noise transient (the "tick")
  const bufferSize = Math.floor(audio.sampleRate * 0.03);
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
  }
  const noise = audio.createBufferSource();
  noise.buffer = buffer;
  const hp = audio.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 1400;
  const noiseGain = audio.createGain();
  noiseGain.gain.setValueAtTime(0.5, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
  noise.connect(hp); hp.connect(noiseGain); noiseGain.connect(master);
  noise.start(now); noise.stop(now + 0.04);

  // Soft body tone
  const osc = audio.createOscillator();
  const env = audio.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(180, now);
  env.gain.setValueAtTime(0.0001, now);
  env.gain.exponentialRampToValueAtTime(0.35, now + 0.006);
  env.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
  osc.connect(env); env.connect(master);
  osc.start(now); osc.stop(now + 0.1);
}

// CRT power-on: a rising electrical hum that resolves into a soft high chime.
export function playBoot() {
  const audio = ensureContext();
  if (!audio || !master) return;
  const now = audio.currentTime;

  const osc = audio.createOscillator();
  const env = audio.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(70, now);
  osc.frequency.exponentialRampToValueAtTime(320, now + 0.35);
  const lp = audio.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(400, now);
  lp.frequency.exponentialRampToValueAtTime(2200, now + 0.35);
  env.gain.setValueAtTime(0.0001, now);
  env.gain.exponentialRampToValueAtTime(0.4, now + 0.05);
  env.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
  osc.connect(lp); lp.connect(env); env.connect(master);
  osc.start(now); osc.stop(now + 0.5);

  // Chime on "screen locked"
  const chime = audio.createOscillator();
  const chimeEnv = audio.createGain();
  chime.type = 'sine';
  chime.frequency.setValueAtTime(1320, now + 0.34);
  chimeEnv.gain.setValueAtTime(0.0001, now + 0.34);
  chimeEnv.gain.exponentialRampToValueAtTime(0.3, now + 0.36);
  chimeEnv.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
  chime.connect(chimeEnv); chimeEnv.connect(master);
  chime.start(now + 0.34); chime.stop(now + 0.62);
}

// Sonar ping: a clean sine with a slight downward pitch drop and long tail.
export function playRadarPing() {
  const audio = ensureContext();
  if (!audio || !master) return;
  const now = audio.currentTime;
  const osc = audio.createOscillator();
  const env = audio.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1000, now);
  osc.frequency.exponentialRampToValueAtTime(760, now + 0.4);
  env.gain.setValueAtTime(0.0001, now);
  env.gain.exponentialRampToValueAtTime(0.28, now + 0.02);
  env.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
  osc.connect(env); env.connect(master);
  osc.start(now); osc.stop(now + 0.6);
}

// Low ambient scanning hum, looped while the radar is on screen.
let ambientOsc: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let ambientLfo: OscillatorNode | null = null;

export function startRadarAmbient() {
  const audio = ensureContext();
  if (!audio || !master || ambientOsc) return;
  const now = audio.currentTime;

  ambientOsc = audio.createOscillator();
  ambientGain = audio.createGain();
  ambientOsc.type = 'sine';
  ambientOsc.frequency.value = 58;

  // Slow tremolo so the hum "breathes" like scanning equipment.
  ambientLfo = audio.createOscillator();
  const lfoGain = audio.createGain();
  ambientLfo.frequency.value = 0.5;
  lfoGain.gain.value = 0.03;
  ambientLfo.connect(lfoGain);
  lfoGain.connect(ambientGain.gain);

  ambientGain.gain.setValueAtTime(0.0001, now);
  ambientGain.gain.exponentialRampToValueAtTime(0.06, now + 0.8);
  ambientOsc.connect(ambientGain);
  ambientGain.connect(master);
  ambientOsc.start(now);
  ambientLfo.start(now);
}

export function stopRadarAmbient() {
  const audio = ctx;
  if (!audio || !ambientOsc || !ambientGain) return;
  const now = audio.currentTime;
  ambientGain.gain.cancelScheduledValues(now);
  ambientGain.gain.setValueAtTime(ambientGain.gain.value, now);
  ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
  const osc = ambientOsc;
  const lfo = ambientLfo;
  window.setTimeout(() => {
    try { osc.stop(); lfo?.stop(); } catch { /* already stopped */ }
  }, 450);
  ambientOsc = null;
  ambientLfo = null;
  ambientGain = null;
}

// Attach the click sound to interactive elements. No hover sounds.
export function initGlobalSounds() {
  if (typeof window === 'undefined') return;
  document.addEventListener(
    'pointerdown',
    (e) => {
      const target = (e.target as Element)?.closest('a, button, [data-sound]');
      if (target) playClick();
    },
    { passive: true }
  );
}
