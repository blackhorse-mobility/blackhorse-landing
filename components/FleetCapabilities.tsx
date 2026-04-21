"use client";

import React from "react";
import { Manrope } from "next/font/google";
import { motion } from "framer-motion";
import { VerifiedClientsCarousel } from "./animations/VerifiedClientsCarousel";
import { ClearEarningsAnimation } from "./animations/ClearEarningsAnimation";
import { SteadyDemandAnimation } from "./animations/SteadyDemandAnimation";
import { LiveOperationsAnimation } from "./animations/LiveOperationsAnimation";
import { FullControlAnimation } from "./animations/FullControl";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-manrope",
});

const features = [
  {
    title: "Verified Clients",
    desc: "Access vetted, high-value corporate businesses with real, recurring transport needs.",
    span: "col-span-1",
  },
  {
    title: "Steady Demand",
    desc: "Receive consistent, structured bookings — not unpredictable, one-off requests",
    span: "col-span-1",
  },
  {
    title: "Live Operations",
    desc: "Monitor trips, vehicles, and driver activity in real time from one dashboard.",
    span: "col-span-1",
  },
  {
    title: "Clear Earnings",
    desc: "Track revenue, payouts, and performance with complete transparency.",
    span: "col-span-1",
  },
  {
    title: "Full Control",
    desc: "Set availability, manage vehicles, and run your fleet on your terms.",
    span: "md:col-span-2",
  },
];

export default function FleetCapabilities() {
  return (
    <section id="fleet-benefits" className="min-h-screen w-full bg-white px-6 py-20 md:py-32 md:px-16 flex flex-col font-display selection:bg-cyan-200">
      <div className="mx-auto max-w-[1280px] w-full">

        <div className="mb-20 md:mb-28 flex items-stretch">
          <div className="mr-6 md:mr-8 flex py-2 sm:py-3">

            <div className="h-full w-0 border-l-[2px] border-dashed border-[#5DCBFE]"></div>
          </div>
          <h2 className="text-[32px] sm:text-4xl md:text-5xl lg:text-[52px] font-medium leading-[1.15] tracking-tight text-black max-w-[1050px]">
            Corporate demand, fleet operations, payouts, and performance —{" "}
            <span className="text-[#9CA3AF]">
              all in one platform for fleet partners.
            </span>
          </h2>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16 lg:gap-y-20">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col ${feature.span}`}
            >

              <div className="w-full h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] xl:h-[300px] rounded-[16px] bg-[#F8F8F8] mb-6 shadow-[inset_0_0_2px_rgba(0,0,0,0.02)] transition-transform hover:scale-[1.01] duration-500 ease-out overflow-hidden relative flex flex-col justify-center">
                {feature.title === "Verified Clients" ? (
                  <VerifiedClientsCarousel />
                ) : feature.title === "Steady Demand" ? (
                  <SteadyDemandAnimation />
                ) : feature.title === "Clear Earnings" ? (
                  <ClearEarningsAnimation />
                ) : feature.title === "Live Operations" ? (
                  <LiveOperationsAnimation />
                ) : feature.title === "Full Control" ? (
                  <FullControlAnimation />
                ) : null}
              </div>

              <h3 className="text-[20px] md:text-[22px] font-medium text-black mb-3.5">
                {feature.title}
              </h3>
              <p
                className={`text-[15px] leading-relaxed text-[#9CA3AF] ${manrope.className}`}
              >
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
