import { allPosts, allSnippets } from "content-collections"
import { computeContent, type RawPost, type RawSnippet, SITE } from "./content-logic"

export { SITE }

export type Post = (typeof allPosts)[number]
export type Snippet = (typeof allSnippets)[number]
export type ArticleCard = {
  url: string
  title: string
  image: string
  description: string
  date: string
}

const computed = computeContent(
  allPosts as unknown as readonly RawPost[],
  allSnippets as unknown as readonly RawSnippet[],
  SITE,
)

export const posts: readonly Post[] = computed.posts.published as readonly Post[]
export const snippets: readonly Snippet[] = computed.snippets.sorted as readonly Snippet[]

export const articles: readonly ArticleCard[] = posts.map((p) => ({
  url: p.url,
  title: p.title,
  image: p.image,
  description: p.description,
  date: p.date ?? "",
}))

export function getPost(slug: string): Post | undefined {
  return computed.posts.bySlug.get(slug) as Post | undefined
}

export function getSnippet(slug: string): Snippet | undefined {
  return computed.snippets.bySlug.get(slug) as Snippet | undefined
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
  return computed.posts.feedPosts(limit) as Post[]
}

export function getSitemapUrls(): string[] {
  return [...computed.sitemapUrls]
}
