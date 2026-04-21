"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EarningsAndPayoutsAnimation() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 180, y: 300 });
  const [isClicking, setIsClicking] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let timeout3: NodeJS.Timeout;
    let timeoutRetract: NodeJS.Timeout;
    let loopTimeout: NodeJS.Timeout;

    const playSequence = () => {
      // 1. Reset
      setIsExpanded(false);
      setCursorPos({ x: 400, y: 360 }); 
      setHasStarted(true);

     
      timeout1 = setTimeout(() => {
        setCursorPos({ x: 160, y: 80 });
      }, 500);

      
      timeout2 = setTimeout(() => {
        setIsClicking(true);
      }, 1500);

     
      timeout3 = setTimeout(() => {
        setIsClicking(false);
        setIsExpanded(true);
        // Move cursor completely out of the way
        setCursorPos({ x: 350, y: 380 });
      }, 1700);

      
      timeoutRetract = setTimeout(() => {
        setIsExpanded(false);
      }, 6500);

     
      loopTimeout = setTimeout(() => {
        playSequence();
      }, 8000);
    };

    playSequence();

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeoutRetract);
      clearTimeout(loopTimeout);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute pt-3 sm:pt-6 pl-3 sm:pl-6 pr-2 sm:pr-4 pb-2 sm:pb-4 right-0 bottom-0 top-3 sm:top-6 left-3 sm:left-6 bg-[#FAFAFA] rounded-tl-[12px] sm:rounded-tl-[16px] shadow-sm border-t border-l border-[#F0F0F0] flex flex-col sm:flex-row overflow-hidden select-none origin-bottom-right">
      
     
      <div className="hidden sm:flex w-[110px] shrink-0 border-r border-[#E5E7EB] bg-white flex-col pt-4 shadow-[1px_0_4px_rgba(0,0,0,0.01)]">
        <div className="px-3 mb-4 flex items-center gap-1.5 opacity-90">
          <div className="w-[14px] h-[14px] bg-[#020516] rounded-[3px] flex items-center justify-center pt-0.5">
            <div className="w-[6px] h-[6px] bg-white rounded-[1.5px]" />
          </div>
          <span className="text-[11px] font-semibold text-[#020516]">Blackhorse</span>
        </div>
        <div className="px-2 space-y-1 mt-2">
      
          <div className="px-2 py-2 flex items-center gap-2 text-[10px] text-[#64748B] hover:bg-gray-50 rounded-md">
            <div className="w-[12px] h-[12px] border border-gray-400 rounded-sm" />
            Overview
          </div>
          <div className="px-2 py-2 flex items-center justify-between text-[10px] text-[#64748B] hover:bg-gray-50 rounded-md">
            <div className="flex gap-2 items-center">
              <div className="w-[12px] h-[12px] border border-gray-400 rounded-sm" />
              Bookings
            </div>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="px-2 py-2 flex items-center justify-between text-[10px] text-[#64748B] hover:bg-gray-50 rounded-md">
            <div className="flex gap-2 items-center">
              <div className="w-[12px] h-[12px] border border-gray-400 rounded-sm" />
              Fleet
            </div>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>

          <div className="mt-1 bg-white/50 border border-gray-100 shadow-sm rounded-md overflow-hidden relative">
            <div className="px-2 py-2 flex items-center justify-between text-[10px] text-[#0F172A] font-medium bg-[#FAFAFA]">
              <div className="flex gap-2 items-center">
                <div className="w-[12px] h-[12px] border border-[#0F172A] rounded-[2px] bg-white flex items-center justify-center">
                  <div className="w-[6px] h-[1px] bg-black" />
                </div>
                Finance
              </div>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="transform rotate-90 opacity-60"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="px-[25px] py-1.5 text-[9px] text-[#334155] font-medium bg-[#F1F5F9]/50 border-l-[2px] border-[#086375] ml-[10px]">
              Wallet
            </div>
          </div>
        </div>
      </div>

   
      <div className="flex-1 flex flex-col bg-white relative relative overflow-hidden">
        {/* Header Ribbon */}
        <div className="h-10 sm:h-12 bg-white flex items-center justify-between px-3 sm:px-5 shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.01)] border-b border-[#F1F5F9] z-10">
          <div className="text-[10px] sm:text-[12px] text-gray-500 font-medium flex items-center gap-1.5 sm:gap-2">
            <div className="w-3.5 h-3.5 border border-gray-300 rounded-[3px] bg-gray-50" />
            Finance
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="bg-[#49AAC2] text-white px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-[4px] text-[9px] sm:text-[10px] font-semibold cursor-pointer shadow-[0_2px_8px_rgba(73,170,194,0.3)] hover:bg-[#3d9cb3] flex items-center gap-1.5 transition-colors">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="hidden sm:inline">Request Payout</span>
              <span className="sm:hidden">Withdraw</span>
            </div>
          </div>
        </div>

       
        <div className="p-3 sm:p-5 flex flex-col gap-3 sm:gap-4 overflow-y-auto no-scrollbar relative w-full overflow-x-hidden">
         
          <motion.div
            layout
            className="w-full bg-[#056272] rounded-xl text-white shadow-[0_6px_16px_rgba(5,98,114,0.15)] cursor-pointer relative overflow-hidden flex-shrink-0"
            initial={{ height: 100 }}
            animate={{ height: isExpanded ? 240 : 100 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            style={{ originY: 0 }}
          >
            <div className="p-4 sm:p-5 relative z-10 w-full h-full flex flex-col">
              <motion.div className="text-[11px] font-medium text-white/80" layout="position">
                Available Balance
              </motion.div>
              <motion.div className="text-[24px] sm:text-[28px] font-bold mt-0.5 tracking-tightest leading-tight" layout="position">
                GH₵57,879.49
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-[9px] text-white/60 mt-2 mb-2 font-medium" layout="position">
                <div className="flex items-center gap-1">
                  <div className="w-[10px] h-[10px] border border-white/40 rounded-[2px] flex items-center justify-center">
                    <div className="w-1 h-1 bg-white/40" />
                  </div>
                  Wallet ID: 019d19cf...
                </div>
                <div>Updated: Apr 10, 2026, 06:56 PM</div>
              </motion.div>

             
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-x-0 bottom-0 h-[130px] sm:h-[150px] pointer-events-none"
                    style={{ zIndex: 0 }}
                  >
                    {/* SVG Trend Line - Realistic Curve */}
                    <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#49AAC2" stopOpacity="0.45" />
                          <stop offset="60%" stopColor="#49AAC2" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="#49AAC2" stopOpacity="0.0" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="4" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      
                      <g className="text-[8px] fill-white/30" fontFamily="sans-serif">
                        <line x1="40" y1="20" x2="480" y2="20" stroke="white" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="3 3"/>
                        <text x="10" y="24">60k</text>
                        <line x1="40" y1="75" x2="480" y2="75" stroke="white" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="3 3"/>
                        <text x="10" y="79">40k</text>
                        <line x1="40" y1="130" x2="480" y2="130" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
                        <text x="10" y="134">20k</text>
                      </g>

                  
                      <g className="text-[8px] fill-white/40" fontFamily="sans-serif">
                        <text x="60" y="145">Apr 1</text>
                        <text x="160" y="145">Apr 3</text>
                        <text x="260" y="145">Apr 5</text>
                        <text x="360" y="145">Apr 7</text>
                        <text x="440" y="145">Apr 10</text>
                      </g>

                      <g transform="translate(0, -10)">
                        
                        <motion.path
                          d="M 40 140 C 90 140, 110 110, 160 100 C 210 90, 230 115, 280 85 C 330 55, 350 40, 400 50 C 430 60, 460 20, 480 30 L 480 140 L 40 140 Z"
                          fill="url(#chartGradient)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        />
                      
                        <motion.path
                          d="M 40 140 C 90 140, 110 110, 160 100 C 210 90, 230 115, 280 85 C 330 55, 350 40, 400 50 C 430 60, 460 20, 480 30"
                          fill="none"
                          stroke="#72D2E8"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter="url(#glow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
                        />
                        
                       
                        <motion.circle
                          cx="480"
                          cy="30"
                          r="4"
                          fill="white"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 1.6 }}
                        />
                        <motion.circle
                          cx="480"
                          cy="30"
                          r="10"
                          fill="#72D2E8"
                          opacity="0.3"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                          transition={{ duration: 2, delay: 1.6, repeat: Infinity }}
                        />
                        
                     
                        <motion.g
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 1.8 }}
                        >
                          <rect x="425" y="0" width="55" height="18" rx="4" fill="white" />
                          <text x="452.5" y="12" className="text-[8px] font-bold fill-[#056272]" textAnchor="middle">+14.2%</text>
                        </motion.g>
                      </g>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {!isExpanded && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 pointer-events-none"
              >
                
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] text-[#475569] font-medium px-1">Payout Accounts</div>
                  <div className="flex gap-3">
                    {/* Active Bank Card */}
                    <div className="w-[180px] h-[100px] bg-[#0B132B] rounded-[10px] p-3 relative shadow-[0_4px_12px_rgba(11,19,43,0.15)] text-white overflow-hidden shrink-0">
                      <div className="w-[20px] h-[16px] bg-gradient-to-br from-[#FBBF24] to-[#D97706] rounded-[2px] mb-3 opacity-90 shadow-sm" />
                      <div className="text-[12px] font-mono tracking-widest mb-2 text-white/90">02XXXXXXXX</div>
                      <div className="flex flex-col">
                        <span className="text-[7px] text-[#94A3B8] font-semibold uppercase tracking-wider">BANK</span>
                        <span className="text-[10px] font-bold">MTN</span>
                      </div>
                      
                      <div className="absolute bottom-3 right-3 px-1.5 py-0.5 rounded-[4px] bg-white/10 text-[9px] flex items-center gap-1 border border-white/5">
                        <div className="w-[12px] h-[12px] rounded-full bg-white flex items-center justify-center">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#0B132B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        Active
                      </div>
                    </div>

                   
                    <div className="w-[140px] h-[100px] border-2 border-dashed border-[#E2E8F0] rounded-[10px] flex flex-col items-center justify-center gap-2 text-[#94A3B8] shrink-0 bg-white">
                      <div className="w-7 h-7 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[16px] font-light">+</div>
                      <span className="text-[10px] font-medium">Add Payout Account</span>
                    </div>
                  </div>
                </div>

              
                <div className="bg-white border border-[#E2E8F0] rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <div className="text-[14px] font-semibold text-[#0F172A]">Transaction History</div>
                      <div className="text-[10px] text-[#64748B]">View your payouts, booking earnings...</div>
                    </div>
                   
                    <div className="hidden sm:flex bg-[#F1F5F9] p-1 rounded-md gap-1">
                      <div className="bg-white px-3 py-1.5 rounded text-[10px] font-semibold text-[#0F172A] shadow-sm">Payout History</div>
                      <div className="px-3 py-1.5 rounded text-[10px] font-medium text-[#64748B]">Booking Earnings</div>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="grid grid-cols-4 text-[10px] text-[#94A3B8] font-semibold px-4 py-2 border-b border-gray-50">
                      <span>Amount</span>
                      <span>Status</span>
                      <span>Account</span>
                      <span>Scheduled</span>
                    </div>
                    <div className="flex flex-col text-[11px] text-[#334155]">
                      <div className="grid grid-cols-4 py-3 px-4 items-center border-b border-gray-50">
                        <span className="font-semibold text-[#0F172A]">GH₵3,000.00</span>
                        <div className="flex items-center"><span className="bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] px-2 py-0.5 rounded-full text-[9px] font-medium flex items-center gap-1"><span className="text-[8px]">↻</span> Processing</span></div>
                        <span className="text-[#64748B] flex items-center gap-1.5 truncate pr-2"><span className="text-[10px] opacity-70">🏦</span> ******9870</span>
                        <span className="text-[#64748B] text-[10px]">Apr 11, 2026</span>
                      </div>
                      <div className="grid grid-cols-4 py-3 px-4 items-center border-b border-gray-50">
                        <span className="font-semibold text-[#0F172A]">GH₵2,000.00</span>
                        <div className="flex items-center"><span className="bg-[#FEFCE8] text-[#CA8A04] border border-[#FEF08A] px-2 py-0.5 rounded-full text-[9px] font-medium flex items-center gap-1"><span className="text-[8px]">◷</span> Pending</span></div>
                        <span className="text-[#64748B] flex items-center gap-1.5 truncate pr-2"><span className="text-[10px] opacity-70">🏦</span> ******9870</span>
                        <span className="text-[#64748B] text-[10px]">Apr 1, 2026</span>
                      </div>
                      <div className="grid grid-cols-4 py-3 px-4 items-center">
                        <span className="font-semibold text-[#0F172A]">GH₵100.00</span>
                        <div className="flex items-center"><span className="bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] px-2 py-0.5 rounded-full text-[9px] font-medium flex items-center gap-1"><span className="text-[8px]">↻</span> Processing</span></div>
                        <span className="text-[#64748B] flex items-center gap-1.5 truncate pr-2"><span className="text-[10px] opacity-70">🏦</span> ******9870</span>
                        <span className="text-[#64748B] text-[10px]">Mar 25, 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    
      {hasStarted && (
        <motion.div
          className="absolute z-[100] pointer-events-none drop-shadow-md origin-top-left"
          initial={false}
          animate={{
            x: cursorPos.x,
            y: cursorPos.y,
            scale: isClicking ? 0.8 : 1,
            rotate: isClicking ? -5 : 0
          }}
          transition={{
            x: { type: "spring", damping: 25, stiffness: 180 },
            y: { type: "spring", damping: 25, stiffness: 180 },
            scale: { duration: 0.15 },
            rotate: { duration: 0.15 }
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          >
            <path
              d="M5.5 3.21V20.8C5.5 21.45 6.27 21.76 6.71 21.28L11.45 16.03C11.63 15.83 11.88 15.72 12.15 15.72H19.5C20.17 15.72 20.51 14.89 20.01 14.44L6.76 2.54C6.35 2.17 5.5 2.45 5.5 3.21Z"
              fill="black"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
