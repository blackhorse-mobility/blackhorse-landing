"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export function LiveOperationsAnimation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-3 sm:p-6 bg-[#F8F8F8] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full max-w-[360px] bg-[#E8EAE6] rounded-[12px] sm:rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#DFE2E0] overflow-hidden flex flex-col pointer-events-none">
        
        <div className="absolute inset-0 bg-[#EFE9E1] overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 220" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="road-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#D1CDC7" />
              </filter>
            </defs>
            
            <path d="M260,0 L360,0 L360,110 Z" fill="#CEE5CE" opacity="0.6"/>
            <path d="M0,180 L140,220 L0,220 Z" fill="#CEE5CE" opacity="0.6"/>
            <path d="M200,80 L230,120 L160,160 Z" fill="#CEE5CE" opacity="0.6"/>

        
            <path d="M-20,0 L60,-20 L110,40 L-10,80 Z" fill="#AAD3DF" opacity="0.7"/>
            <path d="M260,220 L360,150 L360,220 Z" fill="#AAD3DF" opacity="0.7"/>

            
            <g stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#road-shadow)">
              <path d="M-10,30 L100,50 L150,0" />
              <path d="M100,50 L80,140 L-10,130" />
              <path d="M120,220 L160,170 L130,110 L280,30" />
              <path d="M160,170 L300,190 L360,140" />
              <path d="M280,30 L340,-10" />
              <path d="M300,190 L290,100 L360,50" />
              <path d="M40,125 L60,200" />
            </g>

            
            <g stroke="#FDF0A6" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#road-shadow)">
              <path d="M -20,115 L 30,130 L 120,150 L 290,50 L 380,-10" />
              <path d="M 220,240 L 120,150 L 140,50 L 200,-20" />
            </g>
            <g stroke="#FCE062" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M -20,115 L 30,130 L 120,150 L 290,50 L 380,-10" />
              <path d="M 220,240 L 120,150 L 140,50 L 200,-20" />
            </g>

           
            <text x="165" y="115" fill="#70757A" fontSize="14" fontWeight="600" className="font-sans" letterSpacing="0.2">Accra</text>
            <text x="165" y="128" fill="#A8AAAC" fontSize="10" fontWeight="500" className="font-sans">Ghana</text>
            <circle cx="156" cy="111" r="2.5" fill="#A8AAAC" />
          </svg>
        </div>

        <div className="absolute inset-0 p-4 pt-6 flex items-center justify-center">
          <svg viewBox="0 0 320 180" className="w-[100%] h-full overflow-visible">
            
            <path
              d="M 30,130 L 120,150 L 290,50"
              fill="none"
              stroke="#A1A1AA"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="6 6"
              className="opacity-50"
            />

            <motion.path
              d="M 30,130 L 120,150 L 290,50"
              fill="none"
              stroke="#1C4BD9"
              strokeWidth="6.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isHovered ? 1 : 0 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 30,130 L 120,150 L 290,50"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isHovered ? 1 : 0 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />

            <g transform="translate(290, 50)">
              <ellipse cx="0" cy="0" rx="8" ry="3" fill="#000000" opacity="0.25" />
              <path d="M0 0 C -9 -9, -13 -15, -13 -21 C -13 -28.5, -7 -34.5, 0 -34.5 C 7 -34.5, 13 -28.5, 13 -21 C 13 -15, 9 -9, 0 0 Z" fill="#EA4335" />
              <circle cx="0" cy="-21" r="4.5" fill="#581A14" />
            </g>

            <g transform="translate(30, 130)">
              <ellipse cx="0" cy="0" rx="8" ry="3" fill="#000000" opacity="0.25" />
              <path d="M0 0 C -9 -9, -13 -15, -13 -21 C -13 -28.5, -7 -34.5, 0 -34.5 C 7 -34.5, 13 -28.5, 13 -21 C 13 -15, 9 -9, 0 0 Z" fill="#EA4335" />
              <circle cx="0" cy="-21" r="4.5" fill="#581A14" />
            </g>

           
            <motion.g
              style={{
                offsetPath: `path('M 30,130 L 120,150 L 290,50')`,
                offsetRotate: "auto",
              } as React.CSSProperties}
              initial={{ offsetDistance: "0%" } as any}
              animate={{ offsetDistance: isHovered ? "100%" : "0%" } as any}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            >
             
              <circle cx="0" cy="0" r="12" fill="white" className="shadow-lg" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.2))" />
              {/* Dark inner circle mapping a vehicle */}
              <circle cx="0" cy="0" r="10" fill="#111827" />
           
              <path
                d="M-4.5 1.5l1-3h3l1 3m-6.5 0v3c0 .3.2.5.5.5h1.5c.3 0 .5-.2.5-.5v-3h7v3c0 .3.2.5.5.5h1.5c.3 0 .5-.2.5-.5v-3m-11 0h11"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </motion.g>
          </svg>
        </div>

       
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between gap-2">
          <div className="bg-white/90 backdrop-blur-[2px] px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-sm font-semibold text-[9px] sm:text-[11px] text-black border border-white/50 tracking-wide uppercase flex items-center gap-1.5 flex-shrink">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-sm"></span>
            <span>Driver</span>
            <span className="hidden sm:inline">En-route</span>
          </div>
          <div className="bg-white/90 backdrop-blur-[2px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg shadow-sm font-semibold text-[9px] sm:text-[12px] text-gray-600 border border-white/50 tracking-wide">
            ETA: {isHovered ? "2 min" : "15 min"}
          </div>
        </div>

      </div>
    </div>
  );
}
