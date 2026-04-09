# Aryan Rawat Portfolio — Project Context

> This file is auto-loaded by Claude Code. It contains the latest state of the codebase so every new conversation starts with full context. **Update this file whenever code changes.**

---

## Owner

**Aryan Rawat** — Data Scientist at Bristol Myers Squibb (Apr 2025–Present, Hyderabad, India).
B.Tech CSE (Cloud), SRM Chennai '23, 8.89 CGPA. Prior: Comviva Technologies, Tech Mahindra.

**Working style:** Autonomous work preferred. Don't ask questions the code already answers. Use 3-agent pattern (reviewer + implementer + orchestrator) for substantial work. Push to GitHub after changes.

---

## Live Site & Deployment

- **URL:** https://aryanrawat.vercel.app
- **Repo:** https://github.com/AryanRawat2001/Aryan_Website
- **Platform:** Vercel (free tier), auto-deploys on push to `main`
- **Branch:** `main`

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Exo 2 (headings) · Inter (body) · Roboto Mono (code) |
| Images | Next.js `Image` component (all avatar usages) |
| Form | Formspree (`xeeprqgl`) |
| Analytics | @vercel/analytics |
| Deployment | Vercel |

---

## Design System

- **Background:** `navy` (#050510) — deep OLED black
- **Surfaces:** `surface` (#0d0d1a), `surface-2` (#14142a), `surface-3` (#1a1a35)
- **Accents:** `accent-blue` (#3B82F6), `accent-cyan` (#06B6D4), `accent-purple` (#8B5CF6)
- **Text:** `slate-100` to `slate-600` scale
- **CSS utils:** `.glow-blue`, `.gradient-text`, `.gradient-border`, `.min-h-dvh`, `.pb-safe` (in globals.css)
- **Status colors:** `emerald-400` for available/current/success indicators (only exception to blue/cyan/purple palette)
- **Error color:** `red-400` for form errors
- **Terminal dots:** Standard red/yellow/green convention in Hero code card

---

## File Structure

```
src/
├── app/
│   ├── globals.css           # Custom utilities, scrollbar, selection styles
│   ├── layout.tsx            # Fonts, metadata, JSON-LD, Analytics, favicon
│   ├── opengraph-image.tsx   # Dynamic OG image (edge runtime, 1200×630)
│   └── page.tsx              # Section composition + dividers
├── components/
│   ├── Navbar.tsx            # Floating glass navbar, scroll-spy, mobile menu + focus trap, 7 links
│   ├── Hero.tsx              # Particles, text scramble, magnetic buttons, code card, parallax
│   ├── About.tsx             # Bio, quick facts, BMS badge, approach items
│   ├── Skills.tsx            # Bento grid, radial proficiency rings, 20 tools
│   ├── DataVisualization.tsx # Neural network canvas animation (aria-hidden)
│   ├── Experience.tsx        # Timeline: BMS, Comviva, Tech Mahindra + animated counter
│   ├── Projects.tsx          # 4 cards, 3D tilt, glassmorphism, all GitHub → AryanRawat2001
│   ├── Credentials.tsx       # 8 certs + IEEE publication
│   ├── Interests.tsx         # 7 hobbies, brand-consistent colors
│   ├── Contact.tsx           # Formspree form, error clear on input, disabled during send
│   ├── Footer.tsx            # Avatar, 7 nav links, socials
│   ├── ParticleNetwork.tsx   # Canvas particles, IntersectionObserver, GPU-composited
│   ├── SectionDivider.tsx    # 3 variants: gradient, dots, wave
│   ├── PageLoader.tsx        # 1.8s cinematic intro (logo + gradient bar)
│   └── ScrollToTop.tsx       # Floating button, progress ring, optimized re-renders
└── lib/
    ├── scroll.ts             # Shared scrollToSection() — used by Hero, Navbar, Footer
    └── utils.ts              # cn() Tailwind class merging
```

---

## Page Composition (page.tsx)

```
PageLoader → Navbar → Hero
  gradient divider
About
  dots divider
Skills → DataVisualization
  wave divider
Experience
  dots divider
Projects
  gradient divider
Credentials
  wave divider
Interests
  gradient divider
Contact → Footer → ScrollToTop
```

**Section numbering:** 01 About · 02 Skills · 03 Experience · 04 Projects · 05 Credentials · 06 Interests · 07 Contact

**Divider pattern:** gradient → dots → wave → dots → gradient → wave → gradient (no adjacent duplicates)

---

## Key Implementation Details

- **All components are `'use client'`** (Framer Motion requires it)
- **Viewport:** `viewportFit: 'cover'` enables safe area insets on notched phones
- **Safe area insets:** Navbar, Hero padding, ScrollToTop, and Footer use `env(safe-area-inset-*)` for notched device support
- **Navbar positioning:** `top-[calc(1rem+env(safe-area-inset-top,0px))]` — clears notch on modern iPhones
- **Navbar delay:** 2.4s to sync with PageLoader (1.8s + 0.6s fade)
- **Navbar background:** 70% opacity when not scrolled, 80% when scrolled
- **Hero min-height:** Uses custom `min-h-dvh` utility (100dvh with 100vh fallback) to account for mobile browser chrome
- **Hero padding:** `pt-[calc(7rem+env(safe-area-inset-top,0px))]` — safe-area-aware
- **Hero parallax:** `useMotionValue` + `useSpring` (stiffness:60, damping:20)
- **ParticleNetwork:** Squared-distance optimization, DPR capped at 2, IntersectionObserver-gated
- **AnimatedCounter:** requestAnimationFrame with proper `cancelAnimationFrame` cleanup
- **DataVisualization:** `animationId` initialized to 0, respects `prefers-reduced-motion`
- **ScrollToTop:** Only re-renders when visibility actually changes (prev !== shouldShow); uses safe-area-inset-bottom
- **Footer:** `pb-safe` class for home indicator bar clearance on notched phones
- **Contact form:** Error clears on input change, all inputs disabled during submission
- **Scrollbar:** Webkit `::-webkit-scrollbar` + standard `scrollbar-width: thin` / `scrollbar-color` for Firefox/Windows
- **All sections use py-28** for consistent vertical rhythm (including DataVisualization)

---

## SEO & Metadata

- **metadataBase:** `https://aryanrawat.vercel.app`
- **Viewport:** `width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover` (via `export const viewport`)
- **Theme color:** `#050510` (via viewport export, not metadata.other)
- **Canonical URL:** `/` (via alternates)
- **OpenGraph:** Title, description, type, url configured
- **OG Image:** Dynamic via `opengraph-image.tsx` (edge runtime, 1200×630, gradient + avatar + skills)
- **Favicon:** `/avatar.jpeg` via `metadata.icons`
- **JSON-LD:** Person schema with name, jobTitle, url, worksFor, email, sameAs (GitHub + LinkedIn), knowsAbout
- **Analytics:** `@vercel/analytics` integrated in layout.tsx

---

## Personal Details in Code

| Field | Value |
|-------|-------|
| Email | aryanrawat2001@gmail.com |
| Phone | +91 9974245370 |
| GitHub | https://github.com/AryanRawat2001/ |
| LinkedIn | https://www.linkedin.com/in/aryan-rawat-58551618b/ |
| Formspree | https://formspree.io/f/xeeprqgl |

---

## Performance & Cross-Platform

- **Bundle:** 158 kB first load JS, zero build errors
- **Optimizations:** Canvas IntersectionObserver, squared-distance (no Math.sqrt), GPU compositing, requestAnimationFrame debounced resize, `prefers-reduced-motion` respected, Next.js `Image` for avatar optimization
- **Mobile safe areas:** `viewport-fit: cover` + `env(safe-area-inset-*)` on Navbar, Hero, ScrollToTop, Footer
- **Mobile viewport:** `min-h-dvh` utility (100dvh with 100vh fallback) for accurate mobile viewport height
- **Cross-platform scrollbar:** Webkit pseudo-elements + standard `scrollbar-width`/`scrollbar-color` for Firefox/Windows
- **Responsive grids:** Skills uses `lg:grid-cols-3`, Interests uses `md:grid-cols-3 lg:grid-cols-4` — tuned for Windows 13" at 150% scaling (~1263px CSS width)

---

## Known Placeholders & Remaining Work

- `/public/resume.pdf` — **0 bytes placeholder**, needs actual resume

---

## Rules

- **Never re-add a custom cursor** — tried 3 iterations, all caused lag
- **Always push to GitHub** after changes (auto-deploys to Vercel)
- **Read all component files** before starting work — don't ask questions the code answers
- **Update this CLAUDE.md** after any code changes to keep context current
- **Section numbering must stay sequential** 01-07
- **Color palette:** accent-blue/cyan/purple only (emerald only for status indicators)
- **All sections use py-28** for spacing consistency
- **Safe area insets are required** on all fixed/sticky elements — use `env(safe-area-inset-*)` with `calc()`
- **Use `min-h-dvh` not `min-h-screen`** for full-viewport sections to avoid mobile browser chrome issues
- **Breakpoints must work at ~1263px CSS width** (Windows 13" at 1920×1080 + 150% scaling + scrollbar)

---

## Build & Dev

```bash
npm run dev          # Dev server → http://localhost:3000
npm run build        # Production build (verify zero errors)
npx tsc --noEmit     # Type-check only
git push origin main # Triggers Vercel auto-deploy
```

---

*Last updated: 2026-04-09 — Build: 158 kB, zero errors, cross-platform safe areas + responsive grid fixes*
