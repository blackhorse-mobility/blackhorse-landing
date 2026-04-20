"use client";

import React, { useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

export function VerifiedClientsCarousel() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);

  useAnimationFrame((time, delta) => {
    if (!isHovered) return;

    scrollPosition.current -= delta * 0.009; // Adjust speed as needed

   
    if (scrollPosition.current <= -50) {
     
      scrollPosition.current = scrollPosition.current % 50;
    }

    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${scrollPosition.current}%)`;
    }
    if (bottomContainerRef.current) {
      // Reverse direction: start at -50% and go to 0%
      let bottomPos = scrollPosition.current * -1 - 50;
      bottomContainerRef.current.style.transform = `translateX(${bottomPos}%)`;
    }
  });

  return (
    <div
      className="w-full h-full absolute inset-0 flex flex-col justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F8F8F8] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F8F8F8] to-transparent z-10 pointer-events-none" />
      <div className="flex flex-col gap-6 w-full overflow-hidden">
        <div
          ref={containerRef}
          className="flex w-max"
          style={{ willChange: "transform" }}
        >
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex gap-4 pr-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`top-${groupIdx}-${i}`}
                  className="flex shrink-0 items-center justify-center gap-3 px-5 py-3 bg-white rounded-[100px] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05),0_1px_4px_-1px_rgba(0,0,0,0.03)] text-[15px] font-medium"
                >
                  <div className="w-6 h-6 bg-[#162D3D] rounded-full flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-900 tracking-tight">
                    Acme Inc
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          ref={bottomContainerRef}
          className="flex w-max -ml-8"
          style={{
            willChange: "transform",
            transform: "translateX(-50%)",
          }}
        >
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex gap-4 pr-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`bottom-${groupIdx}-${i}`}
                  className="flex shrink-0 items-center justify-center gap-3 px-5 py-3 bg-white rounded-[100px] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05),0_1px_4px_-1px_rgba(0,0,0,0.03)] text-[15px] font-medium"
                >
                  <div className="w-6 h-6 bg-[#162D3D] rounded-full flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-900 tracking-tight">
                    Acme Inc
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
