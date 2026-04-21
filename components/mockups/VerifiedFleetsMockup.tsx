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
  Star,
  CheckCircle2,
  Eye,
  MessageSquare,
  Search,
  Grid,
  List
} from 'lucide-react';

const vehicles = [
  {
    id: 1,
    name: "Mitsubishi Outlander",
    year: "2016",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400&h=250",
    type: "SUV",
    quality: "Premium",
    seats: "7 Seater",
    specs: "7 seats · GR 3443-16 · 2.4L",
    rating: "No ratings yet",
    stars: 0,
    reviews: 0
  },
  {
    id: 2,
    name: "Mazda CX-5",
    year: "2021",
    image: "https://images.unsplash.com/photo-1659125298149-85619c53ab22?auto=format&fit=crop&q=80&w=400&h=250",
    type: "SUV",
    quality: "Standard",
    seats: "4 Seater",
    specs: "4 seats · DV 223 - 26",
    rating: "5.0",
    stars: 5,
    reviews: 1
  },
  {
    id: 3,
    name: "Mercedes-Benz S-Class",
    year: "2026",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400&h=250",
    type: "SEDAN",
    quality: "Standard",
    seats: "5 Seater",
    specs: "5 seats · GS-24567-26",
    rating: "5.0",
    stars: 5,
    reviews: 1
  }
];

export default function VerifiedFleetsMockup() {
  return (
    <div className="absolute right-0 bottom-0 top-6 left-6 md:top-10 md:left-10 bg-white rounded-tl-[24px] border-t border-l border-gray-100 flex flex-col font-body overflow-hidden text-[10px] sm:text-xs shadow-[-8px_-8px_30px_rgba(0,0,0,0.04)]">
      
      {/* Top Navbar */}
      <div className="h-14 bg-white/90 border-b border-gray-100 flex items-center px-6 shrink-0 justify-between relative z-10 w-full">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/Icon-dp/BH_icon_Main.png" 
            alt="Blackhorse Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="font-display font-medium tracking-wide text-[15px] text-gray-900 hidden sm:block">Blackhorse Corporate</span>
        </div>

        {/* Nav Links - Center */}
        <div className="hidden 2xl:flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50">
            <Home size={14} />
            <span>Home</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 rounded hover:bg-gray-50">
            <FileText size={14} />
            <span>Booking</span>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-1.5 text-cyan-600 bg-white border border-gray-100 shadow-sm rounded-lg font-medium">
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
          <div className="relative cursor-pointer">
            <Bell size={18} className="text-gray-400 font-light" />
          </div>
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="hidden sm:flex flex-col items-end">
              <span className="font-medium text-gray-900 text-[12px] leading-tight">New Co Ltd</span>
              <span className="text-gray-400 text-[9px] uppercase tracking-wider">SUPER_ADMIN</span>
            </div>
            <div className="w-8 h-8 bg-black rounded-full text-white flex items-center justify-center font-bold text-sm relative">
              <span className="font-display">S</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden p-4 sm:p-8 custom-scrollbar bg-white">
        <div className="min-w-[850px] relative h-full">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1 cursor-pointer">
                <CarFront size={22} className="text-cyan-600" />
                <h1 className="text-[26px] font-display font-medium text-gray-900 tracking-tight">Fleet</h1>
              </div>
              <p className="text-gray-500 text-[13px] font-body ml-8">8 vehicles available</p>
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search vehicles..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] w-[260px] focus:outline-none focus:ring-1 focus:ring-cyan-500 bg-white font-body shadow-sm" />
              </div>
              <div className="flex bg-white border border-gray-100 rounded-lg p-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <button className="p-2 bg-cyan-50 text-cyan-600 rounded-md">
                  <Grid size={15} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md transition-colors">
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-3 gap-6 pb-16">
            {vehicles.map((vehicle, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={vehicle.id} 
              className="bg-white rounded-[16px] overflow-hidden border border-gray-100 shadow-sm flex flex-col group hover:shadow-md transition-all duration-300 relative"
            >
              {/* Image Section */}
              <div className="relative h-44 overflow-hidden bg-gray-100 p-2">
                <img 
                  src={vehicle.image} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  alt={vehicle.name} 
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent rounded-xl m-2 pointer-events-none"></div>
                
                
              </div>

              {/* Details Section */}
              <div className="p-5 flex flex-col flex-1 bg-white">
                <div className="flex items-end gap-1.5 mb-1.5">
                  <h3 className="text-base font-semibold font-display text-gray-900 tracking-tight">{vehicle.name}</h3>
                  <span className="text-gray-400 text-[13px] font-medium font-display leading-[1.3]">{vehicle.year}</span>
                </div>
                <p className="text-gray-500 text-[11px] mb-3 flex items-center gap-1.5">
                  {vehicle.specs} <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block ml-1"></span>
                </p>

                <div className="flex items-center gap-1 mb-5">
                  {vehicle.stars > 0 ? (
                    <>
                      <Star size={13} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-800 text-[12px]">{vehicle.rating}</span>
                      <span className="text-gray-400 text-[12px]">({vehicle.reviews} rating)</span>
                    </>
                  ) : (
                    <>
                      <Star size={13} className="text-gray-300" />
                      <span className="text-gray-400 text-[12px]">{vehicle.rating}</span>
                    </>
                  )}
                </div>

                <div className="mt-auto pt-4">
                  <p className="text-[10px] text-gray-400 uppercase font-medium tracking-wider mb-2 font-display">Top Features</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-gray-600">
                      <CheckCircle2 size={12} className="text-cyan-600" />
                      <span className="text-[11px]">AC</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <CheckCircle2 size={12} className="text-cyan-600" />
                      <span className="text-[11px]">GPS Navigation</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <CheckCircle2 size={12} className="text-cyan-600" />
                      <span className="text-[11px]">Dashcam</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button className="flex-[0.4] py-2.5 border border-gray-200 text-gray-800 rounded-lg font-medium text-[13px] flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors bg-white font-display">
                    <Eye size={15} className="text-gray-500" />
                    View
                  </button>
                  <button className="flex-1 py-2.5 bg-cyan-600 text-white rounded-lg font-medium text-[13px] hover:bg-cyan-700 transition-colors shadow-sm font-display tracking-wide">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

          </div>

        </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

