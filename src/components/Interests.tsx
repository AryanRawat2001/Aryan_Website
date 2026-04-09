'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Gamepad2,
  Monitor,
  Mountain,
  Plane,
  Footprints,
  Watch,
  CookingPot,
} from 'lucide-react';
import type { ElementType } from 'react';

interface Interest {
  icon: ElementType;
  label: string;
  detail: string;
  accentColor: string;
  borderHover: string;
}

const INTERESTS: Interest[] = [
  {
    icon: Gamepad2,
    label: 'Competitive Gaming',
    detail: 'FPS & strategy — always in ranked',
    accentColor: 'text-accent-purple',
    borderHover: 'group-hover:border-accent-purple/30',
  },
  {
    icon: Monitor,
    label: 'PC Gaming',
    detail: 'Custom rig, immersive worlds',
    accentColor: 'text-accent-blue-bright',
    borderHover: 'group-hover:border-accent-blue/30',
  },
  {
    icon: Mountain,
    label: 'Trekking',
    detail: 'Mountains over meetings',
    accentColor: 'text-accent-cyan',
    borderHover: 'group-hover:border-accent-cyan/30',
  },
  {
    icon: Plane,
    label: 'Travel',
    detail: 'New cities, new perspectives',
    accentColor: 'text-accent-blue',
    borderHover: 'group-hover:border-accent-blue/30',
  },
  {
    icon: Footprints,
    label: 'Sneakers',
    detail: 'The collection keeps growing',
    accentColor: 'text-accent-purple',
    borderHover: 'group-hover:border-accent-purple/30',
  },
  {
    icon: Watch,
    label: 'Watches',
    detail: 'Mechanical craftsmanship',
    accentColor: 'text-accent-cyan',
    borderHover: 'group-hover:border-accent-cyan/30',
  },
  {
    icon: CookingPot,
    label: 'Cooking',
    detail: 'Experiments in the kitchen',
    accentColor: 'text-accent-blue-bright',
    borderHover: 'group-hover:border-accent-blue/30',
  },
];

function InterestCard({
  interest,
  index,
  isInView,
}: {
  interest: Interest;
  index: number;
  isInView: boolean;
}) {
  const Icon = interest.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.07 + 0.2,
      }}
      className="group relative"
    >
      <div
        className={`relative rounded-2xl border border-border bg-surface/40 p-5 flex items-center gap-4 hover:bg-surface/70 transition-all duration-300 cursor-default overflow-hidden ${interest.borderHover}`}
      >
        {/* Hover gradient overlay — inspired by dark-grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent" />
        </div>

        {/* Shine sweep on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.03] to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

        <div
          className={`w-11 h-11 rounded-xl bg-surface-3 border border-border flex items-center justify-center shrink-0 group-hover:border-white/10 transition-colors ${interest.accentColor}`}
        >
          <Icon size={20} />
        </div>
        <div className="relative">
          <h4 className="font-heading font-semibold text-sm text-slate-100 group-hover:text-white transition-colors">
            {interest.label}
          </h4>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            {interest.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Interests() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="interests" className="relative py-28 bg-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-accent-blue/4 blur-[90px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="font-mono text-accent-cyan text-sm mb-2 tracking-widest"
        >
          06. INTERESTS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading font-bold text-4xl sm:text-5xl text-slate-100 mb-4 relative inline-block"
        >
          When I&apos;m Not Coding
          <motion.span
            className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-accent-blue via-accent-cyan to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-base max-w-lg mb-12 font-body"
        >
          Life outside the terminal — what keeps the creativity flowing.
        </motion.p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {INTERESTS.map((interest, i) => (
            <InterestCard
              key={interest.label}
              interest={interest}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
