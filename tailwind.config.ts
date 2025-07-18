import { type Config } from "tailwindcss";
import goldenRatioPlugin from "tailwindcss-golden-ratio";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "icon-square": "var(--w-icon)", // 'w-icon' utility class will use --w-icon
      },
      colors: {},
    },
    goldenRatio: {
      spacerUnit: "vh",
      spacerBase: 100,
    },
  },
  plugins: [goldenRatioPlugin],
} satisfies Config;
