import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#1b1d21", // Dark navy/charcoal as per requirement
        champagne: "#d4af37", // Gold/cyan-300 accent
      },
      fontFamily: {
        display: ["var(--font-aeonik-pro)"],
        body: ["var(--font-manrope)"],
      }
    },
  },
  plugins: [],
};
export default config;
