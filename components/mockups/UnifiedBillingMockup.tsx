"use client";

import React, { useEffect, useState } from 'react';
import {
  Home, FileText, CarFront, Calendar, Map, CreditCard, Bell, ChevronDown,
  Info, Globe
} from 'lucide-react';

const TRANSACTIONS = [
  {
    ref: "BK260417OKKNAB",
    paymentStatus: "PAID",
    pickup: "Kotoka International Airp...",
    dropoff: "Boundary Rd, Accra...",
    employee: "Dominic Sepenu",
    amount: "GH₵ 460.00",
    date: "Apr 18 8:00 AM",
  },
  {
    ref: "BK260410HAF8SJ",
    paymentStatus: "PAID",
    pickup: "YOTA Building, 95 La...",
    dropoff: "YOTA Building, 95 La...",
    employee: "Maya Trent",
    amount: "GH₵ 552.58",
    date: "Apr 10 8:47 PM",
  },
  {
    ref: "BK260409GHEDPH",
    paymentStatus: "REFUNDED",
    pickup: "YOTA Building, 95 La...",
    dropoff: "YOTA Building, 95 La...",
    employee: "Michael",
    amount: "GH₵ 198.38",
    date: "Apr 9 10:30 AM",
  },
  {
    ref: "BK260408ABCDEX",
    paymentStatus: "PENDING",
    pickup: "Kotoka International Airp...",
    dropoff: "Spintex Rd, Tema...",
    employee: "Priya Anwar",
    amount: "GH₵ 210.00",
    date: "Apr 9 8:15 AM",
  },
  {
    ref: "BK260407EFGHIJ",
    paymentStatus: "PAID",
    pickup: "Osu Oxford Street",
    dropoff: "Achimota Mall...",
    employee: "Toby Chen",
    amount: "GH₵ 345.50",
    date: "Apr 8 1:00 PM",
  },
];

