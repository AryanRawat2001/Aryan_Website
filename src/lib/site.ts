import { Github, Linkedin, Mail } from 'lucide-react';
import type { ElementType } from 'react';

/** Single source of truth for in-page navigation. Order defines section order. */
export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Interests', href: '#interests' },
  { label: 'Contact', href: '#contact' },
] as const;

export interface SocialLink {
  icon: ElementType;
  label: string;
  href: string;
}

/** Single source of truth for social/contact links used in Hero, Contact, and Footer. */
export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/AryanRawat2001/' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aryan-rawat-58551618b/' },
  { icon: Mail, label: 'Email', href: 'mailto:aryanrawat2001@gmail.com' },
];
