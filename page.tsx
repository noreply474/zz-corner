import PageShell from "@/components/PageShell";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import TheDrag from "@/components/sections/TheDrag";
import TheSystem from "@/components/sections/TheSystem";
import PillarBreakdown from "@/components/sections/pillars/PillarBreakdown";
import Transformation from "@/components/sections/Transformation";
import Executive from "@/components/sections/Executive";
import FinalCTA from "@/components/sections/FinalCTA";

/**
 * Landing page — a single scroll story from low energy to high energy.
 * PageShell owns the global background/text color arc, the film grain,
 * and the fixed energy meter; each section owns its local animations.
 */
export default function Home() {
  return (
    <PageShell>
      <Nav />
      <Hero />
      <TheDrag />
      <TheSystem />
      <PillarBreakdown />
      <Transformation />
      <Executive />
      <FinalCTA />
    </PageShell>
  );
}
