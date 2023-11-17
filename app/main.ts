import { Hono } from "hono";
import { serveStatic, secureHeaders } from "hono/middleware";

import home from "./routes/home.tsx";
import { env } from "./shared/env.ts";

import { jsxMiddleware } from "./middleware/jsxRenderer.tsx";

const app = new Hono()
  .use("*", secureHeaders())
  .get("/public/*", serveStatic())
  .use("*", jsxMiddleware)
  .route("/", home);

Deno.serve({ port: env.PORT }, app.fetch);
