"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_ROWS = [
  {
    ref: "BK260417OKKNAB",
    status: "PENDING",
    pickup: "Kotoka International Airp...",
    dropoff: "Boundary Rd, Accra...",
    client: "Sasha",
    company: "The Browser Company",
    date: "Apr 18 8:00 AM",
    duration: "4h",
  },
  {
    ref: "BK260410HAF8SJ",
    status: "COMPLETED",
    pickup: "YOTA Building, 95 La...",
    dropoff: "YOTA Building, 95 La...",
    client: "Maya Trent",
    company: "Acme Corp",
    date: "Apr 10 8:47 PM",
    duration: "4h",
  },
  {
    ref: "BK260409GHEDPH",
    status: "ACCEPTED",
    pickup: "YOTA Building, 95 La...",
    dropoff: "YOTA Building, 95 La...",
    client: "Michael",
    company: "New Co Ltd",
    date: "Apr 9 10:30 AM",
    duration: "4h",
  },
  {
    ref: "BK260408ABCDEX",
    status: "ACCEPTED",
    pickup: "Kotoka International Airp...",
    dropoff: "Spintex Rd, Tema...",
    client: "Priya Anwar",
    company: "Acme Inc",
    date: "Apr 9 8:15 AM",
    duration: "5h",
  },
  {
    ref: "BK260407EFGHIJ",
    status: "COMPLETED",
    pickup: "Osu Oxford Street",
    dropoff: "Achimota Mall...",
    client: "Toby Chen",
    company: "Acme Corp",
    date: "Apr 8 1:00 PM",
    duration: "2h",
  },
  {
    ref: "BK260406KLMNOP",
    status: "ACCEPTED",
    pickup: "Airport Residential...",
    dropoff: "Labadi Beach...",
    client: "Alyssa Crane",
    company: "Forge Studios",
    date: "Apr 8 9:30 AM",
    duration: "3h",
  },
  {
    ref: "BK260405QRSTUV",
    status: "COMPLETED",
    pickup: "Cantonments",
    dropoff: "A&C Mall, East Legon...",
    client: "Marcus Yeung",
    company: "Dimax Digital",
    date: "Apr 7 3:15 PM",
    duration: "4h",
  },
  {
    ref: "BK260404WXYZAB",
    status: "ACCEPTED",
    pickup: "Tema Port",
    dropoff: "Industrial Area...",
    client: "Sarah Jenkins",
    company: "New Co Ltd",
    date: "Apr 7 8:00 AM",
    duration: "6h",
  },
];

