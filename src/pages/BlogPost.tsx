import { cx } from "cva"
import { format } from "date-fns"
import type { ComponentType, JSX } from "preact"
import { useLocation } from "preact-iso/router"
import { getPost } from "../lib/content"

type TocEntry = {
  depth: number
  value: string
  id: string
  children?: TocEntry[]
}

const mdxModules = import.meta.glob<{ default: ComponentType; tableOfContents?: TocEntry[] }>(
  "../../content/blog/*.mdx",
  { eager: true },
)

function toTableOfContents(item: TocEntry): JSX.Element {
  return (
    <>
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          tabIndex={1}
          className={cx(
            "flex py-1.5 text-sm transition text-ctp-subtext1",
            "rounded-br rounded-tr",
            "hover:bg-ctp-overlay0/20 hover:text-ctp-text",
            "active:ring-2 active:ring-ctp-overlay2",
            "focus-visible:ring-2 focus-visible:ring-ctp-overlay2",
            item.depth === 2 && "pl-8",
            item.depth === 3 && "pl-12",
            item.depth === 4 && "pl-16",
            item.depth >= 5 && "pl-18",
          )}
        >
          {item.value}
        </a>
      </li>
      {item.children?.map(toTableOfContents)}
    </>
  )
}

function TocSidebar({ toc }: { toc: TocEntry[] }) {
  if (!toc || toc.length === 0) return null
  return (
    <aside className="hidden flex-1 border-l border-ctp-surface0 lg:block">
      <nav className="sticky top-0 flex flex-1 flex-col gap-4 py-8">
        <p className="text-md pl-8 font-semibold text-ctp-text">On This Page</p>
        <ul className="flex flex-col text-sm text-ctp-overlay2">{toc.map(toTableOfContents)}</ul>
      </nav>
    </aside>
  )
}

export default function BlogPost() {
  const location = useLocation()
  const slug = location.path.replace(/^\/blog\//, "")
  const post = getPost(slug)

  if (!post) {
    return (
      <div className="FULL_HEIGHT flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">Post not found</h2>
        <a href="/" className="text-ctp-blue hover:underline">
          Go home
        </a>
      </div>
    )
  }

  const mod = mdxModules[`../../content/blog/${slug}.mdx`]
  const MdxComponent = mod?.default
  const toc = mod?.tableOfContents ?? []

  return (
    <div className="flex gap-10">
      <article className="prose flex-[4] overflow-x-hidden py-10">
        <header className="flex flex-col gap-4">
          <h1 className="my-0 text-2xl leading-none md:text-4xl">{post.title}</h1>
          <section>
            {post.date && (
              <time className="text-sm text-ctp-subtext1" dateTime={post.date}>
                {format(post.date, "PPPP")}
              </time>
            )}
            <p className="m-0 text-sm text-ctp-subtext1">{post.description}</p>
            <img className="mx-0 mb-0 mt-4" src={post.image} alt={post.title} />
          </section>
        </header>
        {MdxComponent && <MdxComponent />}
      </article>
      <TocSidebar toc={toc} />
    </div>
  )
}
