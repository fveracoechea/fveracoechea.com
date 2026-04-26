import contentCollections from "@content-collections/vite"
import mdx from "@mdx-js/rollup"
import preact from "@preact/preset-vite"
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc"
import rehypeExtractTocMdx from "@stefanprobst/rehype-extract-toc/mdx"
import tailwindcss from "@tailwindcss/vite"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import { defineConfig } from "vite"
import { getPublishedBlogRoutes, getSnippetRoutesFromDisk } from "./src/lib/content-build"
import { feedsPlugin } from "./src/plugins/feeds-sitemap"

export default defineConfig({
  resolve: {
    alias: {
      cva: "class-variance-authority",
    },
  },
  plugins: [
    contentCollections(),
    mdx({
      jsxImportSource: "preact",
      providerImportSource: "@mdx-js/preact",
      remarkPlugins: [remarkFrontmatter],
      rehypePlugins: [rehypeSlug, rehypeExtractToc, rehypeExtractTocMdx, rehypeHighlight],
    }),
    tailwindcss(),
    feedsPlugin(),
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
        additionalPrerenderRoutes: [
          "/404",
          "/bookmarks",
          ...getPublishedBlogRoutes(),
          ...getSnippetRoutesFromDisk(),
        ],
        previewMiddlewareEnabled: true,
        previewMiddlewareFallback: "/404",
      },
    }),
  ],
})
