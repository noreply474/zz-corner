"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * CTAButton — shared call-to-action.
 * `variant="dark"`  : for dark sections (light surface, dark text)
 * `variant="light"` : for light sections (evergreen surface, light text)
 * `pulse`           : gentle infinite scale pulse for the finale,
 *                     disabled automatically under prefers-reduced-motion.
 */
export default function CTAButton({
  children,
  variant = "dark",
  pulse = false,
  href = "/audit",
}: {
  children: React.ReactNode;
  variant?: "dark" | "light";
  pulse?: boolean;
  href?: string;
}) {
  const reduceMotion = useReducedMotion();

  const styles =
    variant === "dark"
      ? "bg-cream text-evergreen hover:bg-white"
      : "bg-evergreen text-bone hover:bg-forest";

  return (
    <motion.span
      className="inline-block"
      animate={
        pulse && !reduceMotion
          ? { scale: [1, 1.035, 1] }
          : undefined
      }
      transition={
        pulse ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : undefined
      }
    >
      <Link
        href={href}
        className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 font-display text-sm font-semibold tracking-wide transition-colors duration-300 ${styles}`}
      >
        {children}
        <span
          aria-hidden
          className="inline-block h-2 w-2 rounded-full bg-energy transition-transform duration-300 group-hover:scale-150"
        />
      </Link>
    </motion.span>
  );
}
