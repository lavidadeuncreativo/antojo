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
        sans: ["var(--font-sans)", "Helvetica", "Arial", "sans-serif"],
        editorial: ["var(--font-sans)", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        cream: "var(--color-canvas)",
        wine: {
          DEFAULT: "var(--color-accent)",
          dark: "var(--color-accent)",
          hover: "var(--color-accent)",
          soft: "var(--color-accent)",
          bg: "var(--color-surface)",
        },
        border: "var(--color-border)",
        surface: "var(--color-surface)",
        text: {
          DEFAULT: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
        "card-lg": "0 10px 40px rgba(0,0,0,0.08)",
        "premium": "0 0 0 1px rgba(0,0,0,0.03), 0 2px 12px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
        "focus": "0 0 0 2px var(--color-canvas), 0 0 0 4px var(--color-accent)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "skeleton": "skeleton 1.5s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        skeleton: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
