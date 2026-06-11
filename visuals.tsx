"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Per-pillar visuals. Each one gets a scroll or ambient animation unique to
 * its theme. All infinite loops are gated behind useReducedMotion.
 */

/* Mindfulness — a breathing circle. 4s in, 4s out. The slowest element on
   the page, on purpose: this pillar stabilizes the pace. */
export function BreathingCircle() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative flex aspect-square w-full max-w-sm items-center justify-center">
      <motion.div
        animate={reduceMotion ? undefined : { scale: [1, 1.35, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-48 w-48 rounded-full border border-energy/40 sm:h-64 sm:w-64"
      />
      <motion.div
        animate={reduceMotion ? undefined : { scale: [1, 1.18, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="h-28 w-28 rounded-full bg-energy/15 backdrop-blur-sm sm:h-36 sm:w-36"
      />
      <p className="absolute font-display text-[10px] uppercase tracking-cinematic opacity-60">
        Breathe
      </p>
    </div>
  );
}

/* Sleep — night shifts into sunrise as you scroll past, and floating
   particles settle downward (scroll-linked, not timed). */
export function SleepGradient() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 30%"],
  });
  // Night → dawn, driven purely by scroll position through the section.
  const background = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(165deg, #06121c 0%, #0e1f17 100%)",
      "linear-gradient(165deg, #f7d9a8 0%, #f0eadb 100%)",
    ]
  );
  const particleY = useTransform(scrollYProgress, [0, 1], [-30, 40]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.7, 0.3, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ background }}
      className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl"
    >
      {/* Particles settle as the light comes up */}
      {[18, 42, 63, 78, 30, 55].map((left, i) => (
        <motion.span
          key={i}
          style={{ left: `${left}%`, top: `${12 + i * 13}%`, y: particleY, opacity: particleOpacity }}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/80"
        />
      ))}
      <p className="absolute bottom-5 left-5 font-display text-[10px] uppercase tracking-cinematic text-white/70 mix-blend-difference">
        Night → Morning
      </p>
    </motion.div>
  );
}

/* Protein + Hydration — a precise grid where cells snap into place with a
   stiff spring. Clean and sharp, like a well-run nutrition protocol. */
export function NutritionGrid() {
  const cells = ["Protein", "Water", "AM", "PM", "Target", "Logged"];
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-3">
      {cells.map((label, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.7, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          // Stiff spring = the "snap"
          transition={{ type: "spring", stiffness: 320, damping: 22, delay: i * 0.07 }}
          className="rounded-2xl border border-current/15 p-5"
        >
          <div className="mb-3 h-2 w-2 rounded-full bg-energy" />
          <p className="font-display text-xs font-semibold uppercase tracking-widest opacity-80">
            {label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* Movement — kinetic lines streak across the screen at staggered speeds.
   The most dynamic visual on the page. */
export function KineticLines() {
  return (
    <div className="w-full max-w-sm space-y-4 overflow-hidden py-6">
      {[100, 78, 90, 62, 84].map((width, i) => (
        <motion.div
          key={i}
          initial={{ x: "-110%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 + i * 0.08, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: `${width}%` }}
          className={`h-2.5 rounded-full ${i % 2 === 0 ? "bg-energy" : "bg-current opacity-25"}`}
        />
      ))}
      <p className="pt-2 font-display text-[10px] uppercase tracking-cinematic opacity-60">
        Daily minimums · Weekly momentum
      </p>
    </div>
  );
}

/* Supplements — minimal, precise cards. Quiet and exact, no flash. */
export function SupplementCards() {
  const items = ["Foundation stack", "Timing protocol", "Nothing random"];
  return (
    <div className="w-full max-w-sm space-y-3">
      {items.map((label, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 200, damping: 26, delay: i * 0.1 }}
          className="flex items-center justify-between rounded-2xl border border-current/15 px-5 py-4"
        >
          <p className="font-display text-sm font-semibold">{label}</p>
          <span className="h-1.5 w-6 rounded-full bg-gold" />
        </motion.div>
      ))}
    </div>
  );
}
