import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode with class
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          blue: "#3C86FF", // Logo blue
        },
        // Light Theme Colors
        light: {
          background: "#FFFFFF", // Pure white background
          surface: "#F9FAFB", // Very light gray for cards/surfaces
          border: "#EAECEF", // Light gray for borders
          text: {
            primary: "#141414", // Almost black for primary text
            secondary: "#545454", // Dark gray for secondary text
            muted: "#787878", // Medium gray for muted text
          },
        },
        // Dark Theme Colors
        dark: {
          background: "#111111", // Almost black background
          surface: "#212121", // Dark gray for cards/surfaces
          border: "#333333", // Medium dark gray for borders
          text: {
            primary: "#FFFFFF", // White for primary text
            secondary: "#CCCCCC", // Light gray for secondary text
            muted: "#999999", // Medium gray for muted text
          },
        },
      },
      spacing: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
      },
      transitionDuration: {
        "400": "400ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-slide-in": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out forwards",
        "fade-slide-in": "fade-slide-in 0.5s ease-in-out forwards",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
    },
  },
  plugins: [],
};

export default config;
