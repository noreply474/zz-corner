# Cornerstone — Landing Page

A scroll-driven landing page for **zzcornerstone.com** that moves from a
"low energy" state (dark, slow, grainy) to a "high energy" state (bright,
fast, sharp) as the user scrolls.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for all scroll + entrance animations
  (GSAP was not needed — Framer Motion covers every effect with a smaller bundle)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## How the energy arc works

`components/PageShell.tsx` is the engine. One global, spring-smoothed scroll
progress value (0 → 1) drives:

1. **Background color** — ink → charcoal → forest → moss → cream → white
2. **Text color** — muted gray → warm light → dark evergreen (sections inherit `currentColor`)
3. **Film grain** — heavy at the top, fully dissolved by ~70% scroll
4. **Energy meter** — fixed at the viewport edge, 12% → 100% mapped to story beats

Everything else is local to each section.

## Structure

```
app/
  layout.tsx          fonts (Sora display / Inter body) + metadata
  page.tsx            section composition
  audit/page.tsx      placeholder CTA destination (swap in real intake form)
components/
  PageShell.tsx       global scroll engine (bg/text/grain/meter)
  EnergyMeter.tsx     fixed scroll-progress meter (vertical desktop, bottom bar mobile)
  Nav.tsx             minimal fixed header (mix-blend-difference)
  CTAButton.tsx       shared CTA (dark/light variants, optional pulse)
  sections/
    Hero.tsx          pinned hero — parallax monolith, dim pulse, blur entrances
    TheDrag.tsx       heavy, slow problem cards (blur → sharp)
    TheSystem.tsx     scroll-drawn foundation line + rising pillars
    Transformation.tsx pinned before/after word-swap (dissolve vs snap)
    Executive.tsx     glassmorphism feature cards that lock in
    FinalCTA.tsx      energy ring completes to 100%, pulsing CTA
    pillars/
      PillarBreakdown.tsx  five alternating pillar sections
      visuals.tsx          per-pillar animations (breathing circle, night→dawn
                           gradient, snapping grid, kinetic lines, precise cards)
```

## Accessibility & performance

- `MotionConfig reducedMotion="user"` + manual `useReducedMotion` gates on all
  infinite loops (pulse, breathing circle, scroll cue)
- Animations are transform/opacity/color only (GPU-composited, no layout thrash)
- Grain is an inline-SVG CSS texture — zero image requests
- Fonts self-hosted via `next/font` (no FOUT, no external requests)
- Semantic landmarks: `main`, `header`, `section[aria-label]`, `footer`

## Connecting the real brand

- All CTAs point to `/audit` — replace `app/audit/page.tsx` with the real
  intake/scheduling flow
- Brand colors live in `tailwind.config.ts` (`energy`, `gold`, `forest`, …)
- Copy is plain JSX/arrays at the top of each section file
