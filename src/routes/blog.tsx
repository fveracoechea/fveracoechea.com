import { Hono } from "https://deno.land/x/hono@v3.12.8/mod.ts";
import { loadContent } from "../shared/loadContent.ts";
import { html, raw } from "hono/middleware";
import { Suspense } from "https://deno.land/x/hono@v3.12.8/jsx/streaming.ts";

const blog = new Hono();

async function Post(props: { path: string }) {
  const data = await loadContent(props.path);
  // await new Promise((r) => setTimeout(r, 1000)); // sleep 1s

  return (
    <article
      class="prose"
      dangerouslySetInnerHTML={{ __html: String(data.content) }}
    />
  );
}

blog.get("/blog", (ctx) => {
  return ctx.render(
    <div class="py-4">
      <h1 class="text-indigo-500 text-4xl">Blog</h1>
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Post path="/blog" />
        </Suspense>
      </main>
    </div>,
  );
});

export default blog;
