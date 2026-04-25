import { cx } from "cva";
import { format } from "date-fns";

function Articles(props: { posts: { url: string; title: string; image: string; description: string; date: string }[] }) {
  return (
    <section id="articles">
      <h3 className="mb-6 border-b-ctp-surface1 text-2xl font-semibold">
        Articles
      </h3>

      <div className="grid grid-cols-1 gap-10">
        {props.posts.map((post) => {
          return (
            <a href={post.url} className="w-full">
              <article
                key={post.url}
                className="group flex flex-col gap-6 md:flex-row"
              >
                <figure className="w-80">
                  <img
                    src={post.image}
                    alt={post.title}
                    width={320}
                    height={168}
                    loading="lazy"
                    className={cx(
                      "h-auto min-w-80 rounded border border-ctp-surface0 object-cover",
                      "ring-0 ring-ctp-surface0 transition-shadow",
                      "group-hover:border-ctp-blue group-hover:ring-2 group-hover:ring-ctp-blue",
                      "group-focus-within:border-ctp-blue",
                      "group-focus-within:ring-2 group-focus-within:ring-ctp-blue",
                    )}
                  />
                </figure>

                <figcaption className="flex flex-col justify-center gap-2">
                  <h4
                    className={cx(
                      "text-lg font-medium text-ctp-text underline-offset-2 transition-colors",
                      "group-hover:text-ctp-blue",
                      "group-focus-within:text-ctp-blue",
                    )}
                  >
                    {post.title}
                  </h4>
                  <p className="text-sm text-ctp-subtext1">
                    {format(post.date, "PPP")}
                  </p>
                  <p className="text-base text-ctp-subtext1">
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
