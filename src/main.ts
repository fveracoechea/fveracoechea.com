import { Hono } from "hono";
import { secureHeaders, serveStatic } from "hono/middleware";

import home from "./routes/home.tsx";
import blog from "./routes/blog.tsx";
import { esbuildMiddleware } from "./middleware/esbuild.ts";

const app = new Hono();

app.use("*", secureHeaders());
app.get("/public/client/*", esbuildMiddleware);
app.get("/public/*", serveStatic());
app.route("/", home);
app.route("/blog", blog);

Deno.serve(app.fetch);
