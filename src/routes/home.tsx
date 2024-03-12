import { Hono } from "hono";
import { Article } from "../components/Post.tsx";
import { jsxMiddleware } from "../middleware/jsxRenderer.tsx";
import { loadBlog } from "../shared/loadContent.ts";
import clsx from "npm:clsx";

const posts = await loadBlog();

const home = new Hono();

home.use(jsxMiddleware);

home.get("/", (ctx) => {
  return ctx.render(
    <div>
      <Article path="/home" class="pb-8" />

      <section id="home-blog" class="pb-8">
        <h2 class="text-xl font-semibold mb-6">Articles</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article
              class={clsx(
                "flex flex-col gap-2 rounded overflow-hidden transition-colors",
                "border border-cat-surface0 group bg-cat-base hover:bg-cat-surface0",
              )}
            >
              <a href={p.url} class="flex h-full flex-col">
                {p.image && (
                  <figure class="w-full">
                    <img
                      src={p.image}
                      alt={p.title}
                      height={368}
                      width={552}
                      class="object-cover"
                    />
                  </figure>
                )}
                <figcaption class="flex p-4 flex-1 gap-1 flex-col transition-colors">
                  <h3 class="font-medium text-cat-text transition-colors group-hover:text-cat-blue">
                    {p.title}
                  </h3>
                  <small class="text-cat-subtext0">{p.date}</small>
                  <p class="text-cat-subtext1 text-sm">{p.description}</p>
                </figcaption>
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>,
  );
});

export default home;
