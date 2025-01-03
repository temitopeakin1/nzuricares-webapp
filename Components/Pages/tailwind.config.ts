import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        scrollDown: "scrollDown 1s infinite",
        animateCircle: "animateCircle 2s ease-out",
        underline: 'underline 2s ease-out forwards',
      },
      keyframes: {
        underline: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        scrollDown: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(5px)", opacity: "0" },
        },
        animateCircle: {
          "0%": { width: "0", height: "0", opacity: "1" },
          "50%": { width: "100%", height: "100%", opacity: "0.5" },
          "100%": { width: "0", height: "0", opacity: "0" },
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontFamily: {
        body: ["Montserrat", "sans-serif"],
        serif: ["Inter", "sans-serif"],
        title: ["Manrope", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        sans: ["Righteous", "sans-serif"],
      },

      colors: {
        primary: {
          DEFAULT: "#3A8766",
          dark: "#E6E6E6",
        },
        secondary: {
          DEFAULT: "#FFC700",
          dark: "#333333",
        },
        accent: {
          DEFAULT: "#FFC700",
          dark: "#E6B800",
        },
        "accent-dark": {
          DEFAULT: "#FFC700",
          dark: "#E6B800",
        },
        "accent-light": {
          DEFAULT: "#FFC700",
          dark: "#E6B800",
        },
        "accent-lighter": {
          DEFAULT: "#FFC700",
          dark: "#E6B800",
        },
        "accent-lightest": {
          DEFAULT: "#FFC700",
          dark: "#E6B800",
        },
        "footer-color": {
          DEFAULT: "#FAF9F6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
