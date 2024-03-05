import { Hono } from "hono";
import { Post } from "../components/Post.tsx";
import { Suspense } from "hono/streaming";
import { Blog } from "../components/Blog.tsx";

const home = new Hono();

home.get("/", (ctx) => {
  return ctx.render(
    <div class="">
      <Suspense fallback="Loading...">
        <Post path="/home" className="pb-8" />
      </Suspense>

      <Suspense fallback="Loading...">
        <Blog />
      </Suspense>
    </div>,
  );
});

export default home;
