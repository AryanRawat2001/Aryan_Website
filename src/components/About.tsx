'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { MapPin, Mail, Phone, Briefcase, Brain, FlaskConical, GraduationCap } from 'lucide-react';

const QUICK_FACTS = [
  { icon: Briefcase, label: 'Role', value: 'Data Scientist' },
  { icon: FlaskConical, label: 'Company', value: 'Bristol Myers Squibb' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE (Cloud), SRM Chennai \'23 · 8.89 CGPA' },
  { icon: MapPin, label: 'Location', value: 'Hyderabad, India' },
  { icon: Mail, label: 'Email', value: 'aryanrawat2001@gmail.com' },
  { icon: Brain, label: 'Focus', value: 'LLM Systems · ML · Decision Intelligence' },
];

const APPROACH_ITEMS = [
  { label: 'Measure Before Shipping', desc: 'The evaluation harness comes first, not last' },
  { label: 'Show The Work', desc: 'Every claim traceable back to its source' },
  { label: 'End-to-End Ownership', desc: 'Pipeline to interface, not just the model' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-28 bg-navy overflow-hidden">
      {/* Subtle divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-accent-blue/40" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header — watermark style */}
        <div className="relative mb-16">
          {/* Large watermark number */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute -top-8 -left-2 font-heading font-black text-8xl sm:text-9xl text-slate-800/20 select-none pointer-events-none leading-none"
          >
            01.
          </motion.span>
          <div className="relative pt-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-accent-cyan text-sm mb-2 tracking-widest"
            >
              ABOUT
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-bold text-4xl sm:text-5xl tracking-tight text-slate-100 relative inline-block"
            >
              Who I Am
            </motion.h2>
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 min-[1100px]:grid-cols-[360px_1fr_360px] gap-12 lg:gap-14 items-start"
        >
          {/* LEFT — Editorial portrait */}
          <motion.div variants={itemVariants} className="md:col-span-2 min-[1100px]:col-span-1 flex justify-center min-[1100px]:justify-start">
            <div className="relative group">
              {/* Frame — 3:4 portrait matches source photo */}
              <div className="relative w-[300px] sm:w-[340px] aspect-[3/4] rounded-2xl overflow-hidden gradient-border shadow-[0_24px_70px_rgba(59,130,246,0.25)]">
                <Image
                  src="/avatar.jpeg"
                  alt="Aryan Rawat — Data Scientist at Bristol Myers Squibb"
                  width={900}
                  height={1200}
                  sizes="(max-width: 640px) 300px, 340px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAEAAMAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMADAwMDAwMFAwMFB0UFBQdJx0dHR0nMScnJycnMTsxMTExMTE7Ozs7Ozs7O0dHR0dHR1NTU1NTXV1dXV1dXV1dXf/bAEMBDg8PGBYYKBYWKGFCNkJhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYf/dAAQAAf/aAAwDAQACEQMRAD8A1ZLWU9qrGylz0NZO+6ud8Au2MYGWOcEbef6VIuuXeSpdVxjq2OoB9feulYlPWxi6TR//2Q=="
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Subtle vignette for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
                {/* Corner label */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-navy/70 backdrop-blur-md border border-border-glow">
                  <span className="text-[10px] font-mono text-accent-cyan tracking-widest uppercase">01 · Portrait</span>
                </div>
                {/* Bottom caption over image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase mb-1">
                      {'// signed'}
                    </div>
                    <div className="font-heading font-bold text-slate-100 text-lg leading-tight">
                      Aryan Rawat
                    </div>
                    <div className="text-xs text-slate-400 font-mono">Hyderabad, IN</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 tracking-wider">AVAILABLE</span>
                  </div>
                </div>
              </div>
              {/* Layered glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-blue/25 via-accent-cyan/15 to-accent-purple/25 blur-2xl -z-10" />
              {/* Floating stat chip */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:block absolute -right-4 top-8 bg-surface-2/90 backdrop-blur-md border border-border-glow rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="text-[10px] font-mono text-slate-500 leading-tight">cgpa</div>
                <div className="text-base font-heading font-bold text-slate-100 leading-tight">8.89</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="hidden sm:block absolute -left-5 bottom-16 bg-surface-2/90 backdrop-blur-md border border-border-glow rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="text-[10px] font-mono text-slate-500 leading-tight">focus</div>
                <div className="text-sm font-heading font-semibold text-accent-cyan leading-tight">ML · GenAI</div>
              </motion.div>
            </div>
          </motion.div>

          {/* MIDDLE — Bio */}
          <div>
            <motion.p variants={itemVariants} className="text-slate-300 text-lg leading-relaxed mb-5 font-body">
              I&apos;m a <span className="text-slate-100 font-semibold">Data Scientist at Bristol Myers Squibb</span>,
              building and shipping decision-intelligence and LLM systems for the Global Product Development &amp;
              Supply team — demand forecasting that automates ~42% of the portfolio, and a GxP audit-trail tool now
              running across 3 global sites and 750 systems.
            </motion.p>

            <motion.p variants={itemVariants} className="text-slate-400 text-base leading-relaxed mb-5 font-body">
              Before BMS, I cut my teeth at <span className="text-slate-300">Comviva Technologies</span>, delivering
              end-to-end analytical solutions for telecom giants — wrangling 65M+ record datasets with PySpark, Hive,
              and Python to build models that actually moved the needle. I know what it takes to ship ML at scale.
            </motion.p>

            <motion.p variants={itemVariants} className="text-slate-400 text-base leading-relaxed font-body">
              What I care about is whether a system can be trusted once it&apos;s live. That shows up in how I
              build: the evaluation harness before the model, the citation checked against its source before a
              reader sees it, the LLM kept away from any number it could get wrong. Python, FastAPI and AWS are
              the tools — the discipline is knowing what you&apos;ve actually measured.
            </motion.p>

            {/* Approach */}
            <motion.div variants={itemVariants} className="mt-10">
              <h3 className="font-heading font-semibold text-slate-200 text-lg mb-5">
                My Approach
              </h3>
              <div className="flex flex-col gap-3">
                {APPROACH_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-4 rounded-xl bg-surface/60 border border-border hover:border-accent-blue/30 transition-colors duration-200"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-2 shrink-0" />
                    <div>
                      <span className="text-slate-100 font-semibold text-sm">{item.label}</span>
                      <span className="text-slate-400 text-sm ml-2">— {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Quick facts */}
          <motion.div variants={itemVariants}>
            <div className="gradient-border rounded-2xl bg-surface/50 backdrop-blur-sm p-6">
              <h3 className="font-mono text-xs text-slate-500 tracking-widest mb-5 uppercase">
                Quick Facts
              </h3>
              <div className="flex flex-col gap-4">
                {QUICK_FACTS.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-surface-3 border border-border flex items-center justify-center text-accent-blue shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">{label}</div>
                      <div className="text-sm text-slate-200 font-semibold mt-0.5 break-words">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BMS badge */}
            <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-cyan/5 border border-accent-blue/20">
              <div className="text-xs font-mono text-accent-cyan mb-2">{'// current_status'}</div>
              <div className="font-heading font-bold text-slate-100 text-xl">
                Building @ BMS
              </div>
              <div className="text-slate-400 text-sm mt-1 font-body">
                Since April 2025 · Data Science Team
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
