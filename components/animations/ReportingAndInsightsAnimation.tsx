"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ReportingAndInsightsAnimation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let loopTimeout: NodeJS.Timeout;

    const playSequence = () => {
      setIsLoading(true);
      
      // Simulate loading time for shimmers
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      // Loop back to loading (shimmers)
      loopTimeout = setTimeout(() => {
        playSequence();
      }, 6500);
    };

    playSequence();

    return () => {
      clearTimeout(loopTimeout);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute pt-3 sm:pt-6 pl-3 sm:pl-6 pr-2 sm:pr-4 pb-2 sm:pb-4 right-0 bottom-0 top-3 sm:top-6 left-3 sm:left-6 bg-[#F9FBFC] rounded-tl-[12px] sm:rounded-tl-[16px] shadow-[0_-4px_12px_rgba(0,0,0,0.02)] border-t border-l border-[#F0F0F0] flex flex-col pointer-events-none overflow-hidden origin-bottom-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-5 pt-2 sm:pt-5 pb-2 sm:pb-4 border-b border-gray-200/60 bg-white shrink-0 gap-2 sm:gap-0">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[14px] sm:text-[16px] font-bold text-gray-900 leading-none">Performance & Analytics</h2>
          <span className="text-[9px] sm:text-[10px] text-gray-500">Fleet wide metrics and insights</span>
        </div>
        <div className="flex gap-2 shrink-0">
          <div className="bg-gray-100 rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-medium text-gray-600 bg-opacity-70">This Month</div>
          <div className="bg-[#056272] text-white rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-medium shadow-sm">Export Report</div>
        </div>
      </div>

      <div className="flex flex-col p-2 sm:p-4 w-full h-full gap-3 sm:gap-4 overflow-hidden relative">
        {/* Top KPIs */}
        <div className="grid grid-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-3 gap-2 sm:gap-3 shrink-0">
          {[
            { title: "Total Revenue", val: "GH₵ 142k", up: "+12%" },
            { title: "Total Trips", val: "1,240", up: "+8%" },
            { title: "Active Vehicles", val: "18 / 24", up: "+2%" }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-100/80 rounded-[10px] p-2 sm:p-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)] h-[65px] sm:h-[75px] relative overflow-hidden flex flex-col justify-between">
              <span className="text-[9px] text-[#64748B] font-bold uppercase tracking-wider">{stat.title}</span>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <motion.div
                    key="load"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-between items-end pb-1"
                  >
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="data"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex justify-between items-end pb-0 sm:pb-1"
                  >
                    <span className="text-[14px] sm:text-[18px] font-bold text-gray-800 tracking-tight leading-none">{stat.val}</span>
                    <span className="text-[9px] sm:text-[10px] text-emerald-500 font-semibold bg-emerald-50 px-1 sm:px-1.5 py-0.5 rounded">{stat.up}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 h-full overflow-hidden pb-2">
          {/* Left Chart (Bar Chart) */}
          <div className="flex-[0.65] bg-white border border-gray-100/80 rounded-[12px] p-4 flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.02)] h-full">
            <h3 className="text-[11px] font-bold text-gray-700 mb-2">Revenue by Service Tier</h3>
            <div className="flex-1 relative flex items-end justify-between px-2 pt-4 pb-0 h-full">
              {/* Grid lines */}
              <div className="absolute inset-x-0 bottom-6 top-4 flex flex-col justify-between pointer-events-none z-0">
                <div className="border-t border-gray-100 border-dashed w-full" />
                <div className="border-t border-gray-100 border-dashed w-full" />
                <div className="border-t border-gray-100 border-dashed w-full" />
              </div>
              
              {["Economy", "Premium", "Business", "SUV", "Luxury"].map((tier, i) => (
                <div key={i} className="flex flex-col items-center justify-end h-full z-10 w-[14%] relative">
                  {isLoading ? (
                    <motion.div
                      key={`shimmer-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full bg-gray-100 rounded-t-md h-full max-h-[70%] animate-pulse bottom-6 absolute"
                    />
                  ) : (
                    <motion.div
                      key={`bar-${i}`}
                      initial={{ height: "0%" }}
                      animate={{ height: `${30 + [40, 20, 60, 50, 10][i]}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, type: "spring", damping: 20 }}
                      className="w-full bg-gradient-to-t from-[#056272] to-[#49AAC2] rounded-t-md shadow-sm bottom-6 absolute"
                    />
                  )}
                  <span className="text-[8px] font-medium text-gray-400 absolute bottom-0">{tier}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Chart (Donut/Stats) */}
          <div className="flex-[0.35] bg-white border border-gray-100/80 rounded-[12px] p-4 flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.02)] h-full">
            <h3 className="text-[11px] font-bold text-gray-700 mb-4 text-center">Fleet Utilization</h3>
            <div className="flex-1 flex flex-col items-center justify-center relative pb-4">
              {isLoading ? (
                <motion.div 
                   key="shimmer-circle"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="w-24 h-24 rounded-full border-[6px] border-gray-100 animate-pulse flex items-center justify-center shrink-0"
                >
                  <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                </motion.div>
              ) : (
                <motion.div 
                   key="chart-circle"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.4 }}
                   className="relative w-24 h-24 flex items-center justify-center shrink-0"
                >
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#F1F5F9" strokeWidth="4" />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#49AAC2"
                      strokeWidth="4"
                      strokeDasharray="100"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 25 }} // 75%
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute flex flex-col items-center justify-center"
                  >
                    <span className="text-[18px] font-bold text-gray-800 leading-none">75%</span>
                    <span className="text-[8px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Active</span>
                  </motion.div>
                </motion.div>
              )}
              
              <AnimatePresence>
                {!isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex gap-4 mt-6 absolute bottom-0"
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#49AAC2]" />
                      <span className="text-[9px] text-gray-500 font-medium">On Trip (18)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#F1F5F9]" />
                      <span className="text-[9px] text-gray-500 font-medium">Idle (6)</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
