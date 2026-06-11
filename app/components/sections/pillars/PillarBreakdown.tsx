"use client";

import { motion } from "framer-motion";
import {
  BreathingCircle,
  SleepGradient,
  NutritionGrid,
  KineticLines,
  SupplementCards,
} from "./visuals";

/**
 * Pillar Breakdown — "Building Energy"
 *
 * Five full-height sections, one per pillar, each with a unique visual
 * (see visuals.tsx). Layout alternates text/visual sides on desktop and
 * stacks on mobile. While the user moves through these sections, the
 * global background is crossing from moss green into light — the brightest
 * part of the transformation happens here.
 */
const PILLARS = [
  {
    id: "mindfulness",
    kicker: "Pillar 01",
    title: "Mindfulness & Spiritual Practice",
    copy: "A clear mind is the first energy system. Ten minutes of stillness changes how the next ten hours feel.",
    bullets: [
      "A short daily practice, anchored to your calendar",
      "Breath and focus work that lowers reactivity",
      "Built for skeptics — practical, not mystical",
    ],
    Visual: BreathingCircle,
  },
  {
    id: "sleep",
    kicker: "Pillar 02",
    title: "Sleep",
    copy: "Sleep is the multiplier on everything else. We engineer your evenings so mornings take care of themselves.",
    bullets: [
      "A fixed wind-down protocol, not vague 'sleep hygiene'",
      "Light, temperature, and timing dialed to your schedule",
      "Travel and late-night contingency plans",
    ],
    Visual: SleepGradient,
  },
  {
    id: "nutrition",
    kicker: "Pillar 03",
    title: "Protein + Hydration",
    copy: "Stable energy starts with two numbers: grams of protein and ounces of water. We make both automatic.",
    bullets: [
      "Daily targets matched to your body and output",
      "Default meals that work in airports and boardrooms",
      "No tracking apps required — a simple checklist",
    ],
    Visual: NutritionGrid,
  },
  {
    id: "movement",
    kicker: "Pillar 04",
    title: "Movement",
    copy: "Not a training program — a momentum program. Daily minimums that compound into strength and stamina.",
    bullets: [
      "Non-negotiable daily floor: walk, lift, or mobility",
      "Sessions sized for real calendars (20–40 minutes)",
      "Progression you can sustain for years, not weeks",
    ],
    Visual: KineticLines,
  },
  {
    id: "supplements",
    kicker: "Pillar 05",
    title: "Supplements",
    copy: "Only what supports the system. Nothing random.",
    bullets: [
      "A short foundation stack, reviewed by your coach",
      "Timed to your sleep and training, not trends",
      "Quarterly review — anything that isn't working gets cut",
    ],
    Visual: SupplementCards,
  },
];

export default function PillarBreakdown() {
  return (
    <section aria-label="The five pillars">
      {PILLARS.map(({ id, kicker, title, copy, bullets, Visual }, i) => (
        <div
          key={id}
          className="mx-auto grid min-h-[90vh] max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16"
        >
          {/* Text column — alternates sides on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={i % 2 === 1 ? "md:order-2" : ""}
          >
            <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-cinematic text-energy">
              {kicker}
            </p>
            <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed opacity-80 sm:text-lg">
              {copy}
            </p>
            <ul className="mt-7 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-energy" />
                  <span className="opacity-85">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Visual column */}
          <div
            className={`flex justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}
          >
            <Visual />
          </div>
        </div>
      ))}
    </section>
  );
}
