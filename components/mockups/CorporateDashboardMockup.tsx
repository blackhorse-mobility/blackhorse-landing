import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  CarFront, 
  Calendar, 
  Map, 
  CreditCard,
  Bell,
  ChevronDown,
  User,
  MessageSquare,
  Plus,
  Wallet,
  Scan,
  Car,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function CorporateDashboardMockup() {
  return (
    <div className="w-full max-w-[1400px] h-[300px] sm:h-[380px] md:h-[500px] lg:h-[600px] rounded-t-[16px] sm:rounded-t-[24px] md:rounded-t-[40px] border-[4px] sm:border-[6px] md:border-[8px] border-gray-100 bg-[#F8F9FB] shadow-xl flex flex-col font-body overflow-hidden text-[9px] sm:text-[10px] md:text-xs">

      {/* Top Navbar */}
      <div className="h-10 sm:h-14 bg-white/90 border-b border-gray-100 flex items-center px-3 sm:px-6 shrink-0 justify-between backdrop-blur-md relative z-10 w-full">
        <div className="flex items-center gap-2 sm:gap-3">
          <img 
            src="/assets/Icon-dp/BH_icon_Main.png" 
            alt="Blackhorse Logo" 
            className="w-6 sm:w-8 h-6 sm:h-8 object-contain"
          />
          <span className="font-display font-medium tracking-wide text-xs sm:text-[15px] text-gray-900 hidden sm:block">Blackhorse Corporate</span>
        </div>

        {/* Right Section - Minimal on mobile */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative">
            <Bell size={14} className="sm:w-4 sm:h-4 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-red-500 rounded-full text-[6px] sm:text-[8px] text-white flex items-center justify-center border border-white">9</span>
          </div>
          <div className="w-6 h-px bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:flex flex-col items-end">
              <span className="font-medium text-gray-900 text-[9px] sm:text-[11px] leading-tight">New Co Ltd</span>
              <span className="text-gray-400 text-[7px] sm:text-[9px] uppercase tracking-wider">SUPER_ADMIN</span>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full text-white flex items-center justify-center font-bold text-xs sm:text-sm relative">
              S
              <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-2 sm:p-4 md:p-6 custom-scrollbar bg-white">
        <div className="w-full relative h-full flex flex-col gap-3 sm:gap-6">
          
          {/* Top Cards Row - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {/* Greeting Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="col-span-1 rounded-lg sm:rounded-xl overflow-hidden relative text-white p-3 sm:p-5 flex flex-col justify-end min-h-[100px] sm:min-h-[140px] shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #41C1FD 0%, #06b6d4 100%)'
              }}
            >
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                <User size={16} className="sm:w-5 sm:h-5 text-white/80" />
              </div>
              <div className="relative z-10 mt-auto">
                <p className="text-[9px] sm:text-[11px] font-medium text-white/80 mb-0.5">Good afternoon,</p>
                <h2 className="text-xs sm:text-base font-display font-semibold tracking-wide">Auriga Corporate</h2>
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-[shimmer_3s_infinite]"></div>
            </motion.div>

            {/* Stat Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="col-span-1 bg-white border border-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-3">
                <Scan size={14} className="sm:w-4 sm:h-4 text-gray-800" />
                <span className="font-medium text-gray-900 text-[11px] sm:text-[13px]">Ongoing Trips</span>
              </div>
              <p className="text-lg sm:text-2xl font-light text-gray-900 font-display">2</p>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="col-span-1 bg-white border border-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-3">
                <Car size={14} className="sm:w-4 sm:h-4 text-gray-800" />
                <span className="font-medium text-gray-900 text-[11px] sm:text-[13px]">Scheduled Trips</span>
              </div>
              <p className="text-lg sm:text-2xl font-light text-gray-900 font-display">0</p>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="col-span-1 bg-white border border-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-3">
                <Wallet size={14} className="sm:w-4 sm:h-4 text-gray-800" />
                <span className="font-medium text-gray-900 text-[11px] sm:text-[13px]">Wallet Balance</span>
              </div>
              <p className="text-sm sm:text-xl font-light text-gray-900 font-display">GHS 33,640</p>
            </motion.div>
          </div>

          {/* Action Buttons Row - Hide on mobile */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hidden sm:flex items-center gap-2 md:gap-3"
          >
            <button className="bg-[#41C1FD] text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg flex items-center gap-2 font-medium text-xs hover:bg-cyan-600 transition-colors shadow-sm">
              <Plus size={14} />
              New Booking
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-3 md:px-4 py-2 md:py-2.5 rounded-lg flex items-center gap-2 font-medium text-xs hover:bg-gray-50 transition-colors">
              <Wallet size={14} className="text-gray-500" />
              Fund Wallet
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-3 md:px-4 py-2 md:py-2.5 rounded-lg flex items-center gap-2 font-medium text-xs hover:bg-gray-50 transition-colors">
              <FileText size={14} className="text-gray-500" />
              View Invoices
            </button>
          </motion.div>

          {/* Schedule Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col flex-1"
          >
            <h3 className="text-[15px] font-display text-gray-900 mb-4">Schedule</h3>
            
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1 min-h-[300px]">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <span className="text-lg font-display text-gray-900">Apr 5 - Apr 11, 2026</span>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50">Today</button>
                  <div className="flex bg-white border border-gray-200 rounded-md">
                    <button className="p-1.5 text-gray-500 hover:bg-gray-50 border-r border-gray-200">
                      <ChevronLeft size={14} />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:bg-gray-50">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="flex-1 flex flex-col">
                {/* Days Header */}
                <div className="flex border-b border-gray-100 bg-[#fafafa]">
                  <div className="w-16 shrink-0 border-r border-gray-100"></div>
                  <div className="flex-1 grid grid-cols-7 divide-x divide-gray-100/50">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <div key={day} className="py-3 flex flex-col items-center justify-center gap-1">
                        <span className="text-[11px] text-gray-500 font-medium">{day}</span>
                        <span className="text-xs text-gray-900 font-display">{5 + i}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Rows */}
                <div className="flex-1 relative overflow-y-auto custom-scrollbar">
                  {[6, 7, 8].map((hour) => (
                    <div key={hour} className="flex min-h-[70px] border-b border-gray-100">
                      <div className="w-16 shrink-0 border-r border-gray-100 flex items-start justify-end py-2 pr-3">
                        <span className="text-[9px] text-gray-400 font-medium">{hour} AM</span>
                      </div>
                      <div className="flex-1 grid grid-cols-7 divide-x divide-gray-100/50 relative">
                        <div className="col-span-1"></div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1"></div>
                        
                        {/* Friday Column with Event */}
                        <div className="col-span-1 relative">
                          {hour === 8 && (
                            <div className="absolute top-[15px] left-1 right-1 bg-red-50 border-l-2 border-red-400 rounded-sm p-1.5 z-10 shadow-sm cursor-pointer hover:shadow transition-shadow">
                              <p className="text-[9px] font-semibold text-red-900 leading-tight mb-0.5">8:15 AM</p>
                              <p className="text-[8px] text-red-700 uppercase tracking-widest mb-0.5">SUV</p>
                              <p className="text-[9px] font-medium text-red-800 leading-tight">BK260409XCO1JN</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="col-span-1"></div>
                        <div className="col-span-1"></div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Current Time Indicator (mocked) */}
                  <div className="absolute top-[85px] left-16 right-0 border-t border-red-400/50 z-0"></div>
                  <div className="absolute top-[82px] left-[59px] w-1.5 h-1.5 rounded-full bg-red-400 z-0"></div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      {/* Scrollbar hide styles & animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </div>
    </div>
  );
}
