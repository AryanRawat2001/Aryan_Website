'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { scrollToSection } from '@/lib/scroll';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Interests', href: '#interests' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress } = useScroll();

  const lastScrolled = useRef(false);
  const lastSection = useRef('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const updateActiveSection = useCallback(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const offset = 120;
    let found = '';
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= offset) {
        found = sections[i];
        break;
      }
    }
    if (found !== lastSection.current) {
      lastSection.current = found;
      setActiveSection(found);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', () => {
    const isScrolled = window.scrollY > 20;
    if (isScrolled !== lastScrolled.current) {
      lastScrolled.current = isScrolled;
      setScrolled(isScrolled);
    }
    updateActiveSection();
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Focus trap + Escape key for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const menu = mobileMenuRef.current;
      if (!menu) return;
      const focusable = menu.querySelectorAll<HTMLElement>('button, a, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Auto-focus first menu item
    const menu = mobileMenuRef.current;
    if (menu) {
      const first = menu.querySelector<HTMLElement>('button');
      first?.focus();
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 2.4 }}
      className="fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl top-[calc(1rem+env(safe-area-inset-top,0px))]"
    >
      <nav
        className={`
          flex items-center justify-between px-5 py-3 rounded-2xl
          transition-all duration-300
          ${
            scrolled
              ? 'bg-surface/80 backdrop-blur-xl border border-border-glow shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-surface/70 backdrop-blur-md border border-border'
          }
        `}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Scroll to top"
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <Image src="/avatar.jpeg" alt="Aryan Rawat" width={32} height={32} className="w-8 h-8 rounded-lg object-cover object-top glow-blue" />
          <span className="font-heading font-semibold text-slate-100 hidden sm:block">
            Aryan Rawat
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-1.5 text-sm rounded-lg transition-all duration-200 cursor-pointer font-body focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:outline-none ${
                  activeSection === link.href.slice(1)
                    ? 'text-accent-blue-bright bg-accent-blue/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-surface-3'
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-accent-blue"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('#contact')}
            className="px-4 py-2 text-sm font-semibold bg-accent-blue hover:bg-accent-blue-bright text-white rounded-xl transition-all duration-200 cursor-pointer glow-blue focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:outline-none"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          ref={toggleRef}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer rounded-lg hover:bg-surface-3 focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:outline-none"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            role="menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-2 bg-surface/90 backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <ul className="p-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3 text-slate-300 hover:text-slate-100 hover:bg-surface-3 rounded-xl transition-all duration-200 cursor-pointer text-sm font-body focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-1 border-t border-border mt-1">
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full px-4 py-3 text-sm font-semibold bg-accent-blue hover:bg-accent-blue-bright text-white rounded-xl transition-all duration-200 cursor-pointer text-center focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:outline-none"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}
