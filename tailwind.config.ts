import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        "surface-bg": "var(--surface-bg)",
        "surface-elevated": "var(--surface-elevated)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        border: "var(--border-color)",
        brand: {
          50: "#f2f6f4", 100: "#e0ece8", 200: "#b3d3cb", 300: "#80b5a9",
          400: "#4d9687", 500: "#0F5257", 600: "#0C4246", 700: "#093235",
          800: "#062125", 900: "#031114", 950: "#01090a",
        },
        gold: {
          50: "#fcf8f0", 100: "#f7edda", 200: "#eed9b0", 300: "#e4c486",
          400: "#ddb45e", 500: "#D4AF37", 600: "#b8942e", 700: "#9a7a25",
          800: "#7c601c", 900: "#5e4613",
        },
        espresso: {
          50: "#f5f3f1", 100: "#e8e2dd", 200: "#c7bbb0", 300: "#a69483",
          400: "#856d56", 500: "#3A2A22", 600: "#2E221B", 700: "#231A15",
          800: "#17110E", 900: "#0C0907",
        },
        emerald: {
          50: "#f2f8f8", 100: "#dff0f0", 200: "#bfe0e0", 300: "#9fd1d1",
          400: "#7fc1c1", 500: "#0F5257", 600: "#0C4246", 700: "#093235",
          800: "#062125", 900: "#031114",
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #0F5257 0%, #D4AF37 100%)",
        "gradient-brand-hover": "linear-gradient(135deg, #0C4246 0%, #C19B2E 100%)",
        "gradient-brand-subtle": "linear-gradient(135deg, rgba(15,82,87,0.08) 0%, rgba(212,175,55,0.08) 100%)",
        "gradient-dark": "linear-gradient(180deg, #3A2A22 0%, #1A120E 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(58, 42, 34, 0.06)",
        "glass-lg": "0 16px 48px rgba(58, 42, 34, 0.10)",
        glow: "0 0 20px rgba(212, 175, 55, 0.25)",
        "glow-gold": "0 0 20px rgba(212, 175, 55, 0.25)",
        "glow-lg": "0 0 40px rgba(212, 175, 55, 0.15)",
        premium: "0 4px 24px rgba(58, 42, 34, 0.06)",
        "premium-lg": "0 8px 40px rgba(58, 42, 34, 0.10)",
      },
      borderRadius: { "2xl": "1rem", "3xl": "1.5rem", "4xl": "2rem" },
    },
  },
  plugins: [],
};

export default config;