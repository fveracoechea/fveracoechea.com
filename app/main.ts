import { Hono } from "hono";
import { serveStatic, secureHeaders } from "hono/middleware";

import home from "./routes/home.tsx";
import { env } from "./shared/env.ts";

import "../scripts/postcss.ts";

import { jsxMiddleware } from "./middleware/jsxRenderer.tsx";

const app = new Hono()
  .use("*", secureHeaders())
  .use("/public/*", serveStatic({ root: "./" }))
  .use("*", jsxMiddleware)
  .route("/", home);

Deno.serve({ port: env.PORT }, app.fetch);
