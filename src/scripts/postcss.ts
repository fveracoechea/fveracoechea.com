import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";
import autoprefixer from "npm:autoprefixer@10.4.16";
import cssnano from "npm:cssnano@6.0.1";
import { tailwind } from "../../tailwind.config.ts";

// deno-lint-ignore no-explicit-any
const plugins: any[] = [autoprefixer(), tailwind, cssnano()];

async function buildTailwind() {
  try {
    const css = await Deno.readTextFile("./styles.css");
    const result = await postcss(plugins).process(css, {
      from: "styles.css",
      to: "public/styles.css",
    });

    const data = new TextEncoder().encode(result.css);
    await Deno.writeFile("public/styles.css", data);
  } catch (error) {
    console.error(error);
  }
}

await buildTailwind();

const watcher = Deno.watchFs(".");

for await (const _ of watcher) {
  await buildTailwind();
}
