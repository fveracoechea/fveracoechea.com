import { cx } from 'cva';
import { format } from 'npm:date-fns';

import { PostData } from '../_includes/types/article.ts';

function Articles(props: Lume.Data) {
  const { search } = props;
  const blog = search
    .pages<PostData>('type=post published=true', '', 8)
    .toSorted(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return (
    <section id="post-grid">
      <h3 className="mb-6 text-xl font-semibold">Recent Articles</h3>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {blog.map(post => {
          return (
            <article key={post.url} className="group flex ">
              <a href={post.url} className="flex w-full flex-col">
                <figure className="flex-1">
                  <img
                    src={post.image}
                    alt={post.title}
                    height={281}
                    width={535}
                    className={cx(
                      'h-auto w-full rounded border border-cat-surface0 object-cover',
                      'ring-0 ring-cat-surface0 transition-shadow',
                      'group-hover:border-cat-blue group-hover:ring-2 group-hover:ring-cat-blue',
                      'group-focus-within:border-cat-mauve',
                      'group-focus-within:ring-2 group-focus-within:ring-cat-mauve',
                    )}
                  />
                </figure>
                <figcaption className="flex flex-[3] flex-col gap-2 pt-4">
                  <h4
                    className={cx(
                      'text-base font-medium text-cat-text underline-offset-2 transition-colors',
                      'group-hover:text-cat-blue group-hover:underline',
                      'group-focus-within:text-cat-mauve',
                    )}
                  >
                    {post.title}
                  </h4>
                  <p className="text-sm text-cat-subtext1">
                    <b>{format(post.createdAt, 'PPP')}</b>
                    <span>&nbsp;-&nbsp;</span>
                    <span>{post.description}</span>
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
