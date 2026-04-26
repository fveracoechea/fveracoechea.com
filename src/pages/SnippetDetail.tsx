import { allSnippets } from "content-collections"
import { cx } from "cva"
import type { ComponentType } from "preact"
import { lazy, Suspense } from "preact/compat"
import { useLocation } from "preact-iso/router"

const mdxModules = import.meta.glob("../../content/snippets/*.mdx")

const snippetMap = new Map(allSnippets.map((s) => [s.slug, s]))
const sortedSnippets = [...allSnippets].sort((a, b) => a.order - b.order)

const mdxCache = new Map<string, ComponentType>()

function SnippetSidebar({ currentSlug }: { currentSlug: string }) {
  return (
    <aside className="hidden min-h-full flex-1 border-l border-ctp-surface0 lg:block">
      <nav className="sticky top-0 flex flex-1 flex-col gap-4 py-8">
        <p className="text-md pl-8 font-semibold text-ctp-text">Other snippets</p>
        <ul className="flex flex-col text-sm text-ctp-subtext1">
          {sortedSnippets.map((snippet) => {
            const isActive = snippet.slug === currentSlug
            return (
              <li key={snippet.slug} className={cx("group relative transition-colors")}>
                {isActive && (
                  <span
                    className={cx(
                      "absolute rounded transition-colors",
                      "left-0 top-0 h-full w-0.5 bg-ctp-blue",
                    )}
                  />
                )}
                <a
                  href={snippet.url}
                  tabIndex={isActive ? -1 : 0}
                  className={cx(
                    "flex rounded-br rounded-tr px-4 py-2 pl-8 text-sm transition",
                    !isActive && [
                      "group-hover:bg-ctp-overlay0/20 group-hover:text-ctp-text",
                      "active:ring-2 active:ring-ctp-overlay2",
                      "focus-visible:ring-2 focus-visible:ring-ctp-overlay2",
                    ],
                    isActive && "text-ctp-blue",
                  )}
                >
                  {snippet.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

function MdxLoader({ slug }: { slug: string }) {
  const MdxComponent = lazy(async () => {
    if (mdxCache.has(slug)) return { default: mdxCache.get(slug)! }
    const loader = mdxModules[`../../content/snippets/${slug}.mdx`]
    if (!loader) return { default: () => null }
    const mod = await loader()
    const Component = (mod as Record<string, ComponentType>).default
    if (!Component) return { default: () => null }
    mdxCache.set(slug, Component)
    return { default: Component }
  })

  return (
    <Suspense fallback={null}>
      <MdxComponent />
    </Suspense>
  )
}

export default function SnippetDetail() {
  const location = useLocation()
  const slug = location.path.replace(/^\/snippets\//, "")
  const snippet = snippetMap.get(slug)

  if (!snippet) {
    return (
      <div className="FULL_HEIGHT flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">Snippet not found</h2>
        <a href="/snippets" className="text-ctp-blue hover:underline">
          View all snippets
        </a>
      </div>
    )
  }

  return (
    <div className={cx("flex gap-10", "FULL_HEIGHT")}>
      <article className="prose flex-[4] overflow-x-hidden py-10">
        <MdxLoader slug={slug} />
      </article>
      <SnippetSidebar currentSlug={slug} />
    </div>
  )
}
