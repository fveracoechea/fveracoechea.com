import { cx } from "cva";

import { Snippets } from "../../_plugins/snippets.ts";
import { FULL_HEIGHT } from "./base.tsx";

export const layout = "layouts/base.tsx";

export default function SnippetsLayout(props: Lume.Data) {
  const isIndex = props.page.data.type === "snippets-index-page";
  const snippets = (props.page.data.snippets ?? []) as Snippets;
  const currentPath = props.page.outputPath;

  if (!isIndex)
    return (
      <div className={cx("flex gap-10", FULL_HEIGHT)}>
        <article className="prose flex-[4] overflow-x-hidden py-10">
          {props.children}
        </article>

        <aside className="hidden min-h-full flex-1 border-l border-cat-surface0 lg:block">
          <nav className="sticky top-0 flex flex-1 flex-col gap-4 py-10">
            <p className="text-md pl-8 font-semibold text-cat-text">
              Other snippets
            </p>
            <ul className="flex flex-col text-sm text-cat-overlay2">
              {snippets.map(({ outputPath, title }) => {
                const isActive = currentPath === outputPath;
                return (
                  <li
                    key={outputPath}
                    className={cx(
                      "group relative transition-colors",
                      !isActive && "",
                    )}
                  >
                    {isActive && (
                      <span
                        className={cx(
                          "absolute rounded transition-colors",
                          "left-0 top-0 h-full w-0.5 bg-cat-blue",
                        )}
                      />
                    )}
                    <a
                      href={outputPath}
                      tabIndex={isActive ? -1 : 0}
                      disabled={isActive}
                      className={cx(
                        "flex rounded-br rounded-tr px-4 py-2 pl-8 text-sm transition",
                        !isActive && [
                          "group-hover:bg-cat-overlay2/20 group-hover:text-cat-text",
                          "active:ring-2 active:ring-cat-overlay2",
                          "focus-visible:ring-2 focus-visible:ring-cat-overlay2",
                        ],
                        isActive && "text-cat-blue",
                      )}
                    >
                      {title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>
    );

  return (
    <>
      <div className="max-w-xl py-10">
        <article className="prose overflow-x-hidden">{props.children}</article>
      </div>

      <section className="pb-12">
        <nav>
          <ul className="rounded border border-cat-surface0">
            {snippets.map(({ outputPath, title, description }) => (
              <li
                className={cx(
                  "group flex even:border-y even:border-cat-surface0",
                  "transition-colors even:bg-cat-mantle",
                  "last-of-type:rounded-bl last-of-type:rounded-br last-of-type:border-b-0",
                )}
                key={outputPath}
              >
                <a
                  href={outputPath}
                  className={cx(
                    "flex w-full flex-col px-6 py-4 text-cat-text transition",
                    "hover:bg-cat-overlay2/20 active:ring-2 active:ring-cat-overlay2",
                    "focus-visible:ring-2 focus-visible:ring-cat-blue",
                    "group-last-of-type:rounded-bl group-last-of-type:rounded-br",
                    "group-first-of-type:rounded-tl group-first-of-type:rounded-tr",
                  )}
                >
                  <span className="font-medium transition-colors group-hover:text-cat-blue">
                    {title}
                  </span>

                  <span className="text-sm text-cat-subtext0 transition-colors group-hover:text-cat-text">
                    {description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
}
