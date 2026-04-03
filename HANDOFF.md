# Aryan Rawat Portfolio — Complete Opus Handoff

> Read every word of this. Opus, your job is to continue building this personal portfolio exactly where Sonnet left off.
> The user is very clear about what they want — a stunning, agency-quality site that **screams data scientist** on first load.

---

## Who is Aryan?

**Aryan Rawat** is a Data Scientist at Bristol Myers Squibb (BMS), a global pharmaceutical company.
He joined BMS in **April 2025**, based in **Hyderabad, India**.

His exact words for what he wants:
> *"A website that looks stunning, impresses someone seeing it for the first time, but still giving the techy vibes since I am a data scientist — maybe a website that also speaks this guy is a data scientist."*
> *"Keep in mind that the page should look cool, not like an HTML CSS page which a normal person makes."*
> *"Why not a $50k portfolio?"*
> *"Code in a proper way, keep separate codes function-wise if needed, name files cleanly as well, should look professional."*

He is willing to invest tokens/effort to get it right. He wants 3-agent quality collaboration.

---

## Personal Details

| Field | Value |
|-------|-------|
| Name | Aryan Rawat |
| Role | Data Scientist |
| Company | Bristol Myers Squibb |
| Company Start | April 2025 |
| Location | Hyderabad, India |
| Email | aryanrawat2001@gmail.com |
| Phone | +91 9974245370 |
| LinkedIn | **PLACEHOLDER** — user hasn't provided yet |
| GitHub | **PLACEHOLDER** — user hasn't provided yet |
| Education | **PLACEHOLDER** — user skipped, needs to be added |
| Resume | `/public/resume.pdf` — user needs to add actual PDF |

**Skills Aryan explicitly wants highlighted:**
Python, MySQL, Decision Intelligence, Generative AI, Claude (Anthropic), Machine Learning, Deep Learning

Plus these were added as sensible additions:
Pandas, NumPy, PyTorch, TensorFlow, Hugging Face, LangChain, Jupyter, Git, Docker, Tableau, Power BI, AWS, Azure, FastAPI, Streamlit, R

---

## Design Vision

**Vibe:** Dark OLED black background, electric blue + cyan + purple accent colors, feels like a beautiful data dashboard meets personal portfolio. "Techy" immediately signals the owner is a data scientist.

**Stack:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion + Lucide icons + Google Fonts

**Colors (in tailwind.config.ts):**
- `bg-navy` → `#050510` (page background — very deep navy-black)
- `bg-surface` → `#0d0d1a` (card backgrounds)
- `bg-surface-2` → `#14142a`
- `bg-surface-3` → `#1a1a35`
- `bg-accent-blue` → `#3B82F6` (primary accent)
- `bg-accent-blue-bright` → `#60A5FA`
- `bg-accent-cyan` → `#06B6D4` (secondary accent)
- `bg-accent-purple` → `#8B5CF6` (tertiary accent)

**Typography:**
- Headings: `font-heading` = Exo 2 (loaded via `next/font/google`, variable `--font-heading`)
- Code/mono: `font-mono` = Roboto Mono (variable `--font-mono`)
- Body: `font-body` = Inter (variable `--font-body`)

**Key CSS utilities (in globals.css):**
- `.glow-blue` — box shadow glow: `0 0 20px rgba(59,130,246,0.4), 0 0 60px rgba(59,130,246,0.1)`
- `.gradient-text` — blue→cyan→purple gradient fill on text
- `.gradient-border` — pseudo-element gradient border using `mask-composite: exclude`

---

## Current Build Status: v1 COMPLETE ✅

**Build confirmed passing:** `npm run build` — zero TypeScript errors, zero build errors.

### File Structure

```
/Users/aryanrawat2001/Documents/Aryan_Website/
├── .gitignore
├── HANDOFF.md                  ← you are here
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── node_modules/               ← already installed
├── design-system/
│   └── aryan-rawat-portfolio/
│       └── MASTER.md           ← ui-ux-pro-max design system
└── src/
    ├── app/
    │   ├── globals.css         ← custom utilities, scrollbar, selection
    │   ├── layout.tsx          ← fonts, metadata, html shell
    │   └── page.tsx            ← imports all sections
    ├── components/
    │   ├── About.tsx           ← bio, quick facts, approach
    │   ├── Contact.tsx         ← contact info + form (form is fake/placeholder)
    │   ├── Experience.tsx      ← animated timeline, BMS role
    │   ├── Footer.tsx          ← minimal footer
    │   ├── Hero.tsx            ← full-screen hero (mouse parallax, code card, cycling role)
    │   ├── Navbar.tsx          ← floating glass navbar, mobile menu
    │   ├── ParticleNetwork.tsx ← canvas particle/neural network animation
    │   ├── Projects.tsx        ← 4 project cards
    │   └── Skills.tsx          ← animated skill bars + tech badges
    └── lib/
        └── utils.ts            ← cn() helper
```

