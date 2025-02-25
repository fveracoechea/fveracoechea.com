import nano from "cssnano";
import lume from "lume/mod.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import mdx from "lume/plugins/mdx.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import robots from "lume/plugins/robots.ts";
import sitemap from "lume/plugins/sitemap.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import rehypeSlug from "rehype-slug";

import extractToc from "./src/_plugins/mdxToc.ts";
import snippets from "./src/_plugins/snippets.ts";
import tailwindConfig from "./tailwind.config.ts";

const site = lume(
  {
    src: "./src",
    location: new URL("https://fveracoechea.com"),
  },
  {
    markdown: {
      extensions: [".md", ".mdx"],
    },
  },
);

site.use(date());

// rendering
site.use(jsx({}));
site.use(code_highlight());
site.use(
  mdx({
    rehypePlugins: [rehypeSlug],
  }),
);

// custom plugins
site.use(extractToc("post"));
site.use(snippets());

site.use(
  esbuild({
    extensions: [".ts", ".tsx"],
    options: {
      minify: true,
      legalComments: "none",
      splitting: true,
    },
  }),
);

site.use(
  feed({
    output: ["/blog.rss", "/blog.json"],
    query: "type=post published=true",
    limit: 8,
    sort: "date=desc",
    info: {
      title: "=site.title",
      description: "=site.description",
      published: new Date(), // The publishing date
      lang: "en", // The language of the feed
      generator: true,
    },
    items: {
      title: "=title",
      description: "=description",
      published: "=date",
      content: "=children",
      lang: "en",
      // @ts-ignore wrong types
      image: "=image",
    },
  }),
);

// styles
site.use(
  tailwindcss({
    extensions: [".html", ".mdx", ".tsx"],
    options: tailwindConfig,
  }),
);

site.use(
  postcss({
    includes: "_styles",
  }),
);
site.hooks.addPostcssPlugin(nano);

// site.use(
//   ogImages({
//     // @ts-ignore invalid type
//     satori: {
//       width: 750,
//       height: 400,
//     },
//   }),
// );

site.use(metas(/* Options */));
// Explicit allow access to Google and Bing
site.use(
  robots({
    allow: ["Googlebot", "Bingbot"],
  }),
);
site.use(
  sitemap({
    filename: "sitemap.xml", // to change the sitemap filename
    sort: "date=desc", // To sort by data in ascendent order
  }),
);

// static assets
site.use(favicon());
// Copy the content of "assets" directory to the root of your site
site.copy("assets", ".");

export default site;