export default function UnifiedBillingMockup() {
  const [balance, setBalance] = useState(0);
  const targetBalance = 33640.01;

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setBalance(targetBalance * easeOut);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const formattedBalance = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(balance);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "REFUNDED":
        return "bg-gray-100 text-gray-600 border-gray-200";
      case "PENDING":
        return "bg-amber-50 text-amber-600 border-amber-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="absolute right-0 bottom-0 top-6 left-6 md:top-10 md:left-10 bg-[#FAFAFA] rounded-tl-[24px] border-t border-l border-gray-200 flex flex-col font-body overflow-hidden text-[10px] sm:text-xs shadow-[-8px_-8px_30px_rgba(0,0,0,0.04)]">
      
      {/* Top Navbar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center px-6 shrink-0 justify-between relative z-10 w-full shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/assets/Icon-dp/BH_icon_Main.png" alt="Blackhorse" className="w-8 h-8 object-contain" />
          <span className="font-display font-medium tracking-wide text-[15px] text-gray-900 hidden sm:block">Blackhorse Corporate</span>
        </div>

        {/* Nav Links */}
        <div className="hidden 2xl:flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50"><Home size={14} /><span>Home</span></div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50"><FileText size={14} /><span>Booking</span></div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50"><CarFront size={14} /><span>Fleet</span></div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50"><Calendar size={14} /><span>Schedule</span></div>       
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50"><Map size={14} /><span>Tracking</span></div>
          <div className="flex items-center gap-1.5 px-4 py-1.5 text-cyan-600 bg-white border border-gray-200 shadow-sm rounded-lg font-medium"><CreditCard size={14} /><span>Payments</span></div>     
        </div>

        <div className="flex items-center gap-4">
          <Bell size={18} className="text-gray-400 font-light" />
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="hidden sm:flex flex-col items-end">
              <span className="font-medium text-gray-900 text-[12px] leading-tight">New Co Ltd</span>
              <span className="text-gray-400 text-[9px] uppercase tracking-wider">SUPER_ADMIN</span>
            </div>
            <div className="w-8 h-8 bg-black rounded-full text-white flex items-center justify-center font-bold text-sm">
              <span className="font-display">N</span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto no-scrollbar relative bg-white flex flex-col gap-6 sm:gap-8">
        
        {/* Header section */}
        <div className="flex justify-between items-start shrink-0">
          <div>
            <h1 className="text-[24px] sm:text-[28px] font-medium font-display text-gray-900 mb-1 tracking-tight">Billing</h1>
            <p className="text-gray-500 text-[12px] sm:text-[13px]">Manage your corporate billing and review payment history.</p>
          </div>
        </div>

        {/* Maze-style Card Header */}
        <div className="bg-cyan-300 rounded-[20px] p-6 sm:p-8 w-full max-w-[700px] min-h-[180px] sm:min-h-[220px] relative overflow-hidden text-cyan-950 shadow-sm flex flex-col justify-between shrink-0 gap-4">
           {/* Decorative dotted globe pattern at bottom right */}
           <div className="absolute -right-8 -bottom-16 opacity-30 pointer-events-none mix-blend-color-burn">
              <Globe size={280} strokeWidth={1.5} strokeDasharray="4 6" className="text-cyan-800" />
           </div>

           <div className="flex flex-col sm:flex-row sm:justify-between items-start relative z-10 gap-2 sm:gap-4">
              <div>
                 <h2 className="text-[18px] sm:text-[20px] font-bold tracking-tight">Team balance</h2>
                 <p className="text-[12px] sm:text-[13px] opacity-80 mt-1 font-medium text-cyan-900/80">Your billing balance.</p>
              </div>
              <div className="text-[34px] sm:text-[46px] font-display tracking-tighter leading-none flex items-baseline gap-1.5">
                 <span className="text-[14px] sm:text-[18px] font-semibold text-cyan-900 uppercase tracking-wide">GH₵</span>
                 {formattedBalance}
              </div>
           </div>

           <div className="relative z-10 w-full sm:max-w-[280px]">
              <p className="text-[12px] sm:text-[13px] font-medium leading-relaxed tracking-tight text-cyan-950/90">
                Billing balances are used to seamlessly handle corporate rides and operational bookings.
              </p>
              <p className="text-[12px] sm:text-[13px] font-bold mt-1 underline underline-offset-2 decoration-2 decoration-cyan-950/30 cursor-pointer hover:decoration-cyan-950/60 transition-colors w-fit">Learn more</p>
           </div>
        </div>

        {/* Transactions Table Section (Rental Booking Style) */}
        <div className="flex flex-col flex-1 shrink-0 overflow-hidden">
           <h3 className="text-[18px] font-bold text-gray-900 mb-4 tracking-tight">Payment History</h3>

           <div className="bg-white rounded-[16px] shadow-[0_-4px_12px_rgba(0,0,0,0.02)] border border-[#F0F0F0] flex flex-col p-[1px] overflow-hidden flex-1 min-h-[0]">
             
              {/* Table Header */}
              <div className="flex bg-white border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider shrink-0">
                <div className="flex-none w-[36px] flex items-center justify-center border-r border-gray-200 py-3">#</div>
                <div className="flex-1 min-w-[120px] max-w-[160px] flex items-center border-r border-gray-200 px-3 py-3">Reference</div>
                <div className="flex-1 min-w-[110px] max-w-[130px] flex items-center border-r border-gray-200 px-3 py-3">Payment Status</div>
                <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-200 px-3 py-3">Pickup</div>
                <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-200 px-3 py-3">Dropoff</div>
                <div className="flex-1 min-w-[110px] flex items-center border-r border-gray-200 px-3 py-3">Employee</div>
                <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-200 px-3 py-3">Date</div>
                <div className="flex-none w-[100px] flex items-center px-3 py-3 justify-end">Amount</div>
              </div>

              {/* Table Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col min-w-max pb-4">
                  {TRANSACTIONS.map((row, idx) => (
                    <div 
                      key={`${row.ref}-${idx}`}
                      className="flex text-[12px] font-medium text-gray-800 transition-colors cursor-pointer border-b border-gray-100 hover:bg-gray-50/70"
                    >
                      <div className="flex-none w-[36px] flex items-center justify-center border-r border-gray-100 py-3 text-gray-400">{idx + 1}</div>
                      <div className="flex-1 min-w-[120px] max-w-[160px] flex items-center border-r border-gray-100 px-3 py-3 text-gray-900">{row.ref}</div>
                      <div className="flex-1 min-w-[110px] max-w-[130px] flex items-center border-r border-gray-100 px-3 py-3 relative">
                        <span className={`px-2 py-0.5 rounded-[4px] border uppercase text-[9px] tracking-wide font-bold inline-flex items-center ${getStatusStyle(row.paymentStatus)}`}>
                          {row.paymentStatus === "PENDING" && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>}
                          {row.paymentStatus === "PAID" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>}
                          {row.paymentStatus}
                        </span>
                      </div>
                      <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-100 px-3 py-3 truncate">{row.pickup}</div>
                      <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-100 px-3 py-3 truncate">{row.dropoff}</div>
                      <div className="flex-1 min-w-[110px] flex items-center border-r border-gray-100 px-3 py-3 truncate">
                        <div className="flex items-center gap-1.5">
                          <div className="w-[18px] h-[18px] rounded-full bg-gray-200 shrink-0"></div>
                          <span className="truncate">{row.employee}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-[100px] flex items-center border-r border-gray-100 px-3 py-3 truncate text-gray-500 text-[11px]">{row.date}</div>
                      <div className="flex-none w-[100px] flex items-center justify-end px-3 py-3 text-emerald-600 font-bold tracking-tight">-{row.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
