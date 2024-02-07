import { Hono } from "hono";
import { Post } from "../components/Post.tsx";
import { Suspense } from "hono/streaming";

const home = new Hono();

home.get("/", (ctx) => {
  return ctx.render(
    <div class="flex flex-col gap-6 pt-8">
      <Suspense fallback="Loading...">
        <Post path="/home" />
      </Suspense>
    </div>,
  );
});

export default home;
