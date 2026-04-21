"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_ROWS = [
  {
    plate: "GR 3443-16",
    vehicle: "Mitsubishi Outlander",
    typeInfo: "SUV • 2016",
    tier: "Premium",
    color: "Blue",
    seats: 7,
    status: "Approved",
    active: "Yes",
    driverInitials: "DB",
    driverName: "Dom Brown",
    features: [],
  },
  {
    plate: "GR 1234-17",
    vehicle: "Hyundai Elantra",
    typeInfo: "Sedan • 2015",
    tier: "Economy",
    color: "Red",
    seats: 5,
    status: "Approved",
    active: "Yes",
    driverInitials: "JD",
    driverName: "John Doe",
    features: ["USB Charging", "GPS Navigation", "Android Auto", "+3"],
  },
  {
    plate: "ER316-17",
    vehicle: "Mitsubishi Lancer",
    typeInfo: "Sedan • 2015",
    tier: "Standard Business",
    color: "Black",
    seats: 5,
    status: "Approved",
    active: "Yes",
    driverInitials: "CW",
    driverName: "Cole White",
    features: ["USB Charging", "Android Auto", "Climate Control", "+2"],
  },
];

export function FleetManagementAnimation() {
  const [viewState, setViewState] = useState<"table" | "detail">("table");
  const [cursorPos, setCursorPos] = useState({ x: 300, y: 300 });
  const [isClicking, setIsClicking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let isRunning = true;

    const playSequence = async () => {
      while (isRunning) {
        // Reset
        setViewState("table");
        setCursorPos({ x: 300, y: 300 });

        await new Promise((r) => setTimeout(r, 1000));
        if (!isRunning) break;

        // Move to first row
        setCursorPos({ x: 150, y: 70 });
        await new Promise((r) => setTimeout(r, 800));
        if (!isRunning) break;

        // Click row
        setIsClicking(true);
        await new Promise((r) => setTimeout(r, 200));
        setIsClicking(false);
        if (!isRunning) break;

        // Show detail view
        setViewState("detail");
        
        // Move cursor slightly to simulate reading
        await new Promise((r) => setTimeout(r, 400));
        setCursorPos({ x: 250, y: 150 });
        
        await new Promise((r) => setTimeout(r, 4000));
        if (!isRunning) break;
      }
    };

    playSequence();

    return () => {
      isRunning = false;
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute pt-3 sm:pt-6 pl-3 sm:pl-6 pr-2 sm:pr-4 pb-2 sm:pb-4 right-0 bottom-0 top-3 sm:top-6 left-3 sm:left-6 bg-[#FAFAFA] rounded-tl-[12px] sm:rounded-tl-[16px] shadow-[0_-4px_12px_rgba(0,0,0,0.02)] border-t border-l border-[#F0F0F0] flex flex-col pointer-events-none overflow-hidden origin-bottom-right">
      <AnimatePresence mode="wait">
        {viewState === "table" ? (
          <motion.div
            key="table"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full h-full p-2 sm:p-4"
          >
            {/* Table Header area */}
            <div className="flex items-center justify-between mb-4 mt-2">
              <div className="flex gap-2 text-[10px] font-medium">
                <div className="bg-gray-100 rounded px-2 py-1 flex gap-1">All <span className="bg-blue-100 text-blue-600 rounded px-1">3</span></div>
                <div className="bg-gray-50 rounded px-2 py-1 flex gap-1 text-gray-500">Active <span className="bg-blue-100 text-blue-600 rounded px-1">3</span></div>
                <div className="bg-gray-50 rounded px-2 py-1 flex gap-1 text-gray-500">Inactive <span className="bg-gray-200 rounded px-1">0</span></div>
              </div>
            </div>

            <div className="bg-white border text-[10px] text-gray-500 uppercase tracking-wider grid grid-cols-[30px_minmax(80px,1fr)_1.5fr_80px_1fr] md:grid-cols-[30px_minmax(80px,1fr)_1.5fr_100px_1fr] rounded-t-md px-3 py-3 mt-4">
              <div />
              <div>License Plate</div>
              <div>Vehicle</div>
              <div>Status</div>
              <div className="hidden sm:block">Driver</div>
            </div>
            
            <div className="bg-white border-x border-b rounded-b-md flex flex-col max-h-[260px] overflow-hidden">
              {INITIAL_ROWS.map((row, i) => (
                <div key={i} className="grid grid-cols-[30px_minmax(80px,1fr)_1.5fr_80px_1fr] md:grid-cols-[30px_minmax(80px,1fr)_1.5fr_100px_1fr] items-center border-b border-gray-100 px-3 py-3 hover:bg-gray-50 text-[11px] text-gray-700 transition-colors">
                  <div><div className="w-3.5 h-3.5 rounded border border-gray-300"></div></div>
                  <div className="font-semibold text-gray-900">{row.plate}</div>
                  <div className="flex flex-col leading-tight pt-1 pr-1 truncate">
                    <span className="font-medium text-gray-800 truncate">{row.vehicle}</span>
                    <span className="text-[9px] text-gray-400 mt-0.5 truncate">{row.typeInfo}</span>
                  </div>
                  <div><span className="border border-emerald-200 text-emerald-700 bg-emerald-50/50 rounded px-1.5 py-1 text-[9px] flex items-center gap-1 w-max font-medium"><span className="text-[8px]">✓</span> {row.status}</span></div>
                  <div className="hidden sm:flex items-center gap-2 truncate">
                    <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-600 shrink-0">{row.driverInitials}</div>
                    <span className="font-medium truncate">{row.driverName}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full h-full p-5 bg-white relative overflow-hidden"
          >
            {/* Detail View */}
<div className="flex items-start gap-3 mb-5 shrink-0">
                <div className="mt-1 bg-gray-100 p-1.5 rounded-full cursor-pointer hover:bg-gray-200">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="gray" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[17px] font-bold text-gray-900 leading-tight tracking-tight">Mitsubishi Outlander (GR 3443-16)</h2>
                  <span className="text-[11px] text-[#64748B] font-medium mt-0.5">Vehicle Details & Management</span>
                </div>
                <div className="ml-auto hidden sm:flex gap-2">
                  <button className="border border-gray-200 text-gray-600 rounded-[6px] px-3 py-1.5 text-[10px] font-semibold hover:bg-gray-50 shadow-sm transition-colors">Edit</button>
                  <button className="bg-[#0B132B] text-white rounded-[6px] px-3 py-1.5 text-[10px] font-semibold hover:bg-[#1a233a] shadow-sm transition-colors">Change Driver</button>
              </div>
            </div>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
                <div className="border border-gray-100 rounded-[10px] p-2.5 sm:p-3 shadow-sm flex flex-col justify-between h-[75px] bg-[#F8FAFC]">
                  <div className="text-[8px] text-[#64748B] font-bold tracking-wider uppercase">Total Bookings</div>
                  <div className="text-xl font-bold text-gray-800">8</div>
                </div>
                <div className="border border-gray-100 rounded-[10px] p-2.5 sm:p-3 shadow-sm flex flex-col justify-between h-[75px] bg-[#F8FAFC]">
                  <div className="text-[8px] text-[#64748B] font-bold tracking-wider uppercase">Earnings</div>
                  <div className="text-lg font-bold text-gray-800 tracking-tight">GH₵59,716</div>
                </div>
                <div className="border border-amber-400/50 bg-[#FEFCE8] rounded-[10px] p-2.5 sm:p-3 shadow-sm flex flex-col justify-between h-[75px] col-span-2 sm:col-span-2">
                  <div className="text-[8px] text-amber-700 font-bold tracking-wider uppercase">Current Status</div>
                  <div className="flex items-end justify-between">
                    <div className="text-lg font-bold text-amber-900">ACCEPTED</div>
                    <div className="text-[9px] text-amber-600 font-medium flex items-center gap-1 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Live Tracking
                    </div>
                  </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 h-full overflow-hidden">
              <div className="flex-[0.7] border border-gray-100 rounded-[12px] p-4 shadow-sm flex flex-col bg-white shrink-0">
                <h3 className="text-[12px] font-bold text-gray-900 mb-4">Vehicle Specifications</h3>
                <div className="grid grid-cols-2 gap-y-5 gap-x-3 text-[10px]">
                  <div className="flex flex-col gap-1"><span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Year</span><span className="font-semibold text-gray-800">2016</span></div>
                  <div className="flex flex-col gap-1"><span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Color</span><span className="font-semibold text-gray-800">Blue</span></div>
                  <div className="flex flex-col gap-1"><span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Type</span><span className="font-semibold text-gray-800">SUV</span></div>
                  <div className="flex flex-col gap-1"><span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Seating</span><span className="font-semibold text-gray-800">7 Seats</span></div>
                  <div className="flex flex-col gap-1"><span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Engine</span><span className="font-semibold text-gray-800">2.4L</span></div>
                  <div className="flex flex-col gap-1"><span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Tier</span><span className="font-semibold text-gray-800">Premium</span></div>
                </div>
              </div>
              <div className="flex-1 bg-[#F8FAFC] border border-gray-100 rounded-[12px] overflow-hidden relative shadow-inner min-h-[140px]">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-400 opacity-30 text-2xl text-center px-4 leading-tight">Blackhorse<br/>Mobility</div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute z-50 pointer-events-none drop-shadow-md origin-top-left"
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
    </div>
  );
}
