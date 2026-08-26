import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Overall app theme: soft, warm beige (shared look with the ITM-kaiwa
        // sister app "KANJI").
        sand: {
          50: "#FBF8F1",
          100: "#F6F0E4",
          200: "#EDE2CB",
          300: "#E0CFA8",
          400: "#CBAE78",
          500: "#B08D57",
          600: "#8C6D3F",
          700: "#6B5230",
          800: "#4C3A22",
        },
        // Eco/recycling accent: green.
        leaf: {
          50: "#F1F8EA",
          100: "#E7F3DE",
          200: "#D0E8BE",
          300: "#B4D89A",
          400: "#95C476",
          500: "#6FA34E",
          600: "#54803A",
        },
      },
      fontFamily: {
        vietnamese: ['"Times New Roman"', "Times", "serif"],
      },
      boxShadow: {
        card: "0 8px 24px -8px rgba(107, 66, 38, 0.25)",
      },
      keyframes: {
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.15s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
