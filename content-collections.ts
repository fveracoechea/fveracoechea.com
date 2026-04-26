import { defineCollection, defineConfig } from "@content-collections/core"
import { z } from "zod"

const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "*.mdx",
  parser: "frontmatter-only",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    date: z.string().optional(),
    published: z.boolean().default(true),
  }),
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
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
  }),
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
