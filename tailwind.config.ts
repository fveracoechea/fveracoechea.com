import tailwindcss from "npm:tailwindcss@3.3.5";
import typography from "npm:@tailwindcss/typography";

// https://www.color-hex.com/color/548ca8
// https://colorhunt.co/palette/334257476072548ca8eeeeee

const primary = "#4682A9";
const light = "#87AEC2";
const dark = "#334257";
const white = "#EEEEEE";

export const tailwind = tailwindcss({
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      inherit: "inherit",
      current: "currentColor",
      dark,
      white,
      primary,
      light,
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    extend: {},
  },
  plugins: [typography],
});
