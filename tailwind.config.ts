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
        pastel: {
          blue: "#A7C7E7",
          green: "#B5EAD7",
          pink: "#FFDAC1",
          yellow: "#FFF5BA",
          purple: "#E0BBE4",
        },
      },
    },
  },
  plugins: [],
};


export default config;
