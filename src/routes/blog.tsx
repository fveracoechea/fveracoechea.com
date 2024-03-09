import { Hono } from "hono";
import { Article, ArticleLoader } from "../components/Post.tsx";
import { Suspense } from "hono/streaming";
import { jsxMiddleware } from "../middleware/jsxRenderer.tsx";
import { SidemenuLoader } from "../components/Sidemenu.tsx";
import { Sidemenu } from "../components/Sidemenu.tsx";

const blog = new Hono();

blog.use(jsxMiddleware);

blog.get("/:post", (ctx) => {
  const url = new URL(ctx.req.url);
  const props = { path: url.pathname, className: "flex-[3] py-4" };

  return ctx.render(
    <section class="flex gap-4" id={props.path.replace("/", "")}>
      <Suspense fallback={<SidemenuLoader />}>
        <Sidemenu />
      </Suspense>
      <Suspense fallback={<ArticleLoader {...props} />}>
        <Article {...props} />
      </Suspense>
    </section>,
  );
});

export default blog;
