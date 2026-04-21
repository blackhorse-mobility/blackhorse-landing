"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export function ClearEarningsAnimation() {
  const [isHovered, setIsHovered] = useState(false);
  const [isWithdrawn, setIsWithdrawn] = useState(false);
  const [showCredit, setShowCredit] = useState(false);

  const baseAmount = 120456.0;
  const targetAmount = 123456.0;
  const withdrawAmount = 3000.0;

  const count = useMotionValue(baseAmount);
  const renderedBalance = useTransform(count, (latest) => {
    const val = latest.toFixed(2);
    const parts = val.split(".");
    // Note: The screenshot has a space after the comma "123, 456.00"
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
    return `GHS ${parts[0]}.${parts[1]}`;
  });

  useEffect(() => {
    if (isHovered) {
      if (!isWithdrawn) {
        // Animate up to 123,456
        const controls = animate(count, targetAmount, {
          duration: 1.5,
          ease: "easeOut",
          onComplete: () => setShowCredit(true),
        });
        return controls.stop;
      }
    } else {
      setIsWithdrawn(false);
      setShowCredit(false);
      count.set(baseAmount);
    }
  }, [isHovered, isWithdrawn, count]);

  useEffect(() => {
    if (isWithdrawn) {
      const controls = animate(count, baseAmount, {
        duration: 1,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isWithdrawn, count]);

  return (
    <div
      className="absolute inset-0 flex flex-col pt-4 sm:pt-6 pl-4 sm:pl-6 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-tl-[12px] sm:rounded-tl-[16px] shadow-[0_-4px_12px_rgba(0,0,0,0.03)] border-t border-l border-[#F0F0F0] flex flex-col w-full h-full pt-4 sm:pt-8 pl-4 sm:pl-8 pr-3 sm:pr-6 pb-4 sm:pb-6">
      <div className="flex flex-col gap-1 w-full">
        <span className="text-[11px] sm:text-[13px] text-[#A1A1AA] font-medium leading-none mb-1">
          Current Balance
        </span>
        <motion.div
          className="text-[22px] sm:text-[30px] md:text-[34px] font-medium text-black tracking-tight"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {renderedBalance}
        </motion.div>

        <button
          onClick={() => setIsWithdrawn(true)}
          disabled={isWithdrawn}
          className={`mt-2 sm:mt-3 py-2 sm:py-3 px-4 sm:px-5 rounded-[6px] text-[12px] sm:text-[13px] font-semibold transition-all duration-300 max-w-max flex items-center justify-center ${
            isWithdrawn
              ? "bg-[#E6F8EA] text-[#0D8A4B] cursor-default"
              : "bg-[#080E1C] text-white hover:scale-[1.02] cursor-pointer"
          }`}
        >
          {isWithdrawn ? (
            <>
              <svg
                width="14"
                height="14"
                className="sm:w-4 sm:h-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
       
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Withdrawal successful
            </>
          ) : (
            "+ Withdraw your earnings"
          )}
        </button>

        <div className="mt-2 sm:mt-3 flex flex-col gap-1.5 sm:gap-2 w-full flex-1">
          {isWithdrawn && (
            <motion.div
              layout
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
              className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-white rounded-[6px] sm:rounded-[8px] border border-[#EAEAEA] shadow-[0_4px_12px_rgba(0,0,0,0.06)] z-20 origin-top shrink-0"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-full bg-[#FFCC00] flex items-center justify-center text-black font-bold text-[6px] sm:text-[7px] tracking-tight leading-none">
                MTN
              </div>
              <p className="text-[10px] sm:text-[11px] leading-tight text-[#52525B] whitespace-nowrap overflow-hidden text-ellipsis">
                Withdrawn <span className="font-semibold text-black">GHS 3,000</span> to MTN.
              </p>
            </motion.div>
          )}

          {isHovered && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: showCredit ? 1 : 0.6, x: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-[#F4FDF8] rounded-[6px] sm:rounded-[8px] border border-[#D1F4E0] shadow-[0_2px_8px_rgba(0,0,0,0.03)] z-10 origin-top shrink-0"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-full bg-[#10B981] flex items-center justify-center text-white font-bold text-[6px] sm:text-[8px] tracking-tight">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <p className="text-[10px] sm:text-[11px] leading-tight text-[#065F46] whitespace-nowrap overflow-hidden text-ellipsis">
                Credited <span className="font-semibold text-[#064E3B]">GHS 3,000</span>
              </p>
            </motion.div>
          )}

          <motion.div
            layout
            initial={false}
            animate={{ 
              opacity: isWithdrawn ? 0 : (isHovered ? 0.35 : 1),
              scale: isWithdrawn ? 0.95 : 1 
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-[#FEF2F2] rounded-[6px] sm:rounded-[8px] border border-[#FECACA] shadow-[0_1px_4px_rgba(0,0,0,0.02)] origin-top shrink-0"
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-full bg-[#EF4444] flex items-center justify-center text-white">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </div>
            <p className="text-[10px] sm:text-[11px] leading-tight text-[#991B1B] whitespace-nowrap overflow-hidden text-ellipsis">
              Debited <span className="font-semibold text-[#7F1D1D]">GHS 450</span>
            </p>
          </motion.div>

          <motion.div
            layout
            initial={false}
            animate={{ 
              opacity: isWithdrawn ? 0 : (isHovered ? 0.15 : 0.6),
              scale: isWithdrawn ? 0.95 : 1 
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-white rounded-[6px] sm:rounded-[8px] border border-[#F0F0F0] shadow-[0_1px_4px_rgba(0,0,0,0.02)] origin-top shrink-0"
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-[3px] sm:rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#475569]">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </div>
            <p className="text-[10px] sm:text-[11px] leading-tight text-[#52525B] whitespace-nowrap overflow-hidden text-ellipsis">
              Withdrawn <span className="font-semibold text-black">GHS 8,500</span> to Bank
            </p>
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  );
}
