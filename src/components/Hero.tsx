'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import ParticleNetwork from './ParticleNetwork';
import { scrollToSection } from '@/lib/scroll';

// ---- Text Scramble Hook ----
const SCRAMBLE_CHARS = '!@#$%^&*()_+{}|:<>?~';

function useTextScramble(text: string, delay: number = 300, duration: number = 1500) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const length = text.length;
    let frame: ReturnType<typeof setTimeout>;
    let startTime: number;

    const timeout = setTimeout(() => {
      startTime = Date.now();

      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const revealedCount = Math.floor(progress * length);

        let result = '';
        for (let i = 0; i < length; i++) {
          if (text[i] === ' ' || text[i] === '\n') {
            result += text[i];
          } else if (i < revealedCount) {
            result += text[i];
          } else {
            result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
        }
        setDisplay(result);

        if (progress < 1) {
          frame = setTimeout(tick, 35);
        } else {
          setDisplay(text);
          setDone(true);
        }
      };
      tick();
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(frame);
    };
  }, [text, delay, duration]);

  return { display, done };
}

// ---- Magnetic Button Component ----
function MagneticButton({
  children,
  className,
  onClick,
  href,
  as = 'button',
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  as?: 'button' | 'a';
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const proximity = 80;

      if (distance < proximity) {
        x.set(distX * 0.25);
        y.set(distY * 0.25);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Tag = as === 'a' ? motion.a : motion.button;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Tag
        style={{ x: springX, y: springY }}
        className={className}
        onClick={onClick}
        href={as === 'a' ? href : undefined}
        {...rest}
      >
        {children}
      </Tag>
    </div>
  );
}

const ROLES = [
  'Data Scientist',
  'ML Engineer',
  'GenAI Developer',
  'Analytics Expert',
];

const STATS = [
  { label: 'Experience', value: '2+', unit: 'yrs' },
  { label: 'Projects', value: '10+', unit: '' },
  { label: 'Domains', value: '6+', unit: '' },
];

const CODE_LINES = [
  { tokens: [{ text: '# patient_response_model.py', color: '#64748b' }] },
  { tokens: [] },
  { tokens: [{ text: 'import ', color: '#8b5cf6' }, { text: 'pandas', color: '#60a5fa' }, { text: ' as pd', color: '#8b5cf6' }] },
  { tokens: [{ text: 'from ', color: '#8b5cf6' }, { text: 'sklearn.ensemble', color: '#60a5fa' }, { text: ' import ', color: '#8b5cf6' }, { text: 'GBClassifier', color: '#22d3ee' }] },
  { tokens: [] },
  { tokens: [{ text: 'model', color: '#e2e8f0' }, { text: ' = ', color: '#8b5cf6' }, { text: 'GBClassifier', color: '#22d3ee' }, { text: '(n=200)', color: '#94a3b8' }] },
  { tokens: [{ text: 'model', color: '#e2e8f0' }, { text: '.fit(', color: '#8b5cf6' }, { text: 'X_clinical', color: '#60a5fa' }, { text: ', ', color: '#94a3b8' }, { text: 'y_response', color: '#60a5fa' }, { text: ')', color: '#8b5cf6' }] },
  { tokens: [] },
  { tokens: [{ text: 'accuracy', color: '#e2e8f0' }, { text: ' = ', color: '#8b5cf6' }, { text: '0.9472', color: '#34d399' }, { text: '  # ✓', color: '#64748b' }] },
  { tokens: [{ text: 'status', color: '#e2e8f0' }, { text: ':  ', color: '#8b5cf6' }, { text: '"Production ready"', color: '#fbbf24' }] },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const scrambled = useTextScramble('Aryan\nRawat', 500, 1500);

  // Mouse parallax
  const rawMouseX = useMotionValue(0.5);
  const rawMouseY = useMotionValue(0.5);
  const mouseX = useSpring(rawMouseX, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(rawMouseY, { stiffness: 60, damping: 20 });

  const orb1X = useTransform(mouseX, [0, 1], [-30, 30]);
  const orb1Y = useTransform(mouseY, [0, 1], [-20, 20]);
  const orb2X = useTransform(mouseX, [0, 1], [20, -20]);
  const orb2Y = useTransform(mouseY, [0, 1], [15, -15]);
  const orb3X = useTransform(mouseX, [0, 1], [-10, 10]);
  const orb3Y = useTransform(mouseY, [0, 1], [-25, 25]);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const handleMouse = (e: MouseEvent) => {
      rawMouseX.set(e.clientX / window.innerWidth);
      rawMouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [rawMouseX, rawMouseY]);

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden bg-navy">
      {/* Particle network */}
      <ParticleNetwork />

      {/* Parallax ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent-blue/10 blur-[120px]"
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-accent-purple/10 blur-[100px]"
        />
        <motion.div
          style={{ x: orb3X, y: orb3Y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-accent-cyan/5 blur-[100px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-[calc(7rem+env(safe-area-inset-top,0px))] pb-16">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          {/* LEFT — Main content */}
          <div className="text-center lg:text-left items-center lg:items-start flex flex-col">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 border border-accent-blue/30 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-300 font-mono">
                Available for opportunities
              </span>
            </motion.div>

            {/* Mono prefix */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-accent-cyan text-sm mb-3 tracking-wider"
            >
              const aryan = &#123;
            </motion.p>

            {/* Name with text scramble effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl leading-none mb-4 gradient-text whitespace-pre-line"
              aria-label="Aryan Rawat"
            >
              {scrambled.display || '\u00A0'}
            </motion.h1>

            {/* Role cycling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="font-mono text-slate-500 text-lg">role:</span>
              <div className="h-10 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="font-heading font-semibold text-2xl sm:text-3xl text-accent-blue-bright text-glow-blue whitespace-nowrap"
                  >
                    {ROLES[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-body"
            >
              Building intelligent systems at the intersection of{' '}
              <span className="text-slate-200">machine learning</span> and{' '}
              <span className="text-slate-200">pharmaceutical innovation</span>{' '}
              — turning complex clinical data into actionable insights.
            </motion.p>

            {/* CTAs with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <MagneticButton
                as="button"
                onClick={() => scrollToSection('#projects')}
                className="px-5 py-2.5 sm:px-7 sm:py-3.5 bg-gradient-to-r from-accent-blue to-accent-cyan text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer glow-blue text-sm"
                aria-label="View my portfolio projects"
              >
                View My Work
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/resume.pdf"
                className="px-5 py-2.5 sm:px-7 sm:py-3.5 border border-accent-blue/40 text-accent-blue-bright font-semibold rounded-xl hover:bg-accent-blue/10 hover:border-accent-blue hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-sm inline-block"
                aria-label="Download Aryan Rawat's CV"
              >
                Download CV
              </MagneticButton>
            </motion.div>

            {/* Inline stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex flex-wrap gap-6 sm:gap-8"
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <div className="font-heading font-bold text-2xl text-slate-100">
                    {s.value}
                    <span className="text-accent-cyan text-lg ml-0.5">{s.unit}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-mono">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex gap-3 mt-8"
            >
              {[
                { icon: Github, label: 'GitHub', href: 'https://github.com/AryanRawat2001/' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aryan-rawat-58551618b/' },
                { icon: Mail, label: 'Email', href: 'mailto:aryanrawat2001@gmail.com' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border hover:border-accent-blue/50 hover:bg-accent-blue/10 text-slate-400 hover:text-accent-blue-bright transition-all duration-200 cursor-pointer hover:scale-110 focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:outline-none"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Avatar + Floating code card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="hidden lg:block relative"
          >
            <div className="gradient-border rounded-2xl bg-surface/60 backdrop-blur-xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-surface-2/80">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-slate-500 font-mono">
                  patient_response_model.py
                </span>
              </div>

              {/* Code body */}
              <div className="p-6 font-mono text-sm leading-7">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.06, duration: 0.3 }}
                    className="flex"
                  >
                    <span className="w-6 text-slate-600 text-xs mr-4 select-none leading-7">
                      {i + 1}
                    </span>
                    <span>
                      {line.tokens.length === 0 ? (
                        <>&nbsp;</>
                      ) : (
                        line.tokens.map((t, j) => (
                          <span key={j} style={{ color: t.color }}>
                            {t.text}
                          </span>
                        ))
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-surface-2/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-slate-500 font-mono">Model trained</span>
                </div>
                <span className="text-xs text-emerald-400 font-mono font-semibold">
                  94.72% accuracy
                </span>
              </div>
            </div>

            {/* Floating BMS badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-4 -bottom-6 bg-surface-2 border border-border-glow rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm"
            >
              <div className="text-xs text-slate-500 font-mono mb-1">Currently at</div>
              <div className="text-sm font-heading font-semibold text-slate-200">
                Bristol Myers Squibb
              </div>
              <div className="text-xs text-accent-cyan font-mono mt-0.5">Hyderabad, IN</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer group"
        aria-label="Scroll to About section"
      >
        <span className="text-xs font-mono tracking-widest group-hover:text-accent-cyan transition-colors">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