### Sections Built

1. **Navbar** — Floating glass pill, scroll-aware blur/glow, mobile hamburger with AnimatePresence
2. **Hero** — Full-screen. Canvas particle network BG + mouse-parallax glow orbs. "Aryan Rawat" gradient heading. Cycling animated roles (Data Scientist | ML Engineer | GenAI Developer | Analytics Expert). Floating code card (fake ML model code). Available badge. CTAs + social icons. Scroll indicator.
3. **About** — Bio paragraphs, Quick Facts card (email, phone, location, role, focus), Approach items, BMS badge
4. **Skills** — 3 categories (Core Data Science, Machine Learning & AI, GenAI & LLMs). Each skill has an animated horizontal fill bar (Framer Motion, triggers on scroll via `useInView`). Tech badges at bottom.
5. **Experience** — Vertical animated timeline. Currently only BMS (Apr 2025–Present). Expandable structure for more roles.
6. **Projects** — 4 cards in 2×2 grid. Each has icon gradient area, title, description, tech tags. Links hidden until hover (accessibility issue — see below).
7. **Contact** — Left: contact details (email, phone, location) + social links. Right: form (name, email, subject, message, send). Fake submission (setTimeout) — **MUST BE WIRED TO REAL BACKEND**.
8. **Footer** — AR logo, nav links, social icons, copyright, "Built with" line

### Notable Implementation Choices

- All components are `'use client'` (Framer Motion requires it)
- Scroll to section uses `getBoundingClientRect() + scrollY - 80` (80px = navbar height offset)
- `ParticleNetwork.tsx` uses canvas with gradient line strokes, debounced resize (250ms), respects `prefers-reduced-motion`
- Hero uses `useMotionValue` + `useSpring` for smooth mouse-tracking parallax on orbs (stiffness:60, damping:20)
- Role text cycling uses `AnimatePresence mode="wait"` with blur filter on enter/exit for polished effect
- Code card lines animate in with staggered delay (0.06s per line) for typing effect

---

## The Review Agent Found These Issues (Prioritized)

A separate review agent analyzed every component file and identified these gaps. This is ordered by visual impact.

### 🔴 P1 — Must Fix (Correctness / Broken UX)

**1. Contact form is fake** — `Contact.tsx:59`
Replace the `setTimeout` with real email sending:
```typescript
// Option A: Formspree (easiest, no backend)
// Change form action to: https://formspree.io/f/YOUR_ID
// Option B: Create src/app/api/contact/route.ts using Resend npm package
// Option C: EmailJS (client-side, no backend needed)
```

**2. Projects links hidden from keyboard users** — `Projects.tsx:86-95`
GitHub/live buttons have `opacity-0 group-hover:opacity-100`. Screen readers and keyboard users can't access them.
Fix: Add `focus:opacity-100` to the button/link classes, OR add a persistent (visible) link row below the tags.

**3. Social links are placeholder** — `Hero.tsx:186-188`, `Footer.tsx`
GitHub = `https://github.com`, LinkedIn = `https://linkedin.com`
→ Ask Aryan for his actual profile URLs and update.

**4. Resume link is dead** — `Hero.tsx:153`
`href="/resume.pdf"` → Aryan needs to put his actual resume PDF at `/public/resume.pdf`

### 🟠 P2 — Visual Elevations (The $50k Difference)

**5. 3D tilt effect on project cards** — `Projects.tsx` card component
This is one specific change that dramatically elevates perceived quality:
```tsx
// On ProjectCard's outer motion.div, add:
whileHover={{
  rotateY: -4,
  rotateX: 2,
  scale: 1.02,
  transition: { duration: 0.3 }
}}
// On the parent of the motion.div, add:
style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
```

**6. Elastic easing on skill bars** — `Skills.tsx:82`
Change:
```tsx
transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.12 + 0.3 }}
```
To:
```tsx
transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1], delay: index * 0.1 + 0.3 }}
```
The `[0.34, 1.56, 0.64, 1]` cubic-bezier overshoots slightly — this bounce makes it feel alive.

