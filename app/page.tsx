"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import InteractiveHero, { ViewMode } from "@/components/InteractiveHero";
import CorporateCapabilities from "@/components/CorporateCapabilities";
import CorporateSteps from "@/components/CorporateSteps";
import BuiltFor from "@/components/BuiltFor";
import FleetCapabilities from "@/components/FleetCapabilities";
import RegistrationDrawer from "@/components/RegistrationDrawer";
import RentalSteps from "@/components/RentalSteps";
import Footer from "@/components/Footer";

// Lazy load components that appear below the fold for better performance
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const CorporateCTA = dynamic(() => import("@/components/CorporateCTA"), { ssr: true });
const RentalCTA = dynamic(() => import("@/components/RentalCTA"), { ssr: true });

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("fleet");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative w-full">
      <main className="w-full min-h-screen bg-white relative z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
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
      
      <Footer />
    </div>
  );
}
