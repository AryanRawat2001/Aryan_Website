'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Mail, Phone, Briefcase, Brain, FlaskConical, GraduationCap } from 'lucide-react';

const QUICK_FACTS = [
  { icon: Briefcase, label: 'Role', value: 'Data Scientist' },
  { icon: FlaskConical, label: 'Company', value: 'Bristol Myers Squibb' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE (Cloud), SRM Chennai \'23 · 8.89 CGPA' },
  { icon: MapPin, label: 'Location', value: 'Hyderabad, India' },
  { icon: Mail, label: 'Email', value: 'aryanrawat2001@gmail.com' },
  { icon: Brain, label: 'Focus', value: 'ML · GenAI · Analytics' },
];

const APPROACH_ITEMS = [
  { label: 'Data-First Thinking', desc: 'Every decision grounded in evidence' },
  { label: 'Model Interpretability', desc: 'Black boxes don\'t save patients' },
  { label: 'Rapid Prototyping', desc: 'Ship, iterate, improve relentlessly' },
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
              className="font-heading font-bold text-4xl sm:text-5xl text-slate-100 relative inline-block"
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
          className="grid md:grid-cols-2 min-[900px]:grid-cols-[1fr_400px] gap-16 items-start"
        >
          {/* LEFT — Bio */}
          <div>
            <motion.p variants={itemVariants} className="text-slate-300 text-lg leading-relaxed mb-5 font-body">
              I&apos;m a <span className="text-slate-100 font-semibold">Data Scientist at Bristol Myers Squibb</span>,
              working within the Global Product Development &amp; Supply team on the AERA platform — where data-powered
              solutions drive innovation and operational excellence across the pharmaceutical supply chain.
            </motion.p>

            <motion.p variants={itemVariants} className="text-slate-400 text-base leading-relaxed mb-5 font-body">
              Before BMS, I cut my teeth at <span className="text-slate-300">Comviva Technologies</span>, delivering
              end-to-end analytical solutions for telecom giants — wrangling 65M+ record datasets with PySpark, Hive,
              and Python to build models that actually moved the needle. I know what it takes to ship ML at scale.
            </motion.p>

            <motion.p variants={itemVariants} className="text-slate-400 text-base leading-relaxed font-body">
              My toolkit spans data mining, statistical modeling, and generative AI. Whether it&apos;s building
              a predictive pipeline, engineering a GenAI-powered research tool, or translating complex insights
              into dashboards that executives actually read — I care about the craft of turning raw data into
              decisions that matter.
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
                      <span className="text-slate-500 text-sm ml-2">— {item.desc}</span>
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
                      <div className="text-xs text-slate-500 font-mono">{label}</div>
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
              <div className="text-xs font-mono text-accent-cyan mb-2">// current_status</div>
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
