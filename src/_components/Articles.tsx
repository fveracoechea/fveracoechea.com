import { cx } from "npm:class-variance-authority";
import { format } from "npm:date-fns";

import { PostData } from "../_includes/types/article.ts";

function Articles(props: Lume.Data) {
  const { search } = props;
  const blog = search
    .pages<PostData>("type=post published=true", "", 8)
    .toSorted((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <section id="post-grid" className="pb-8">
      <h3 className="mb-6 text-xl font-semibold">Recent Articles</h3>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {blog.map((post) => {
          console.log(post.createdAt);
          return (
            <article
              key={post.url}
              className={cx(
                "flex flex-col gap-2 overflow-hidden rounded",
                "border border-cat-surface0 bg-cat-mantle",
                "ring-cat-blue transition-shadow hover:border-cat-blue hover:ring-1",
                "focus-within:border-cat-mauve focus-within:ring-1 focus-within:ring-cat-mauve",
              )}
            >
              <a href={post.url} className="group flex h-full flex-col">
                <figure className="w-full flex-1">
                  <img
                    src={post.image}
                    alt={post.title}
                    height={368}
                    width={552}
                    className="object-cover"
                  />
                </figure>
                <figcaption className="flex flex-1 flex-col gap-1 p-4">
                  <h3
                    className={cx(
                      "font-medium text-cat-text transition-colors",
                      "group-hover:text-cat-blue group-focus-visible:text-cat-mauve",
                      "group-focus:text-cat-mauve",
                    )}
                  >
                    {post.title}
                  </h3>
                  <small className="text-cat-subtext0">
                    {format(post.createdAt, "PPP")}
                  </small>
                  <p className="text-sm text-cat-subtext1">
                    {post.description}
                  </p>
                </figcaption>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Articles;
