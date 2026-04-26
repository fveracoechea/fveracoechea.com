import { allSnippets } from "content-collections"
import { cx } from "cva"

export function getSnippetPrerenderRoutes() {
  return ["/snippets", ...allSnippets.map((s) => `/snippets/${s.slug}`)]
}

const sortedSnippets = [...allSnippets].sort((a, b) => a.order - b.order)

export default function SnippetsIndex() {
  return (
    <>
      <div className="py-10">
        <article className="prose overflow-x-hidden">
          <h1>Code snippets</h1>
          <p>
            A curated collection of tips, tricks, and reusable code blocks that I've found valuable.
          </p>
        </article>
      </div>

      <section className="pb-12">
        <nav>
          <ul>
            {sortedSnippets.map((snippet, idx) => (
              <li
                className={cx(
                  "group flex rounded transition-colors",
                  idx % 2 === 1 && "bg-ctp-mantle",
                )}
                key={snippet.slug}
              >
                <a
                  href={snippet.url}
                  className={cx(
                    "flex w-full flex-col gap-1 px-6 py-4 text-ctp-text transition",
                    "hover:bg-ctp-surface0/80 active:ring-2 active:ring-ctp-overlay2",
                    "focus-visible:ring-2 focus-visible:ring-ctp-blue rounded",
                  )}
                >
                  <span className="font-medium transition-colors">{snippet.title}</span>
                  <span className="text-sm text-ctp-subtext1 transition-colors group-hover:text-ctp-text">
                    {snippet.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  )
}
