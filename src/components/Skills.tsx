'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

type Proficiency = 'Expert' | 'Advanced' | 'Proficient';

interface Skill {
  name: string;
  level: number;
  proficiency: Proficiency;
  color: string;
  glowColor: string;
  featured?: boolean;
}

interface SkillCategory {
  category: string;
  tag: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Core Data Science',
    tag: 'FOUNDATION',
    skills: [
      { name: 'Python', level: 5, proficiency: 'Expert', color: 'from-blue-500 to-cyan-400', glowColor: 'rgba(59,130,246,0.3)', featured: true },
      { name: 'MySQL / SQL', level: 4, proficiency: 'Advanced', color: 'from-blue-500 to-cyan-400', glowColor: 'rgba(59,130,246,0.3)' },
      { name: 'Pandas & NumPy', level: 5, proficiency: 'Expert', color: 'from-blue-500 to-cyan-400', glowColor: 'rgba(59,130,246,0.3)', featured: true },
      { name: 'Data Visualization', level: 4, proficiency: 'Advanced', color: 'from-blue-500 to-cyan-400', glowColor: 'rgba(59,130,246,0.3)' },
    ],
  },
  {
    category: 'Machine & Deep Learning',
    tag: 'ML / AI',
    skills: [
      { name: 'Machine Learning', level: 4, proficiency: 'Advanced', color: 'from-violet-500 to-purple-400', glowColor: 'rgba(139,92,246,0.3)', featured: true },
      { name: 'Deep Learning', level: 4, proficiency: 'Advanced', color: 'from-violet-500 to-purple-400', glowColor: 'rgba(139,92,246,0.3)' },
      { name: 'Decision Intelligence', level: 4, proficiency: 'Proficient', color: 'from-violet-500 to-purple-400', glowColor: 'rgba(139,92,246,0.3)' },
      { name: 'PyTorch / TensorFlow', level: 3, proficiency: 'Proficient', color: 'from-violet-500 to-purple-400', glowColor: 'rgba(139,92,246,0.3)' },
    ],
  },
  {
    category: 'Generative AI & LLMs',
    tag: 'GEN AI',
    skills: [
      { name: 'Generative AI', level: 4, proficiency: 'Advanced', color: 'from-cyan-500 to-teal-400', glowColor: 'rgba(6,182,212,0.3)', featured: true },
      { name: 'Claude / Anthropic', level: 4, proficiency: 'Advanced', color: 'from-cyan-500 to-teal-400', glowColor: 'rgba(6,182,212,0.3)' },
      { name: 'LLM Fine-tuning', level: 3, proficiency: 'Proficient', color: 'from-cyan-500 to-teal-400', glowColor: 'rgba(6,182,212,0.3)' },
      { name: 'Prompt Engineering', level: 4, proficiency: 'Advanced', color: 'from-cyan-500 to-teal-400', glowColor: 'rgba(6,182,212,0.3)' },
    ],
  },
];

const PROFICIENCY_MAP: Record<Proficiency, string> = {
  Expert: 'text-accent-cyan',
  Advanced: 'text-accent-blue-bright',
  Proficient: 'text-slate-400',
};

function RadialRing({
  filled,
  total,
  color,
  skillSlug,
  isInView,
  delay,
}: {
  filled: number;
  total: number;
  color: string;
  skillSlug: string;
  isInView: boolean;
  delay: number;
}) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const pct = filled / total;
  const gradientId = `ring-${color}-${skillSlug}`;

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="shrink-0">
      <circle
        cx="24"
        cy="24"
        r={radius}
        fill="none"
        stroke="currentColor"
        className="text-surface-3"
        strokeWidth="3"
      />
      <motion.circle
        cx="24"
        cy="24"
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={isInView ? { strokeDashoffset: circumference * (1 - pct) } : { strokeDashoffset: circumference }}
        transition={{ duration: 1.2, delay, ease: [0.34, 1.56, 0.64, 1] }}
        transform="rotate(-90 24 24)"
      />
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          {color === 'blue' && (
            <>
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </>
          )}
          {color === 'purple' && (
            <>
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#A78BFA" />
            </>
          )}
          {color === 'cyan' && (
            <>
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#14B8A6" />
            </>
          )}
        </linearGradient>
      </defs>
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-slate-300 text-[11px] font-mono"
      >
        {filled}/{total}
      </text>
    </svg>
  );
}

