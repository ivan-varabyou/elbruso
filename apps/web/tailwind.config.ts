import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../../packages/shared/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: {
          blue: "#1A73E8",
          "blue-dark": "#0F4C81",
          "blue-light": "#4285F4",
          blue_hover: "#1664C4",
        },
        success: {
          green: "#34A853",
          "green-dark": "#0F9D58",
        },
        warning: {
          orange: "#FB8C00",
          yellow: "#FBBC05",
        },
        error: {
          red: "#EA4335",
          "red-dark": "#D32F2F",
        },
        neutral: {
          gray: "#9E9E9E",
        },
        gray: {
          50: "#F5F5F5",
          100: "#E0E0E0",
          300: "#C4C4C4",
          600: "#424242",
        },
        elbruso: {
          blue: "#1A73E8",
          "blue-hover": "#1664C4",
          "blue-pressed": "#0F4C81",
          dark: "#424242",
          coral: "#F26E5E", // Keep for accent if needed
          bg: "#FFFFFF",
          "bg-subtle": "#F5F5F5",
          border: "#E0E0E0",
          text: "#424242",
          "text-muted": "#9E9E9E",
        },
      },
      borderRadius: {
        "6": "6px",
        "8": "8px",
        "12": "12px",
        "16": "16px",
        "24": "24px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.06)",
        premium: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
