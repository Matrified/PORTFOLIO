# Hadi Abdulla — Portfolio

<img width="2553" height="1303" alt="Screenshot 2026-07-17 002850" src="https://github.com/user-attachments/assets/2c0fb88f-498e-4f4f-a5bc-0571ceb26601" />


A personal developer portfolio with a terminal / cyber aesthetic — matrix rain,
a scanning radar, decrypting section headings, mouse-tracking 3D project cards,
a `Ctrl + K` command palette, and procedural UI sounds.

**Live site:** [hadiabdulla.vercel.app](https://hadiabdulla.vercel.app/)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (single-file production build)
- **Tailwind CSS 4**
- **Framer Motion** for animations
- **Canvas 2D** for the matrix rain and radar
- **Web Audio API** for procedural UI sounds (no audio files)
- **lucide-react** and **react-icons** for icons

## Features

- Animated matrix-rain hero with a rotating role typewriter
- Decrypting scramble effect on section headings
- Netflix-style project browser with 3D cursor-tracking tilt cards
- Live canvas radar with a sweeping beam, blips, and scan/ping sounds
- Command palette (`Ctrl + K`) for quick navigation
- Scroll-progress HUD, custom cursor trail, and section transitions
- Procedural click and ambient sounds via the Web Audio API
- Downloadable resume and an interactive portfolio chatbot
- Fully responsive and respects `prefers-reduced-motion`

## Getting Started

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

## Build

```bash
npm run build     # outputs a single-file bundle to dist/
npm run preview   # preview the production build locally
```

## Deployment

Deployed on **Vercel** — every push to `main` triggers an automatic build and deploy.

## License

MIT
