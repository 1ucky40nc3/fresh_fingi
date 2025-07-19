import { type Config } from "tailwindcss";
import goldenRatioPlugin from "tailwindcss-golden-ratio";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      spacing: {},
      colors: {},
      fontFamily: {
        "interactive": ["Bitcount Grid Single"],
        "heading": ["Special Gothic Expanded OneStatic"],
        "text": ["Inconsolata"],
      },
    },
    goldenRatio: {
      spacerUnit: "vh",
      spacerBase: 90, // Account for some padding
    },
  },
  plugins: [goldenRatioPlugin],
} satisfies Config;
