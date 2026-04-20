"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export function OperationalDashboardAnimation() {
  const [activeTrips, setActiveTrips] = useState(1);
  const [idleVehicles, setIdleVehicles] = useState(2);
  const [walletBalance, setWalletBalance] = useState(57879.49);

  const [progressGideon, setProgressGideon] = useState(30);
  const [progressDominic, setProgressDominic] = useState(5);

  useEffect(() => {
    let isMounted = true;
    
    const interval = setInterval(() => {
      if (!isMounted) return;

      
      setProgressGideon((prev) => (prev >= 95 ? 30 : prev + 1));
      setProgressDominic((prev) => (prev >= 95 ? 5 : prev + 1.5));

      if (Math.random() > 0.9) {
        setWalletBalance((prev) => prev + (Math.random() * 50 + 10));
      }
      
    }, 500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`absolute right-0 bottom-0 top-6 left-6 bg-[#F9FBFC] rounded-tl-[16px] shadow-[0_-4px_12px_rgba(0,0,0,0.02)] border-t border-l border-[#F0F0F0] flex flex-col pointer-events-none p-4 sm:p-5 ${manrope.className} text-left overflow-hidden origin-bottom-right`}>
      
      <div className="grid grid-cols-2 gap-3 mb-4 shrink-0">
        <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-3 flex flex-col justify-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-[#60A5FA] text-white flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
                </div>
                <div className="text-[10px] font-medium text-[#6B7280]">Active Trips</div>
            </div>
            <motion.div 
               key={activeTrips}
               initial={{ opacity: 0.5, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-[18px] font-bold text-[#111827] leading-none"
            >
                {activeTrips}
            </motion.div>
        </div>

        <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-3 flex flex-col justify-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-[#38BDF8] text-white flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>
                </div>
                <div className="text-[10px] font-medium text-[#6B7280]">Wallet Balance</div>
            </div>
            <div className="text-[15px] sm:text-[16px] font-bold text-[#111827] leading-none tracking-tight">
                GHS {walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-[#E5E7EB] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-black text-[13px]">Driver Status</h4>
            <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] flex items-center gap-1 uppercase tracking-wider">
               <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span> Live
            </span>
          </div>
        </div>
        
        <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-hidden relative">
          
          <div className="p-3 bg-white rounded-[10px] border border-gray-100 shadow-sm relative overflow-hidden bg-gradient-to-r from-transparent to-white">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-purple-500"></div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0 border border-gray-200"></div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[12px] font-bold text-gray-900">Gideon Adzigblie</span>
                  <span className="text-[10px] text-[#6B7280] font-medium mt-0.5">sedan • GR 1234-17</span>
                </div>
              </div>
              <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-[4px] uppercase tracking-wider">Assigned</span>
            </div>
            
            <div className="pl-[38px]">
               <div className="text-[10px] text-[#6B7280] truncate flex items-center gap-1 mb-1.5 font-medium">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  YOTA Building, 95 La-Bawaleshi Rd
               </div>
               <div className="w-full flex items-center gap-1.5">
                  <span className="w-1.5 h-3 rounded-full bg-purple-500 shrink-0"></span>
                  <div className="h-[3px] flex-1 bg-purple-100 relative rounded-full overflow-hidden">
                     <motion.div 
                        className="absolute left-0 top-0 bottom-0 bg-purple-500 rounded-full" 
                        animate={{ width: `${progressGideon}%` }} 
                        transition={{ ease: "linear", duration: 0.5 }}
                     />
                  </div>
                  <span className="w-1.5 h-3 rounded-full bg-gray-200 shrink-0"></span>
               </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-[10px] border border-gray-100 shadow-sm relative overflow-hidden bg-gradient-to-r from-transparent to-white">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-purple-500"></div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0 border border-gray-200"></div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[12px] font-bold text-gray-900">Dominic Sepenu</span>
                  <span className="text-[10px] text-[#6B7280] font-medium mt-0.5">suv • GR 3443-16</span>
                </div>
              </div>
              <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-[4px] uppercase tracking-wider">Assigned</span>
            </div>
            
            <div className="pl-[38px]">
               <div className="text-[10px] text-[#6B7280] truncate flex items-center gap-1 mb-1.5 font-medium">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Kotoka International Airport
               </div>
               {/* Progress Bar */}
               <div className="w-full flex items-center gap-1.5">
                  <span className="w-1.5 h-3 rounded-full bg-purple-500 shrink-0"></span>
                  <div className="h-[3px] flex-1 bg-purple-100 relative rounded-full overflow-hidden">
                     <motion.div 
                        className="absolute left-0 top-0 bottom-0 bg-purple-500 rounded-full" 
                        animate={{ width: `${progressDominic}%` }} 
                        transition={{ ease: "linear", duration: 0.5 }}
                     />
                  </div>
                  <span className="w-1.5 h-3 rounded-full bg-gray-200 shrink-0"></span>
               </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
        </div>
      </div>

    </div>
  );
}
