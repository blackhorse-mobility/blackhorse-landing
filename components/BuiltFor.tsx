"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Manrope } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-manrope",
});

const items = [
  {
    id: "enterprises",
    title: "Enterprise",
    desc: "Large organisations managing high-volume, multi-team transportation.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "growing-businesses",
    title: "Growing Businesses",
    desc: "Companies scaling operations and needing structure and cost visibility.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "lean-teams",
    title: "Lean Teams",
    desc: "Smaller teams that need reliable transport without operational overhead.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "multi-location",
    title: "Multi-Location Teams",
    desc: "Organisations coordinating movement across offices, sites, or regions.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "field-operations",
    title: "Field Operations",
    desc: "Teams operating on-site, in the field, or across distributed locations.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "client-facing",
    title: "Client-Facing Teams",
    desc: "Businesses managing frequent staff movement for meetings and engagements.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "project-based",
    title: "Project-Based Teams",
    desc: "Teams coordinating transport for projects, deployments, or temporary operations.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "ops-admin",
    title: "Operations & Admin Teams",
    desc: "Internal teams responsible for coordinating, tracking, and reporting transport.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function BuiltFor() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setAutoPlay(false);
  }, []);

  const handleDotClick = (index: number) => {
    if (index === 0) return;
    setCurrentIndex((prev) => (prev + index) % items.length);
    setAutoPlay(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, handleNext]);

  const renderedItems = [
    ...items.slice(currentIndex),
    ...items.slice(0, currentIndex),
  ];

  return (
    <section className="relative w-full bg-white py-16 md:py-24 font-display">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 flex flex-col gap-8 md:gap-16">
        {/* Header */}
        <div className="flex w-full items-end justify-between">
          <h2 className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[72px] font-medium leading-[1.1] tracking-tight text-[#D1D5DB]">
            Built for
          </h2>
          <div className="flex items-center gap-3 pb-2">
            <button
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:bg-gray-50 hover:border-gray-300 active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 text-gray-500" />
            </button>
            <button
              onClick={() => {
                handleNext();
                setAutoPlay(false);
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:bg-gray-50 hover:border-gray-300 active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-full h-[450px] md:h-[500px] lg:h-[600px] flex gap-3 md:gap-4 overflow-hidden">
          {renderedItems.map((item, index) => {
            const isActive = index === 0;

            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => handleDotClick(index)}
                className={`relative h-full overflow-hidden shrink-0 cursor-pointer ${
                  isActive
                    ? "flex-1 rounded-[24px]"
                    : "w-16 sm:w-20 md:w-24 rounded-[9999px] max-sm:hidden"
                }`}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
              >
                {/* Background Image */}
                <motion.img
                  layout="position"
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark Gradient Overlay for Active Item */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-10 lg:p-12"
                    >
                      <motion.h3
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        className="text-white text-2xl md:text-3xl lg:text-4xl font-medium mb-3 md:mb-4"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.4 }}
                        className={`text-gray-200 text-[15px] sm:text-base md:text-lg max-w-2xl leading-relaxed ${manrope.className}`}
                      >
                        {item.desc}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
