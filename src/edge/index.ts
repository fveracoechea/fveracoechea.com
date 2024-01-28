import { Hono } from "https://deno.land/x/hono@v3.12.8/mod.ts";

import {
  serveStatic,
  secureHeaders,
} from "https://deno.land/x/hono@v3.12.8/middleware.ts";
import home from "../routes/home.tsx";

import { jsxMiddleware } from "../middleware/jsxRenderer.tsx";
import { handle } from "https://deno.land/x/hono@v3.12.8/adapter/netlify/handler.ts";

const app = new Hono();

app.use("*", secureHeaders());
app.get("/public/*", serveStatic());
app.use("*", jsxMiddleware);
app.route("/", home);

export default handle(app);
