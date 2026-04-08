import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#3df1ff",
          blue: "#4f7cff",
          fuchsia: "#cf5cff",
        },
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.68" },
          "50%": { transform: "scale(1.12)", opacity: "0.92" },
        },
        drift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-80px)" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 8s ease-in-out infinite",
        drift: "drift 34s linear infinite",
      },
      boxShadow: {
        neon: "0 0 24px rgba(61, 241, 255, 0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
