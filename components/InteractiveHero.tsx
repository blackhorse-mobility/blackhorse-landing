"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Manrope } from "next/font/google";
import Image from "next/image";
import { DashboardPreview } from "./DashboardPreview";
import CorporateDashboardMockup from "./mockups/CorporateDashboardMockup";
import { useHubSpotTracking } from "@/hooks/useHubSpotTracking";
import { NEXT_WHATSAPP_SUPPORT } from "@/lib/constants";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
});

const CORPORATE_HERO_VIDEO_URL =
  process.env.NEXT_PUBLIC_CORPORATE_HERO_VIDEO_URL ||
  "https://res.cloudinary.com/dviigplcx/video/upload/v1776948685/8344925-uhd_3840_2160_25fps_tleqte.mp4";
const FLEET_HERO_VIDEO_URL =
  process.env.NEXT_PUBLIC_FLEET_HERO_VIDEO_URL ||
  "https://res.cloudinary.com/dviigplcx/video/upload/v1776951384/5982894-uhd_3840_2160_30fps_1_hf9qne.mp4";

function getOptimizedCloudinaryVideoUrl(url: string) {
  if (!url.includes("/video/upload/")) return url;

  return url.replace(
    "/video/upload/",
    "/video/upload/q_auto:good,f_mp4,vc_auto,w_1920,c_limit,ac_none/",
  );
}

function getCloudinaryPosterUrl(url: string) {
  if (!url.includes("/video/upload/")) return null;

  const [baseUrl] = url.split("?");
  const posterUrl = baseUrl.replace(
    "/video/upload/",
    "/video/upload/so_0,q_auto,w_1600,c_limit/",
  );

  return posterUrl.replace(/\.(mp4|mov|webm)$/i, ".jpg");
}

export type ViewMode = "fleet" | "corporate";

interface InteractiveHeroProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onPrimaryAction: () => void;
}

