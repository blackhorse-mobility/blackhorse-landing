"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  ChevronRight,
  ChevronLeft,
  Shield,
  FileText,
  LayoutList,
} from "lucide-react";

export type LegalPageId = "privacy" | "terms";

interface LegalLayoutProps {
  children: React.ReactNode;
  activeId: LegalPageId;
}

const PAGES = [
  {
    id: "privacy" as LegalPageId,
    title: "Privacy Policy",
    href: "/privacy",
    icon: Shield,
    description: "How we collect, use, and protect your data.",
  },
  {
    id: "terms" as LegalPageId,
    title: "Terms of Service",
    href: "/terms",
    icon: FileText,
    description: "Rules governing your use of our platform.",
  },
];

export default function LegalLayout({ children, activeId }: LegalLayoutProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentIndex = PAGES.findIndex((p) => p.id === activeId);
  const activePage = PAGES[currentIndex];
  const prevPage = currentIndex > 0 ? PAGES[currentIndex - 1] : null;
  const nextPage =
    currentIndex < PAGES.length - 1 ? PAGES[currentIndex + 1] : null;

  return (
    <div className="relative w-full bg-white text-black font-display selection:bg-cyan-200">
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? "md:px-4 md:pt-4 md:sm:pt-6" : "px-0 pt-0"}`}
      >
        <div
          className={`w-full flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "md:max-w-5xl bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b md:border border-gray-200 md:rounded-full py-4 sm:py-4 md:py-2.5 px-4 sm:px-6 md:px-6 mx-auto"
              : "bg-white py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-transparent"
          }`}
        >
          <Link href="/">
            <Image
              src="/assets/Primary/BH_Horizontal_DarkBlue.png"
              alt="Blackhorse Logo"
              width={180}
              height={80}
              className="h-7 sm:h-10 md:h-12 w-auto object-contain relative z-50 cursor-pointer"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-gray-600 hover:text-black transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              href="/#transport-partners"
              className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-gray-600 hover:text-black transition-colors whitespace-nowrap"
            >
              Transport Partners
            </Link>
            <Link
              href="/#business"
              className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-gray-600 hover:text-black transition-colors whitespace-nowrap"
            >
              Corporate Companies
            </Link>
            <Link
              href="/#faq"
              className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-gray-600 hover:text-black transition-colors whitespace-nowrap"
            >
              FAQs
            </Link>
          </div>

          <Link
            href="mailto:nanaama@black-horse.io"
            className={`text-[12px] sm:text-[13px] md:text-[14px] font-medium text-black transition-colors whitespace-nowrap relative z-50 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border ${
              scrolled
                ? "border-gray-200 hover:bg-gray-50 no-underline"
                : "border-transparent underline hover:text-gray-700 hover:bg-black/5"
            }`}
          >
            Talk to Support
          </Link>
        </div>
      </div>

      <main className="w-full min-h-screen relative z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-white text-black pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 relative">
          {/* Notion-Style Sidebar Documentation Menu */}
          <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-32 md:h-[calc(100vh-140px)] overflow-y-auto hidden md:block">
            <div className="mb-6 flex items-center gap-2 text-gray-400">
              <LayoutList size={18} />
              <span className="text-sm font-semibold tracking-widest uppercase">
                Documentation
              </span>
            </div>
            <nav className="flex flex-col gap-2">
              {PAGES.map((page) => {
                const isActive = page.id === activeId;
                const Icon = page.icon;
                return (
                  <Link
                    key={page.id}
                    href={page.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                      isActive
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={isActive ? "text-black" : "text-gray-400"}
                    />
                    {page.title}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <div className="md:hidden block w-full border-b border-gray-100 pb-6 mb-2">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-4">
              Documentation Pages
            </span>
            <div className="flex flex-wrap gap-2">
              {PAGES.map((page) => {
                const isActive = page.id === activeId;
                const Icon = page.icon;
                return (
                  <Link
                    key={page.id}
                    href={page.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      size={14}
                      className={isActive ? "text-white" : "text-gray-400"}
                    />
                    {page.title}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex-1 max-w-3xl w-full">
            <div className="mb-10 text-sm font-medium text-gray-400 flex items-center gap-2">
              <span>Legal</span>
              <ChevronRight size={14} />
              <span className="text-black">{activePage.title}</span>
            </div>

            <div className="min-h-[50vh]">{children}</div>

            <div className="mt-20 pt-10 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPage ? (
                <Link
                  href={prevPage.href}
                  className="group flex flex-col gap-2 p-5 rounded-xl border border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm transition-all text-left w-full"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-1 group-hover:text-black transition-colors">
                    <ChevronLeft size={14} /> Previous
                  </span>
                  <span className="text-lg font-medium text-black group-hover:underline decoration-2 underline-offset-4 decoration-gray-200">
                    {prevPage.title}
                  </span>
                  <span className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {prevPage.description}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPage ? (
                <Link
                  href={nextPage.href}
                  className="group flex flex-col gap-2 p-5 rounded-xl border border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm transition-all text-right w-full sm:col-start-2"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-1 justify-end group-hover:text-black transition-colors">
                    Next <ChevronRight size={14} />
                  </span>
                  <span className="text-lg font-medium text-black group-hover:underline decoration-2 underline-offset-4 decoration-gray-200">
                    {nextPage.title}
                  </span>
                  <span className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {nextPage.description}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