function SkillTile({
  skill,
  ringColor,
  index,
  isInView,
}: {
  skill: Skill;
  ringColor: string;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.07 + 0.2 }}
      className={`group relative rounded-2xl bg-surface/60 border border-border p-5 flex flex-col justify-between
        hover:border-accent-blue/40 hover:bg-surface/80 hover:scale-[1.03] hover:shadow-[0_0_30px_var(--glow)]
        transition-all duration-300 cursor-default
        ${skill.featured ? '' : ''}`}
      style={{ '--glow': skill.glowColor } as React.CSSProperties}
    >
      {/* Top gradient accent bar */}
      <div className={`absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r ${skill.color} opacity-40 group-hover:opacity-80 transition-opacity`} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-heading font-semibold text-slate-100 text-base group-hover:text-accent-blue-bright transition-colors truncate">
            {skill.name}
          </h4>
          <span className={`text-xs font-mono mt-1 inline-block ${PROFICIENCY_MAP[skill.proficiency]}`}>
            {skill.proficiency}
          </span>
        </div>

        <RadialRing
          filled={skill.level}
          total={5}
          color={ringColor}
          skillSlug={skill.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          isInView={isInView}
          delay={index * 0.07 + 0.4}
        />
      </div>

      {skill.featured && (
        <div className="mt-3 flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${skill.color}`} />
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Core skill</span>
        </div>
      )}
    </motion.div>
  );
}

function BentoCategory({ category, catIndex }: { category: SkillCategory; catIndex: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const ringColorMap: Record<number, string> = { 0: 'blue', 1: 'purple', 2: 'cyan' };
  const ringColor = ringColorMap[catIndex] ?? 'blue';

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: catIndex * 0.15 }}
        className="flex items-center gap-3 mb-5"
      >
        <h3 className="font-heading font-semibold text-slate-100 text-lg">
          {category.category}
        </h3>
        <span className="text-xs font-mono text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2.5 py-1 rounded-full">
          {category.tag}
        </span>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {category.skills.map((skill, i) => (
          <SkillTile
            key={skill.name}
            skill={skill}
            ringColor={ringColor}
            index={i + catIndex * 4}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} id="skills" className="relative py-28 bg-navy overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ y: orbY }} className="absolute top-1/2 right-0 w-96 h-96 bg-accent-purple/8 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-accent-cyan text-sm mb-2 tracking-widest"
        >
          02. SKILLS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading font-bold text-4xl sm:text-5xl text-slate-100 mb-4 relative inline-block"
        >
          Skills & Expertise
          <motion.span
            className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-accent-cyan via-accent-blue to-transparent rounded-full"
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
          A snapshot of my technical toolkit across data science, machine learning,
          and generative AI.
        </motion.p>

        {/* Bento grid by category */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
          {SKILL_CATEGORIES.map((cat, i) => (
            <BentoCategory key={cat.category} category={cat} catIndex={i} />
          ))}
        </div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <p className="text-xs font-mono text-slate-500 mb-4 tracking-widest">
            // TOOLS & ECOSYSTEM
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[
              'Python', 'MySQL', 'PyTorch', 'TensorFlow', 'scikit-learn',
              'Pandas', 'NumPy', 'Hugging Face', 'LangChain', 'Claude API',
              'Jupyter', 'Git', 'Docker', 'Tableau', 'Power BI',
              'AWS', 'Azure', 'FastAPI', 'Streamlit', 'R',
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-mono text-slate-400 bg-surface border border-border hover:border-accent-blue/40 hover:text-accent-blue-bright hover:scale-110 rounded-lg transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
