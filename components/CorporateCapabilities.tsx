"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Manrope } from "next/font/google";
import VerifiedFleetsMockup from "./mockups/VerifiedFleetsMockup";
import SmartBookingMockup from "./mockups/SmartBookingMockup";
import ClearPricingMockup from "./mockups/ClearPricingMockup";
import UnifiedBillingMockup from "./mockups/UnifiedBillingMockup";
import LiveTrackingMockup from "./mockups/LiveTrackingMockup";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-manrope",
});

interface Feature {
  id: string;
  title: string;
  description: string;
  imageColor: string; // Placeholder for actual images
  mockup?: React.ReactNode; 
}

const features: Feature[] = [
  {
    id: "verified",
    title: "Verified Fleets",
    description:
      "Work with vetted, corporate-grade vehicles and professional drivers you can trust.",
    imageColor: "from-gray-200 to-gray-300",
    mockup: <VerifiedFleetsMockup />,
  },
  {
    id: "booking",
    title: "Smart Booking",
    description:
      "Instantly book or schedule rides in advance with a seamless, user-friendly interface.",
    imageColor: "from-gray-300 to-gray-400",
    mockup: <SmartBookingMockup />,
  },
  {
    id: "pricing",
    title: "Clear Pricing",
    description:
      "No hidden fees. Know exactly what you'll pay before you confirm your ride.",
    imageColor: "from-gray-400 to-gray-500",
    mockup: <ClearPricingMockup />,
  },
  {
    id: "billing",
    title: "Unified billing",
    description:
      "Keep all your corporate travel expenses in one centralized, easy-to-manage invoice.",
    imageColor: "from-gray-500 to-gray-600",
    mockup: <UnifiedBillingMockup />,
  },
  {
    id: "tracking",
    title: "Live tracking",
    description:
      "Monitor all rides in real-time to ensure the safety and punctuality of your team.",
    imageColor: "from-gray-600 to-gray-700",
    mockup: <LiveTrackingMockup />,
  },
];

const AUTOPLAY_DURATION = 5000;

export default function CorporateCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, AUTOPLAY_DURATION);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section id="corporate-features" className="min-h-screen w-full bg-white px-6 py-20 md:px-16 flex flex-col justify-center font-display selection:bg-cyan-200">
      <div className="mx-auto max-w-7xl w-full">
        {/* Header Section */}
        <div className="mb-20 flex">
          <div className="mr-6 flex flex-col items-center">
            {/* Dashed cyan line */}
            <div className="h-full w-0 border-l-[2px] border-dashed border-[#5DCBFE]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] tracking-tight text-black">
            Corporate transport shouldn't rely <br className="hidden md:block" />
            <span className="text-gray-400">
              on phone calls, spreadsheets, or <br className="hidden md:block" />
              guesswork.
            </span>
          </h2>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Accordion List */}
          <div className="flex flex-col justify-center">
            {features.map((feature, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={feature.id}
                  className="group cursor-pointer border-b border-transparent py-2"
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex w-full items-center justify-between py-4">
                    <h3
                      className={`text-xl md:text-[22px] font-medium transition-colors duration-300 ${
                        isActive ? "text-black" : "text-black"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <span className="text-2xl font-light text-black">
                      {isActive ? "-" : "+"}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className={`pb-6 text-[#999] ${manrope.className} text-[15px] leading-relaxed`}>
                          {feature.description}
                        </div>
                        {/* Progress Bar Container */}
                        <div className="h-[2px] w-full bg-gray-100 rounded-full mb-6 overflow-hidden">
                          <motion.div
                            key={activeIndex} // Re-animate when activeIndex changes
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: AUTOPLAY_DURATION / 1000,
                              ease: "linear",
                            }}
                            className="h-full bg-black rounded-full"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Image Display */}
          <div className="flex items-center justify-center h-full">
            <div className="relative w-full aspect-auto md:aspect-square lg:aspect-[4/3] h-[400px] md:h-full max-h-[600px] overflow-hidden bg-[#F8F9FB] rounded-[24px] shadow-sm border border-gray-100/60 flex items-start justify-start relative">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`absolute inset-0 bg-gradient-to-br flex justify-start items-start`}
                >
                  {features[activeIndex].mockup ? (
                    <div className="absolute inset-0 w-full h-full pointer-events-auto">
                      {features[activeIndex].mockup}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 font-medium tracking-wide">Coming Soon</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
