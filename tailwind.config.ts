import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-instrument)", "system-ui", "sans-serif"],
        editorial: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      colors: {
        cream: "#F7F4F0",
        wine: {
          DEFAULT: "#701F2D",
          dark: "#4B121C",
          hover: "#591722",
          soft: "#A7606B",
          bg: "#F2E5E8",
        },
        border: "#E8E2DC",
        surface: "#F1EEE9",
        text: {
          DEFAULT: "#191715",
          secondary: "#706B67",
          muted: "#9B9691",
        },
        success: "#47785A",
        warning: "#B27C32",
        error: "#A84242",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(25,23,21,0.06), 0 1px 2px rgba(25,23,21,0.04)",
        "card-hover":
          "0 4px 16px rgba(25,23,21,0.08), 0 1px 4px rgba(25,23,21,0.06)",
        "card-lg": "0 8px 32px rgba(25,23,21,0.10)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.4s ease forwards",
        "skeleton": "skeleton 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        skeleton: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
