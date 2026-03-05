import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 30px rgba(0,0,0,0.35)"
      }
    },
  },
  plugins: [],
} satisfies Config;
