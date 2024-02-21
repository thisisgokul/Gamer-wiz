import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{ 
        "primary":"#fff",
        "secondary":"#5d5bd4",
        "coral-blue": "#0067b8",
        "darkBlack":"#080808",
        "metalicblack": "#2C2C2B",
        "yellowGreen":"#7dd100",
        "yellowGlight":"#adff2f",
        "coral-gray":"#616161",'slate-gray': '#708090',
        
      },
    },
  },
  plugins: [],
};
export default config;
