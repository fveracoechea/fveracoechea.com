import { cx } from "cva";
import { format } from "npm:date-fns";

export const layout = "layouts/base.tsx";

function toTableOfContents(item: Lume.TocEntry): JSX.Element {
  return (
    <>
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          tabIndex={1}
          className={cx(
            "flex py-1.5 text-sm transition text-cat-subtext0",
            "rounded-br rounded-tr",
            "hover:bg-cat-overlay2/20 hover:text-cat-text",
            "active:ring-2 active:ring-cat-overlay2",
            "focus-visible:ring-2 focus-visible:ring-cat-overlay2",
            item.depth === 2 && "pl-8",
            item.depth === 3 && `pl-12`,
            item.depth === 4 && `pl-16`,
            item.depth >= 5 && `pl-18`,
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
      <article className="prose flex-[4] overflow-x-hidden py-10">
        <header className="flex flex-col gap-4">
          <h1 className="my-0 text-2xl leading-none md:text-4xl">
            {props.title}
          </h1>

          <section>
            <time
              className="text-sm text-cat-subtext0"
              dateTime={new Date(props.date).toString()}
            >
              {format(props.date, "PPPP")}
            </time>
            <p className="m-0 text-sm text-cat-subtext0">{props.description}</p>
            <img
              className="mx-0 mb-0 mt-4"
              src={props.image}
              alt={props.title}
            />
          </section>
        </header>

        {props.children}
      </article>

      <aside className="hidden flex-1 border-l border-cat-surface0 lg:block">
        <nav className="flex flex-1 flex-col gap-4 py-10">
          <p className="text-md pl-8 font-semibold text-cat-text">
            On This Page
          </p>
          <ul className="flex flex-col text-sm text-cat-overlay2">
            {props.toc.map(toTableOfContents)}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