export function BookingManagementAnimation() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 200, y: 300 });
  const [isClicking, setIsClicking] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    
    const runSequence = async () => {
      while (isMounted) {
        
        
        setCursorPos({ x: 200, y: 70 });
        await new Promise(r => setTimeout(r, 1000));
        if (!isMounted) break;
        
        
        setIsClicking(true);
        await new Promise(r => setTimeout(r, 200));
        setIsClicking(false);
        
     
        setActiveIndex(0); 
        await new Promise(r => setTimeout(r, 500));
        
        
        setCursorPos({ x: 350, y: 310 });
        await new Promise(r => setTimeout(r, 1200));
        if (!isMounted) break;
        
       
        setIsClicking(true);
        await new Promise(r => setTimeout(r, 200));
        setIsClicking(false);
        
        
        setRows(prev => {
          const next = [...prev];
          next[0] = { ...next[0], status: "ACCEPTED" };
          return next;
        });
        
        
        await new Promise(r => setTimeout(r, 1000));
        if (!isMounted) break;
        
       
        setActiveIndex(null);
        
       
        setCursorPos({ x: 100, y: 400 });
        
       
        await new Promise(r => setTimeout(r, 2000));
        if (!isMounted) break;
        
       
        setRows(INITIAL_ROWS);
      }
    };
    
    runSequence();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "PENDING":
        return "bg-amber-50 text-amber-600 border-amber-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="absolute right-0 bottom-0 top-6 left-6 bg-[#FAFAFA] rounded-tl-[16px] shadow-[0_-4px_12px_rgba(0,0,0,0.02)] border-t border-l border-[#F0F0F0] flex flex-col pointer-events-none p-[1px] overflow-hidden origin-bottom-right">
      
      
      <div className="flex bg-white border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
        <div className="flex-none w-[36px] flex items-center justify-center border-r border-gray-200 py-3">#</div>
        <div className="flex-1 min-w-[120px] max-w-[160px] flex items-center border-r border-gray-200 px-3 py-3">Reference</div>
        <div className="flex-1 min-w-[90px] max-w-[110px] flex items-center border-r border-gray-200 px-3 py-3">Status</div>
        <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-200 px-3 py-3">Pickup</div>
        <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-200 px-3 py-3">Dropoff</div>
        <div className="flex-1 min-w-[90px] flex items-center border-r border-gray-200 px-3 py-3">Client</div>
        <div className="flex-1 min-w-[110px] flex items-center border-r border-gray-200 px-3 py-3">Company</div>
        <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-200 px-3 py-3">Date</div>
        <div className="flex-none w-[70px] flex items-center px-3 py-3 text-right">Dur.</div>
      </div>

     
      <div className="flex-1 relative overflow-hidden bg-white">
        {rows.map((row, idx) => (
          <motion.div 
            key={`${row.ref}-${idx}`}
            className={`flex text-[12px] font-medium text-gray-800 transition-colors cursor-pointer border-b border-gray-100 ${activeIndex === idx ? "bg-blue-50/50" : "hover:bg-gray-50"}`}
            layout
          >
            <div className="flex-none w-[36px] flex items-center justify-center border-r border-gray-100 py-3 text-gray-400">{idx + 1}</div>
            <div className="flex-1 min-w-[120px] max-w-[160px] flex items-center border-r border-gray-100 px-3 py-3 text-blue-600">{row.ref}</div>
            <div className="flex-1 min-w-[90px] max-w-[110px] flex items-center border-r border-gray-100 px-3 py-3 relative">
              <span className={`px-2 py-0.5 rounded-[4px] border uppercase text-[9px] tracking-wide font-bold inline-flex items-center ${getStatusStyle(row.status)}`}>
                {row.status === "PENDING" && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>}
                {row.status === "ACCEPTED" && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>}
                {row.status}
              </span>
            </div>
            <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-100 px-3 py-3 truncate">{row.pickup}</div>
            <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-100 px-3 py-3 truncate">{row.dropoff}</div>
            <div className="flex-1 min-w-[90px] flex items-center border-r border-gray-100 px-3 py-3 truncate">
               <div className="flex items-center gap-1.5">
                 <div className="w-[18px] h-[18px] rounded-full bg-gray-200 shrink-0"></div>
                 <span className="truncate">{row.client}</span>
               </div>
            </div>
            <div className="flex-1 min-w-[110px] flex items-center border-r border-gray-100 px-3 py-3 truncate">
              {row.company !== "New Co Ltd" && (
                <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px] mr-1.5 truncate">
                  {row.company}
                </span>
              )}
              {row.company === "New Co Ltd" && <span className="truncate">{row.company}</span>}
            </div>
            <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-100 px-3 py-3 truncate text-gray-500 text-[11px]">{row.date}</div>
            <div className="flex-none w-[70px] flex items-center justify-end px-3 py-3 text-gray-500 text-[11px]">{row.duration}</div>
          </motion.div>
        ))}

        
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/10 backdrop-blur-[1px] flex items-center justify-center p-4 z-10"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-[340px] bg-white rounded-[16px] shadow-xl overflow-hidden border border-gray-200"
              >
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-[16px] font-bold text-gray-900 mb-0.5">Booking Request</h4>
                      <p className="text-[12px] text-gray-500 font-medium">{rows[activeIndex].ref}</p>
                    </div>
                    {rows[activeIndex].status === "PENDING" ? (
                      <span className="bg-amber-50 text-amber-600 border border-amber-200 uppercase tracking-widest text-[9px] font-bold px-2 py-1 rounded-[6px] animate-pulse">
                        New
                      </span>
                    ) : (
                       <span className="bg-blue-50 text-blue-600 border border-blue-200 uppercase tracking-widest text-[9px] font-bold px-2 py-1 rounded-[6px]">
                        Accepted
                      </span>
                    )}
                  </div>

                
                  <div className="space-y-3 mt-4">
                    <div className="flex gap-2">
                      <div className="w-[8px] h-full bg-gray-100 rounded-full flex flex-col justify-between py-1 relative">
                        <div className="w-2 h-2 rounded-full bg-black z-10"></div>
                        <div className="absolute top-2 bottom-2 left-[3px] w-[2px] bg-gray-200"></div>
                        <div className="w-2 h-2 rounded-full border-2 border-black bg-white z-10"></div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Pickup</div>
                          <div className="text-[13px] font-semibold text-gray-800">{rows[activeIndex].pickup}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Dropoff</div>
                          <div className="text-[13px] font-semibold text-gray-800">{rows[activeIndex].dropoff}</div>
                        </div>
                      </div>
                    </div>
                    
                    
                    <div className="pt-2 flex gap-3 opacity-60">
                       <div className="flex-1 h-10 bg-gray-100 rounded-[8px] overflow-hidden relative"><div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div></div>
                       <div className="flex-1 h-10 bg-gray-100 rounded-[8px] overflow-hidden relative"><div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 flex gap-3">
                  {rows[activeIndex].status === "PENDING" ? (
                    <>
                      <button className="flex-1 py-2.5 bg-white border border-gray-200 rounded-[8px] text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        Reject
                      </button>
                      <button className={`flex-1 py-2.5 bg-[#0F222B] text-white rounded-[8px] text-[13px] font-bold transition-all relative overflow-hidden ${isClicking && cursorPos.y > 200 ? 'scale-[0.98] bg-[#41C1FD]' : ''}`}>
                        <span className="relative z-10">Accept Booking</span>
                        <div className="absolute inset-0 bg-[#41C1FD] opacity-0 hover:opacity-100 transition-opacity"></div>
                      </button>
                    </>
                  ) : (
                    <div className="flex-1 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-[8px] text-[13px] font-bold text-center flex items-center justify-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Booking Accepted
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

     
      <AnimatePresence>
        {showCursor && (
          <motion.div
            initial={false}
            animate={{
              x: cursorPos.x,
              y: cursorPos.y,
              scale: isClicking ? 0.8 : 1,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 150,
              mass: 0.5,
              scale: { type: "tween", duration: 0.1 }
            }}
            className="absolute z-50 pointer-events-none drop-shadow-md"
            style={{ originX: 0, originY: 0 }}
          >
            
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={isClicking ? "text-gray-900" : "text-black"}
            >
              <path 
                d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L6.35 3.35c-.22-.22-.85-.06-.85.35z" 
                fill="currentColor" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinejoin="round" 
              />
            </svg>
            
         
            <AnimatePresence>
              {isClicking && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-1 left-1 w-4 h-4 bg-black/20 rounded-full"
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
