import { cx } from "cva";
import { format } from "npm:date-fns";

export const layout = "layouts/base.tsx";

type Bookmark = {
  text: [string, string];
  href: string;
  date: string;
  tag?: string;
};

const bookmarks: Bookmark[] = [
  {
    href: "https://cubic-bezier.com/",
    date: "06/24/2024",
    tag: "animations",
    text: ["cubic-bezier", "Playground for CSS bezier-based timing functions"],
  },
  {
    href: "https://easings.net/",
    date: "06/24/2024",
    tag: "animations",
    text: [
      "Easing Functions Cheat Sheet",
      "Simple cheat sheet to help developers pick the right easing function",
    ],
  },
  {
    href: "https://dev.opera.com/articles/better-performance-with-requestanimationframe/",
    date: "06/22/2024",
    tag: "animations",
    text: [
      "Better Performance With requestAnimationFrame",
      "This article discusses how you can improve the performance of your animations",
    ],
  },
  {
    href: "https://github.com/unknownskl/greenlight",
    date: "06/19/2024",
    tag: "gaming",
    text: [
      "Greenlight",
      "Open-source client for xCloud and Xbox home streaming",
    ],
  },
  {
    href: "https://astro.build/",
    date: "06/19/2024",
    tag: "web development",
    text: [
      "Astro",
      "Web framework optimized for building fast, content-driven websites",
    ],
  },
  {
    href: "https://lucide.dev/",
    date: "05/02/2024",
    tag: "icons",
    text: ["Lucide", "Beautiful and consistent icons bade by the community"],
  },
  {
    href: "https://cva.style/docs",
    date: "04/14/2024",
    tag: "CSS-in-TS",
    text: [
      "Class Variance Authority",
      "Library for building type-safe UI components",
    ],
  },
  {
    href: "https://guitarix.org/",
    date: "03/21/2024",
    tag: "music",
    text: ["Guitarix", "Virtual guitar amplifier for Linux"],
  },
  {
    href: "https://lume.land/",
    date: "03/07/2024",
    tag: "deno",
    text: ["Lume", "Fast & flexible static site generator for Deno"],
  },
  {
    href: "https://ardour.org/",
    date: "02/28/2024",
    tag: "music",
    text: ["Ardour", "Record, Edit, and Mix on Linux"],
  },
  {
    href: "https://hono.dev/",
    date: "02/12/2024",
    tag: "server",
    text: ["Hono", "Web Framework built on Web Standards"],
  },
  {
    href: "https://fresh.deno.dev/",
    date: "11/20/2023",
    tag: "deno",
    text: [
      "Fresh",
      "Next generation web framework, built for speed, reliability, and simplicity",
    ],
  },
];

export default function BookmarksLayout(props: Lume.Data) {
  return (
    <>
      <div className="max-w-xl py-10">
        <article className="prose overflow-x-hidden">{props.children}</article>
      </div>

      <section className="pb-12">
        <nav>
          <ul className="rounded border border-cat-surface0">
            {bookmarks.map(({ href, text, date, tag }) => (
              <li
                className={cx(
                  "group flex even:border-y even:border-cat-surface0",
                  "transition-colors even:bg-cat-mantle",
                  "last-of-type:rounded-bl last-of-type:rounded-br last-of-type:border-b-0",
                )}
                key={href}
              >
                <a
                  href={href}
                  target="_blank"
                  className={cx(
                    "flex w-full flex-col flex-wrap px-4 py-4 transition",
                    "hover:bg-cat-overlay2/20 active:ring-2 active:ring-cat-overlay2",
                    "focus-visible:ring-2 focus-visible:ring-cat-blue",
                    "group-last-of-type:rounded-bl group-last-of-type:rounded-br",
                    "group-first-of-type:rounded-tl group-first-of-type:rounded-tr",
                  )}
                >
                  <b className="transition-colors group-hover:text-cat-blue">
                    {text.at(0)}
                  </b>
                  <span className="flex flex-wrap justify-between  text-sm">
                    <span className="flex flex-wrap gap-2 text-cat-subtext0 transition-colors group-hover:text-cat-text">
                      <span>{format(date, "PPP")}</span>
                      <span className="hidden md:inline">-</span>
                      <span>{text.at(1)}</span>
                    </span>
                    <span>{tag}</span>
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
