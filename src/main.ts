import { Hono } from "https://deno.land/x/hono@v3.12.8/mod.ts";

import {
  serveStatic,
  secureHeaders,
} from "https://deno.land/x/hono@v3.12.8/middleware.ts";
import home from "./routes/home.tsx";

import { jsxMiddleware } from "./middleware/jsxRenderer.tsx";
import blog from "./routes/blog.tsx";

const app = new Hono();

app.use("*", secureHeaders());
app.get("/public/*", serveStatic());
app.use("*", jsxMiddleware);
app.route("/", home);
app.route("/", blog);

Deno.serve(app.fetch);
