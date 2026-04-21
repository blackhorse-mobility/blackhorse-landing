"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;

    const timeoutId = setTimeout(() => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    }, 100);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFooterHeight(entry.borderBoxSize[0]?.blockSize ?? entry.contentRect.height);
      }
    });

    resizeObserver.observe(footerRef.current);
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>

      <div
        style={{ height: footerHeight ? `${footerHeight}px` : "500px" }}
        className="w-full pointer-events-none"
      />


      <footer
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0 z-[0] bg-[#0A1020] w-full text-white pt-24 pb-12 px-8 md:px-16 lg:px-24 border-t border-white/5"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col justify-between h-full font-display">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 mb-24">

            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/assets/icon-dp/BH_icon_White.png"
                  alt="Blackhorse Logo"
                  width={34}
                  height={34}
                  className="w-[34px] h-[34px] object-contain"
                />
                <span className="text-3xl font-medium tracking-tight">Blackhorse</span>
              </div>
              <p className="text-[#a1a1aa] font-medium text-[15px] leading-relaxed max-w-sm">
                Blackhorse. A platform that aggregates corporate fleet demand and supply all in
                one place, making it easy for teams to move around in real time and
                at less cost.
              </p>
            </div>


            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-x-8">


              <div className="flex flex-col gap-5">
                <span className="text-[11px] font-bold text-[#666666] tracking-[0.2em] uppercase">
                  Fleet Partners
                </span>
                <Link href="/#transport-partners" className="text-[15px] font-medium text-white/90 hover:text-white transition-colors group flex items-center">
                  <span>Transport Partners</span>
                </Link>
                <Link href="/#how-it-works" className="text-[15px] font-medium text-white/90 hover:text-white transition-colors">
                  How It Works
                </Link>
              </div>


              <div className="flex flex-col gap-5">
                <span className="text-[11px] font-bold text-[#666666] tracking-[0.2em] uppercase">
                  Corporate Companies
                </span>
                <Link href="/#business" className="text-[15px] font-medium text-white/90 hover:text-white transition-colors">
                  Business
                </Link>
                <Link href="/#how-it-works" className="text-[15px] font-medium text-white/90 hover:text-white transition-colors">
                  How It Works
                </Link>
              </div>


              <div className="flex flex-col gap-5">
                <span className="text-[11px] font-bold text-[#666666] tracking-[0.2em] uppercase">
                  Follow
                </span>
                <Link href="#" className="text-[15px] font-medium text-white/90 hover:text-white transition-colors flex items-center gap-2">
                  X
                </Link>
                <Link href="https://www.instagram.com/blackhorsemobility?igsh=Y3NoNzg5ZHhyMTZh" className="text-[15px] font-medium text-white/90 hover:text-white transition-colors flex items-center gap-2">
                  Instagram
                </Link>
                <Link href="#" className="text-[15px] font-medium text-white/90 hover:text-white transition-colors flex items-center gap-2">
                  LinkedIn
                </Link>
              </div>

            </div>
          </div>


          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <span className="text-xs font-medium text-[#777777]">
              © {new Date().getFullYear()} Blackhorse. All rights reserved.
            </span>
            <div className="flex flex-wrap gap-6 md:gap-8 text-xs font-medium text-[#777777]">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                Powered by Blackhorse Engineering
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
