"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Manrope } from "next/font/google";
import Image from "next/image";
import { DashboardPreview } from "./DashboardPreview";
import CorporateDashboardMockup from "./mockups/CorporateDashboardMockup";
import { useHubSpotTracking } from "@/hooks/useHubSpotTracking";

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
  const { onClickButton, onViewModeChange } = useHubSpotTracking();


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
      navCenter: ["Benefits", "Product (Features)", "FAQs"],
      navRight: "Talk to Support",
    },
    corporate: {
      headline: "Move teams without the operational overhead",
      subtext:
        "Connect to consistent corporate demand, manage operations with precision, and scale without friction.",
      primaryBtn: "Get started",
      secondaryBtn: "Request a demo",
      navCenter: ["Features", "How It Works", "Customers", "FAQs"],
      navRight: "Talk to Support",
    },
  };

  const currentContent = content[viewMode];
  const [scrolled, setScrolled] = useState(false);

  // Navigation mapping for smooth scroll
  const navSectionMap = {
    fleet: {
      "Benefits": "fleet-benefits",
      "Product (Features)": "fleet-features",
      "FAQs": "fleet-faqs"
    },
    corporate: {
      "Features": "corporate-features",
      "How It Works": "corporate-how-it-works",
      "Customers": "corporate-customers",
      "FAQs": "corporate-faqs"
    }
  };

  const handleNavClick = (item: string) => {
    const sectionId = navSectionMap[viewMode][item as keyof typeof navSectionMap[typeof viewMode]];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    onClickButton(`nav_${item.toLowerCase()}`, "navbar");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-white text-black overflow-hidden font-display selection:bg-cyan-200">

      <motion.div
        className="pointer-events-none absolute -left-[10%] top-[40%] h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#5DCBFE]/40 blur-[130px] sm:h-[800px] sm:w-[800px]"
        style={{
          x: blurX,
          y: blurY,
        }}
      />


      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? "md:px-4 md:pt-4 md:sm:pt-6" : "px-0 pt-0"}`}>
        <div
          className={`w-full flex items-center justify-between transition-all duration-500 ${scrolled
              ? "md:max-w-5xl bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b md:border border-gray-200 md:rounded-full py-4 sm:py-4 md:py-2.5 px-4 sm:px-6 md:px-6 mx-auto"
              : "bg-transparent py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-transparent"
            }`}
        >

          <Image
            src="/assets/Primary/BH_Horizontal_DarkBlue.png"
            alt="Blackhorse Logo"
            width={180}
            height={80}
            className="h-7 sm:h-10 md:h-12 w-auto object-contain relative z-50"
          />

          {currentContent.navCenter.length > 0 && (
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2 z-50">
              {currentContent.navCenter.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-gray-600 hover:text-black transition-colors whitespace-nowrap"
                >
                  {item}
                </button>
              ))}
            </div>
          )}


          {currentContent.navRight && (
            <button
              onClick={() => onClickButton("nav_talk_to_support", "navbar")}
              className={`text-[12px] sm:text-[13px] md:text-[14px] font-medium text-black transition-colors whitespace-nowrap relative z-50 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border ${scrolled
                  ? "border-gray-200 hover:bg-gray-50 no-underline"
                  : "border-transparent underline hover:text-gray-700 hover:bg-black/5"
                }`}
            >
              {currentContent.navRight}
            </button>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-6 md:px-8 lg:px-6 pt-24 sm:pt-28 md:pt-32 lg:pt-36">

        <div className="mb-8 sm:mb-10 md:mb-12 inline-flex items-center gap-1 sm:gap-0 rounded-full bg-gray-50 p-1 shadow-sm ring-1 ring-gray-100">
          <button
            onClick={() => {
              if (viewMode !== "fleet") {
                onViewModeChange(viewMode, "fleet");
              }
              setViewMode("fleet");
            }}
            className={`relative rounded-full px-2.5 sm:px-5 md:px-6 py-1.5 sm:py-2.5 text-[10px] sm:text-xs md:text-[13px] font-medium tracking-wide transition-all whitespace-nowrap ${viewMode === "fleet" ? "text-black" : "text-gray-500 hover:text-black"
              }`}
          >
            {viewMode === "fleet" && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Fleet Owners</span>
            <span className="relative z-10 hidden sm:inline">&nbsp;& Rental</span>
          </button>

          <button
            onClick={() => {
              if (viewMode !== "corporate") {
                onViewModeChange(viewMode, "corporate");
              }
              setViewMode("corporate");
            }}
            className={`relative rounded-full px-2.5 sm:px-5 md:px-6 py-1.5 sm:py-2.5 text-[10px] sm:text-xs md:text-[13px] font-medium tracking-wide transition-all whitespace-nowrap ${viewMode === "corporate" ? "text-black" : "text-gray-500 hover:text-black"
              }`}
          >
            {viewMode === "corporate" && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">Corporate</span>
            <span className="relative z-10 hidden sm:inline">&nbsp;Businesses</span>
          </button>
        </div>


        <motion.h1
          key={`headline-${viewMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-[32px] leading-[1.1] tracking-tight sm:text-[44px] md:text-[56px] lg:text-[68px] xl:text-[76px] font-medium md:text-center"
        >
          {currentContent.headline}
        </motion.h1>


        <motion.p
          key={`subtext-${viewMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className={`mt-4 sm:mt-6 md:mt-8 max-w-[600px] text-[14px] sm:text-[16px] md:text-lg lg:text-[19px] xl:text-[18px] leading-relaxed text-gray-700 md:text-center ${manrope.className}`}
        >
          {currentContent.subtext}
        </motion.p>


        <motion.div
          key={`actions-${viewMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-8 sm:mt-10 md:mt-12 lg:mt-12 flex flex-col gap-3 sm:gap-4 w-full sm:w-auto sm:flex-row items-center justify-center"
        >
          <button
            onClick={() => {
              onClickButton(currentContent.primaryBtn, "hero-section", {
                view_mode: viewMode,
              });
              onPrimaryAction();
            }}
            className="w-full sm:w-auto flex min-w-[140px] sm:min-w-[160px] cursor-pointer items-center justify-center rounded-[10px] bg-[#0A1020] px-6 sm:px-8 py-[15px] sm:py-[17px] text-[13px] sm:text-[15px] font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {currentContent.primaryBtn}
          </button>

          <button
            onClick={() => {
              onClickButton(currentContent.secondaryBtn, "hero-section", {
                view_mode: viewMode,
              });
            }}
            className="w-full sm:w-auto flex min-w-[140px] sm:min-w-[160px] cursor-pointer items-center justify-center rounded-[10px] border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] px-6 sm:px-8 py-[15px] sm:py-[17px] text-[13px] sm:text-[15px] font-medium text-black transition-all hover:bg-gray-50 hover:shadow-sm active:scale-[0.98]"
          >
            {currentContent.secondaryBtn}
          </button>
        </motion.div>
      </div>


      <div className="relative mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex justify-center w-full px-2 sm:px-4 md:px-6 lg:px-12 translate-y-[10%] sm:translate-y-[12%] md:translate-y-[15%] lg:translate-y-[20%]">
        {viewMode === "corporate" ? <CorporateDashboardMockup /> : <DashboardPreview />}
      </div>
    </section>
  );
}
