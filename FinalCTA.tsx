"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import CTAButton from "../CTAButton";

/**
 * Final CTA — "Fully Charged".
 *
 * A circular energy ring completes as this section scrolls into view,
 * landing on 100% just as the headline arrives. Bright ground (the global
 * background is white here), a soft green glow, and a gently pulsing CTA.
 */
export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center center"],
  });
  const ring = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });
  const display = useTransform(ring, [0, 1], [85, 100]);

  const [value, setValue] = useState(85);
  useMotionValueEvent(display, "change", (v) => setValue(Math.round(v)));

  // SVG ring geometry: r=54 → circumference ≈ 339.3
  const CIRC = 2 * Math.PI * 54;
  const dashOffset = useTransform(ring, [0, 1], [CIRC * 0.15, 0]);

  return (
    <section
      ref={ref}
      aria-label="Get started"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center"
    >
      {/* Soft green accent glow behind the ring */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(39,200,121,0.16)_0%,transparent_70%)]"
      />

      {/* The energy ring completes — 85% → 100% */}
      <div className="relative mb-12 h-32 w-32 sm:h-40 sm:w-40">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke="currentColor" strokeOpacity="0.12" strokeWidth="6"
          />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke="#27c879" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={CIRC}
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold tabular-nums sm:text-4xl">
            {value}%
          </span>
          <span className="font-display text-[9px] uppercase tracking-cinematic opacity-60">
            Charged
          </span>
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
      >
        Build the energy your ambition requires.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto mt-7 max-w-2xl text-base leading-relaxed opacity-80 sm:text-lg"
      >
        Start with the 48-hour Cornerstone Wellness Audit and get a clear plan
        for your sleep, nutrition, movement, mindset, and supplement routine.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-11"
      >
        <CTAButton variant="light" pulse>
          Start Your Audit
        </CTAButton>
      </motion.div>

      <footer className="absolute bottom-6 left-0 right-0 px-6 text-center md:bottom-8">
        <p className="font-display text-[10px] uppercase tracking-cinematic opacity-40">
          Cornerstone · zzcornerstone.com · © {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
}
