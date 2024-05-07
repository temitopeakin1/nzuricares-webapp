import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontFamily: {
        body: ['Montserrat', 'sans-serif'],
        sans: ['Lato', 'sans-serif'],
        serif: ["Inter", "sans-serif"],
        satoshi: ['Satoshi', 'sans-serif'],
        title: ['Manrope', 'sans-serif'],
        tagline: ["Briem Hand", 'cursive']
      },

      colors: {
        primary: {
          DEFAULT: '#3A8766',
          dark: "#E6E6E6",
        },
        secondary: {
          DEFAULT: '#FFC700',
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
          DEFAULT: "#FAF9F6"
        },
      },
    },
  },
  plugins: [],
};
export default config;
