import type { Config } from "tailwindcss";

/**
 * Color system mirrors the page's "low energy → high energy" arc:
 * ink/charcoal (top) → forest/moss (turning point) → cream/bone/white (payoff).
 * `energy` is the single green accent; `gold` is the premium highlight.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#060606",
        charcoal: "#101113",
        smoke: "#8b8f8c",
        forest: "#0e1f17",
        moss: "#16352a",
        energy: "#27c879",
        energySoft: "#9be4c2",
        cream: "#f4f1e8",
        bone: "#faf8f2",
        gold: "#c9a86a",
        evergreen: "#0c1a13",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        cinematic: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
