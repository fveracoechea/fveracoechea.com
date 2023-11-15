import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";
import autoprefixer from "npm:autoprefixer@10.4.16";
import cssnano from "npm:cssnano@6.0.1";
import { tailwind } from "../tailwind.config.ts";

const css = await Deno.readTextFile("./styles.css");

// deno-lint-ignore no-explicit-any
const plugins: any[] = [autoprefixer(), tailwind, cssnano()];

const result = await postcss(plugins).process(css, {
  from: "styles.css",
  to: "public/css/styles.css",
});

const data = new TextEncoder().encode(result.css);

await Deno.writeFile("public/css/styles.css", data);
