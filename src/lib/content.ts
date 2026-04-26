import { allPosts, allSnippets } from "content-collections"
import { computeContent, SITE } from "./content-logic"
import type { Post, Snippet } from "./schemas"

export type { Post, Snippet }
export { SITE }

export type ArticleCard = {
  url: string
  title: string
  image: string
  description: string
  date: string
}

const computed = computeContent(allPosts, allSnippets, SITE)

export const posts: readonly Post[] = computed.posts.published
export const snippets: readonly Snippet[] = computed.snippets.sorted

export const articles: readonly ArticleCard[] = posts.map((p) => ({
  url: p.url,
  title: p.title,
  image: p.image,
  description: p.description,
  date: p.date ?? "",
}))

export function getPost(slug: string): Post | undefined {
  return computed.posts.bySlug.get(slug)
}

export function getSnippet(slug: string): Snippet | undefined {
  return computed.snippets.bySlug.get(slug)
}

export function getPostRoutes(): string[] {
  return [...computed.posts.routes]
}

export function getSnippetRoutes(): string[] {
  return [...computed.snippets.routes]
}

export function getHeadMeta(url: string): { title: string; description: string; image?: string } {
  return computed.headMeta(url)
}

export function getFeedPosts(limit?: number): Post[] {
  return computed.posts.feedPosts(limit)
}

export function getSitemapUrls(): string[] {
  return [...computed.sitemapUrls]
}
