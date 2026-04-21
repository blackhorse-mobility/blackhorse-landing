"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-manrope",
});

const steps = [
  {
    num: 1,
    title: "Set your trip",
    desc: "Choose pickup location, schedule, duration, and assign employees.",
  },
  {
    num: 2,
    title: "Choose a Fleet",
    desc: "Browse verified vehicles and select what fits your needs.",
  },
  {
    num: 3,
    title: "Book & Pay",
    desc: "Confirm instantly and pay via wallet, card, or MoMo.",
  },
  {
    num: 4,
    title: "Track Everything",
    desc: "Monitor trips in real time and keep full visibility on usage.",
  },
  {
    num: 5,
    title: "Manage & Report",
    desc: "Access invoices, track spend, and generate reports — all in one place.",
  },
];

export default function CorporateSteps() {
  const containerRef = useRef<HTMLDivElement>(null);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });


  const xTranslate = useTransform(scrollYProgress, [0.3, 1], ["0%", "-80%"]);

  const thisColor = useTransform(scrollYProgress, [0, 0.05], ["#D1D5DB", "#000000"]);

  const isColor = useTransform(scrollYProgress, [0.05, 0.1], ["#D1D5DB", "#000000"]);

  const rideHailingColor = useTransform(scrollYProgress, [0.05, 0.15], ["#D1D5DB", "#9CA3AF"]);

  const strikeWidth = useTransform(scrollYProgress, [0.05, 0.15], ["0%", "100%"]);


  const infraColor1 = useTransform(scrollYProgress, [0.1, 0.15], ["#D1D5DB", "#000000"]);
  const infraColor2 = useTransform(scrollYProgress, [0.15, 0.20], ["#D1D5DB", "#000000"]);
  const infraColor3 = useTransform(scrollYProgress, [0.20, 0.25], ["#D1D5DB", "#000000"]);
  const infraColor4 = useTransform(scrollYProgress, [0.25, 0.3], ["#D1D5DB", "#000000"]);


  const [activeStep, setActiveStep] = useState(0);


  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.3) {
      setActiveStep(0);
    } else {
      const cardProgress = (latest - 0.3) / (0.7 / steps.length);
      const activeIdx = Math.min(Math.floor(cardProgress), steps.length - 1);
      setActiveStep(activeIdx);
    }
  });

  return (
    <section id="corporate-how-it-works" ref={containerRef} className="relative h-[450vh] w-full bg-white font-display">
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 py-6 sm:py-12">

          <h2 className="mb-8 md:mb-12 text-[32px] sm:text-[40px] md:text-[56px] lg:text-[72px] font-medium leading-[1.1] tracking-tight">
            <motion.span style={{ color: thisColor }}>This</motion.span>{" "}
            <motion.span style={{ color: isColor }}>is</motion.span>{" "}
            <motion.span style={{ color: rideHailingColor }} className="relative inline-block mx-1 sm:mx-2">
              ride hailing

              <motion.span
                style={{ width: strikeWidth }}
                className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-gray-400 rounded-full"
              />
            </motion.span>{" "}
            <br className="max-md:hidden" />
            <motion.span style={{ color: infraColor1 }}>infrastructure</motion.span>{" "}
            <motion.span style={{ color: infraColor2 }}>for</motion.span>{" "}
            <motion.span style={{ color: infraColor3 }}>corporate</motion.span>{" "}
            <motion.span style={{ color: infraColor4 }}>movement</motion.span>
          </h2>


          <div className="relative mt-4 sm:mt-12 w-full flex-grow">
            <motion.div
              style={{ x: xTranslate }}
              className="flex w-max items-start gap-8 px-4 pb-8 transition-transform ease-out"
            >
              {steps.map((step, index) => {

                const startPoint = 0.3 + index * (0.7 / steps.length);
                const endPoint = 0.3 + (index + 1) * (0.7 / steps.length); const lineWidth = useTransform(
                  scrollYProgress, [startPoint, endPoint],
                  ["0%", "100%"]

                );

                const isCurrentActive = activeStep === index;
                const isPast = activeStep > index;

                const hasReached = isCurrentActive || isPast;

                return (
                  <div key={step.num} className="relative flex flex-col pt-8">

                    <div className="absolute left-0 top-0 flex w-full items-center">
                      {/* Circle Indicator */}
                      <div
                        className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500"
                        style={{
                          borderColor: hasReached ? "#5DCBFE" : "#E5E7EB",
                          backgroundColor: hasReached ? "#E0F2FE" : "#FFFFFF",
                        }}
                      >
                        <div
                          className="h-2 w-2 rounded-full bg-[#5DCBFE] transition-opacity duration-500"
                          style={{ opacity: hasReached ? 1 : 0 }}
                        />
                      </div>

                      {/* Connection Line to next element */}
                      {index !== steps.length - 1 && (
                        <div className="relative ml-4 h-[1px] w-[320px] shrink-0 bg-gray-100 sm:w-[380px]">
                          <motion.div
                            className="absolute left-0 top-0 h-full bg-[#5DCBFE]"
                            style={{ width: lineWidth }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Card container with active blur toggling purely derived from active step state */}
                    <div
                      className={`mt-12 flex min-h-[300px] w-[280px] shrink-0 flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:min-h-[340px] sm:w-[320px] transition-all duration-700 pointer-events-none ${isCurrentActive
                        ? "blur-none opacity-100 scale-100"
                        : "blur-[8px] opacity-40 scale-95"
                        }`}
                    >
                      <h3 className="mb-4 text-2xl font-medium text-black">
                        {step.title}
                      </h3>
                      <p
                        className={`text-[15px] leading-relaxed text-gray-500 ${manrope.className}`}
                      >
                        {step.desc}
                      </p>

                      {/* Decorative Cyan Orb at the bottom right */}
                      <div
                        className={`absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#5DCBFE] transition-opacity duration-700 blur-3xl pointer-events-none ${isCurrentActive ? "opacity-60" : "opacity-0"
                          }`}
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
