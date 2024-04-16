import { cx } from 'npm:class-variance-authority';

export const layout = 'layouts/base.tsx';

function toTableOfContents(item: Lume.TocEntry): React.ReactNode {
  return (
    <>
      <li
        className={cx(
          item.depth === 3 && `pl-3`,
          item.depth === 4 && `pl-6`,
          item.depth >= 5 && `pl-9`,
        )}
      >
        <a
          href={`#${item.id}`}
          className={cx(
            'text-sm hover:text-cat-blue',
            item.depth === 2 && 'font-semibold',
            item.depth > 2 && 'font-medium',
          )}
        >
          {item.value}
        </a>
      </li>

      {item.children && item.children.map(toTableOfContents)}
    </>
  );
}

export default function BlogLayout(props: Lume.Data) {
  return (
    <div className="flex gap-10">
      <article className="prose flex-[4] overflow-x-hidden py-4">{props.children}</article>

      <aside className="hidden flex-1 border-l border-cat-surface0 pl-8 lg:block">
        <nav className="sticky top-6 flex flex-1 flex-col gap-4 py-2">
          <p className="text-md font-semibold text-cat-text">On This Page</p>
          <ul className="flex flex-col gap-2.5 text-sm text-cat-overlay2">
            {props.toc.at(0)?.children?.map(toTableOfContents)}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
