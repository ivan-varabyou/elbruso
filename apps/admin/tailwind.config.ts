import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/shared/src/**/*.{js,ts,jsx,tsx,mdx}",
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
        elbruso: {
          blue: "#1A73E8",
          "blue-hover": "#1664C4",
          "blue-pressed": "#0F4C81",
          coral: "#F26E5E",
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
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
