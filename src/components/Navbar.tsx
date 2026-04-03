'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress } = useScroll();

  const updateActiveSection = useCallback(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const offset = 120;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= offset) {
        setActiveSection(sections[i]);
        return;
      }
    }
    setActiveSection('');
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', () => {
    setScrolled(window.scrollY > 20);
    updateActiveSection();
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
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
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl"
    >
      <nav
        className={`
          flex items-center justify-between px-5 py-3 rounded-2xl
          transition-all duration-300
          ${
            scrolled
              ? 'bg-surface/80 backdrop-blur-xl border border-border-glow shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-surface/50 backdrop-blur-md border border-border'
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
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-white font-heading font-bold text-sm glow-blue">
            AR
          </div>
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
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer rounded-lg hover:bg-surface-3 focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:outline-none"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
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
