import { Hono } from "https://deno.land/x/hono@v4.0.0-rc.2/mod.ts";
import { handle } from "https://deno.land/x/hono@v4.0.0-rc.2/adapter/netlify/mod.ts";

const app = new Hono();

app.get("/country", (c) =>
  c.json({
    message: "Hello Netlify!",
  }),
);

export default handle(app);

export const config = {
  path: "/",
};
