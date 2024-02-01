import { Hono } from "hono";
import { contentMiddleware } from "../middleware/content.ts";

const home = new Hono();

home.get("/", (ctx) => {
  return ctx.render(
    <div class="py-4">
      <h1 class="text-primary text-4xl">Francisco Veracoechea</h1>
      <p>Software Enginier</p>
      <main>Content</main>
    </div>,
  );
});

export default home;
