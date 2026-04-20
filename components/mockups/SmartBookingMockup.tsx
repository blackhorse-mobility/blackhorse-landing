"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, FileText, CarFront, Calendar, Map, CreditCard, Bell, ChevronDown, MessageSquare, 
  MapPin, Clock, Calendar as CalendarIcon, Check, Search, Star, User, UserCircle2, Wallet,
  ChevronRight, Grid, List
} from 'lucide-react';

const vehicles = [
  {
    id: 1, name: "Mitsubishi Outlander", year: "2016",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400&h=250",
    type: "SUV", quality: "Premium", seats: "7 Seater",
    price: "GHS 685.63", est: "EST. 3H TOTAL"
  },
  {
    id: 2, name: "Mazda CX-5", year: "2021",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400&h=250",
    type: "SUV", quality: "Standard", seats: "4 Seater",
    price: "GHS 685.63", est: "EST. 3H TOTAL"
  },
  {
    id: 3, name: "Mercedes-Benz S-Class", year: "2026",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400&h=250",
    type: "SEDAN", quality: "Standard", seats: "5 Seater",
    price: "GHS 685.63", est: "EST. 3H TOTAL"
  }
];

export default function SmartBookingMockup() {
  const [step, setStep] = useState(1);

  // Auto-switch steps every 4 seconds (1 to 2 to 3 to 1)
  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => s === 3 ? 1 : s + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute right-0 bottom-0 top-6 left-6 md:top-10 md:left-10 bg-white rounded-tl-[24px] border-t border-l border-gray-100 flex flex-col font-body overflow-hidden text-[10px] sm:text-xs shadow-[-8px_-8px_30px_rgba(0,0,0,0.04)]">
      
      {/* Top Navbar */}
      <div className="h-14 bg-white border-b border-gray-100 flex items-center px-6 shrink-0 justify-between relative z-10 w-full">
        <div className="flex items-center gap-3">
          <img src="/assets/Icon-dp/BH_icon_Main.png" alt="Blackhorse" className="w-8 h-8 object-contain" />
          <span className="font-display font-medium tracking-wide text-[15px] text-gray-900 hidden sm:block">Blackhorse Corporate</span>
        </div>

        {/* Nav Links */}
        <div className="hidden 2xl:flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50"><Home size={14} /><span>Home</span></div>
          <div className="flex items-center gap-1.5 px-4 py-1.5 text-cyan-600 bg-white border border-gray-100 shadow-sm rounded-lg font-medium"><FileText size={14} /><span>Booking</span></div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50"><CarFront size={14} /><span>Fleet</span></div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50"><Calendar size={14} /><span>Schedule</span></div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50"><Map size={14} /><span>Tracking</span></div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50"><CreditCard size={14} /><span>Payments</span></div>
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
              <span className="font-display">S</span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex flex-col flex-1 overflow-hidden bg-white">
        <div className="h-16 border-b border-gray-100 flex items-center justify-center bg-white z-10 shrink-0">
          <div className="flex items-center gap-4 w-full max-w-lg px-8">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium ${step === 2 ? 'bg-[#0F172A] text-white' : 'bg-[#0F172A] text-white'}`}>
                {step === 2 ? <Check size={12} /> : "1"}
              </div>
              <span className={`text-[13px] font-medium ${step === 2 ? 'text-gray-900' : 'text-gray-900'}`}>Schedule</span>
            </div>

            <div className="flex-1 h-px bg-gray-200"></div>

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium ${step === 2 ? 'bg-[#0F172A] text-white' : 'bg-gray-100 text-gray-500'}`}>
                2
              </div>
              <span className={`text-[13px] ${step === 2 ? 'text-gray-900 font-medium' : 'text-gray-500 font-medium'}`}>Vehicle</span>
            </div>
            
            <div className="flex-1 h-px bg-gray-200"></div>

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium ${step === 3 ? 'bg-[#0F172A] text-white' : 'bg-gray-100 text-gray-500'}`}>
                3
              </div>
              <span className={`text-[13px] ${step === 3 ? 'text-gray-900 font-medium' : 'text-gray-500 font-medium'}`}>Confirm</span>
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-hidden p-6 md:p-10 relative">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full min-w-[850px] flex flex-col gap-6 relative"
              >
                {/* Fixed Layout for Step 1 */}
                <div className="flex flex-row gap-6 w-full">
                  <div className="flex-[3]">
                    {/* Schedule Card */}
                    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm h-[200px]">
                      <h3 className="text-[15px] font-semibold text-gray-900 mb-5">Schedule</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-1.5 block">Pick-up Date</label>
                          <div className="border border-gray-200 flex justify-between items-center px-3 py-2.5 rounded-lg text-gray-500">
                            dd/mm/yyyy <CalendarIcon size={14} className="text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-1.5 block">Pick-up Time</label>
                          <div className="border border-gray-200 flex justify-between items-center px-3 py-2.5 rounded-lg text-gray-500">
                            -- : -- <Clock size={14} className="text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-1.5 block">Duration</label>
                          <div className="flex">
                            <div className="border border-gray-200 px-3 py-2.5 rounded-l-lg text-gray-400 border-r-0 flex-1 truncate">Enter durat..</div>
                            <div className="border border-gray-200 px-3 py-2.5 rounded-r-lg text-gray-600 flex items-center gap-2 bg-gray-50/50">Days <ChevronDown size={14}/></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-[2]">
                    {/* Locations Card */}
                    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm overflow-hidden h-[200px] relative">
                      <h3 className="text-[15px] font-semibold text-gray-900 mb-5 relative z-10">Locations</h3>
                      <div className="flex flex-col gap-4 relative z-10">
                        <div>
                          <label className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-1.5 block">Pick-up Location</label>
                          <div className="border border-gray-200 flex items-center px-3 py-2.5 rounded-lg text-gray-400 bg-white">
                            <Search size={14} className="mr-2 text-gray-400"/> Search location...
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-1.5 block">Drop-off Location</label>
                          <div className="border border-gray-200 flex items-center px-3 py-2.5 rounded-lg text-gray-400 bg-white">
                            <MapPin size={14} className="mr-2 text-gray-400"/> Same as pick-up
                          </div>
                        </div>
                      </div>
                      {/* Faux Map Background */}
                      <div className="absolute inset-x-0 bottom-0 top-[120px] bg-gray-100 z-0">
                        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800&h=300" alt="Map" className="w-full h-full object-cover opacity-20 sepia contrast-0" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Added Next Thing under Schedule */}
                <div className="flex flex-row gap-6 w-full">
                  <div className="flex-[3]"> 
                    {/* Passenger & Preferences Card */}
                    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                      <h3 className="text-[15px] font-semibold text-gray-900 mb-5">Ride Preferences</h3>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-1.5 block">Service Type</label>
                            <div className="border border-gray-200 flex justify-between items-center px-3 py-2.5 rounded-lg text-gray-700 bg-gray-50/50">
                              Chauffeur Driven <ChevronDown size={14} className="text-gray-400" />
                            </div>
                         </div>
                         <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-1.5 block">Passengers</label>
                            <div className="border border-gray-200 flex justify-between items-center px-3 py-2.5 rounded-lg text-gray-400">
                              How many passengers? <UserCircle2 size={14} className="text-gray-400" />
                            </div>
                         </div>
                      </div>
                      <div className="mt-4">
                         <label className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-1.5 block">Special Requests</label>
                         <div className="border border-gray-200 flex items-center px-3 py-2.5 rounded-lg text-gray-400 bg-white">
                           <MessageSquare size={14} className="mr-2 text-gray-400"/> Any specific needs...
                         </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-[2] flex flex-col justify-end pb-2">
                    <button className="w-full bg-[#0F172A] text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 shadow-sm hover:bg-gray-800 transition-colors">
                      Continue to Vehicles <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>

            ) : step === 2 ? (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full min-w-[850px] flex flex-col gap-6 relative"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Select a Vehicle</h2>
                    <p className="text-gray-500 mt-1">8 premium vehicles found for your criteria</p>
                  </div>
                  <div className="flex border border-gray-200 rounded-lg p-0.5">
                    <button className="p-1.5 bg-cyan-50 text-cyan-600 rounded-md"><Grid size={15}/></button>
                    <button className="p-1.5 text-gray-400"><List size={15}/></button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">
                  {['Vehicle Type', 'Brand', 'Model', 'Color'].map(filter => (
                    <div key={filter} className="border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-6 justify-between text-gray-600 font-medium">
                      {filter} <ChevronDown size={14} className="text-gray-400"/>
                    </div>
                  ))}
                </div>
                
                <div className="text-gray-500 font-medium flex items-center gap-1 my-1">
                  <ChevronDown size={14}/> Vehicle Features
                </div>

                {/* Vehicle Grid Step 2 */}
                <div className="grid grid-cols-3 gap-6 pb-20">
                  {vehicles.map((v, i) => (
                    <motion.div initial={{ y: 10, opacity: 0}} animate={{ y:0, opacity: 1}} transition={{ delay: i*0.1}} key={v.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                      <div className="relative h-[160px]">
                        <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                        
                        
                      </div>
                      <div className="p-4 bg-white relative">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-900 text-[14px]">{v.name} <span className="text-gray-400 font-normal">{v.year}</span></h3>
                          <div className="text-right">
                            <span className="text-cyan-600 font-bold text-[16px] leading-none block mb-1">{v.price}</span>
                            <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wide">{v.est}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-[11px] mb-3">{v.seats} · {v.type}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            ) : (
             <motion.div
                key="step-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full min-w-[850px] flex flex-col gap-6 pb-20 relative"
              >
                <h2 className="text-xl font-semibold font-display text-gray-900">Review & Confirm</h2>

                {/* Vehicle Summary */}
                <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm flex items-center justify-between">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-5">
                      <img 
                        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400&h=250" 
                        alt="Mazda CX-5" 
                        className="w-28 h-18 object-cover rounded-xl border border-gray-100 shadow-sm"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-[16px] mb-1">Mazda CX-5 <span className="text-gray-400 font-normal">2021</span></h3>
                        <p className="text-gray-500 text-[12px]">SUV · Standard · 4 seats · DV 223 - 26</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-cyan-600 font-bold font-display text-[18px] leading-none block mb-0.5">GHS 685.63</span>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide block mb-3">EST. 3H TOTAL</span>
                      <button className="text-cyan-600 font-medium text-[12px] hover:underline">Change</button>
                    </div>
                  </div>
                </div>

                {/* Trip Details Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col h-full">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="font-semibold text-gray-900 text-[14px]">Trip Details</h3>
                      <button className="text-cyan-600 font-medium text-[12px] hover:underline">Edit</button>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <CalendarIcon size={16} className="text-gray-400"/>
                        <span className="text-gray-700 text-[13px]">Apr 30, 2026 at 15:22</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-gray-400"/>
                        <span className="text-gray-700 text-[13px]">3 Hours</span>
                      </div>
                      <div className="flex items-start gap-3 mt-1">
                        <MapPin size={16} className="text-gray-400 mt-0.5"/>
                        <span className="text-gray-700 text-[13px] leading-relaxed">New Rd, Madina, Ghana → YOTA Building, 95 La-Bawaleshi Rd, Accra, Ghana</span>  
                      </div>
                    </div>
                  </div>

                  {/* Pricing Overview */}
                  <div className="border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between bg-gray-50/50 relative overflow-hidden h-full">
                    <div className="relative z-10 w-full">
                      <h3 className="font-semibold text-gray-900 text-[14px] mb-4">Fare Summary</h3>
                      <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between text-[12px]">
                          <span className="text-gray-500">Base Fare (3 hrs)</span>
                          <span className="text-gray-900 font-medium">GHS 600.00</span>
                        </div>
                        <div className="flex justify-between text-[12px]">
                          <span className="text-gray-500">Taxes & Fees</span>
                          <span className="text-gray-900 font-medium">GHS 85.63</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 mt-4 relative z-10 w-full">
                      <div className="flex justify-between items-end">
                        <span className="text-gray-900 font-semibold text-[14px]">Total Estimated</span>
                        <div className="text-right">
                          <span className="text-cyan-600 font-bold font-display text-[20px] leading-none block mb-1">GHS 685.63</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
