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
    href: "https://reactrouter.com/explanation/progressive-enhancement",
    date: "04/29/2025",
    tag: "web development",
    text: [
      "Progressive Enhancement",
      "A strategy in web design that puts emphasis on web content first",
    ],
  },
  {
    href: "https://yoavik.com/snippets/image-with-fallback",
    date: "03/01/2025",
    tag: "react",
    text: [
      "Lazy Image with Fallback Component",
      "A Component for showing a fallback component when an image cannot be found",
    ],
  },
  {
    href: "https://www.better-auth.com/",
    date: "02/02/2025",
    tag: "web development",
    text: [
      "Better Auth",
      "The comprehensive authentication framework for TypeScript",
    ],
  },
  {
    href: "https://www.patterns.dev/",
    date: "11/10/2024",
    tag: "web development",
    text: [
      "Patterns.dev",
      "Design, rendering, and performance patterns for building powerful web apps",
    ],
  },
  {
    href: "https://www.w3.org/WAI/ARIA/apg/patterns/",
    date: "10/23/2024",
    tag: "web development",
    text: [
      "Web Accessibility Patterns",
      "How to build accessibility semantics into web patterns and widgets",
    ],
  },
  {
    href: "https://github.com/sxyazi/yazi",
    date: "08/12/2024",
    tag: "terminal",
    text: ["Yazi", "A terminal file manager written in Rust"],
  },
  {
    href: "https://github.com/dreamsofcode-io/dotfiles",
    date: "06/29/2024",
    tag: "repo",
    text: [
      "dreamsofcode-io/dotfiles",
      "dotfile configuration for a consistent experience.",
    ],
  },
  {
    href: "https://blog.sentry.io/introducing-user-feedback-the-easiest-way-to-connect-with-your-users/",
    date: "07/03/2024",
    tag: "docs",
    text: [
      "Sentry's User Feedback Widget",
      "Allows users to submit feedback quickly and easily",
    ],
  },
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
  {
    href: "https://danmarshall.github.io/google-font-to-svg-path/",
    date: "10/17/2023",
    tag: "svg",
    text: ["font-to-svg-path", "Google Font to Svg Path"],
  },
];

export default function BookmarksLayout(props: Lume.Data) {
  return (
    <>
      <div className="max-w-xl py-10">
        <article className="prose overflow-x-hidden">{props.children}</article>
      </div>

      <section className="pb-14">
        <nav>
          <ul className="overflow-hidden rounded border border-cat-surface0 bg-cat-mantle">
            {bookmarks.map(({ href, text, date, tag }, idx) => (
              <li
                className={cx(
                  "group flex even:border-y even:border-cat-surface0",
                  "transition-colors odd:bg-cat-base even:bg-cat-mantle",
                  "last-of-type:rounded-bl last-of-type:rounded-br last-of-type:border-b-0",
                )}
                key={href}
              >
                <a
                  href={href}
                  target="_blank"
                  className={cx(
                    "flex w-full flex-col flex-wrap px-4 py-4 transition",
                    "hover:bg-cat-blue/10 active:ring-2 active:ring-cat-overlay2",
                    "focus-visible:ring-2 focus-visible:ring-cat-blue",
                    idx + 1 === bookmarks.length && "rounded-bl rounded-br",
                    idx === 0 && "rounded-lg-tl rounded-lg-tr",
                  )}
                >
                  <b className="transition-colors group-hover:text-cat-blue">
                    {text.at(0)}
                  </b>
                  <span className="flex flex-wrap justify-between text-sm">
                    <span className="flex flex-wrap gap-2 text-cat-text transition-colors group-hover:text-cat-text">
                      <span>{format(date, "PP")}</span>
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
