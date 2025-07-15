import { type Config } from "tailwindcss";
import { DARK_MODE_COLORS } from "./colors.ts";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...DARK_MODE_COLORS,
      },
    },
  },
} satisfies Config;
