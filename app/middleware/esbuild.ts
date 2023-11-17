import { Context, Next, HTTPException } from "hono";
import { getFilePath } from "https://deno.land/x/hono@v3.10.1/utils/filepath.ts";

import * as esbuild from "https://deno.land/x/esbuild@v0.19.5/wasm.js";
import { env } from "../shared/env.ts";

await esbuild.initialize({
  wasmURL: "https://deno.land/x/esbuild@v0.19.5/esbuild.wasm",
  worker: false,
});

const AppCacheName = "fveracoechea";

const headers = new Headers({
  "Content-Type": "text/javascript; charset=utf-8",
  "Cache-Control": "max-age=604800", // 7 days
});

export async function esbuildMiddleware(ctx: Context, next: Next) {
  // Do nothing if Response is already set
  if (ctx.finalized) return await next();

  const url = new URL(ctx.req.url);
  const isTS = url.pathname.endsWith(".ts");
  const isTSX = url.pathname.endsWith(".tsx");

  if (!isTS && !isTSX) return await next();

  try {
    const cacheKey = ctx.req.url;
    const cache = await caches.open(AppCacheName);
    const cachedResponse = await cache.match(cacheKey);

    if (cachedResponse && env.ENV !== "dev") {
      return new Response(cachedResponse.body, cachedResponse);
    }

    const filePath = getFilePath({
      filename: decodeURI(url.pathname),
      root: "",
      defaultDocument: "index.ts",
    });

    if (!filePath) return await next();

    const script = await Deno.readTextFile(`./${filePath}`);

    const { code } = await esbuild.transform(script, {
      loader: "tsx",
      jsxImportSource: "../../client/jsx",
      minify: env.ENV !== "dev",
      tsconfigRaw: {
        compilerOptions: {},
      },
    });

    const response = ctx.body(code, { headers });
    await cache.put(cacheKey, response.clone());
    return response;
  } catch (error) {
    const message = "Error transpiling " + url.pathname;
    console.warn(message, error);
    throw new HTTPException(500, { message });
  }
}
