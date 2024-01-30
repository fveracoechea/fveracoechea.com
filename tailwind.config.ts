import tailwindcss from "npm:tailwindcss@3.3.5";
import typography from "npm:@tailwindcss/typography";

export const tailwind = tailwindcss({
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography],
});
