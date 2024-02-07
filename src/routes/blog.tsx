import { Hono } from "hono";
import { Suspense } from "hono/streaming";
import { Post } from "../components/Post.tsx";

const blog = new Hono();

blog.get("/blog", (ctx) => {
  return ctx.render(
    <div class="py-4">
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Post path="/blog" />
        </Suspense>
      </main>
    </div>,
  );
});

export default blog;
