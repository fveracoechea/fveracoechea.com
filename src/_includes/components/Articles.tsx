import { cx } from "cva";
import { format } from "npm:date-fns";

import { PostData } from "../types/article.ts";

function Articles(props: { search: Lume.Data["search"] }) {
  const { search } = props;

  const blog = search.pages<PostData>(
    "type=post published=true",
    "date=desc",
    8,
  );

  return (
    <section id="articles">
      <h3 className="mb-6 border-b-cat-surface1 text-2xl font-semibold">
        Articles
      </h3>

      <div className="grid grid-cols-1 gap-10">
        {blog.map(post => {
          return (
            <a href={post.url} className="w-full">
              <article
                key={post.url}
                className="group flex flex-col gap-6 md:flex-row"
              >
                <figure className="w-72">
                  <img
                    src={post.image}
                    alt={post.title}
                    width={288}
                    height={151}
                    loading="lazy"
                    className={cx(
                      "h-auto w-full rounded border border-cat-surface0 object-cover",
                      "ring-0 ring-cat-surface0 transition-shadow",
                      "group-hover:border-cat-blue group-hover:ring-2 group-hover:ring-cat-blue",
                      "group-focus-within:border-cat-blue",
                      "group-focus-within:ring-2 group-focus-within:ring-cat-blue",
                    )}
                  />
                </figure>

                <figcaption className="flex flex-col justify-center gap-2">
                  <h4
                    className={cx(
                      "text-lg font-medium text-cat-text underline-offset-2 transition-colors",
                      "group-hover:text-cat-blue",
                      "group-focus-within:text-cat-blue",
                    )}
                  >
                    {post.title}
                  </h4>
                  <p className="text-sm text-cat-subtext1">
                    {format(post.date, "PPP")}
                  </p>
                  <p className="text-base text-cat-subtext1">
                    {post.description}
                  </p>
                </figcaption>
              </article>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default Articles;
