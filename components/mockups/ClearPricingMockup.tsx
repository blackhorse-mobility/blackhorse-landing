"use client";
import React from "react";
import { motion } from "framer-motion";
import { Receipt } from "lucide-react";

const lineItems = [
  { id: 1, label: "Base Fare", tag: "STANDARD", amount: "120.00" },
  { id: 2, label: "Time & Distance", amount: "65.50" },
  { id: 3, label: "Tolls & Surcharges", tag: "AIRPORT DROP-OFF", tagColor: "text-cyan-600 bg-cyan-50", amount: "30.00" },
  { id: 4, label: "Service Tax (VAT)", amount: "15.00" },
];

export default function ClearPricingMockup() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  };

  return (
    <div className="w-full h-[100%] flex flex-col items-center justify-center p-4 sm:p-8 font-body overflow-y-auto no-scrollbar">
      <motion.div 
        className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col shrink-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 sm:pb-4 border-b border-gray-100 flex items-center justify-between sm:justify-start gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-50/50 flex items-center justify-center text-cyan-600 shrink-0 border border-[#41C1FD] 50">
             <Receipt size={20} className="sm:w-[22px] sm:h-[22px]" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-[15px] sm:text-[17px] text-gray-900 leading-tight">Fare Breakdown</h3>
            <p className="text-gray-500 text-[11px] sm:text-[12px] mt-0.5">No hidden fees, predictable pricing.</p>
          </div>
        </div>

        {/* List & Total */}
        <motion.div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4" variants={containerVariants} initial="hidden" animate="visible">
          {lineItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants} className="flex items-center justify-between group py-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 pr-2">
                <span className="text-[13px] sm:text-[14px] text-gray-700 font-medium leading-tight">{item.label}</span>
                {item.tag && (
                  <span className={`text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded font-bold tracking-wider uppercase w-fit ${item.tagColor || "bg-gray-100 text-gray-500"}`}>
                    {item.tag}
                  </span>
                )}
              </div>
              <span className="text-[13px] sm:text-[14px] font-semibold text-gray-900 tracking-tight shrink-0">GH₵ {item.amount}</span>
            </motion.div>
          ))}

          {/* Enhanced Total Box */}
          <motion.div variants={itemVariants} className="mt-3 sm:mt-4 pt-4 sm:pt-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between sm:items-end gap-3.5 sm:gap-2">
            <div>
              <span className="text-[10px] sm:text-[10px] text-gray-500 font-bold tracking-wider uppercase mb-1 block">Total Billed</span>
              <span className="text-[11px] sm:text-[11px] text-gray-400 font-medium">Paid via Corporate Wallet</span>
            </div>
            <div className="sm:text-right">
              <span className="text-[28px] sm:text-[32px] font-display font-bold text-gray-900 tracking-tighter leading-none whitespace-nowrap">GH₵ 230.50</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
