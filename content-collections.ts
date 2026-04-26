import { defineCollection, defineConfig } from "@content-collections/core"
import { PostFrontmatterSchema, SnippetFrontmatterSchema } from "./src/lib/schemas"

const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "*.mdx",
  parser: "frontmatter-only",
  schema: PostFrontmatterSchema,
  transform: ({ _meta, ...post }) => {
    const slug = _meta.path
    return {
      ...post,
      slug,
      url: `/blog/${slug}`,
    }
  },
})

const snippets = defineCollection({
  name: "snippets",
  directory: "content/snippets",
  include: "*.mdx",
  parser: "frontmatter-only",
  schema: SnippetFrontmatterSchema,
  transform: ({ _meta, ...snippet }) => {
    const slug = _meta.path
    return {
      ...snippet,
      slug,
      url: `/snippets/${slug}`,
    }
  },
})

export default defineConfig({
  content: [posts, snippets],
})
