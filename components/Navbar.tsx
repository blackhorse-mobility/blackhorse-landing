"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "../types";

const navLinks: NavLink[] = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Business", href: "#business" },
  { label: "Transport Partners", href: "#transport-partners" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const typeformUrl = "https://divinettettey.typeform.com/to/VIH88iPh"; // Should be env var in production

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-4 border-b border-gray-100" : "bg-transparent py-8"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="relative z-50 group">
          <span className="text-xl font-display font-bold tracking-tight text-gray-900 group-hover:text-cyan-500 transition-colors duration-300">
            BLACKHORSE
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(link.href);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-[11px] font-semibold uppercase tracking-widest-xl text-gray-500 hover:text-black transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="hidden md:block text-[11px] font-semibold uppercase tracking-widest-xl text-gray-900 hover:text-cyan-500 transition-colors"
          >
            Sign In
          </a>
          <button
            className="hidden md:block btn-cyan-300 px-7 py-3 text-[11px] font-bold uppercase tracking-widest rounded-sm"
            onClick={() => window.open(typeformUrl, "_blank")}
          >
            Book Ride
          </button>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-900 relative z-50 hover:text-cyan-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-obsidian z-40 flex flex-col items-center justify-center transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-2xl font-display text-white hover:text-cyan-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                const target = document.querySelector(link.href);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="w-12 h-px bg-white/10 mx-auto my-4"></div>
          <button className="text-sm font-semibold uppercase tracking-widest text-white">
            Sign In
          </button>
          <button className="btn-cyan-300 px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-sm mt-4">
            Book a Ride
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
