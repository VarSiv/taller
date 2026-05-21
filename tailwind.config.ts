import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f6f7f5",
          100: "#e8eae5",
          200: "#cfd3ca",
          300: "#a9b1a1",
          400: "#7c8773",
          500: "#5b6753",
          600: "#475141",
          700: "#3a4135",
          800: "#30362d",
          900: "#1e221c",
          950: "#0e110d",
        },
        brand: {
          50: "#effaf3",
          100: "#d8f3e0",
          200: "#b3e6c4",
          300: "#7fd29f",
          400: "#48b676",
          500: "#249957",
          600: "#177a45",
          700: "#136139",
          800: "#114d2f",
          900: "#0e3f28",
          950: "#062315",
        },
        zap: {
          DEFAULT: "#d4ff3a",
          50: "#fbffe6",
          100: "#f5ffba",
          200: "#edff84",
          300: "#e3ff43",
          400: "#d4ff3a",
          500: "#b3e000",
          600: "#8aae00",
          700: "#688400",
          800: "#536800",
          900: "#465600",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        display: ["var(--font-instrument)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
        "3xl": "28px",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(14,17,13,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,17,13,0.04) 1px, transparent 1px)",
        "dot-pattern":
          "radial-gradient(rgba(14,17,13,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
        dots: "18px 18px",
      },
    },
  },
  plugins: [],
} satisfies Config;
