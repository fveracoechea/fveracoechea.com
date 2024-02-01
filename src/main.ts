import { Hono } from "hono";
import { serveStatic, secureHeaders } from "hono/middleware";

import home from "./routes/home.tsx";
import { jsxMiddleware } from "./middleware/jsxRenderer.tsx";
import blog from "./routes/blog.tsx";
import { esbuildMiddleware } from "./middleware/esbuild.ts";

const app = new Hono();

app.use("*", secureHeaders());
app.get("/public/client/*", esbuildMiddleware);
app.get("/public/*", serveStatic());
app.use("*", jsxMiddleware);
app.route("/", home);
app.route("/", blog);

Deno.serve(app.fetch);
