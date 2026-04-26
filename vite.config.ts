import { readdirSync, readFileSync } from "node:fs"
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
import { feedsPlugin } from "./src/plugins/feeds-sitemap.ts"

function getPublishedBlogRoutes() {
  return readdirSync("content/blog")
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .filter((f) => {
      const content = readFileSync(`content/blog/${f}`, "utf-8")
      return !content.includes("published: false")
    })
    .map((f) => `/blog/${f.replace(".mdx", "")}`)
}

function getSnippetRoutes() {
  return [
    "/snippets",
    ...readdirSync("content/snippets")
      .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
      .map((f) => `/snippets/${f.replace(".mdx", "")}`),
  ]
}

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
          ...getSnippetRoutes(),
        ],
        previewMiddlewareEnabled: true,
        previewMiddlewareFallback: "/404",
      },
    }),
  ],
})
