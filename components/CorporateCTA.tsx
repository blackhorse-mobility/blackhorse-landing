"use client";

import React from "react";
import { Manrope } from "next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
});

export default function CorporateCTA() {
  return (
    <section className="w-full bg-white px-6 py-12 md:py-24 md:px-16 flex font-display justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[1240px] bg-[#0A1020] rounded-[28px] md:rounded-[36px] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_40px_rgb(0,0,0,0.1)]"
      >

        <div className="relative z-10 flex flex-col items-start justify-center p-10 md:p-16 lg:px-20 lg:py-24 lg:w-2/3">
          <h2 className="text-white text-[32px] sm:text-[40px] md:text-[52px] font-medium leading-[1.1] tracking-tight mb-5">
            Take control of how your team moves
          </h2>
          <p className={`text-[#8C98A4] text-[16px] md:text-[18px] leading-relaxed max-w-[420px] mb-10 ${manrope.className}`}>
            Join forward-thinking teams simplifying how their people move with Blackhorse.
          </p>
          <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-[10px] bg-white px-8 py-[18px] text-[15px] font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]">
            See a demo
            <ChevronRight size={15} />
          </button>
        </div>


        <div className="absolute right-0 bottom-0 pointer-events-none md:w-3/5 lg:w-[500px] h-full flex justify-end items-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            width={200}
            height={200}
            src="/assets/cta.png"
            alt="Abstract design curves"
            className="w-[200px] sm:w-[280px] md:w-[260px] lg:w-[380px] object-contain object-bottom-right"
          />
        </div>
      </motion.div>
    </section>
  );
}
