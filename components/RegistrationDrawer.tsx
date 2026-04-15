import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Manrope } from "next/font/google";
import Image from "next/image";
import { ChevronsUpDown } from "lucide-react";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
});

export type DrawerMode = "fleet" | "corporate";

interface RegistrationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: DrawerMode;
}

export default function RegistrationDrawer({
  isOpen,
  onClose,
  initialMode,
}: RegistrationDrawerProps) {
  const [internalMode, setInternalMode] = useState<DrawerMode>(initialMode);


  useEffect(() => {
    if (isOpen) {
      setInternalMode(initialMode);
    }
  }, [isOpen, initialMode]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isCorporate = internalMode === "corporate";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center font-display">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />


          <style dangerouslySetInnerHTML={{
            __html: `
            .cyan-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .cyan-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .cyan-scrollbar::-webkit-scrollbar-thumb {
              background: #5DCBFE;
              border-radius: 10px;
            }
          `}} />


          <motion.div
            initial={{ y: "100%", opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 1 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="relative w-full h-max max-h-[90vh] lg:max-h-[90vh] bg-white rounded-t-[20px] overflow-hidden flex flex-col sm:flex-row shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-10"
          >

            <div className="hidden sm:block relative w-[40%] xl:w-[35%] bg-[#0A1020] overflow-hidden">
              <Image
                src={isCorporate ? "/assets/bg-3.jpg" : "/assets/bg-3.jpg"}
                fill
                alt={isCorporate ? "Corporate registration" : "Partner registration"}
                className="object-cover opacity-80 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors duration-300" />


              <div className="absolute top-8 left-8 xl:top-12 xl:left-12 flex items-center text-white">
                <Image 
                  src="/assets/Primary/BH_Horizontal_White.png" 
                  alt="Blackhorse Logo" 
                  width={150} 
                  height={32} 
                  className="h-8 w-auto object-contain drop-shadow-md" 
                />
              </div>
            </div>


            <div className="flex-1 w-full flex flex-col items-center p-6 sm:p-10 md:p-12 overflow-y-auto cyan-scrollbar">
              <div className="w-full max-w-2xl relative">


                <div className="flex justify-end sm:hidden mb-2">
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-gray-100 text-gray-500"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>


                <div className="flex items-center rounded-[24px] bg-gray-50 border border-gray-100 p-1 mb-10 w-fit self-start shadow-sm">
                  <button
                    onClick={() => setInternalMode("fleet")}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[20px] text-[11px] sm:text-[13px] font-medium transition-all ${!isCorporate
                      ? "bg-[#0A1020] text-white shadow-md"
                      : "text-gray-500 hover:text-black"
                      }`}
                  >
                    Fleet Owners & Rental Companies
                  </button>
                  <button
                    onClick={() => setInternalMode("corporate")}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[20px] text-[11px] sm:text-[13px] font-medium transition-all ${isCorporate
                      ? "bg-[#0A1020] text-white shadow-md"
                      : "text-gray-500 hover:text-black"
                      }`}
                  >
                    Corporate Businesses
                  </button>
                </div>

                <h2 className="text-[32px] sm:text-[40px] font-medium tracking-tight text-black mb-3">
                  {isCorporate ? "Register as a corporate client" : "Register as a fleet partner"}
                </h2>
                <p className={`text-[#878787] text-[16px] mb-10 leading-relaxed ${manrope.className}`}>
                  Enter the details below to register as a {isCorporate ? "corporate client" : "fleet partner"}
                </p>


                <form className="flex flex-col gap-6 w-full" onSubmit={(e) => e.preventDefault()}>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}>First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] placeholder-gray-400 ${manrope.className}`}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}>Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] placeholder-gray-400 ${manrope.className}`}
                      />
                    </div>
                  </div>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}>Work E-mail</label>
                      <input
                        type="email"
                        placeholder="johndoe@acme.inc"
                        className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] placeholder-gray-400 ${manrope.className}`}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="02498761234"
                        className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] placeholder-gray-400 ${manrope.className}`}
                      />
                    </div>
                  </div>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}>
                        {isCorporate ? "Company Name" : "Rental Company Name"}
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Inc."
                        className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] placeholder-gray-400 ${manrope.className}`}
                      />
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}>
                        {isCorporate ? "Industry" : "Rental Location"}
                      </label>
                      {isCorporate ? (
                        <div className="relative">
                          <select
                            defaultValue=""
                            className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] appearance-none bg-white cursor-pointer ${manrope.className} text-gray-800`}
                          >
                            <option value="" disabled className="text-gray-400">Select one industry</option>
                            <option value="tech">Technology</option>
                            <option value="finance">Finance</option>
                            <option value="health">Healthcare</option>
                            <option value="logistics">Logistics</option>
                            <option value="hospitality">Hospitality</option>
                            <option value="other">Other</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ChevronsUpDown className="w-[18px] h-[18px]" />
                          </div>
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder="City, region, etc."
                          className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] placeholder-gray-400 ${manrope.className}`}
                        />
                      )}
                    </div>
                  </div>


                  <div className="mt-6 mb-8">
                    <button
                      type="submit"
                      className="w-[200px] bg-[#0A1020] text-white py-[18px] rounded-xl font-medium text-[16px] transition-transform active:scale-[0.98] hover:bg-black shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                    >
                      {isCorporate ? "Create account" : "Register"}
                    </button>
                  </div>
                </form>

              </div>
            </div>


            <button
              onClick={onClose}
              className="hidden sm:flex absolute top-6 right-6 p-2 rounded-full bg-gray-50 border border-gray-100 hover:bg-gray-100 text-gray-600 transition-colors z-20 shadow-sm"
              aria-label="Close form"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
