'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight, TrendingUp } from 'lucide-react';

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    let frameId = 0;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * target;
      setCount(Math.min(Math.round(start), target));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target]);

  return (
    <motion.div
      ref={counterRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-5 mb-12 p-5 rounded-2xl bg-gradient-to-r from-accent-blue/10 via-accent-cyan/5 to-accent-purple/10 border border-accent-blue/20"
    >
      <div className="w-14 h-14 rounded-xl bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center shrink-0">
        <TrendingUp size={24} className="text-accent-cyan" />
      </div>
      <div>
        <div className="font-heading font-extrabold text-4xl text-slate-100">
          {count}
          <span className="text-accent-cyan">{suffix}</span>
        </div>
        <div className="text-sm font-mono text-slate-500 mt-0.5">Years of Professional Impact</div>
      </div>
      <div className="ml-auto hidden sm:flex gap-4">
        <div className="text-center">
          <div className="font-heading font-bold text-lg text-slate-200">3</div>
          <div className="text-xs font-mono text-slate-600">Companies</div>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="text-center">
          <div className="font-heading font-bold text-lg text-slate-200">3</div>
          <div className="text-xs font-mono text-slate-600">Domains</div>
        </div>
      </div>
    </motion.div>
  );
}

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  type: string;
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    title: 'Data Scientist',
    company: 'Bristol Myers Squibb',
    period: 'Apr 2025 — Present',
    location: 'Hyderabad, India',
    type: 'Full-time',
    current: true,
    description:
      'Working extensively with AERA Technologies\' Decision Intelligence platform within the GPS team — building and shipping products that empower planners, forecasters, and supply chain leaders to make smarter, faster decisions.',
    highlights: [
      'Built Demand Forecasting & Planning (DFP) product — including Touchless Forecasting for automated SKU planning and Bulk Forecast Update workflows',
      'Engineered Data Quality solutions and complex data pipelines integrating SAP, Redshift, and AERA\'s platform',
      'Replaced legacy RapidResponse processes with AERA-native solutions, cutting costs and improving performance',
      'Developed Remote Functions used across the platform for scalable, reusable business logic',
      'Built POCs for enterprise clients like FedEx — UI-based EDA tool for supply chain data with automated decision insights for stakeholders',
      'Collaborating cross-functionally with planners, forecasters, and engineering teams globally',
    ],
    technologies: ['AERA', 'Python', 'SQL', 'SAP', 'Redshift', 'Data Pipelines', 'Decision Intelligence'],
  },
  {
    title: 'Data Scientist',
    company: 'Comviva Technologies',
    period: 'Sep 2023 — Sep 2024',
    location: 'Bengaluru, India',
    type: 'Full-time',
    current: false,
    description:
      'Delivered end-to-end analytical solutions for leading telecom clients like Indosat Ooredoo Hutchison, managing and analyzing large-scale datasets (65M+ records) to drive business intelligence and customer insights.',
    highlights: [
      'Forecasted financial and acquisition KPIs with 90% accuracy using data mining techniques, Python, SQL, and Google Cloud',
      'Automated reporting processes, saving 20+ hours/month and enabling faster insight turnaround with PySpark and Hive',
      'Analyzed datasets of 50M+ rows using EDA, cohort, and funnel techniques — achieving 15% increase in customer retention',
      'Designed scalable GenAI solutions on GCP, reducing model training time by 30% and boosting deployment efficiency',
      'Automated code documentation with Mistral LLM, achieving 95% accuracy and 25% developer productivity boost',
    ],
    technologies: ['Python', 'PySpark', 'Apache Hive', 'MySQL', 'GCP', 'Mistral', 'scikit-learn', 'Tableau'],
  },
  {
    title: 'Analyst Intern',
    company: 'Tech Mahindra',
    period: 'Feb 2022 — Jun 2022',
    location: 'Chennai, India',
    type: 'Internship',
    current: false,
    description:
      'Analyzed telecom data including customer usage patterns and network performance metrics to provide actionable insights for service optimization.',
    highlights: [
      'Analyzed customer usage patterns and network performance metrics, improving service efficiency by 15%',
      'Evaluated customer churn trends using EDA and statistical modeling, leading to 10% improvement in retention strategies',
    ],
    technologies: ['Python', 'SQL', 'Excel', 'Statistical Modeling'],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="experience" className="relative py-28 bg-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ y: orbY }} className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-blue/6 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-accent-cyan text-sm mb-2 tracking-widest"
        >
          03. EXPERIENCE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading font-bold text-4xl sm:text-5xl text-slate-100 mb-10 relative inline-block"
        >
          Work Experience
          <motion.span
            className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-accent-blue via-accent-purple to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          />
        </motion.h2>

        {/* Animated years counter */}
        <AnimatedCounter target={2} suffix="+" />

        <div className="relative" ref={ref}>
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-accent-blue to-accent-cyan rounded-full"
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </div>

          {/* Experience cards */}
          <div className="flex flex-col gap-8">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.15 + 0.2 }}
                className="md:pl-20 relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-7 w-5 h-5 rounded-full bg-navy border-2 border-accent-blue hidden md:flex items-center justify-center -translate-x-1/2 glow-blue">
                  <div className="w-2 h-2 rounded-full bg-accent-blue" />
                </div>

                <div className="gradient-border rounded-2xl bg-surface/50 hover:bg-surface/70 transition-colors duration-300 overflow-hidden">
                  {/* Card header */}
                  <div className="p-7 border-b border-border">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading font-bold text-xl text-slate-100">
                            {exp.title}
                          </h3>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Current
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase size={14} className="text-accent-blue" />
                          <span className="text-accent-blue-bright font-semibold text-base">
                            {exp.company}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 items-end">
                        <div className="flex items-center gap-1.5 text-slate-400 text-sm font-mono">
                          <Calendar size={13} />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-mono">
                          <MapPin size={13} />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-7">
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-body">
                      {exp.description}
                    </p>

                    <h4 className="text-xs font-mono text-slate-500 tracking-widest mb-3 uppercase">
                      Key Contributions
                    </h4>
                    <ul className="flex flex-col gap-2.5 mb-7">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-sm text-slate-300 font-body">
                          <ChevronRight
                            size={14}
                            className="text-accent-cyan shrink-0 mt-0.5"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono text-accent-blue bg-accent-blue/10 border border-accent-blue/20 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
