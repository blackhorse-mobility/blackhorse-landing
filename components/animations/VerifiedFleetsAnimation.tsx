"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Star, CheckCircle2, ShieldCheck } from "lucide-react";

export function VerifiedFleetsAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#F8F9FB] overflow-hidden">
      {/* Background abstract elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[20%] w-[70%] h-[70%] rounded-full bg-indigo-50/50 blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[20%] w-[60%] h-[60%] rounded-full bg-cyan-50/50 blur-3xl"
        />
      </div>

      {/* Floating Badge - Verified */}
      <motion.div
        initial={{ opacity: 0, y: -20, x: -20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
        className="absolute top-8 left-8 sm:top-12 sm:left-12 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-full px-5 py-2.5 flex items-center gap-2.5 z-20 border border-gray-100"
      >
        <div className="w-5 h-5 bg-indigo-100/50 rounded-full flex items-center justify-center">
          <ShieldCheck size={14} className="text-indigo-600" />
        </div>
        <span className="text-[14px] font-bold text-[#1a233a]">Corporate Vetted</span>
      </motion.div>

      {/* Main Vehicle Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
        className="relative z-10 w-full max-w-[420px] bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col mx-4"
      >
        {/* Car Image Section */}
        <div className="relative h-[240px] bg-gray-100 overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800&h=500"
            alt="Mercedes-Benz AMG"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-5 left-5">
            <span className="bg-white text-[#1a233a] text-[12px] font-bold px-3 py-1.5 rounded shadow-sm tracking-wide">
              SEDAN
            </span>
          </div>
          <div className="absolute top-5 right-5">
            <span className="bg-[#5B50F6] text-white text-[12px] font-bold px-3 py-1.5 rounded shadow-sm flex items-center gap-1.5">
              <User size={14} /> 4 Seater
            </span>
          </div>
          <div className="absolute bottom-5 left-0 right-0 text-center">
            <span className="text-white text-[15px] font-bold tracking-[0.15em] uppercase">
              Premium Fleet
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 md:p-8 bg-white flex flex-col">
          <div className="flex items-end gap-2 mb-2">
            <h3 className="text-[22px] font-bold text-[#0B132B] leading-tight">Mercedes-Benz S-Class</h3>
            <span className="text-gray-400 text-base font-bold mb-0.5">2026</span>
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-[#0B132B] text-[15px]">5.0</span>
            <span className="text-[#94A3B8] font-medium text-[13px]">(Verified Rating)</span>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <p className="text-[11px] text-[#94A3B8] uppercase font-extrabold tracking-wider mb-4">
              Corporate Standards
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                className="flex items-center gap-1.5 text-[#475569] text-sm font-semibold"
              >
                <CheckCircle2 size={18} className="text-[#10B981]" /> Wi-Fi
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                className="flex items-center gap-1.5 text-[#475569] text-sm font-semibold"
              >
                <CheckCircle2 size={18} className="text-[#10B981]" /> Chauffeur
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
                className="flex items-center gap-1.5 text-[#475569] text-sm font-semibold"
              >
                <CheckCircle2 size={18} className="text-[#10B981]" /> GPS Tracked
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative shadow card behind */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        animate={{ opacity: 1, y: 20, scale: 0.9 }}
        transition={{ duration: 0.7, delay: 0.1, type: "spring", bounce: 0.4 }}
        className="absolute z-0 w-full max-w-[420px] h-[340px] bg-white/60 backdrop-blur-sm rounded-[24px] border border-gray-200/50 shadow-sm mx-4"
      />
    </div>
  );
}
