"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * EnergyMeter — the narrative device that quantifies the transformation.
 *
 * Maps global scroll progress to an energy percentage that follows the
 * story beats from the brief: 12% (hero) → 25% (the drag) → 60% (system
 * built) → 85% (transformation) → 100% (finale).
 *
 * Desktop: slim vertical meter fixed on the right edge.
 * Mobile:  slim horizontal bar fixed along the bottom.
 * Track/label use `currentColor`, so the meter automatically stays legible
 * as the page re-tints from dark to light.
 */
export default function EnergyMeter({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  // Story-beat mapping, not linear: energy is *built*, section by section.
  const percent = useTransform(
    progress,
    [0, 0.14, 0.3, 0.58, 0.68, 0.82, 1],
    [12, 25, 40, 60, 75, 85, 100]
  );
  const fillScale = useTransform(percent, [0, 100], [0, 1]);
  // The fill warms up as it charges: dim moss green → full energy green.
  const fillColor = useTransform(percent, [12, 60, 100], ["#2e5443", "#27c879", "#27c879"]);

  // Mirror the MotionValue into React state only for the text readout.
  const [value, setValue] = useState(12);
  useMotionValueEvent(percent, "change", (v) => setValue(Math.round(v)));

  return (
    <>
      {/* Desktop — vertical, right edge */}
      <div
        aria-hidden
        className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="font-display text-[10px] font-semibold tabular-nums tracking-widest opacity-70">
          {value}%
        </span>
        <div className="relative h-40 w-[3px] overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-current opacity-15" />
          <motion.div
            style={{ scaleY: fillScale, backgroundColor: fillColor }}
            className="absolute inset-0 origin-bottom rounded-full"
          />
        </div>
        <span className="rotate-180 font-display text-[9px] uppercase tracking-cinematic opacity-50 [writing-mode:vertical-rl]">
          Energy
        </span>
      </div>

      {/* Mobile — horizontal, bottom edge */}
      <div aria-hidden className="fixed inset-x-0 bottom-0 z-50 md:hidden">
        <div className="relative h-[3px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-current opacity-15" />
          <motion.div
            style={{ scaleX: fillScale, backgroundColor: fillColor }}
            className="absolute inset-0 origin-left"
          />
        </div>
      </div>
    </>
  );
}
