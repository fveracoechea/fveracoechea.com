import clsx from "npm:clsx";
import { loadBlog } from "../shared/loadContent.ts";

export async function Blog() {
  const posts = await loadBlog();

  return (
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
  );
}

function PostCardLoader() {
  return (
    <div
      class={clsx(
        "flex flex-col gap-2 rounded overflow-hidden",
        "border border-cat-surface0 bg-cat-base",
        "cursor-wait",
      )}
    >
      <div class="h-44 bg-cat-surface0"></div>
      <div class="flex flex-col gap-4 p-4">
        <div class="h-4 w-3/5 rounded-lg bg-cat-surface0" />
        <div class="h-2 w-1/4 rounded-lg bg-cat-surface0" />
        <div class="flex flex-col gap-2">
          <div class="h-3 w-full rounded-lg bg-cat-surface0" />
          <div class="h-3 w-4/5 rounded-lg bg-cat-surface0" />
        </div>
      </div>
    </div>
  );
}

export function BlogLoader() {
  return (
    <section id="home-blog" class="flex flex-col gap-8 pb-8">
      <div class="h-6 w-1/5 rounded-lg bg-cat-surface0" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <PostCardLoader />
        <PostCardLoader />
      </div>
    </section>
  );
}
