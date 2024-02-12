import { Hono } from "hono";
import { Suspense } from "hono/streaming";
import { Post } from "../components/Post.tsx";

const blog = new Hono();

blog.get("/blog/:post", (ctx) => {
  const url = new URL(ctx.req.url);
  return ctx.render(
    <div class="py-4">
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Post path={url.pathname} />
        </Suspense>
      </main>
    </div>,
  );
});

export default blog;