**7. Skill bars need accessibility** — `Skills.tsx`
Wrap each bar in:
```tsx
<div
  role="progressbar"
  aria-valuenow={skill.level}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`${skill.name} proficiency: ${skill.level}%`}
>
```

**8. Tech badge hover animations** — `Skills.tsx` bottom badge section
Change the badge `<span>` className to include:
```
hover:scale-110 hover:border-accent-blue/40 hover:text-accent-blue-bright transition-all duration-200 cursor-default
```
(already has some hover but not scale)

**9. Project cards missing hover glow** — `Projects.tsx`
Add to card outer div:
```
hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]
```

**10. About section right column has no intermediate responsive breakpoint**
`About.tsx:66`: `grid lg:grid-cols-[1fr_400px]` — on `md:` screen, both columns stack which wastes tablet space.
Consider adding `md:grid-cols-2` or adjusting to `min-[900px]:grid-cols-[1fr_400px]`.

### 🟡 P3 — Missing Sections (Content Gaps)

**11. Certifications/Credentials section**
Add between Skills and Experience:
```
Section: "Credentials"
- Show relevant certs, courses, Kaggle ranking
```

**12. GitHub Activity Widget**
After Projects section, add a GitHub contribution graph using `react-github-calendar`:
```bash
npm install react-github-calendar
```
```tsx
import GitHubCalendar from 'react-github-calendar';
// Use Aryan's GitHub username when available
```

**13. Testimonials section**
Pull LinkedIn recommendations (ask Aryan for 2-3).
Simple quote cards with name, photo, relationship.

**14. Copy-to-clipboard for contact details** — `Contact.tsx`
Add clipboard icon next to email/phone. On click, copy value and show "Copied!" toast.

**15. Education** — `About.tsx` or new section
Currently completely absent. Ask Aryan for: University, Degree, Year.

### 🟢 P4 — Nice-to-Have (Polish)

**16. JSON-LD structured data** — `layout.tsx`
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Aryan Rawat",
  "jobTitle": "Data Scientist",
  "worksFor": { "@type": "Organization", "name": "Bristol Myers Squibb" },
  "email": "aryanrawat2001@gmail.com",
  "address": { "@type": "PostalAddress", "addressLocality": "Hyderabad", "addressCountry": "IN" }
})}} />
```

**17. Vercel Analytics** — `layout.tsx`
```bash
npm install @vercel/analytics
```
```tsx
import { Analytics } from '@vercel/analytics/react';
// Add <Analytics /> at bottom of layout
```

**18. Open Graph image** — `layout.tsx metadata`
```tsx
openGraph: {
  images: [{ url: '/og-image.png', width: 1200, height: 630 }]
}
// Create a simple OG image at /public/og-image.png
```

**19. Command palette** (`Cmd+K`)
Install `cmdk` or `kbar`. Lets users keyboard-navigate the site like a pro tool.

**20. Project detail pages** — `src/app/projects/[slug]/page.tsx`
Each project becomes a full case study page. Currently they're just cards.

---

## How to Continue Development

```bash
# Start dev server
cd /Users/aryanrawat2001/Documents/Aryan_Website
npm run dev
# → http://localhost:3000

# Type-check only (fast)
npx tsc --noEmit

# Production build
npm run build
```

---

## What to Ask Aryan Before Building More

When you start the conversation, ask Aryan:
1. "Do you have a GitHub URL and LinkedIn URL to add?"
2. "Can you share your education details (university, degree, graduation year)?"
3. "Do you want me to wire the contact form to actually send emails? If so, which service — Formspree, Resend, or EmailJS?"
4. "Do you have any specific projects with GitHub links or live demos you want featured?"
5. "Should I add a certifications/credentials section? If yes, what certs do you have?"

---

## Suggested Next Conversation Opener for Opus

Tell Opus: *"Continue building my personal portfolio website at /Users/aryanrawat2001/Documents/Aryan_Website. Read HANDOFF.md for full context. Start by applying the P2 improvements from the review section, then ask me for my GitHub/LinkedIn URLs and education details."*

---

*Handoff document v2 — created 2026-04-03 by Claude Sonnet 4.6*
*Build confirmed: ✅ zero errors | ✅ production build passing | ✅ TypeScript strict mode*
