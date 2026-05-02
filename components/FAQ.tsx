"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { SUPPORT_EMAIL } from "@/lib/constants";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
});

interface FAQProps {
  viewMode: "corporate" | "fleet";
}

const faqs = {
  corporate: [
    {
      question: "How is Blackhorse different from ride-hailing apps?",
      answer:
        "Blackhorse is built for organisations, not individuals. You get access to verified fleet partners, centralised booking across teams, and consolidated billing — not ad-hoc rides.",
    },
    {
      question: "Are the vehicles and drivers verified?",
      answer:
        "Yes, all vehicles and drivers operated by our fleet partners undergo strict verification to ensure they meet corporate standards for safety, reliability, and professionalism.",
    },
    {
      question: "How does billing work?",
      answer:
        "We provide centralized billing with consolidated invoices for all your team's trips. You can track spending transparently through the management dashboard.",
    },
    {
      question: "What payment options are available?",
      answer:
        "We support various payment methods tailored for businesses, including corporate credit cards, mobile money (MoMo), and post-paid invoicing options based on your agreement.",
    },
    {
      question: "Can we track trips in real time?",
      answer:
        "Absolutely. Our platform provides a real-time tracking dashboard where you can monitor all active trips, vehicle locations, and driver statuses for your team members.",
    },
    {
      question:
        "Can the platform be used for longer-term trips or extended bookings?",
      answer:
        "Yes. Whether you need a vehicle for a few hours or several days, you can set the duration at the time of booking.",
    },
  ],
  fleet: [
    {
      question: "What do I need to join as a fleet partner?",
      answer:
        "You need professionally maintained vehicles and drivers that meet corporate standards. The onboarding process ensures quality across the network.",
    },
    {
      question: "What kind of demand will I receive?",
      answer:
        "You will get access to steady, structured bookings from verified corporate clients, unlike the unpredictable ad-hoc requests typical of ride-hailing platforms.",
    },
    {
      question: "Do I lose control over my fleet?",
      answer:
        "No, you maintain full control. Our platform provides you with tools to manage vehicle availability, driver assignments, and set your own operational terms.",
    },
    {
      question: "Can I track my earnings and performance?",
      answer:
        "Yes, the platform features a comprehensive dashboard where you can track revenue, monitor driver performance, and access structured payout reports with complete transparency.",
    },
    {
      question: "Is there a limit to how many vehicles I can add?",
      answer:
        "There is no strict limit. You can scale your operations and add as many verified vehicles and drivers as your business can manage within our quality guidelines.",
    },
  ],
};

export default function FAQ({ viewMode }: FAQProps) {
  const currentFaqs = faqs[viewMode];
  // Track open question based on index. By default, first one is open (0).
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id={`${viewMode}-faqs`}
      className="w-full bg-white px-6 py-24 md:py-32 md:px-16 flex flex-col font-display selection:bg-cyan-200"
    >
      <div className="mx-auto w-full max-w-[1280px] flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Column - Heading */}
        <div className="w-full lg:w-1/3 flex items-start">
          <div className="mr-6 md:mr-8 flex py-2 sm:py-3 h-[120px]">
            <div className="h-full w-0 border-l-[2px] border-dashed border-[#5DCBFE]"></div>
          </div>
          <h2 className="text-[36px] sm:text-[44px] md:text-[52px] font-medium leading-[1.1] tracking-tight text-black max-w-[320px]">
            Frequently asked questions
          </h2>
        </div>

        {/* Right Column - Accordion */}
        <div className="w-full lg:w-2/3 flex flex-col">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const numStr = `0${idx + 1}.`;

            return (
              <div
                key={idx}
                className={`flex flex-col border-b border-gray-200 py-6 cursor-pointer select-none transition-colors ${isOpen ? "" : "hover:border-gray-300"}`}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                {/* Question Header - Clickable Area */}
                <div className="flex items-start gap-3">
                  <span
                    className={`font-medium text-[16px] md:text-[18px] transition-colors duration-300 ${isOpen ? "text-[#5DCBFE]" : "text-[#A3A3A3]"}`}
                  >
                    {numStr}
                  </span>
                  <h3
                    className={`font-medium text-[16px] md:text-[18px] transition-colors duration-300 ${isOpen ? "text-[#5DCBFE]" : "text-[#A3A3A3]"}`}
                  >
                    {faq.question}
                  </h3>
                </div>

                {/* Answer Body - Animated */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`mt-3 text-[15px] leading-relaxed text-[#9CA3AF] ${manrope.className} pb-2`}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="mt-16 pt-4">
            <p className="text-[18px] md:text-[20px] font-medium text-black">
              Can’t find your answers here ?{" "}
              <Link
                href={`mailto:${SUPPORT_EMAIL}`}
                className="underline decoration-[1.5px] underline-offset-[6px] hover:text-[#5DCBFE] transition-colors"
              >
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
