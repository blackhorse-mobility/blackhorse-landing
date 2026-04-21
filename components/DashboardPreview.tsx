"use client";

import React from "react";
import { motion } from "framer-motion";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export function DashboardPreview() {
  return (
    <div className={`w-full max-w-[1400px] h-[300px] sm:h-[380px] md:h-[500px] lg:h-[600px] rounded-t-[16px] sm:rounded-t-[24px] md:rounded-t-[40px] border-[4px] sm:border-[6px] md:border-[8px] border-gray-100 bg-white shadow-xl overflow-hidden flex ${manrope.className}`}>
      
      {/* Sidebar (Shadcn/Docs style) */}
      <div className="w-[240px] sm:w-[260px] md:w-[280px] shrink-0 border-r border-[#E5E7EB] bg-[#FAFAFA] flex flex-col hidden sm:flex">
        {/* Header */}
        <div className="h-[73px] border-b border-[#E5E7EB] px-6 flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0F222B] rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="white"/>
              </svg>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-black leading-tight tracking-wide">Blackhorse</h3>
              <p className="text-[12px] font-medium text-[#6B7280] leading-tight">Fleet Console</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex-1 py-6 px-4 flex flex-col gap-1 overflow-y-auto">
          <div className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 px-2">Platform</div>
          
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-[8px] bg-[#E0F2FE] text-[#0369A1] font-semibold text-[14px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Overview
          </div>
          
          <div className="flex items-center justify-between px-3 py-2.5 rounded-[8px] text-[#4B5563] font-medium text-[14px] hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Bookings
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
          
          <div className="flex items-center justify-between px-3 py-2.5 rounded-[8px] text-[#4B5563] font-medium text-[14px] hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
              Fleet
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
          
          <div className="flex items-center justify-between px-3 py-2.5 rounded-[8px] text-[#4B5563] font-medium text-[14px] hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              Finance
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>

          <div className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 px-2 mt-8">Settings</div>
          
          <div className="flex items-center justify-between px-3 py-2.5 rounded-[8px] text-[#4B5563] font-medium text-[14px] hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Settings
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E0F2FE] text-[#0EA5E9] font-bold text-[14px] flex items-center justify-center shrink-0">SS</div>
            <div className="flex-1 overflow-hidden">
              <div className="text-[13px] font-bold text-[#111827] truncate">Selasie Sepenu</div>
              <div className="text-[11px] text-[#6B7280] truncate">selasiesepenu@gmail...</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 15 12 11 16 15"></polyline></svg>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#F9FBFC] flex flex-col h-full overflow-hidden relative">
        {/* Top Navbar */}
        <div className="h-10 sm:h-14 md:h-[73px] bg-white border-b border-[#E5E7EB] px-3 sm:px-6 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-[12px] md:text-[14px] font-medium text-[#6B7280]">
            <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            <span>General</span>
            <svg width="12" height="12" className="sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <span className="text-[#111827]">Overview</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] relative">
              <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="absolute top-1 right-1.5 sm:top-1.5 sm:right-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-rose-500 rounded-full"></span>
            </div>
            <button className="hidden sm:block bg-[#41C1FD] hover:bg-[#25b6f9] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md font-semibold text-[11px] md:text-[13px] transition-colors shadow-sm border border-[#2fa8e7]">
              + Add New Vehicle
            </button>
          </div>
        </div>

        {/* Main Dashboard Scrollable */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 md:p-8">
          
          {/* Top Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8">
            <div className="bg-white rounded-lg sm:rounded-[12px] border border-[#E5E7EB] p-2 sm:p-4 flex items-center gap-2 sm:gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
               <div className="w-9 h-9 sm:w-[46px] sm:h-[46px] rounded-lg sm:rounded-[10px] bg-[#41C1FD] text-white flex items-center justify-center shrink-0">
                  <svg width="18" height="18" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
               </div>
               <div>
                  <div className="text-[10px] sm:text-[12px] font-medium text-[#6B7280]">Total Fleet</div>
                  <div className="text-base sm:text-[22px] font-semibold text-[#111827] leading-tight mt-0.5">3</div>
               </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-[12px] border border-[#E5E7EB] p-2 sm:p-4 flex items-center gap-2 sm:gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
               <div className="w-9 h-9 sm:w-[46px] sm:h-[46px] rounded-lg sm:rounded-[10px] bg-[#60A5FA] text-white flex items-center justify-center shrink-0">
                  <svg width="18" height="18" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
               </div>
               <div>
                  <div className="text-[10px] sm:text-[12px] font-medium text-[#6B7280]">Active Trips</div>
                  <div className="text-base sm:text-[22px] font-semibold text-[#111827] leading-tight mt-0.5">1</div>
               </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-[12px] border border-[#E5E7EB] p-2 sm:p-4 flex items-center gap-2 sm:gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
               <div className="w-9 h-9 sm:w-[46px] sm:h-[46px] rounded-lg sm:rounded-[10px] bg-[#94A3B8] text-white flex items-center justify-center shrink-0">
                  <svg width="18" height="18" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
               </div>
               <div>
                  <div className="text-[10px] sm:text-[12px] font-medium text-[#6B7280]">Idle Vehicles</div>
                  <div className="text-base sm:text-[22px] font-semibold text-[#111827] leading-tight mt-0.5">2</div>
               </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-[12px] border border-[#E5E7EB] p-2 sm:p-4 flex items-center gap-2 sm:gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
               <div className="w-9 h-9 sm:w-[46px] sm:h-[46px] rounded-lg sm:rounded-[10px] bg-[#38BDF8] text-white flex items-center justify-center shrink-0">
                  <svg width="18" height="18" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>
               </div>
               <div>
                  <div className="text-[12px] font-medium text-[#6B7280]">Wallet Balance</div>
                  <div className="text-[18px] font-semibold text-[#111827] leading-tight tracking-tight mt-0.5">GHS 57,879.49</div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Schedule Section */}
            <div className="lg:col-span-2 bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col h-[320px]">
              <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <h4 className="font-semibold text-black text-[16px]">Schedule</h4>
                </div>
                <div className="text-[13px] font-medium text-[#6B7280]">Mon, Apr 20</div>
              </div>
              
              {/* Calendar Timeline Placeholder */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-6">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  <div className="flex flex-col items-center"><span className="text-[11px] text-[#6B7280] font-semibold">SU</span><span className="text-[14px] text-black">19</span></div>
                  <div className="flex flex-col items-center bg-[#41C1FD] text-white px-3 py-1 rounded-[8px]"><span className="text-[11px] font-semibold">MO</span><span className="text-[14px]">20</span></div>
                  <div className="flex flex-col items-center"><span className="text-[11px] text-[#6B7280] font-semibold">TU</span><span className="text-[14px] text-black">21</span></div>
                  <div className="flex flex-col items-center"><span className="text-[11px] text-[#6B7280] font-semibold">WE</span><span className="text-[14px] text-black">22</span></div>
                  <div className="flex flex-col items-center"><span className="text-[11px] text-[#6B7280] font-semibold">TH</span><span className="text-[14px] text-black">23</span></div>
                  <div className="flex flex-col items-center"><span className="text-[11px] text-[#6B7280] font-semibold">FR</span><span className="text-[14px] text-black">24</span></div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
                
                <div className="flex p-1 bg-gray-50 rounded-lg border border-gray-100 mb-8">
                  <div className="flex-1 text-center py-1.5 text-[13px] font-semibold bg-white rounded shadow-sm text-black">Upcoming</div>
                  <div className="flex-1 text-center py-1.5 text-[13px] font-semibold text-[#6B7280]">Active</div>
                  <div className="flex-1 text-center py-1.5 text-[13px] font-semibold text-[#6B7280]">Past</div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-[#9CA3AF]">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <p className="text-[14px]">No upcoming bookings for this day.</p>
                </div>
              </div>
            </div>

            {/* Driver Status */}
            <div className="lg:col-span-1 bg-white rounded-[16px] border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col h-[320px]">
              <div className="px-5 py-5 border-b border-[#E5E7EB] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  <h4 className="font-semibold text-black text-[15px]">Driver Status</h4>
                </div>
                <div className="text-[12px] font-bold text-[#41C1FD] flex items-center gap-1 cursor-pointer">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                  See all
                </div>
              </div>
              
              <div className="px-5 py-3 flex gap-2">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-purple-200 bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> 2 assigned
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> 1 idle
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 pb-5">
                {/* Driver 1 */}
                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-3 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-purple-500"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 border border-gray-300"></div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[13px] font-bold text-black">Gideon Adzigblie</span>
                        <span className="text-[11px] text-[#6B7280]">sedan • GR 1234-17</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">Assigned</span>
                  </div>
                  <div className="pl-[38px]">
                    <div className="text-[11px] text-[#6B7280] truncate flex items-center gap-1 mb-2">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      YOTA Building, 95 La-Bawales...
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full flex items-center gap-1 mt-1">
                      <span className="w-1 h-3 rounded-full bg-purple-500 shrink-0"></span>
                      <div className="h-0.5 flex-1 bg-purple-200 relative"><div className="absolute left-0 top-0 bottom-0 bg-purple-500 w-[50%]"></div></div>
                      <span className="w-1 h-3 rounded-full bg-gray-200 shrink-0"></span>
                      <span className="text-[9px] text-[#9CA3AF] ml-1 font-semibold">Done</span>
                    </div>
                  </div>
                </div>

                {/* Driver 2 */}
                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-3 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-purple-500"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 border border-gray-300"></div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[13px] font-bold text-black">Dominic Sepenu</span>
                        <span className="text-[11px] text-[#6B7280]">suv • GR 3443-16</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">Assigned</span>
                  </div>
                  <div className="pl-[38px]">
                    <div className="text-[11px] text-[#6B7280] truncate flex items-center gap-1 mb-2">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      Kotoka International Airport
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full flex items-center gap-1 mt-1">
                      <span className="w-1 h-3 rounded-full bg-purple-500 shrink-0"></span>
                      <div className="h-0.5 flex-1 bg-purple-200 relative"><div className="absolute left-0 top-0 bottom-0 bg-purple-500 w-[20%]"></div></div>
                      <span className="w-1 h-3 rounded-full bg-gray-200 shrink-0"></span>
                      <span className="text-[9px] text-[#9CA3AF] ml-1 font-semibold">Done</span>
                    </div>
                  </div>
                </div>

                {/* Driver 3 */}
                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500"></div>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 border border-gray-300"></div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[13px] font-bold text-black">Andrews Martin</span>
                        <span className="text-[11px] text-[#6B7280]">No active booking</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Idle</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Floating gradient effect top/bottom on main content area */}
        <div className="absolute top-[73px] left-0 right-0 h-4 bg-gradient-to-b from-[#F9FBFC] to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F9FBFC] to-transparent pointer-events-none z-10"></div>
      </div>

    </div>
  );
}
