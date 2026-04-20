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
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 font-body">
      <motion.div 
        className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cyan-50/50 flex items-center justify-center text-cyan-600 shrink-0 border border-[#41C1FD] 50">
             <Receipt size={22} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-[17px] text-gray-900 leading-tight">Fare Breakdown</h3>
            <p className="text-gray-500 text-[12px] mt-0.5">No hidden fees, predictable pricing.</p>
          </div>
        </div>

        {/* List & Total */}
        <motion.div className="p-6 flex flex-col gap-4" variants={containerVariants} initial="hidden" animate="visible">
          {lineItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants} className="flex items-center justify-between group py-1">
              <div className="flex items-center gap-3">
                <span className="text-[14px] text-gray-700 font-medium">{item.label}</span>
                {item.tag && (
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold tracking-wider uppercase ${item.tagColor || "bg-gray-100 text-gray-500"}`}>
                    {item.tag}
                  </span>
                )}
              </div>
              <span className="text-[14px] font-semibold text-gray-900 tracking-tight shrink-0">GH₵ {item.amount}</span>
            </motion.div>
          ))}

          {/* Enhanced Total Box */}
          <motion.div variants={itemVariants} className="mt-4 pt-5 border-t border-gray-100 flex justify-between items-center">
            <div>
              <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase mb-1.5 block">Total Billed</span>
              <span className="text-[11px] text-gray-400 font-medium">Paid via Corporate Wallet</span>
            </div>
            <div className="text-right">
              <span className="text-[32px] font-display font-bold text-gray-900 tracking-tighter leading-none">GH₵ 230.50</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
