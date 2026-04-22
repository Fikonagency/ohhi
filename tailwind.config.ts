import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F8F5EE",
        offwhite: "#FDFBF6",
        charcoal: "#2A2E26",
        sand: "#E3DAC6",
        stone: "#8C7B6B",
        brand: "#6B7A5B",
        "brand-deep": "#4A5A3E",
        "brand-dark": "#364028",
        espresso: "#4A5A3E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
