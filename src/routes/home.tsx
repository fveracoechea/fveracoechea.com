import { Hono } from "https://deno.land/x/hono@v3.12.8/mod.ts";

const home = new Hono();

home.get("/", (ctx) => {
  return ctx.render(
    <div class="py-4">
      <h1 class="text-indigo-500 text-4xl">Francisco Veracoechea</h1>
      <p>Software Enginier</p>
      <main>
        <article class="prose">{ctx.var.content}</article>
      </main>
    </div>,
  );
});

export default home;
