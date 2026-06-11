"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Nav — minimal fixed header.
 * mix-blend-difference keeps the wordmark legible against both the dark
 * opening and the white finale without any scroll listeners.
 */
export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-white">
        <Link
          href="/"
          className="font-display text-sm font-bold uppercase tracking-cinematic"
        >
          Cornerstone
        </Link>
        <Link
          href="/audit"
          className="font-display text-xs font-semibold uppercase tracking-widest underline-offset-4 hover:underline"
        >
          Start Your Audit
        </Link>
      </nav>
    </motion.header>
  );
}
