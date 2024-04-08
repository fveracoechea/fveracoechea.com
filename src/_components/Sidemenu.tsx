import { cx } from 'npm:class-variance-authority';
import { format } from 'npm:date-fns';

import { PostData } from '../_includes/types/article.ts';

function Sidemenu(props: Lume.Data) {
  const { search, url } = props;
  const blog = search.pages<PostData>('type=post', 'date=desc', 12);

  return (
    <div className="hidden flex-1 lg:block">
      <aside className="sticky top-6 flex flex-1 flex-col gap-4 p-2">
        <h5 className="font-semibold text-cat-subtext0">Articles</h5>
        <ul className="flex flex-col gap-2">
          {blog.map(post => (
            <li key={post.url}>
              <a
                className={cx(
                  'flex flex-col transition-colors hover:text-cat-blue',
                  url === post.url ? 'text-cat-mauve' : 'text-cat-subtext1',
                )}
                href={post.url}
              >
                <span className="text-sm">{post.title}</span>
                <span className="text-xs">{format(post.date, 'MMM dd, yyyy')}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default Sidemenu;
