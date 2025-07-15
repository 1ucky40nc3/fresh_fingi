import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Accent Colors
        "drk-primary-a0": "rgb(228, 235, 133)",
        "drk-primary-a10": "rgb(232, 237, 147)",
        "drk-primary-a20": "rgb(235, 239, 161)",
        "drk-primary-a30": "rgb(238, 242, 174)",
        "drk-primary-a40": "rgb(242, 244, 188)",
        "drk-primary-a50": "rgb(245, 246, 201)",

        // Surface Colors
        "drk-surface-a0": "#121212",
        "drk-surface-a10": "#282828",
        "drk-surface-a20": "#3f3f3f",
        "drk-surface-a30": "#575757",
        "drk-surface-a40": "#717171",
        "drk-surface-a50": "#8b8b8b",
      },
    },
  },
} satisfies Config;
