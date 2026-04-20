"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ghanaTrips = [
  {
    id: 1,
    company: "Acme Inc",
    tag: "Intra City",
    pax: "4",
    originTime: "09:00 AM",
    originLoc: "Boundary Rd.",
    originSub: "Accra, Ghana",
    destTime: "12:00 PM",
    destLoc: "Kotoka",
    destSub: "Int. Airport",
    duration: "3h 00 min"
  },
  {
    id: 2,
    company: "Dimax Digital",
    tag: "Inter City",
    pax: "12",
    originTime: "02:00 PM",
    originLoc: "Royal Hall",
    originSub: "Kumasi, Ghana",
    destTime: "06:30 PM",
    destLoc: "Osu St.",
    destSub: "Accra, Ghana",
    duration: "4h 30 min"
  },
  {
    id: 3,
    company: "Forge Studios",
    tag: "Intra City",
    pax: "1",
    originTime: "07:15 AM",
    originLoc: "Buro",
    originSub: "Tema, Ghana",
    destTime: "08:00 AM",
    destLoc: "Spintex Rd.",
    destSub: "Accra, Ghana",
    duration: "45 min"
  }
];

export function SteadyDemandAnimation() {
  const [trips, setTrips] = useState(ghanaTrips);
  const [isHovered, setIsHovered] = useState(false);
  const [status, setStatus] = useState<"Accepted" | "In Progress" | "Completed">("Accepted");
  const isHoveredRef = React.useRef(isHovered);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    let isMounted = true;
    const runSequence = async () => {
      while (isMounted) {
        setStatus("Accepted");
        await new Promise((r) => setTimeout(r, 1200));
        if (!isMounted) break;

        
        setStatus("In Progress");
        await new Promise((r) => setTimeout(r, 2500)); 
        if (!isMounted) break;

        
        setStatus("Completed");
        await new Promise((r) => setTimeout(r, 1500));
        if (!isMounted) break;

        if (isHoveredRef.current) {
          setStatus("Accepted"); 
          setTrips((prev) => {
            const next = [...prev];
            next.push(next.shift()!); 
            return next;
          });
         
          await new Promise((r) => setTimeout(r, 500));
        } else {
          await new Promise((r) => setTimeout(r, 800));
        }
      }
    };

    runSequence();
    return () => {
      isMounted = false;
    };
  }, []);

  const getStatusStyles = () => {
    switch (status) {
      case "Accepted":
        return "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]";
      case "In Progress":
        return "bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]";
      case "Completed":
        return "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]";
      default:
        return "bg-gray-100 text-gray-600 border-[#E5E7EB]";
    }
  };

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-[360px] h-[190px]">
        {trips.map((trip, idx) => {
          const isFront = idx === 0;
          const zIndex = 30 - idx;
          
          const displayStatus = isFront ? status : "Completed";

          return (
            <motion.div
              layout
              key={trip.id}
              initial={false}
              animate={{
                y: isHovered ? (idx * -24) : (idx * -16),
                scale: isHovered ? (1 - idx * 0.04) : (1 - idx * 0.06),
                opacity: isHovered ? (1 - idx * 0.1) : (1 - idx * 0.3),
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 1.0 }}
              style={{ zIndex }}
              className="absolute top-0 left-0 right-0 h-full bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#F0F0F0] p-5 flex flex-col"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0F222B] rounded-[10px] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="white"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-[15px] -ml-1 text-black">{trip.company}</span>
                </div>

                <motion.div
                  layout
                  className={`px-2.5 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider border transition-colors duration-300 ${isFront ? getStatusStyles() : "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]"}`}
                >
                  {displayStatus}
                </motion.div>
              </div>

             
              <div className="flex items-center gap-3 w-full justify-end mb-5">
                <span className="px-2 py-0.5 border border-gray-200 rounded-[6px] text-[11px] font-medium text-gray-700 bg-white">
                  {trip.tag}
                </span>
                <div className="flex items-center gap-1 text-black font-medium text-[11px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span className="mt-[1px]">{trip.pax} passengers</span>
                </div>
              </div>

              
              <div className="flex items-center justify-between relative w-full mb-1">
                {/* Left Box (Origin) */}
                <div className="flex flex-col text-left w-[30%] shrink-0">
                  <span className="text-[14px] font-semibold text-black">{trip.originTime}</span>
                  <span className="text-[12px] text-[#A1A1AA] mt-1 leading-[1.3] font-medium">
                    {trip.originLoc}
                    <br />
                    {trip.originSub}
                  </span>
                </div>

               
                <div className="flex flex-col items-center justify-center flex-1 px-3 relative h-full">
                  <span className="text-[11px] text-gray-700 mb-[6px] font-medium">Premium</span>
                  
                 
                  <div className="w-full relative h-[4px] flex items-center mb-1.5">
                    <svg width="100%" height="4" className="absolute top-0 left-0 overflow-visible">
                      <line
                        x1="0"
                        y1="2"
                        x2="100%"
                        y2="2"
                        stroke="#E4E4E5"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                        strokeLinecap="round"
                      />
                      <motion.line
                        x1="0"
                        y1="2"
                        x2="100%"
                        y2="2"
                        stroke="#5DCBFE"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                        strokeLinecap="round"
                        initial={{ pathLength: isFront ? 0 : 1 }}
                        animate={{
                          pathLength: isFront ? (status === "In Progress" || status === "Completed" ? 1 : 0) : 1,
                        }}
                        transition={{ duration: isFront && status === "Accepted" ? 0 : 2.5, ease: "linear" }}
                      />
                    </svg>
                  </div>

                  <span className="mt-1 bg-[#F4F4F5] text-gray-600 text-[11px] px-2.5 py-[3px] rounded-[6px] font-semibold tracking-tight">
                    {trip.duration}
                  </span>
                </div>

               
                <div className="flex flex-col text-right w-[30%] shrink-0">
                  <span className="text-[14px] font-semibold text-black">{trip.destTime}</span>
                  <span className="text-[12px] text-[#A1A1AA] mt-1 leading-[1.3] font-medium">
                    {trip.destLoc}
                    <br />
                    {trip.destSub}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
