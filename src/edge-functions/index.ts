import { Hono } from "https://deno.land/x/hono@v4.0.0-rc.2/mod.ts";

import {
  handle,
  Env,
} from "https://deno.land/x/hono@v3.12.6/adapter/netlify/mod.ts";

const app = new Hono<Env>();

app.get("/", (c) =>
  c.json({
    message: "Hello Netlify!",
  }),
);

app.get("/test", (c) =>
  c.json({
    message: "TEST Netlify!",
  }),
);

export default handle(app);
