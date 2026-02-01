import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          pink: '#FF6B9D',
          purple: '#C44569',
        },
        secondary: {
          blue: '#5F27CD',
          mint: '#00D2D3',
        },
      },
    },
  },
  plugins: [],
};
export default config;
