import * as esbuild from "https://deno.land/x/esbuild@v0.19.4/mod.js";

async function build() {
  try {
    await esbuild.build({
      entryPoints: ["client/main.ts"],
      bundle: true,
      minify: true,
      outfile: "public/main.js",
      jsx: "transform",
      jsxImportSource: "client/jsx",
      tsconfig: "client/tsconfig.json",
    });
  } catch (error) {
    console.log(error);
  }
}

await build();

const watcher = Deno.watchFs("./client");

for await (const _ of watcher) {
  await build();
}
