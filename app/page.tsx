"use client";

import { useState } from "react";
import InteractiveHero, { ViewMode } from "@/components/InteractiveHero";
import CorporateCapabilities from "@/components/CorporateCapabilities";
import CorporateSteps from "@/components/CorporateSteps";
import BuiltFor from "@/components/BuiltFor";
import FleetCapabilities from "@/components/FleetCapabilities";
import RegistrationDrawer from "@/components/RegistrationDrawer";
import RentalSteps from "@/components/RentalSteps";
import FAQ from "@/components/FAQ";
import CorporateCTA from "@/components/CorporateCTA";
import RentalCTA from "@/components/RentalCTA";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("fleet");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <main className="w-full min-h-screen bg-white">
      <InteractiveHero
        viewMode={viewMode}
        setViewMode={setViewMode}
        onPrimaryAction={() => setIsDrawerOpen(true)}
      />

      {viewMode === "corporate" && (
        <>
          <CorporateCapabilities />
          <CorporateSteps />
          <BuiltFor />
          <FAQ viewMode="corporate" />
          <CorporateCTA />
        </>
      )}

      {viewMode === "fleet" && (
        <>
          <FleetCapabilities />
          <RentalSteps />
          <FAQ viewMode="fleet" />
          <RentalCTA />
        </>
      )}

      <RegistrationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        initialMode={viewMode}
      />
    </main>
  );
}
