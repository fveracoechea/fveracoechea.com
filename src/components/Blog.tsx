import clsx from "npm:clsx";
import { loadBlog } from "../shared/loadContent.ts";

const imageWidth = 220;

export async function Blog() {
  const posts = await loadBlog();

  return (
    <section id="home-blog">
      <h2 class="text-xl font-semibold mb-6">Articles</h2>

      <div class="grid grid-cols-2 gap-6">
        {posts.map((p) => (
          <article
            class={clsx(
              "flex flex-col gap-2 h-44 rounded overflow-hidden transition-colors",
              "border border-cat-surface0 group bg-cat-base hover:bg-cat-surface0",
            )}
          >
            <a href={p.url} class="flex h-full">
              {p.image && (
                <figure class={`w-[${imageWidth}px] h-full`}>
                  <img
                    src={p.image}
                    width={imageWidth}
                    alt={p.title}
                    class="h-full rounded-tl rounded-bl object-cover"
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
