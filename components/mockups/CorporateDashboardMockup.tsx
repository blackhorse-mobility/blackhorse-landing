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
    <div className="w-full max-w-[1400px] h-[500px] md:h-[600px] rounded-t-[24px] md:rounded-t-[40px] border-[6px] md:border-[8px] border-gray-100 bg-[#F8F9FB] shadow-xl flex flex-col font-body overflow-hidden text-[10px] sm:text-xs">

      {/* Top Navbar */}
      <div className="h-14 bg-white/90 border-b border-gray-100 flex items-center px-6 shrink-0 justify-between backdrop-blur-md relative z-10 w-full">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/Icon-dp/BH_icon_Main.png" 
            alt="Blackhorse Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="font-display font-medium tracking-wide text-[15px] text-gray-900 hidden sm:block">Blackhorse Corporate</span>
        </div>

        {/* Nav Links - Center */}
        <div className="hidden 2xl:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-4 py-1.5 text-[#41C1FD] bg-white border border-gray-100 shadow-sm rounded-lg font-medium">
            <Home size={14} />
            <span>Home</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50">
            <FileText size={14} />
            <span>Booking</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50">
            <CarFront size={14} />
            <span>Fleet</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50">
            <Calendar size={14} />
            <span>Schedule</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50">
            <Map size={14} />
            <span>Tracking</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50">
            <CreditCard size={14} />
            <span>Payments</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell size={16} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center border border-white">9</span>
          </div>
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col items-end">
              <span className="font-medium text-gray-900 text-[11px] leading-tight">New Co Ltd</span>
              <span className="text-gray-400 text-[9px] uppercase tracking-wider">SUPER_ADMIN</span>
            </div>
            <div className="w-8 h-8 bg-black rounded-full text-white flex items-center justify-center font-bold text-sm relative">
              S
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-white">
        <div className="min-w-[850px] relative h-full flex flex-col gap-6">
          
          {/* Top Cards Row */}
          <div className="grid grid-cols-4 gap-4">
            {/* Greeting Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="col-span-1 rounded-xl overflow-hidden relative text-white p-5 flex flex-col justify-end min-h-[140px] shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #41C1FD 0%, #06b6d4 100%)'
              }}
            >
              <div className="absolute top-4 left-4">
                <User size={20} className="text-white/80" />
              </div>
              <div className="relative z-10 mt-auto">
                <p className="text-[11px] font-medium text-white/80 mb-0.5">Good afternoon,</p>
                <h2 className="text-base sm:text-lg font-display font-semibold tracking-wide">Auriga Corporate</h2>
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-[shimmer_3s_infinite]"></div>
            </motion.div>

            {/* Stat Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="col-span-1 bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-4">
                <Scan size={16} className="text-gray-800" />
                <span className="font-medium text-gray-900 text-xs text-[13px]">Ongoing Trips</span>
              </div>
              <p className="text-2xl font-light text-gray-900 font-display">2</p>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="col-span-1 bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-4">
                <Car size={16} className="text-gray-800" />
                <span className="font-medium text-gray-900 text-xs text-[13px]">Scheduled Trips</span>
              </div>
              <p className="text-2xl font-light text-gray-900 font-display">0</p>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="col-span-1 bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-4">
                <Wallet size={16} className="text-gray-800" />
                <span className="font-medium text-gray-900 text-xs text-[13px]">Wallet Balance</span>
              </div>
              <p className="text-xl font-light text-gray-900 font-display">GHS 33,640.01</p>
            </motion.div>
          </div>

          {/* Action Buttons Row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <button className="bg-[#41C1FD] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium text-xs hover:bg-cyan-600 transition-colors shadow-sm">
              <Plus size={14} />
              New Booking
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium text-xs hover:bg-gray-50 transition-colors">
              <Wallet size={14} className="text-gray-500" />
              Fund Wallet
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium text-xs hover:bg-gray-50 transition-colors">
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

          {/* Floating Feedback button */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <button className="bg-[#0F172A] text-white px-4 py-2.5 rounded-full font-medium text-[11px] flex items-center gap-2 shadow-xl hover:bg-black transition-colors hover:scale-105 active:scale-95 duration-200">
              <MessageSquare size={13} className="text-white/80" />
              Feedback
            </button>
          </div>

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
