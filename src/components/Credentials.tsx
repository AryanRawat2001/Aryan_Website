'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import type { ElementType } from 'react';

interface Credential {
  title: string;
  issuer: string;
  type: 'publication' | 'certification' | 'education';
  icon: ElementType;
  highlight?: boolean;
}

const CREDENTIALS: Credential[] = [
  {
    title: 'Email Spam Classification',
    issuer: 'IEEE · Presented at ICCPC 2022',
    type: 'publication',
    icon: BookOpen,
    highlight: true,
  },
  {
    title: 'Google Data Analytics',
    issuer: 'Google',
    type: 'certification',
    icon: Award,
  },
  {
    title: 'LLM Agents',
    issuer: 'AI Converge',
    type: 'certification',
    icon: Award,
  },
  {
    title: 'Financial Technology (Fintech) Innovations',
    issuer: 'University of Michigan',
    type: 'certification',
    icon: GraduationCap,
  },
  {
    title: 'Financial Markets',
    issuer: 'Yale University',
    type: 'certification',
    icon: GraduationCap,
  },
  {
    title: 'Python for DS & ML Bootcamp',
    issuer: 'Udemy',
    type: 'certification',
    icon: Award,
  },
  {
    title: 'SQL Certification',
    issuer: 'HackerRank',
    type: 'certification',
    icon: Award,
  },
  {
    title: 'Database Foundations',
    issuer: 'Oracle Academy',
    type: 'certification',
    icon: Award,
  },
];

function CredentialCard({ cred, index }: { cred: Credential; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const typeColors = {
    publication: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    certification: 'from-accent-blue/10 to-accent-cyan/10 border-accent-blue/20',
    education: 'from-accent-purple/10 to-accent-blue/10 border-accent-purple/20',
  };

  const typeLabels = {
    publication: 'Publication',
    certification: 'Certificate',
    education: 'Course',
  };

  const Icon = cred.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.06 }}
      className={`group relative p-5 rounded-xl bg-gradient-to-br ${typeColors[cred.type]} border backdrop-blur-sm hover:scale-[1.03] transition-all duration-200 cursor-default ${
        cred.highlight ? 'md:col-span-2 ring-1 ring-amber-500/20' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          cred.highlight ? 'bg-amber-500/20 text-amber-400' : 'bg-surface-3 text-accent-blue'
        }`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
              cred.highlight
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-slate-500 bg-surface-3'
            }`}>
              {typeLabels[cred.type]}
            </span>
          </div>
          <h4 className="font-body font-semibold text-sm text-slate-200 group-hover:text-slate-100 transition-colors leading-snug">
            {cred.title}
          </h4>
          <p className="text-xs text-slate-500 font-mono mt-1">{cred.issuer}</p>
        </div>
        {cred.highlight && (
          <Sparkles size={14} className="text-amber-400/50 shrink-0 mt-1" />
        )}
      </div>
    </motion.div>
  );
}

export default function Credentials() {
  return (
    <section id="credentials" className="relative py-28 bg-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent-purple/5 blur-[80px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-accent-cyan text-sm mb-2 tracking-widest"
        >
          05. CREDENTIALS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading font-bold text-4xl sm:text-5xl text-slate-100 mb-4 relative inline-block"
        >
          Publications & Certifications
          <motion.span
            className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-amber-500 via-accent-blue to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-base max-w-lg mb-16 font-body"
        >
          Research publications, industry certifications, and continuous learning.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CREDENTIALS.map((cred, i) => (
            <CredentialCard key={cred.title} cred={cred} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
