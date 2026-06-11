"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * The System — the turning point.
 *
 * This is where the page's energy starts to build:
 *   - an SVG foundation line draws itself across the screen, tied directly
 *     to scroll position (style={{ pathLength }})
 *   - five pillars rise out of that foundation one at a time, like a
 *     structure being built
 * The global PageShell background is shifting charcoal → forest green
 * underneath this section, so the brightening happens "for free".
 */
const PILLARS = [
  "Mindfulness",
  "Sleep",
  "Protein + Hydration",
  "Movement",
  "Supplements",
];

export default function TheSystem() {
  const lineRef = useRef<HTMLDivElement>(null);

  // Foundation line draw progress, smoothed so it feels inked, not scrubbed.
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 90%", "start 40%"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section
      aria-label="The Cornerstone system"
      className="relative mx-auto max-w-5xl px-6 py-32 sm:py-44"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-6 font-display text-[11px] font-semibold uppercase tracking-cinematic text-energy"
      >
        The Turning Point
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
      >
        Energy is not random.
        <br />
        <span className="text-energy">It&apos;s built.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-6 max-w-xl text-base leading-relaxed opacity-80 sm:text-lg"
      >
        Cornerstone is one simple system that turns the basics into a daily
        operating rhythm — so consistency stops depending on motivation.
      </motion.p>

      {/* Pillars rising from the foundation */}
      <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 sm:mt-24 md:grid-cols-5">
        {PILLARS.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 72 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.9,
              delay: 0.15 * i, // one at a time — the structure goes up in order
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center text-center"
          >
            {/* The pillar itself: a column that "stands up" */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.15 * i + 0.2, ease: "easeOut" }}
              className="mb-4 h-16 w-1.5 origin-bottom rounded-full bg-energy sm:h-24"
            />
            <p className="font-display text-sm font-semibold tracking-wide">
              {name}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Foundation line — draws itself as the pillars arrive */}
      <div ref={lineRef} className="mt-10">
        <svg viewBox="0 0 1000 4" className="w-full" aria-hidden>
          <motion.line
            x1="0"
            y1="2"
            x2="1000"
            y2="2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
        <p className="mt-4 text-center font-display text-[10px] uppercase tracking-cinematic opacity-50">
          One foundation. Five pillars.
        </p>
      </div>
    </section>
  );
}
