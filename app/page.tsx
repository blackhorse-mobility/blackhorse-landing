import InteractiveHero from "@/components/InteractiveHero";
import CorporateCapabilities from "@/components/CorporateCapabilities";
import CorporateSteps from "@/components/CorporateSteps";
import BuiltFor from "@/components/BuiltFor";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white">
      <InteractiveHero />
      <CorporateCapabilities />
      <CorporateSteps />
      <BuiltFor />
    </main>
  );
}
