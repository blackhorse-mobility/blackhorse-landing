"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  COUNTRY_CODES,
  getCountryByIso,
  getFlagUrl,
} from "@/lib/country-codes";

interface PhoneInputProps {
  id: string;
  countryIso: string;
  phone: string;
  onCountryIsoChange: (iso2: string) => void;
  onPhoneChange: (phone: string) => void;
  onFocus?: () => void;
  inputClassName: string;
  selectClassName?: string;
  placeholder?: string;
}

function CountryFlag({
  iso2,
  size = 20,
  className = "",
}: {
  iso2: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={getFlagUrl(iso2, size)}
      alt=""
      width={size}
      height={Math.round(size * 0.75)}
      className={`rounded-[2px] object-cover shrink-0 ${className}`}
      loading="lazy"
      aria-hidden="true"
    />
  );
}

export default function PhoneInput({
  id,
  countryIso,
  phone,
  onCountryIsoChange,
  onPhoneChange,
  onFocus,
  inputClassName,
  selectClassName = "",
  placeholder = "Phone number",
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedCountry = getCountryByIso(countryIso) ?? COUNTRY_CODES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-2">
      <div ref={containerRef} className="relative shrink-0 w-[132px] sm:w-[148px]">
        <button
          type="button"
          aria-label={`Country code, ${selectedCountry.name}`}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className={`w-full h-full px-3 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[13px] sm:text-[14px] bg-white cursor-pointer text-black flex items-center justify-between gap-2 ${selectClassName}`}
        >
          <span className="flex items-center gap-2 min-w-0">
            <CountryFlag iso2={selectedCountry.iso2} />
            <span className="truncate">{selectedCountry.dialCode}</span>
          </span>
          <ChevronsUpDown className="w-4 h-4 text-gray-400 shrink-0" />
        </button>

        {isOpen && (
          <ul className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-56 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] py-1 cyan-scrollbar min-w-[240px]">
            {COUNTRY_CODES.map((country) => (
              <li key={country.iso2}>
                <button
                  type="button"
                  onClick={() => {
                    onCountryIsoChange(country.iso2);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 text-left text-[13px] sm:text-[14px] flex items-center gap-2.5 hover:bg-gray-50 transition-colors ${
                    country.iso2 === countryIso
                      ? "bg-gray-50 font-medium"
                      : "text-gray-800"
                  }`}
                >
                  <CountryFlag iso2={country.iso2} />
                  <span className="shrink-0 text-gray-600 w-12">
                    {country.dialCode}
                  </span>
                  <span className="truncate">{country.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        id={id}
        type="text"
        inputMode="tel"
        autoComplete="tel-national"
        name="phone"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className={`flex-1 min-w-0 ${inputClassName}`}
      />
    </div>
  );
}
