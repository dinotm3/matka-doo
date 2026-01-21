import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "rgb(var(--brand-50) / <alpha-value>)",
          100: "rgb(var(--brand-100) / <alpha-value>)",
          200: "rgb(var(--brand-200) / <alpha-value>)",
          300: "rgb(var(--brand-300) / <alpha-value>)",
          600: "rgb(var(--brand-600) / <alpha-value>)",
        },
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(.34,1.56,.64,1)",
        nobounce: "cubic-bezier(.22,1,.36,1)",
      },
      transitionDuration: {
        smooth: "400ms",
        slow: "900ms",
      },
    },
  },
  plugins: [],
};

export default config;
