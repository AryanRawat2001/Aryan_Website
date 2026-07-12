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
| Framework | Next.js 14.2.35 (App Router) — keep on latest 14.2.x for security patches |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Exo 2 (headings, weights 400/600/700/800/900) · Inter (body) · Roboto Mono (code, weights 400/600) |
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
│   ├── layout.tsx            # Fonts, metadata, JSON-LD (escaped), Analytics, favicon
│   ├── opengraph-image.tsx   # Dynamic OG image (edge runtime, 1200×630)
│   ├── page.tsx              # Section composition + dividers, wrapped in MotionProvider
│   ├── robots.ts             # robots.txt route
│   └── sitemap.ts            # sitemap.xml route
├── components/
│   ├── Navbar.tsx            # Floating glass navbar, scroll-spy (mount-synced), mobile menu + focus trap, 7 links
│   ├── Hero.tsx              # Particles, text scramble, magnetic buttons, code card, parallax
│   ├── About.tsx             # Editorial 3-col: portrait + bio + quick facts, BMS badge, approach items
│   ├── Skills.tsx            # Bento grid, radial proficiency rings, 20 tools
│   ├── DataVisualization.tsx # Neural network canvas animation (aria-hidden, pauses off-screen)
│   ├── Experience.tsx        # Timeline: BMS, Comviva, Tech Mahindra + animated counter
│   ├── Projects.tsx          # 5 cards, 3D tilt, glassmorphism, all GitHub → AryanRawat2001
│   ├── Credentials.tsx       # 8 certs + IEEE publication
│   ├── Interests.tsx         # 7 hobbies, brand-consistent colors
│   ├── Contact.tsx           # Formspree form + honeypot, error clear on input, disabled during send
│   ├── Footer.tsx            # Avatar, 7 nav links, socials, suppressHydrationWarning on year
│   ├── MotionProvider.tsx    # MotionConfig reducedMotion="user" — framer honors prefers-reduced-motion
│   ├── ParticleNetwork.tsx   # Canvas particles, IntersectionObserver, GPU-composited, bounds-clamped
│   ├── SectionDivider.tsx    # 3 variants: gradient, dots, wave (useId for unique SVG gradient ids)
│   ├── PageLoader.tsx        # 1.8s cinematic intro (logo + gradient bar)
│   └── ScrollToTop.tsx       # Floating button, progress ring, optimized re-renders
└── lib/
    ├── scroll.ts             # Shared scrollToSection() — used by Hero, Navbar, Footer
    └── site.ts               # Shared NAV_LINKS + SOCIAL_LINKS (single source of truth)
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
- **DataVisualization:** `animationId` initialized to 0, respects `prefers-reduced-motion`, DPR capped at 2
- **Hero reduced-motion:** text-scramble renders final name instantly + role-cycle interval skipped when `prefers-reduced-motion`
- **Hero scramble h1:** fallback reserves two lines (`' \n '`) to prevent CLS as text resolves
- **About portrait:** `sizes` + `placeholder="blur"` (inline blurDataURL) on the Image
- **Skip link:** `Skip to content` anchor (sr-only, visible on focus) is the first child of `<main>`
- **Contact form a11y:** error has `role="alert"`; success panel has `role="status" aria-live="polite"`
- **Touch targets:** Hero socials w-11, project link buttons w-9, navbar toggle p-2.5 (≥44px hit area)
- **Project card links:** always visible on touch (`[@media(hover:hover)]` gates the hover-reveal) — never hidden on phones
- **ScrollToTop:** Only re-renders when visibility actually changes (prev !== shouldShow); uses safe-area-inset-bottom
- **Footer:** `pb-safe` class for home indicator bar clearance on notched phones
- **Contact form:** Error clears on input change, all inputs disabled during submission, `_gotcha` honeypot, `Accept: application/json`, maxLength limits (name 100 / email 200 / subject 200 / message 5000)
- **Scrollbar:** Webkit `::-webkit-scrollbar` + standard `scrollbar-width: thin` / `scrollbar-color` for Firefox/Windows
- **All sections use py-28** for consistent vertical rhythm (including DataVisualization)
- **MotionProvider** (`MotionConfig reducedMotion="user"`) wraps everything in page.tsx — Framer Motion transform animations are skipped for reduced-motion users (globals.css only covers CSS animations)
- **DataVisualization:** IntersectionObserver pauses its rAF loop when scrolled off-screen (same pattern as ParticleNetwork)
- **ParticleNetwork:** particles clamp to canvas bounds on bounce (bare velocity flips let mouse-pushed particles jitter outside forever)
- **Navbar:** syncs scrolled/active-section state on mount (covers reloads with restored scroll position)
- **Footer year:** `suppressHydrationWarning` — build-time static HTML can differ from client after year rollover
- **ESLint:** `.eslintrc.json` extends `next/core-web-vitals`; decorative `// text` in JSX must be written as `{'// text'}` (jsx-no-comment-textnodes)

