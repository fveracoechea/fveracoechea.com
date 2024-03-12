import { Hono } from "hono";
import { jsxMiddleware } from "../middleware/jsxRenderer.tsx";
import { Sidemenu } from "../components/Sidemenu.tsx";
import { Article } from "../components/Post.tsx";

const blog = new Hono();

blog.use(jsxMiddleware);

blog.get("/:post", (ctx) => {
  const url = new URL(ctx.req.url);

  return ctx.render(
    <div class="flex gap-4">
      <Sidemenu />
      <Article path={url.pathname} class="flex-[3] py-4 w-full lg:w-3/4" />
    </div>,
  );
});

export default blog;
