import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import config from "../../tailwind.config.ts";
import tailwindcss from "tailwindcss";

// deno-lint-ignore no-explicit-any
const plugins: any[] = [autoprefixer(), tailwindcss(config), cssnano()];

async function buildTailwind() {
  try {
    const css = await Deno.readTextFile("./input.css");
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
