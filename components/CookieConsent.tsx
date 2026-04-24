"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { aeonikPro } from "@/lib/fonts";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { hasConsented, acceptAll, rejectAll, updateConsent, consent } =
    useCookieConsent();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || hasConsented) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 right-0 z-50 p-4 sm:p-6"
      >
        <div
          className={`w-full max-w-md bg-white rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100 ${aeonikPro.className}`}
        >
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/Primary/BH_Horizontal_DarkBlue.png"
                  alt="Blackhorse Logo"
                  width={120}
                  height={24}
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-[16px] font-semibold text-black">
                Cookie Settings
              </h3>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                We use cookies to enhance your experience, analyze traffic, and
                enable personalized marketing. Review our{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:underline font-medium"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3 pt-2 border-t border-gray-100"
                >
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center h-5">
                        <input
                          id="essential"
                          type="checkbox"
                          checked={true}
                          disabled
                          className="w-4 h-4 rounded border-gray-300 bg-gray-100 cursor-not-allowed"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="essential"
                          className="text-[13px] font-medium text-gray-900 block"
                        >
                          Essential Cookies
                        </label>
                        <p className="text-[12px] text-gray-500 mt-0.5">
                          Required for site functionality
                        </p>
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">
                        Always On
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex items-center h-5">
                        <input
                          id="analytics"
                          type="checkbox"
                          checked={consent?.analytics || false}
                          onChange={(e) =>
                            updateConsent({ analytics: e.target.checked })
                          }
                          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="analytics"
                          className="text-[13px] font-medium text-gray-900 block cursor-pointer"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          Analytics Cookies
                        </label>
                        <p className="text-[12px] text-gray-500 mt-0.5">
                          Help us understand how you use the site
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex items-center h-5">
                        <input
                          id="marketing"
                          type="checkbox"
                          checked={consent?.marketing || false}
                          onChange={(e) =>
                            updateConsent({ marketing: e.target.checked })
                          }
                          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="marketing"
                          className="text-[13px] font-medium text-gray-900 block cursor-pointer"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          Marketing Cookies
                        </label>
                        <p className="text-[12px] text-gray-500 mt-0.5">
                          Enable personalized ads and offers
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between text-[12px] font-medium text-gray-600 hover:text-gray-900 transition-colors py-2"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showDetails ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="flex gap-2 pt-2">
              <button
                onClick={rejectAll}
                className="flex-1 px-4 py-2.5 text-[13px] font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Reject
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 px-4 py-2.5 text-[13px] font-medium text-white bg-[#0A1020] hover:bg-black rounded-lg transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
