"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Manrope } from "next/font/google";
import Image from "next/image";
import { DashboardPreview } from "./DashboardPreview";
import CorporateDashboardMockup from "./mockups/CorporateDashboardMockup";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
});

export type ViewMode = "fleet" | "corporate";

interface InteractiveHeroProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onPrimaryAction: () => void;
}

export default function InteractiveHero({ viewMode, setViewMode, onPrimaryAction }: InteractiveHeroProps) {


  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);


  const springConfig = { damping: 25, stiffness: 150, mass: 1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);


  const blurX = useTransform(smoothX, [-1000, 1000], [-30, 30]);
  const blurY = useTransform(smoothY, [-1000, 1000], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {

      cursorX.set(e.clientX - window.innerWidth / 2);
      cursorY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);


  const content = {
    fleet: {
      headline: "Turn your fleet into a revenue engine",
      subtext:
        "Connect to consistent corporate demand, manage operations with precision, and scale without friction.",
      primaryBtn: "Get started",
      secondaryBtn: "Request A Demo",
      navCenter: ["Customers", "Product", "Company"],
      navRight: "Talk to Support",
    },
    corporate: {
      headline: "Move teams without the operational overhead",
      subtext:
        "Connect to consistent corporate demand, manage operations with precision, and scale without friction.",
      primaryBtn: "Get started",
      secondaryBtn: "Talk to sales",
      navCenter: [],
      navRight: "",
    },
  };

  const currentContent = content[viewMode];

  return (
    <section className="relative w-full min-h-screen bg-white text-black overflow-hidden font-display selection:bg-cyan-200">

      <motion.div
        className="pointer-events-none absolute -left-[10%] top-[40%] h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#5DCBFE]/40 blur-[130px] sm:h-[800px] sm:w-[800px]"
        style={{
          x: blurX,
          y: blurY,
        }}
      />


      


      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 text-center md:pt-16">

        <div className="mb-12 flex items-center justify-center rounded-full bg-gray-50 p-1.5 shadow-sm ring-1 ring-gray-100">
          <button
            onClick={() => setViewMode("fleet")}
            className={`relative rounded-full px-6 py-2.5 text-xs sm:text-[13px] font-medium tracking-wide transition-all ${viewMode === "fleet" ? "text-black" : "text-gray-500 hover:text-black"
              }`}
          >
            {viewMode === "fleet" && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Fleet Owners & Rental Companies</span>
          </button>

          <button
            onClick={() => setViewMode("corporate")}
            className={`relative rounded-full px-6 py-2.5 text-xs sm:text-[13px] font-medium tracking-wide transition-all ${viewMode === "corporate" ? "text-black" : "text-gray-500 hover:text-black"
              }`}
          >
            {viewMode === "corporate" && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Corporate Businesses</span>
          </button>
        </div>


        <motion.h1
          key={`headline-${viewMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-[44px] font-medium leading-[1.1] tracking-tight sm:text-[56px] md:text-[68px] lg:text-[76px]"
        >
          {currentContent.headline}
        </motion.h1>


        <motion.p
          key={`subtext-${viewMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className={`mt-6 max-w-[660px] text-lg sm:text-[19px] md:text-[18px] leading-relaxed text-gray-700 ${manrope.className}`}
        >
          {currentContent.subtext}
        </motion.p>


        <motion.div
          key={`actions-${viewMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-12 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <button
            onClick={onPrimaryAction}
            className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-[10px] bg-[#0A1020] px-8 py-[17px] text-[15px] font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {currentContent.primaryBtn}
          </button>

          <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-[10px] border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] px-8 py-[17px] text-[15px] font-medium text-black transition-all hover:bg-gray-50 hover:shadow-sm active:scale-[0.98]">
            {currentContent.secondaryBtn}
          </button>
        </motion.div>
      </div>


      <div className="relative mt-8 flex justify-center w-full px-6 md:px-12 translate-y-[20%]">
        {viewMode === "corporate" ? <CorporateDashboardMockup /> : <DashboardPreview />}
      </div>
    </section>
  );
}
