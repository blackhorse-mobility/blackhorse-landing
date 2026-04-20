"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Map,
  Banknote,
  CalendarCheck,
  CarFront,
  BarChart3,
  SlidersHorizontal
} from "lucide-react";

const nodes = [
  { id: 0, label: "Drivers", icon: Users, x: "15%", y: "25%" },
  { id: 1, label: "Fleets", icon: CarFront, x: "50%", y: "25%" },
  { id: 2, label: "Tracking", icon: Map, x: "85%", y: "25%" },
  { id: 3, label: "Bookings", icon: CalendarCheck, x: "85%", y: "75%" },
  { id: 4, label: "Earnings", icon: Banknote, x: "50%", y: "75%" },
  { id: 5, label: "Reports", icon: BarChart3, x: "15%", y: "75%" },
];

export function FullControlAnimation() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // 85 steps of 100ms = 8.5 seconds total loop
    const int = setInterval(() => setTime(prev => (prev + 1) % 85), 100);
    return () => clearInterval(int);
  }, []);

  const tSeconds = time / 10;
  
  // Maps logical timing to the exact moment the line arrives at each node (based on distance travelled)
  const activeNodeId =
    tSeconds < 0.9 ? 0 : // Drivers
    tSeconds < 1.8 ? 1 : // Fleets
    tSeconds < 2.9 ? 2 : // Maps
    tSeconds < 3.8 ? 3 : // Bookings
    tSeconds < 4.7 ? 4 : // Money
    tSeconds < 5.8 ? 5 : 6; // Reports -> Controls

  return (
    <div className="absolute inset-0 bg-[#F9FBFC] flex items-center justify-center overflow-hidden pointer-events-none">
      
      {/* Background static track */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 0 }}>
        <path
          d="M 15 25 L 50 25 L 85 25 L 85 75 L 50 75 L 15 75 L 50 50"
          stroke="#E5E7EB"
          strokeWidth="0.6"
          fill="none"
        />
      </svg>

      {/* Animated continuous flowing line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 1 }}>
        <motion.path
          d="M 15 25 L 50 25 L 85 25 L 85 75 L 50 75 L 15 75 L 50 50"
          vectorEffect="non-scaling-stroke"
          stroke="#41C1FD"
          strokeWidth="2.5px"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [1, 1, 0, 0] }}
          transition={{ 
            duration: 8.5, 
            times: [0, 6/8.5, 7.5/8.5, 1], // draws over 6s, holds briefly, rewinds instantly for loop
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </svg>

      {/* Perimeter Nodes */}
      {nodes.map((node, i) => {
        const isActive = i === activeNodeId;
        const Icon = node.icon;
        return (
          <div
            key={node.id}
            className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: node.x, top: node.y }}
          >
            <motion.div
              animate={{ 
                scale: isActive ? 1.05 : 1,
                borderColor: isActive ? "#056272" : "#F3F4F6",
                boxShadow: isActive ? "0 4px 12px rgba(5, 98, 114, 0.15)" : "0 2px 4px rgba(0,0,0,0.02)"
              }}
              transition={{ duration: 0.3 }}
              className={`w-10 h-10 md:w-12 md:h-12 bg-white border-2 rounded-lg md:rounded-xl flex items-center justify-center mb-1.5 transition-colors ${isActive ? 'bg-cyan-50/20' : ''}`}
            >
              <Icon
                className={isActive ? "text-[#056272]" : "text-gray-400"}
                size={20}
                strokeWidth={isActive ? 2 : 1.5}
              />
            </motion.div>
            <motion.span 
              animate={{ color: isActive ? "#111827" : "#9CA3AF" }}
              className={`text-[9px] md:text-[10px] font-medium whitespace-nowrap bg-white px-1.5 rounded shadow-sm border border-gray-100/50 ${isActive ? 'opacity-100 font-semibold border-cyan-100' : 'opacity-80'}`}
            >
              {node.label}
            </motion.span>
          </div>
        );
      })}

      {/* Center Main Node */}
      <div className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 left-[50%] top-[50%] flex flex-col items-center">
        <motion.div 
          className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center border-[3px] border-white ring-1 transition-all duration-500 ease-out ${
            activeNodeId === 6 
              ? "bg-[#41C1FD] shadow-[0_4px_16px_rgba(65,193,253,0.4)] ring-cyan-100" 
              : "bg-[#E5E7EB] ring-gray-100"
          }`}
          animate={activeNodeId === 6 ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <SlidersHorizontal className={activeNodeId === 6 ? "text-white" : "text-gray-500"} size={26} strokeWidth={2} />
        </motion.div>
      </div>
    </div>
  );
}


