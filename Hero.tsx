"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import CTAButton from "../CTAButton";

/**
 * Hero — "Low Energy State"
 *
 * Pinned section (180vh wrapper + sticky 100vh viewport). While the user
 * scrolls through it:
 *   - a heavy dark monolith shape slowly rises behind the copy (parallax)
 *   - a dim radial pulse gets stronger the further you scroll
 *   - the headline gently blurs/compresses on exit, like fading energy
 * On load, all copy resolves out of a blur — slow on purpose. The page
 * should *feel* tired here.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Heavy object rising as the user scrolls (slow = heavy).
  const monolithY = useTransform(scrollYProgress, [0, 1], ["12%", "-18%"]);
  // The dim pulse grows stronger once scrolling begins.
  const pulseOpacity = useTransform(scrollYProgress, [0, 0.5], [0.12, 0.35]);
  // Copy sinks and blurs on exit — energy draining away.
  const copyY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Slow, heavy entrance: long durations, long delays.
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section ref={ref} aria-label="Hero" className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Heavy monolith — barely visible mass behind the copy */}
        <motion.div
          aria-hidden
          style={{ y: reduceMotion ? 0 : monolithY }}
          className="absolute left-1/2 top-1/2 h-[70vh] w-[42vw] min-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent"
        />

        {/* Dim pulse — a faint heartbeat of green under the surface */}
        <motion.div
          aria-hidden
          style={{ opacity: pulseOpacity }}
          className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(39,200,121,0.25)_0%,transparent_65%)]"
          />
        </motion.div>

        {/* Copy */}
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <motion.p
            {...fadeUp(0.3)}
            className="mb-6 font-display text-[11px] font-semibold uppercase tracking-cinematic text-smoke"
          >
            Drained · Foggy · Inconsistent · Reactive · Low Energy
          </motion.p>

          <motion.h1
            {...fadeUp(0.7)}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-cream/90 sm:text-6xl lg:text-7xl"
          >
            From Drained
            <br />
            to <span className="text-energy">Dialed In.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(1.2)}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-smoke sm:text-lg"
          >
            Cornerstone helps executives rebuild energy, focus, and consistency
            through a simple performance system built around sleep, protein,
            hydration, movement, mindfulness, and supplements.
          </motion.p>

          <motion.div {...fadeUp(1.7)} className="mt-10">
            <CTAButton variant="dark">Start Your 48-Hour Wellness Audit</CTAButton>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.4, duration: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center md:bottom-10"
        >
          <p className="font-display text-[10px] uppercase tracking-cinematic">
            Scroll to build energy
          </p>
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mt-3 h-8 w-px bg-current"
          />
        </motion.div>
      </div>
    </section>
  );
}
