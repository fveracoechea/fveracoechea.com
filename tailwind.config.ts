import catppuccin from "@catppuccin/tailwindcss";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

// import colors from "tailwindcss/colors";

// https://www.color-hex.com/color/548ca8
// https://colorhunt.co/palette/334257476072548ca8eeeeee

// const primary = "#4682A9";
// const light = "#87AEC2";
// const dark = "#334257";
// const white = "#EEEEEE";

export default {
  content: ["./_includes/layouts/*.{html,ts,tsx}"],
  safelist: ["cat-latte", "cat-mocha"],
  theme: {
    fontFamily: {
      sans: ["'Fira Sans'", "sans-serif"],
      mono: ["'Fira Code'", "monospace"],
    },
    // colors: {
    //   ...colors,
    // },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    extend: {
      backgroundImage: {
        "pattern-light": "url(/images/px-light.png)",
        "pattern-grey": "url(/images/px-grey.webp)",
      },
    },
  },
  plugins: [typography, catppuccin({ prefix: "cat" })],
} satisfies Config;
