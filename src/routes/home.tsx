import { Hono } from "hono";
import { Post } from "../components/Post.tsx";
import { Suspense } from "hono/streaming";
import { Blog } from "../components/Blog.tsx";

const home = new Hono();

home.get("/", (ctx) => {
  return ctx.render(
    <div class="flex flex-col gap-6 pt-2">
      <Suspense fallback="Loading...">
        <Post path="/home" />
      </Suspense>
      <Suspense fallback="Loading...">
        <Blog />
      </Suspense>
    </div>,
  );
});

export default home;
