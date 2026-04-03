'use client';

import { useState, useRef, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, ArrowRight } from 'lucide-react';

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'aryanrawat2001@gmail.com',
    href: 'mailto:aryanrawat2001@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9974245370',
    href: 'tel:+919974245370',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Hyderabad, India',
    href: null,
  },
];

const SOCIAL_LINKS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/AryanRawat2001/' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aryan-rawat-58551618b/' },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormData = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (error) setError(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch('https://formspree.io/f/xeeprqgl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSent(true);
        setForm(INITIAL_FORM);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-[#080818]">
      {/* Smooth gradient seam blender */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-navy to-transparent z-10" />
      {/* Gradient background — distinct "room" feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060614] via-[#080818] to-[#060614] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
        {/* Radial spotlight centered on the form area (right side) */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08)_0%,_rgba(139,92,246,0.04)_40%,_transparent_70%)] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-cyan/[0.03] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="font-mono text-accent-cyan text-sm mb-2 tracking-widest"
        >
          06. CONTACT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading font-bold text-4xl sm:text-5xl text-slate-100 mb-4 relative inline-block"
        >
          Let&apos;s Connect
          <motion.span
            className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-accent-cyan via-accent-purple to-transparent rounded-full"
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
          className="text-slate-400 text-base max-w-lg mb-16 font-body"
        >
          Open to collaborations, research opportunities, or just a good conversation
          about AI and data science.
        </motion.p>

        <div className="grid lg:grid-cols-[380px_1fr] gap-10">
          {/* LEFT — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <div className="gradient-border rounded-2xl bg-surface/50 p-7 mb-6">
              <h3 className="font-heading font-semibold text-slate-100 text-base mb-6">
                Contact Details
              </h3>
              <div className="flex flex-col gap-5">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-3 border border-border flex items-center justify-center text-accent-blue shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-500">{label}</div>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-slate-200 hover:text-accent-blue-bright transition-colors font-body break-all cursor-pointer"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-sm text-slate-200 font-body">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="gradient-border rounded-2xl bg-surface/50 p-7">
              <h3 className="font-heading font-semibold text-slate-100 text-base mb-5">
                Find Me Online
              </h3>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-surface-3 border border-border hover:border-accent-blue/40 hover:text-accent-blue-bright text-slate-400 transition-all duration-200 cursor-pointer text-sm font-body"
                  >
                    <Icon size={16} />
                    {label}
                    <ArrowRight size={12} className="opacity-50" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3 }}
          >
            <div className="gradient-border rounded-2xl bg-surface/50 p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5">
                    <Send size={24} className="text-emerald-400" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-100 text-2xl mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-400 text-sm font-body mb-6">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-accent-blue text-sm hover:text-accent-blue-bright transition-colors cursor-pointer font-body"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-slate-500 mb-2">
                        NAME
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-surface-3 border border-border focus:border-accent-blue/60 focus:outline-none focus:ring-1 focus:ring-accent-blue/30 text-slate-200 placeholder:text-slate-600 text-sm font-body transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-slate-500 mb-2">
                        EMAIL
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-surface-3 border border-border focus:border-accent-blue/60 focus:outline-none focus:ring-1 focus:ring-accent-blue/30 text-slate-200 placeholder:text-slate-600 text-sm font-body transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono text-slate-500 mb-2">
                      SUBJECT
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-xl bg-surface-3 border border-border focus:border-accent-blue/60 focus:outline-none focus:ring-1 focus:ring-accent-blue/30 text-slate-200 placeholder:text-slate-600 text-sm font-body transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-slate-500 mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, collaboration idea, or just say hello..."
                      className="w-full px-4 py-3 rounded-xl bg-surface-3 border border-border focus:border-accent-blue/60 focus:outline-none focus:ring-1 focus:ring-accent-blue/30 text-slate-200 placeholder:text-slate-600 text-sm font-body transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-accent-blue to-accent-cyan text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer text-sm"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                  {error && (
                    <p className="text-red-400 text-sm font-body mt-2">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
