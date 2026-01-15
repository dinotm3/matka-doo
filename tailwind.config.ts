import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // in case
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // in case
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // in case
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "rgb(var(--brand-50) / <alpha-value>)",
          600: "rgb(var(--brand-600) / <alpha-value>)",
          700: "rgb(var(--brand-700) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
