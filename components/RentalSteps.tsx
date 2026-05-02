"use client";

import React, { useRef } from "react";
import { Manrope } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookingManagementAnimation } from "./animations/BookingManagementAnimation";
import { OperationalDashboardAnimation } from "./animations/OperationalDashboardAnimation";
import { EarningsAndPayoutsAnimation } from "./animations/EarningsAndPayoutsAnimation";
import { FleetManagementAnimation } from "./animations/FleetManagementAnimation";
import { ReportingAndInsightsAnimation } from "./animations/ReportingAndInsightsAnimation";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-manrope",
});

const steps = [
  {
    num: "01",
    title: "Operational Dashboard",
    desc: "Gather real-time view of trips, vehicles, and driver activity across your fleet.",
  },
  {
    num: "02",
    title: "Booking Management",
    desc: "Receive, accept, and manage vehicle bookings with full visibility and control.",
  },
  {
    num: "03",
    title: "Earnings & Payouts",
    desc: "Track revenue, monitor performance, and receive structured payouts.",
  },
  {
    num: "04",
    title: "Fleet Controls",
    desc: "Manage vehicle availability, assignments, and operational settings.",
  },
  {
    num: "05",
    title: "Reporting & Insights",
    desc: "Analyze usage, performance, and revenue trends to make better decisions.",
  },
];

export default function RentalSteps() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="fleet-features"
      ref={containerRef}
      className="relative w-full bg-white font-display py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-16">
        <div className="mb-24 md:mb-36 text-left flex flex-col max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-medium leading-[1.1] tracking-tight text-black"
          >
            Everything You Need to Run and Grow Your Fleet
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-lg md:text-[19px] text-gray-500 max-w-2xl ${manrope.className}`}
          >
            A complete operational system for managing demand, vehicles, and
            revenue – all in one place.
          </motion.p>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.num}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-between gap-12 md:gap-16`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full md:w-[42%] flex flex-col"
                >
                  <span className="text-[#5DCBFE] font-medium text-lg mb-3">
                    {step.num}
                  </span>
                  <h3 className="text-[24px] md:text-[28px] font-medium text-black mb-3 leading-[1.2]">
                    {step.title}
                  </h3>
                  <p
                    className={`text-[15px] md:text-[16px] leading-relaxed text-[#9CA3AF] max-w-[400px] ${manrope.className}`}
                  >
                    {step.desc}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className={`w-full md:w-[55%] ${isEven ? "md:mr-[-1rem] lg:mr-[-2rem]" : "md:ml-[-1rem] lg:ml-[-2rem]"}`}
                >
                  <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-[32px] border-[8px] border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col items-center justify-center transition-transform hover:scale-[1.01] duration-500 relative">
                    {step.title === "Operational Dashboard" && (
                      <OperationalDashboardAnimation />
                    )}
                    {step.title === "Booking Management" && (
                      <BookingManagementAnimation />
                    )}
                    {step.title === "Earnings & Payouts" && (
                      <EarningsAndPayoutsAnimation />
                    )}
                    {step.title === "Fleet Controls" && (
                      <FleetManagementAnimation />
                    )}
                    {step.title === "Reporting & Insights" && (
                      <ReportingAndInsightsAnimation />
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
