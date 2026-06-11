"use client";

import { motion } from "framer-motion";

/**
 * Executive Positioning — premium glass cards on the light ground.
 *
 * Cards "lock in" like dashboard modules: a stiff spring with a small
 * y-offset and rotation that zeroes out, staggered left to right. Subtle
 * glassmorphism (backdrop-blur + translucent white) reads premium on the
 * bone background without dark-mode haze.
 */
const FEATURES = [
  {
    title: "48-Hour Personalized Audit",
    copy: "Two days of data and one conversation produce your baseline: sleep, nutrition, movement, mindset, supplements.",
  },
  {
    title: "Simple Weekly Priorities",
    copy: "Three priorities a week. Never a 40-item protocol. The system fits your calendar, not the other way around.",
  },
  {
    title: "Habit Tracking",
    copy: "One glanceable scorecard. You always know whether today moved you forward.",
  },
  {
    title: "Coach Review",
    copy: "A real coach reviews your week and adjusts the plan — accountability without micromanagement.",
  },
  {
    title: "A System, Not Fad Advice",
    copy: "No 30-day challenges, no miracle protocols. An operating system for energy that survives busy quarters.",
  },
];

export default function Executive() {
  return (
    <section
      aria-label="Who Cornerstone is for"
      className="mx-auto max-w-6xl px-6 py-32 sm:py-40"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl"
      >
        Built for executives, founders, and high-output professionals.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="mt-6 max-w-xl text-base leading-relaxed opacity-80 sm:text-lg"
      >
        You do not need more wellness noise. You need a simple operating system
        for energy, focus, and consistency.
      </motion.p>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ title, copy }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 36, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            // Stiff spring = cards lock into place like dashboard modules.
            transition={{ type: "spring", stiffness: 260, damping: 24, delay: i * 0.08 }}
            className="rounded-3xl border border-evergreen/10 bg-white/55 p-7 shadow-[0_1px_2px_rgba(12,26,19,0.06)] backdrop-blur-md"
          >
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-energy" />
              <span className="h-px w-8 bg-gold/70" />
            </div>
            <h3 className="font-display text-lg font-bold tracking-tight">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed opacity-75">{copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