---

## SEO & Metadata

- **metadataBase:** `https://aryanrawat.vercel.app`
- **Viewport:** `width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover` (via `export const viewport`)
- **Theme color:** `#050510` (via viewport export, not metadata.other)
- **Canonical URL:** `/` (via alternates)
- **OpenGraph:** Title, description, type, url configured
- **Twitter card:** `summary_large_image` (reuses opengraph-image)
- **OG Image:** Dynamic via `opengraph-image.tsx` (edge runtime, 1200×630, gradient + avatar + skills)
- **Favicon:** Transparent `src/app/icon.png` (no logo in tab)
- **JSON-LD:** Person schema with name, jobTitle, url, worksFor, email, sameAs (GitHub + LinkedIn), knowsAbout — serialized with `<` escaped to `\u003c` so the payload can't close the script tag
- **Analytics:** `@vercel/analytics` integrated in layout.tsx
- **robots.txt / sitemap.xml:** generated by `src/app/robots.ts` + `src/app/sitemap.ts`

---

## Security

- **Headers (next.config.mjs):** CSP (production-only — dev needs eval/websockets for Fast Refresh), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS, `X-DNS-Prefetch-Control`; `poweredByHeader: false`
- **CSP allowlist:** scripts `self` + va.vercel-scripts.com · connect `self` + formspree.io + va.vercel-scripts.com + vitals.vercel-insights.com · img `self data: blob:` — **adding any new external script/fetch/iframe/image source requires updating the CSP** or it will be blocked in production
- **Contact form anti-spam:** Formspree `_gotcha` honeypot (hidden input, dropped server-side if filled)
- **Dependency policy:** stay on the latest **14.2.x** (`npm install next@14.2.x eslint-config-next@14.2.x`). Remaining `npm audit` advisories against next 14 require middleware / rewrites / remotePatterns / Server Actions / websockets / i18n Pages Router — none used by this static site. Full clearance = Next 16 major upgrade (breaking; do deliberately)
- **Git hygiene:** `.claude/settings.local.json`, `.claude/launch.json`, `__pycache__/` are gitignored — never commit machine-local tooling files

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

- **Bundle:** 161 kB first load JS, zero build errors
- **Optimizations:** Canvas IntersectionObserver, squared-distance (no Math.sqrt), GPU compositing, requestAnimationFrame debounced resize, `prefers-reduced-motion` respected, Next.js `Image` for avatar optimization
- **Mobile safe areas:** `viewport-fit: cover` + `env(safe-area-inset-*)` on Navbar, Hero, ScrollToTop, Footer
- **Mobile viewport:** `min-h-dvh` utility (100dvh with 100vh fallback) for accurate mobile viewport height
- **Cross-platform scrollbar:** Webkit pseudo-elements + standard `scrollbar-width`/`scrollbar-color` for Firefox/Windows
- **Responsive grids:** Skills uses `lg:grid-cols-3`, Interests uses `md:grid-cols-3 lg:grid-cols-4` — tuned for Windows 13" at 150% scaling (~1263px CSS width)

---

## Known Placeholders & Remaining Work

- Next.js 16 major upgrade — clears the remaining `npm audit` advisories that don't affect this static site. Breaking change (React major + caching semantics); do it as a deliberate migration, not a routine bump.

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
- **Update the CSP in next.config.mjs** whenever adding an external script, fetch target, iframe, or image host — otherwise production blocks it silently
- **`npm run lint` must pass** (alongside `npm run build` and `npx tsc --noEmit`) before pushing

---

## Build & Dev

```bash
npm run dev          # Dev server → http://localhost:3000
npm run build        # Production build (verify zero errors)
npx tsc --noEmit     # Type-check only
git push origin main # Triggers Vercel auto-deploy
```

---

*Last updated: 2026-07-12 — Security + code-quality audit: Next.js 14.2.5→14.2.35 (fixes critical middleware-bypass CVE + high CVEs), security headers + prod CSP in next.config.mjs, JSON-LD `<` escaping, Formspree honeypot/Accept/maxLengths, MotionProvider (framer reduced-motion), DataVisualization off-screen pause, ParticleNetwork bounds clamp, Navbar role fix + mount sync, SectionDivider useId, MagneticButton type, Footer suppressHydrationWarning, robots.ts + sitemap.ts, .eslintrc.json added (lint was unconfigured), removed unused clsx/tailwind-merge/utils.ts, untracked .claude local files. Prior: Monthly Expense Tracker project (5th card).*
