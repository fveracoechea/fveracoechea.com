import "@trivago/prettier-plugin-sort-imports";
import "prettier";
import "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
export default {
  trailingComma: "all",
  proseWrap: "always",
  semi: true,
  singleQuote: false,
  arrowParens: "avoid",
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^(react-(._)$)|^(react/(._)$)|^(react$)",
    "<THIRD_PARTY_MODULES>",
    "^_includes/(._)$",
    "^_components/(._)$",
    "^[../]",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindFunctions: ["clsx", "cva", "cx"],
};
