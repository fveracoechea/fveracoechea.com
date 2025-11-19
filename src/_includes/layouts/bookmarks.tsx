import { cx } from "cva";

export const layout = "layouts/base.tsx";

type Bookmark = {
  text: [string, string];
  href: string;
  tag?: string;
};

const bookmarks: Bookmark[] = [
  {
    href: "https://kyleshevlin.com/use-encapsulation/",
    tag: "react",
    text: [
      "Use Encapsulation",
      "Why Your React Components Should Only Use Custom Hooks",
    ],
  },
  {
    href: "https://www.epicweb.dev/talks/caching-for-cash",
    tag: "performance",
    text: [
      "Caching for Cash",
      "The fundamentals of caching including vocabulary, solid practices, general considerations, and recommendations",
    ],
  },
  {
    href: "https://blog.pragmaticengineer.com/stack-overflow-is-almost-dead/",
    tag: "ai",
    text: [
      "Stack overflow is almost dead",
      "Today, Stack overflow has almost as few questions asked per month...",
    ],
  },
  {
    href: "https://world.hey.com/dhh/coding-should-be-a-vibe-50908f49",
    tag: "ai",
    text: [
      "Coding should be a vibe!",
      `The appeal of "vibe coding" appears to be based on the fact that many development environments are unpleasant to work with`,
    ],
  },
  {
    href: "https://reactrouter.com/explanation/progressive-enhancement",
    tag: "web development",
    text: [
      "Progressive Enhancement",
      "A strategy in web design that puts emphasis on web content first",
    ],
  },
  {
    href: "https://yoavik.com/snippets/image-with-fallback",
    tag: "react",
    text: [
      "Lazy Image with Fallback Component",
      "A Component for showing a fallback component when an image cannot be found",
    ],
  },
  {
    href: "https://www.better-auth.com/",
    tag: "web development",
    text: [
      "Better Auth",
      "The comprehensive authentication framework for TypeScript",
    ],
  },
  {
    href: "https://www.patterns.dev/",
    tag: "web development",
    text: [
      "Patterns.dev",
      "Design, rendering, and performance patterns for building powerful web apps",
    ],
  },
  {
    href: "https://www.w3.org/WAI/ARIA/apg/patterns/",
    tag: "web development",
    text: [
      "Web Accessibility Patterns",
      "How to build accessibility semantics into web patterns and widgets",
    ],
  },
  {
    href: "https://github.com/sxyazi/yazi",
    tag: "terminal",
    text: ["Yazi", "A terminal file manager written in Rust"],
  },
  {
    href: "https://github.com/dreamsofcode-io/dotfiles",
    tag: "repo",
    text: [
      "dreamsofcode-io/dotfiles",
      "dotfile configuration for a consistent experience.",
    ],
  },
  {
    href:
      "https://blog.sentry.io/introducing-user-feedback-the-easiest-way-to-connect-with-your-users/",
    tag: "docs",
    text: [
      "Sentry's User Feedback Widget",
      "Allows users to submit feedback quickly and easily",
    ],
  },
  {
    href: "https://cubic-bezier.com/",
    tag: "animations",
    text: ["cubic-bezier", "Playground for CSS bezier-based timing functions"],
  },
  {
    href: "https://easings.net/",
    tag: "animations",
    text: [
      "Easing Functions Cheat Sheet",
      "Simple cheat sheet to help developers pick the right easing function",
    ],
  },
  {
    href: "https://github.com/unknownskl/greenlight",
    tag: "gaming",
    text: [
      "Greenlight",
      "Open-source client for xCloud and Xbox home streaming",
    ],
  },
  {
    href: "https://astro.build/",
    tag: "web development",
    text: [
      "Astro",
      "Web framework optimized for building fast, content-driven websites",
    ],
  },
  {
    href: "https://lucide.dev/",
    tag: "icons",
    text: ["Lucide", "Beautiful and consistent icons bade by the community"],
  },
  {
    href: "https://cva.style/docs",
    tag: "CSS-in-TS",
    text: [
      "Class Variance Authority",
      "Library for building type-safe UI components",
    ],
  },
  {
    href: "https://guitarix.org/",
    tag: "music",
    text: ["Guitarix", "Virtual guitar amplifier for Linux"],
  },
  {
    href: "https://lume.land/",
    tag: "deno",
    text: ["Lume", "Fast & flexible static site generator for Deno"],
  },
  {
    href: "https://ardour.org/",
    tag: "music",
    text: ["Ardour", "Record, Edit, and Mix on Linux"],
  },
  {
    href: "https://hono.dev/",
    tag: "server",
    text: ["Hono", "Web Framework built on Web Standards"],
  },
  {
    href: "https://fresh.deno.dev/",
    tag: "deno",
    text: [
      "Fresh",
      "Next generation web framework, built for speed, reliability, and simplicity",
    ],
  },
  {
    href: "https://danmarshall.github.io/google-font-to-svg-path/",
    tag: "svg",
    text: ["font-to-svg-path", "Google Font to Svg Path"],
  },
];

export default function BookmarksLayout(props: Lume.Data) {
  return (
    <>
      <div className="py-10">
        <article className="prose overflow-x-hidden">{props.children}</article>
      </div>

      <section className="pb-14">
        <nav>
          <ul>
            {bookmarks.map(({ href, text, tag }) => (
              <li
                className="group flex transition-colors even:bg-cat-mantle rounded"
                key={href}
              >
                <a
                  href={href}
                  target="_blank"
                  className={cx(
                    "flex w-full flex-col px-6 py-4 gap-1 text-cat-text transition relateive",
                    "hover:bg-cat-surface0/80 active:ring-2 active:ring-cat-overlay2",
                    "focus-visible:ring-2 focus-visible:ring-cat-blue rounded",
                  )}
                >
                  <span className="flex gap-4 justify-between items-center">
                    <span className="font-medium transition-colors">
                      {text.at(0)}
                    </span>
                    <span className="text-cat-subtext1 transition-colors text-sm rounded-xl px-2 border border-cat-surface1">
                      {tag}
                    </span>
                  </span>

                  <span className="text-sm text-cat-subtext1 transition-colors group-hover:text-cat-text">
                    {text.at(1)}
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
