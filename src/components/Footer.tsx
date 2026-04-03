'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { scrollToSection } from '@/lib/scroll';

const CURRENT_YEAR = new Date().getFullYear();

const LINKS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/AryanRawat2001/' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aryan-rawat-58551618b/' },
  { icon: Mail, label: 'Email', href: 'mailto:aryanrawat2001@gmail.com' },
];

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Interests', href: '#interests' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-navy">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex items-center gap-4">
            <Image src="/avatar.jpeg" alt="Aryan Rawat" width={40} height={40} className="w-10 h-10 rounded-xl object-cover object-top glow-blue" />
            <div>
              <div className="font-heading font-semibold text-slate-100">Aryan Rawat</div>
              <div className="text-xs font-mono text-slate-500">
                Data Scientist · Hyderabad
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-1">
            {NAV.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-200 rounded-lg hover:bg-surface transition-all duration-200 cursor-pointer font-body focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-3">
            {LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface border border-border hover:border-accent-blue/40 text-slate-500 hover:text-accent-blue-bright transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:outline-none"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 font-mono">
            © {CURRENT_YEAR} Aryan Rawat. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 font-mono">
            Built with{' '}
            <span className="text-accent-blue">Next.js</span> ·{' '}
            <span className="text-accent-cyan">Tailwind</span> ·{' '}
            <span className="text-accent-purple">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
