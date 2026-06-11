"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Transformation — "High Energy State", the payoff.
 *
 * Pinned section (260vh wrapper + sticky viewport). Scroll progress drives a
 * word-by-word swap: each "before" word dissolves on the left while its
 * "after" counterpart snaps into place on the right, top to bottom. The
 * headline resolves once the swap completes.
 *
 * Hooks can't live in loops, so each row is its own <SwapRow> component
 * receiving the shared progress MotionValue and its slice of the timeline.
 */
const PAIRS: [string, string][] = [
  ["Reactive", "Energized"],
  ["Tired", "Focused"],
  ["Inconsistent", "Consistent"],
  ["Foggy", "Clear"],
  ["Unstructured", "In control"],
];

function SwapRow({
  progress,
  index,
  before,
  after,
}: {
  progress: MotionValue<number>;
  index: number;
  before: string;
  after: string;
}) {
  // Each row owns a 0.09-wide slice of the scroll timeline.
  const start = 0.12 + index * 0.11;
  const end = start + 0.09;

  // Left word dissolves (fades + blurs out)…
  const beforeOpacity = useTransform(progress, [start, end], [0.85, 0.12]);
  const beforeBlur = useTransform(progress, [start, end], [0, 5]);
  const beforeFilter = useTransform(beforeBlur, (b) => `blur(${b}px)`);
  // …while the right word snaps in (scale spring-feel via tight range).
  const afterOpacity = useTransform(progress, [start, end], [0, 1]);
  const afterScale = useTransform(progress, [start, end], [0.88, 1]);
  const afterX = useTransform(progress, [start, end], [18, 0]);

  return (
    <div className="grid grid-cols-2 items-center gap-6 sm:gap-12">
      <motion.p
        style={{ opacity: beforeOpacity, filter: beforeFilter }}
        className="text-right font-display text-xl font-semibold tracking-tight line-through decoration-current/30 sm:text-3xl"
      >
        {before}
      </motion.p>
      <motion.p
        style={{ opacity: afterOpacity, scale: afterScale, x: afterX }}
        className="font-display text-xl font-bold tracking-tight text-energy sm:text-3xl"
      >
        {after}
      </motion.p>
    </div>
  );
}

export default function Transformation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Headline lands after the last word swap.
  const headlineOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.72, 0.88], [32, 0]);

  return (
    <section ref={ref} aria-label="Transformation" className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6">
        <p className="mb-10 font-display text-[11px] font-semibold uppercase tracking-cinematic opacity-60 sm:mb-14">
          Before → After
        </p>

        <div className="w-full max-w-2xl space-y-5 sm:space-y-7">
          {PAIRS.map(([before, after], i) => (
            <SwapRow
              key={before}
              progress={scrollYProgress}
              index={i}
              before={before}
              after={after}
            />
          ))}
        </div>

        <motion.h2
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="mt-12 max-w-3xl text-center font-display text-3xl font-bold leading-tight tracking-tight sm:mt-16 sm:text-4xl lg:text-5xl"
        >
          Clearer mornings. Stronger days.
          <br />
          Better decisions.
        </motion.h2>
      </div>
    </section>
  );
}