export default function InteractiveHero({
  viewMode,
  setViewMode,
  onPrimaryAction,
}: InteractiveHeroProps) {
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
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Navigation mapping for smooth scroll
  const navSectionMap = {
    fleet: {
      Benefits: "fleet-benefits",
      Features: "fleet-features",
      FAQs: "fleet-faqs",
    },
    corporate: {
      Features: "corporate-features",
      "How It Works": "corporate-how-it-works",
      Customers: "corporate-customers",
      FAQs: "corporate-faqs",
    },
  };

  const handleNavClick = (item: string) => {
    const sectionId =
      navSectionMap[viewMode][
        item as keyof (typeof navSectionMap)[typeof viewMode]
      ];
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

  const currentHeroMediaUrl =
    viewMode === "corporate" ? CORPORATE_HERO_VIDEO_URL : FLEET_HERO_VIDEO_URL;
  const optimizedHeroMediaUrl =
    getOptimizedCloudinaryVideoUrl(currentHeroMediaUrl);
  const currentHeroPosterUrl = getCloudinaryPosterUrl(currentHeroMediaUrl);

  useEffect(() => {
    setIsVideoReady(false);
  }, [viewMode]);

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden font-display selection:bg-cyan-200">
      {currentHeroPosterUrl ? (
        <div
          className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-500 ${
            isVideoReady ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: `url(${currentHeroPosterUrl})` }}
          aria-hidden="true"
        />
      ) : null}

      {optimizedHeroMediaUrl ? (
        <video
          key={viewMode}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={currentHeroPosterUrl || undefined}
          onLoadedData={() => setIsVideoReady(true)}
          onCanPlay={() => setIsVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={optimizedHeroMediaUrl} type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <motion.div
        className="pointer-events-none absolute -left-[10%] top-[40%] h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#5DCBFE]/40 blur-[130px] sm:h-[800px] sm:w-[800px]"
        style={{
          x: blurX,
          y: blurY,
        }}
      />

      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? "md:px-4 md:pt-4 md:sm:pt-6" : "px-0 pt-0"}`}
      >
        <div
          className={`w-full flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "md:max-w-5xl bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b md:border border-gray-200 md:rounded-full py-4 sm:py-4 md:py-2.5 px-4 sm:px-6 md:px-6 mx-auto"
              : "bg-transparent py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-transparent"
          }`}
        >
          <Image
            src={
              scrolled
                ? "/assets/Primary/BH_Horizontal_DarkBlue.png"
                : "/assets/Primary/BH_Horizontal_White.png"
            }
            alt="Blackhorse Logo"
            width={180}
            height={80}
            className="h-7 sm:h-10 md:h-12 w-auto object-contain relative z-50 transition-all duration-300"
          />

          {currentContent.navCenter.length > 0 && (
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2 z-50">
              {currentContent.navCenter.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`text-[12px] sm:text-[13px] md:text-[14px] font-medium transition-colors whitespace-nowrap ${scrolled ? "text-gray-600 hover:text-black" : "text-white/80 hover:text-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {currentContent.navRight && (
            <a
              href={NEXT_WHATSAPP_SUPPORT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onClickButton("nav_talk_to_support", "navbar")}
              className={`text-[12px] sm:text-[13px] md:text-[14px] font-medium transition-colors whitespace-nowrap relative z-50 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border ${
                scrolled
                  ? "text-black border-gray-200 hover:bg-gray-50 no-underline"
                  : "text-white border-white/20 hover:bg-white/10"
              }`}
            >
              {currentContent.navRight}
            </a>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-6 md:px-8 lg:px-6 pt-20 sm:pt-24 md:pt-24 lg:pt-28">
        <div className="mb-6 sm:mb-8 md:mb-10 inline-flex items-center gap-1 sm:gap-0 rounded-full bg-white/10 backdrop-blur-md p-1 shadow-sm ring-1 ring-white/20">
          <button
            onClick={() => {
              if (viewMode !== "corporate") {
                onViewModeChange(viewMode, "corporate");
              }
              setViewMode("corporate");
            }}
            className={`relative rounded-full px-2.5 sm:px-5 md:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-[13px] font-medium tracking-wide transition-all whitespace-nowrap ${
              viewMode === "corporate"
                ? "text-black"
                : "text-white/80 hover:text-white"
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
            <span className="relative z-10 hidden sm:inline">
              &nbsp;Businesses
            </span>
          </button>
          <button
            onClick={() => {
              if (viewMode !== "fleet") {
                onViewModeChange(viewMode, "fleet");
              }
              setViewMode("fleet");
            }}
            className={`relative rounded-full px-2.5 sm:px-5 md:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-[13px] font-medium tracking-wide transition-all whitespace-nowrap ${
              viewMode === "fleet"
                ? "text-black"
                : "text-white/80 hover:text-white"
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
            <span className="relative z-10 hidden sm:inline">
              &nbsp;& Rental
            </span>
          </button>
        </div>

        <motion.h1
          key={`headline-${viewMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-[28px] leading-[1.1] tracking-tight sm:text-[36px] md:text-[48px] lg:text-[56px] xl:text-[64px] font-medium md:text-center text-white"
        >
          {currentContent.headline}
        </motion.h1>

        <motion.p
          key={`subtext-${viewMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className={`mt-3 sm:mt-5 md:mt-6 max-w-[600px] text-[14px] sm:text-[16px] md:text-lg lg:text-[19px] xl:text-[18px] leading-relaxed text-white/90 md:text-center ${manrope.className}`}
        >
          {currentContent.subtext}
        </motion.p>

        <motion.div
          key={`actions-${viewMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-6 sm:mt-8 md:mt-10 flex flex-col gap-3 sm:gap-4 w-full sm:w-auto sm:flex-row items-center justify-center"
        >
          <button
            onClick={() => {
              onClickButton(currentContent.primaryBtn, "hero-section", {
                view_mode: viewMode,
              });
              onPrimaryAction();
            }}
            className="w-full sm:w-auto flex min-w-[140px] sm:min-w-[150px] cursor-pointer items-center justify-center rounded-[10px] bg-white px-5 sm:px-6 py-[12px] sm:py-[14px] text-[13px] sm:text-[14px] font-medium text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {currentContent.primaryBtn}
          </button>

          <a
            href="https://calendly.com/dominic-dimaxdigital/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              onClickButton(currentContent.secondaryBtn, "hero-section", {
                view_mode: viewMode,
              });
            }}
            className="w-full sm:w-auto flex min-w-[140px] sm:min-w-[150px] cursor-pointer items-center justify-center rounded-[10px] border border-white/30 bg-black/20 backdrop-blur-md px-5 sm:px-6 py-[12px] sm:py-[14px] text-[13px] sm:text-[14px] font-medium text-white transition-all hover:bg-white/10 hover:border-white/50 active:scale-[0.98] no-underline"
          >
            {currentContent.secondaryBtn}
          </a>
        </motion.div>
      </div>

      <div className="relative mt-4 sm:mt-6 md:mt-8 flex justify-center w-full px-2 sm:px-4 md:px-6 lg:px-12 translate-y-[2%] sm:translate-y-[5%] md:translate-y-[8%] lg:translate-y-[10%]">
        {viewMode === "corporate" ? (
          <CorporateDashboardMockup />
        ) : (
          <DashboardPreview />
        )}
      </div>
    </section>
  );
}
