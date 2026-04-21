'use client';

import React from 'react';
import { Home, FileText, CarFront, Calendar, Map, CreditCard, Bell, ChevronDown, Search, Phone, X, Plus, Minus, MessageCircle } from 'lucide-react';

export default function LiveTrackingMockup() {
  return (
    <div className="absolute inset-0 bg-[#FAFAFA] flex flex-col font-body overflow-hidden text-xs">
      {/* Top Navbar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shrink-0 justify-between relative z-30 w-full shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/assets/Icon-dp/BH_icon_Main.png" alt="Blackhorse" className="w-8 h-8 object-contain" />
          <span className="font-display font-medium tracking-wide text-[16px] text-gray-900 hidden sm:block">Blackhorse Corporate</span>
        </div>

        <div className="flex items-center gap-5">
          <Bell size={20} className="text-gray-400 font-light cursor-pointer hover:text-gray-600" />
          <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="hidden sm:flex flex-col items-end">
              <span className="font-medium text-gray-900 text-[13px] leading-tight">New Co Ltd</span>
              <span className="text-gray-400 text-[10px] uppercase tracking-wider">SUPER_ADMIN</span>
            </div>
            <div className="w-9 h-9 bg-black rounded-full text-white flex items-center justify-center font-bold text-sm">
              <span className="font-display">S</span>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Full Page Map Container */}
      <div className="flex-1 relative bg-[#EFE9E1] overflow-hidden w-full">
         
         {/* Simple SVG Map Background (Cleaned up) */}
         <div className="absolute inset-0 z-0">
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                {/* Simplified map to match the clean aesthetic */}
                <path d="M0,0 L1200,0 L1200,800 L0,800 Z" fill="#DDE6E8"/>
                <path d="M-100,200 L500,0 L1200,300 L1200,800 L300,800 Z" fill="#E8E5DD"/>
                
                {/* Roads */}
                <g stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M-50,300 L400,200 L800,600 L1300,400" />
                  <path d="M400,200 L500,-50" />
                  <path d="M800,600 L750,900" />
                  <path d="M100,800 L300,500 L800,600" />
                </g>

                {/* Major Roads */}
                <g stroke="#FCE062" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M-50,300 L400,200 L800,600 L1300,400" />
                </g>
                <g stroke="#FDF0A6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M-50,300 L400,200 L800,600 L1300,400" />
                </g>

                {/* Active Route */}
                <path d="M 400,200 L 800,600" fill="none" stroke="#41C1FD" strokeWidth="8" strokeLinecap="round" />
                
                {/* Marker */}
                <g transform="translate(700, 510)">
                  <path d="M0 0 L-15 -30 A 20 20 0 1 1 15 -30 Z" fill="#EA4335" filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.2))" />
                  <circle cx="0" cy="-35" r="8" fill="#581A14" />
                </g>
             </svg>
         </div>

         {/* Left Side Overlays (Search + Trip Card) */}
         <div className="absolute top-4 left-4 right-4 sm:right-auto sm:top-6 sm:left-6 md:top-8 md:left-8 z-20 flex flex-col gap-4 sm:w-[380px] max-h-[calc(100%-80px)] sm:max-h-none overflow-y-auto no-scrollbar pointer-events-none">
            
            {/* Search and Toggle Bar */}
            <div className="flex flex-col bg-white p-2.5 sm:p-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 gap-2 sm:gap-3 pointer-events-auto shrink-0">
               <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                  <input type="text" placeholder="Search track ID or location..." className="w-full bg-gray-50/80 border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0A0B3B] placeholder:text-gray-400 font-medium" />
               </div>
               <div className="flex gap-2">
                 <button className="flex-1 text-center py-2.5 bg-[#0A0B3B] text-white rounded-xl text-[13px] font-semibold cursor-pointer shadow-sm hover:bg-[#121350] transition-colors">
                   Live Map
                 </button>
                 <button className="flex-1 text-center py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl text-[13px] font-semibold cursor-pointer transition-colors border border-gray-100">
                   Fleet List (33)
                 </button>
               </div>
            </div>

            {/* Trip Details Card */}
            <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col pointer-events-auto shrink-0">
              {/* Header */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
                <h2 className="text-[20px] sm:text-[22px] font-display font-medium text-gray-900 tracking-tight">BK260417OKK</h2>
              </div>

              {/* Driver Info */}
              <div className="p-4 sm:p-6 flex items-center justify-between bg-white">
                <div className="flex gap-3 sm:gap-4 items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 shadow-sm border border-gray-100">
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150" alt="Driver" className="w-full h-full object-cover"/>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-[14px] sm:text-[15px]">Dominic Sepenu</p>
                      <p className="text-gray-500 text-[11px] sm:text-[13px] flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.2)]"></span>
                          Prado • GR 3443-16
                      </p>
                    </div>
                </div>
                <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 text-emerald-600 flex flex-col items-center justify-center hover:bg-emerald-100 transition-colors shadow-sm shrink-0">
                    <Phone size={16} className="sm:w-[18px] sm:h-[18px]" fill="currentColor" />
                </button>
              </div>

              {/* Timeline */}
              <div className="px-4 sm:px-6 py-5 sm:py-7 bg-white border-t border-gray-100">
                <div className="flex gap-5">
                    <div className="flex flex-col items-center mt-1.5">
                      <div className="w-4 h-4 rounded-full bg-[#41C1FD] shadow-[0_0_0_4px_rgba(65,193,253,0.15)] flex shrink-0"></div>
                      <div className="w-px h-12 bg-gray-200 my-1"></div>
                      <div className="w-4 h-4 rounded-full border-[2.5px] border-[#41C1FD] bg-white flex shrink-0"></div>
                    </div>
                    <div className="flex flex-col justify-between py-0.5 w-full">
                      <div>
                          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Pickup • 14:32</p>
                          <p className="text-[15px] text-gray-900 font-medium leading-tight">Kotoka International Airport</p>
                      </div>
                      <div className="mt-5">
                          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Dropoff • Est 15:45</p>
                          <p className="text-[15px] text-gray-900 font-medium leading-tight">Boundary Rd, East Legon</p>
                      </div>
                    </div>
                </div>
              </div>
              
              {/* ETA / Action */}
              <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center sm:flex-row gap-3">
                <div>
                    <p className="text-gray-500 text-[11px] sm:text-[12px] font-medium mb-0.5">Estimated Arrival</p>
                    <p className="text-[#41C1FD] font-display font-medium text-2xl sm:text-3xl leading-none tracking-tight">14 <span className="text-[13px] sm:text-[15px] font-normal tracking-normal text-[#41C1FD]">mins</span></p>
                </div>
                <button className="bg-[#0A0B3B] shrink-0 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[13px] sm:text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-[#121350] transition-colors shadow-md">
                    <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px]"/>
                    Message
                </button>
              </div>
            </div>
         </div>

         {/* Bottom Right Controls */}
         <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col overflow-hidden">
               <button className="p-3.5 border-b border-gray-100 hover:bg-gray-50 text-gray-600 transition-colors bg-white"><Plus size={22}/></button>
               <button className="p-3.5 hover:bg-gray-50 text-gray-600 transition-colors bg-white"><Minus size={22}/></button>
            </div>
         </div>

      </div>
    </div>
  );
}
