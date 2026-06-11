"use client";

import { motion } from "framer-motion";

/**
 * The Drag — problem section.
 *
 * Each card enters heavy: large y-offset, blurred, long duration, eased so
 * it *almost* stalls before settling. The stagger is deliberate — the
 * section should feel slow and compressed, mirroring the user's state.
 */
const PROBLEMS = [
  "You wake up tired.",
  "Your schedule controls your health.",
  "You rely on caffeine and willpower.",
  "You know what to do — but you lack a system.",
  "Your energy does not match your ambition.",
];

export default function TheDrag() {
  return (
    <section
      aria-label="The problem"
      className="relative mx-auto max-w-3xl px-6 py-32 sm:py-40"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4 }}
        className="mb-16 font-display text-[11px] font-semibold uppercase tracking-cinematic"
      >
        The Drag
      </motion.p>

      <ul className="space-y-10 sm:space-y-14">
        {PROBLEMS.map((text, i) => (
          <motion.li
            key={text}
            // Heavy entrance: blurred, sunk low, slow to rise.
            initial={{ opacity: 0, y: 80, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 1.3,
              delay: 0.08 * i,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="border-l-2 border-current/15 pl-6 sm:pl-8"
          >
            <span className="mr-4 font-display text-xs tabular-nums opacity-40">
              0{i + 1}
            </span>
            <span className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              {text}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
