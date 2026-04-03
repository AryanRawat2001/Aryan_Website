# Aryan Rawat — Data Scientist Portfolio

A premium, dark-themed portfolio website built with Next.js 14, showcasing my work as a Data Scientist at Bristol Myers Squibb.

**Live:** [aryanrawat.vercel.app](https://aryanrawat.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0050?logo=framer&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)

---

## Preview

> Dark OLED theme with particle networks, text scramble effects, magnetic buttons, 3D card tilts, and scroll-driven parallax.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Fonts** | Exo 2 · Inter · Roboto Mono |
| **Form** | Formspree |
| **Deployment** | Vercel |

---

## Features

- **Particle Network** — Interactive canvas with mouse-reactive connections, IntersectionObserver-gated for performance
- **Text Scramble** — Cinematic name reveal with randomized character cycling
- **Magnetic Buttons** — Spring-physics hover effect on CTAs
- **3D Project Cards** — Perspective tilt on hover with glassmorphism
- **Neural Network Visualization** — Animated canvas showing data flow through network layers
- **Scroll-Driven Parallax** — Background orbs that shift with scroll position
- **Scroll-Spy Navbar** — Active section tracking with animated underline indicator and progress bar
- **Cinematic Page Loader** — Logo bounce + gradient bar intro sequence
- **Responsive** — Fully responsive from mobile to 4K
- **Accessible** — Reduced motion support, ARIA labels, keyboard navigation

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| — | Hero | Particle network, role cycling, code card, profile photo |
| 01 | About | Bio, quick facts, current role at BMS |
| 02 | Skills | Bento grid with radial proficiency rings |
| — | Data Viz | Animated neural network canvas |
| 03 | Experience | Timeline with BMS, Comviva, Tech Mahindra |
| 04 | Projects | 4 featured projects with 3D tilt cards |
| 05 | Credentials | 8 certifications + IEEE publication |
| 06 | Interests | 7 hobbies — gaming, trekking, travel, etc. |
| 07 | Contact | Formspree-powered contact form |

---

## Getting Started

```bash
# Clone
git clone https://github.com/AryanRawat2001/Aryan_Website.git
cd Aryan_Website

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata, JSON-LD
│   └── page.tsx            # Page composition
├── components/
│   ├── Hero.tsx            # Landing section with particles + scramble
│   ├── Navbar.tsx          # Floating navbar with scroll-spy
│   ├── About.tsx           # Bio and quick facts
│   ├── Skills.tsx          # Bento grid with radial rings
│   ├── DataVisualization.tsx # Neural network canvas
│   ├── Experience.tsx      # Animated timeline
│   ├── Projects.tsx        # 3D tilt project cards
│   ├── Credentials.tsx     # Certifications + publication
│   ├── Interests.tsx       # Hobbies section
│   ├── Contact.tsx         # Formspree contact form
│   ├── Footer.tsx          # Footer with nav + socials
│   ├── ParticleNetwork.tsx # Interactive canvas particles
│   ├── SectionDivider.tsx  # 3 variants: gradient/dots/wave
│   ├── PageLoader.tsx      # Cinematic intro loader
│   └── ScrollToTop.tsx     # Floating button with progress ring
└── lib/
    ├── scroll.ts           # Shared scroll-to-section utility
    └── utils.ts            # Tailwind class merging
```

---

## Performance

- **153 kB** first load JS
- Zero build errors
- Canvas animations gated by IntersectionObserver
- GPU-composited layers with `will-change` hints
- Squared-distance optimization (no `Math.sqrt` in hot loops)
- `prefers-reduced-motion` respected

---

## Connect

- **Email:** aryanrawat2001@gmail.com
- **LinkedIn:** [aryan-rawat-58551618b](https://www.linkedin.com/in/aryan-rawat-58551618b/)
- **GitHub:** [AryanRawat2001](https://github.com/AryanRawat2001/)

---

Built with Next.js · Tailwind · Framer Motion
