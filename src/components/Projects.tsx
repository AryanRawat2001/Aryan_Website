'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { ElementType } from 'react';
import { ExternalLink, Github, TrendingUp, BarChart3, Bot, MessageSquareText, BrainCircuit, Wallet, ShieldCheck, ClipboardCheck } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  longDesc: string;
  icon: ElementType;
  gradient: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: 'agentrag \u2014 Verified-Citation RAG',
    description: 'RAG over 152 regulatory documents where every quote is located in the source before you see it',
    longDesc:
      "A retrieval system over 152 public FDA and ClinicalTrials.gov documents (13,423 passages) that answers questions and then locates every quote the model produced in the source document \u2014 showing the model's quote and the document's text side by side, and saying so when a quote cannot be found. The evaluation harness was built first: 240 span-grounded queries across 192 retriever and chunking configurations showed dense embeddings losing to BM25 by 43\u201375\u00d7 on exact identifiers, so the shipped service uses keyword search alone. Open source, 1,116 tests.",
    icon: ShieldCheck,
    gradient: 'from-blue-600/20 to-purple-600/20',
    tags: ['Python', 'FastAPI', 'Docker', 'BM25', 'Qdrant', 'RAG', 'Cross-Encoder Reranking', 'pytest'],
    github: 'https://github.com/AryanRawat2001/agentrag',
    featured: true,
  },
  {
    title: 'Audit Trail Review Automation (GxP)',
    description: 'Replaces a manual six-monthly equipment log review across 750 systems',
    longDesc:
      'A GxP-compliant tool that automates the six-monthly audit-trail review of manufacturing equipment logs \u2014 previously a manual, per-system read. Now live across 3 global sites and 750 systems. Uploads go straight to S3, an async pipeline auto-maps the event/date/user columns with reviewer override and saved preferences, flags rows by trigger keyword, and produces a DOCX report answering five standard audit questions with per-row justifications. The LLM is deliberately confined to column mapping and one formatting pass \u2014 every figure is computed in pandas and the flagged-record appendix appended programmatically, an anti-hallucination split that matters in a regulated system.',
    icon: ClipboardCheck,
    gradient: 'from-emerald-600/20 to-blue-600/20',
    tags: ['React', 'FastAPI', 'AWS Lambda', 'Step Functions', 'Aurora PostgreSQL', 'Azure OpenAI', 'pandas', 'GxP'],
    featured: true,
  },
  {
    title: 'Revenue Forecasting Model',
    description: 'Predictive financial model for telecom KPI forecasting with 90% accuracy',
    longDesc:
      'Built a robust revenue forecasting model achieving R² > 80, enabling accurate financial predictions for a major telecom client. Integrated external factors like holidays and network outages through feature engineering to improve model accuracy. Included a stakeholder-facing interface for scenario analysis and real-time revenue projections.',
    icon: TrendingUp,
    gradient: 'from-blue-600/20 to-cyan-600/20',
    tags: ['Python', 'scikit-learn', 'SQL', 'GCP', 'Feature Engineering', 'Tableau'],
    github: 'https://github.com/AryanRawat2001/',
    featured: true,
  },
  {
    title: 'Customer Sentiment Analysis',
    description: 'NLP pipeline for feedback classification with 92% accuracy',
    longDesc:
      'Developed a sentiment analysis pipeline processing large volumes of unstructured customer feedback using NLP and deep learning. Categorized feedback into actionable themes, achieving 92% classification accuracy and reducing response time to customer issues by 30%.',
    icon: MessageSquareText,
    gradient: 'from-violet-600/20 to-purple-600/20',
    tags: ['Python', 'TensorFlow', 'Hugging Face', 'NLP', 'Pandas', 'NumPy'],
    github: 'https://github.com/AryanRawat2001/',
    featured: true,
  },
  {
    title: 'OctaSense AI',
    description: '8-agent AI pipeline for automated EDA and decision intelligence',
    longDesc:
      'An end-to-end multi-agent system powered by 8 specialized agents with tiered model routing \u2014 Claude Haiku for fast profiling and EDA agents, Sonnet 4 for reasoning \u2014 in a 5-stage parallel pipeline. Upload any CSV and get automated data profiling, interactive EDA charts, anomaly detection, feature engineering, ML model recommendations, business interpretation, and a 7-sheet Excel report — all streamed live with no code required.',
    icon: Bot,
    gradient: 'from-violet-600/20 to-indigo-600/20',
    tags: ['Claude (Haiku + Sonnet 4)', 'Multi-Agent', 'Python', 'FastAPI', 'React', 'AWS Bedrock', 'EDA'],
    github: 'https://github.com/AryanRawat2001/OctaSense-AI-MultiAgent-EDA-Decision-Copilot',
    featured: true,
  },
  {
    title: 'Demand Forecasting & Planning',
    description: 'Decision Intelligence product for pharma supply chain at BMS',
    longDesc:
      'Built a comprehensive DFP product on the AERA platform featuring Touchless Forecasting for automated SKU planning \u2014 automating ~42% of the BMS portfolio and cutting forecasting effort ~35% \u2014 plus Remote Functions for reusable business logic. Migrated master data management from SAP IBP to an AERA-native source of truth, replacing an Excel-based tool and eliminating a SAP IBP licence renewal.',
    icon: BrainCircuit,
    gradient: 'from-emerald-600/20 to-cyan-600/20',
    tags: ['AERA', 'Decision Intelligence', 'SAP', 'Redshift', 'SQL', 'Data Pipelines'],
    github: 'https://github.com/AryanRawat2001/',
    featured: true,
  },
  {
    title: 'Monthly Expense Tracker',
    description: 'Auto-tracks spending across cards by parsing bank-alert emails',
    longDesc:
      'A local, privacy-first web app that automatically tracks monthly spending across multiple credit cards and a savings account by parsing bank transaction-alert emails via the read-only Gmail API — no manual statement uploads. A hybrid regex + local-LLM engine extracts each transaction, with a deterministic verifier that prevents hallucinated amounts. Smart classification guarantees no double-counting: card-bill payments and self-transfers are excluded, while friend reimbursements auto-deduct from spend. Includes category charts, date-range views, and a filterable transactions table.',
    icon: Wallet,
    gradient: 'from-cyan-600/20 to-blue-600/20',
    tags: ['Python', 'FastAPI', 'SQLite', 'Gmail API', 'Claude (LLM)', 'Chart.js'],
    github: 'https://github.com/AryanRawat2001/monthly-expense-tracker',
    featured: true,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = project.icon;

  return (
    <div style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.12 }}
      whileHover={{
        rotateY: -4,
        rotateX: 2,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="group gradient-border rounded-2xl bg-surface/50 backdrop-blur-sm hover:bg-surface/80 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] will-change-transform"
    >
      {/* Icon area */}
      <div className={`relative h-36 bg-gradient-to-br ${project.gradient} p-7 flex items-end justify-between`}>
        <div className="w-12 h-12 rounded-xl bg-navy/60 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <Icon size={22} className="text-slate-200" />
        </div>
        {project.featured && (
          <span className="text-xs font-mono text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
        {/* Hover links */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          {project.github && (
            <a
              href={project.github}
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-navy/80 border border-border flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
            >
              <Github size={14} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              aria-label="Live demo"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-navy/80 border border-border flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-slate-100 text-lg mb-2 group-hover:text-accent-blue-bright transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm font-semibold mb-3">{project.description}</p>
        <p className="text-slate-500 text-sm leading-relaxed mb-5 font-body flex-1">
          {project.longDesc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-mono text-slate-400 bg-surface-3 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const orb1Y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={sectionRef} id="projects" className="relative py-28 bg-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ y: orb1Y }} className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-cyan/6 blur-[90px] rounded-full" />
        {/* Large radial glow behind the project grid */}
        <motion.div style={{ y: orb2Y }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.08)_0%,_rgba(139,92,246,0.03)_35%,_transparent_65%)] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header — right-aligned with large inline number */}
        <div className="flex flex-col items-end text-right mb-16">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-baseline gap-4"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-black text-6xl sm:text-7xl bg-gradient-to-br from-accent-purple/40 to-accent-blue/40 bg-clip-text text-transparent leading-none"
            >
              04
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-heading font-bold text-4xl sm:text-5xl tracking-tight text-slate-100"
            >
              What I&apos;ve Built
            </motion.h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-slate-400 text-base max-w-xl mt-4 font-body"
          >
            Real-world data science and AI projects — from revenue forecasting and NLP
            pipelines to GenAI-powered developer tools.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
