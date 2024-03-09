import { Hono } from "hono";
import { Post } from "../components/Post.tsx";
import { Suspense } from "hono/streaming";
import { Blog, BlogLoader } from "../components/Blog.tsx";
import { jsxMiddleware } from "../middleware/jsxRenderer.tsx";

const home = new Hono();

home.use(jsxMiddleware);

home.get("/", (ctx) => {
  return ctx.render(
    <div>
      <Post path="/home" className="pb-8" />

      <Suspense
        fallback={<BlogLoader />}
      >
        <Blog />
      </Suspense>
    </div>,
  );
});

export default home;
