"use client";

import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import EnergyMeter from "./EnergyMeter";

/**
 * PageShell — the engine of the "low energy → high energy" arc.
 *
 * One global scroll progress value (0 → 1, smoothed with a spring) drives:
 *   1. backgroundColor : ink → charcoal → deep forest → cream → white
 *   2. color           : muted gray text → warm light → dark evergreen
 *      (every section inherits `currentColor`, so the whole page re-tints itself)
 *   3. grain opacity   : heavy film grain at the top, fully dissolved by ~70%
 *   4. EnergyMeter     : 12% → 100% readout fixed at the viewport edge
 *
 * MotionConfig reducedMotion="user" makes Framer Motion respect
 * prefers-reduced-motion globally (transform animations are dropped,
 * opacity/color crossfades are kept).
 */

// Scroll-progress stops for the global color story.
const STOPS = [0, 0.14, 0.3, 0.46, 0.58, 0.68, 0.82, 1];
const BG = [
  "#060606", // hero — near black
  "#0c0d0f", // the drag — charcoal
  "#0e1f17", // turning point — deep forest
  "#16352a", // pillars — moss
  "#dcd9cd", // pillars end — light enters
  "#f4f1e8", // transformation — cream
  "#faf8f2", // executive — bone
  "#ffffff", // finale — white
];
const FG = [
  "#7d817e", // muted, low contrast
  "#9a9e9a",
  "#cfd4cd",
  "#ece9e0", // brightest light text, on moss
  "#1c2a22", // flip: dark text on light ground
  "#142019",
  "#10180f",
  "#0c1410",
];

export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useScroll();
  // Spring-smooth the raw scroll value so color/grain shifts feel cinematic
  // rather than tied 1:1 to scroll-wheel ticks.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const backgroundColor = useTransform(progress, STOPS, BG);
  const color = useTransform(progress, STOPS, FG);
  // Grain = the "fog". Strong at the top, gone once the light arrives.
  const grainOpacity = useTransform(progress, [0, 0.45, 0.7], [0.14, 0.09, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <motion.main
        style={{ backgroundColor, color }}
        className="relative min-h-screen overflow-x-clip font-body"
      >
        {children}

        {/* Fixed film-grain overlay (see globals.css for the texture) */}
        <motion.div
          aria-hidden
          style={{ opacity: grainOpacity }}
          className="grain pointer-events-none fixed inset-0 z-40"
        />

        <EnergyMeter progress={progress} />
      </motion.main>
    </MotionConfig>
  );
}
