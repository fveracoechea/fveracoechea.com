import { Hono } from "hono";
import { contentMiddleware } from "../middleware/content.ts";

const home = new Hono();

home.get("/", contentMiddleware, (ctx) => {
  return ctx.render(
    <div class="py-4">
      <h1 class="text-indigo-500 text-4xl">Francisco Veracoechea</h1>
      <p>Software Enginier</p>
      <main>
        <article class="prose">{ctx.var.content}</article>
      </main>
    </div>
  );
});

export default home;
