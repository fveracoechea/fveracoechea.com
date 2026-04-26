import { z } from "zod"

export const PostFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  date: z.string().optional(),
  published: z.boolean().default(true),
})

export const PostSchema = PostFrontmatterSchema.extend({
  slug: z.string(),
  url: z.string(),
})

export const SnippetFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number().default(0),
})

export const SnippetSchema = SnippetFrontmatterSchema.extend({
  slug: z.string(),
  url: z.string(),
})

export type Post = z.infer<typeof PostSchema>
export type Snippet = z.infer<typeof SnippetSchema>
