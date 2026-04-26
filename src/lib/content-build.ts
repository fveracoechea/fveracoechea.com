import { readFileSync } from "node:fs"
import { computeContent, SITE } from "./content-logic"
import type { Post, Snippet } from "./schemas"

export { SITE }

export function readFromDisk<T>(filename: string): T[] {
  const content = readFileSync(`.content-collections/generated/${filename}`, "utf-8")
  const stripped = content
    .trim()
    .replace(/^export\s+default\s+/, "")
    .replace(/;\s*$/, "")
  return JSON.parse(stripped) as T[]
}

export function getPublishedBlogRoutes(): string[] {
  const posts = readFromDisk<Post>("allPosts.js")
  const content = computeContent(posts, [], SITE)
  return [...content.posts.routes]
}

export function getSnippetRoutesFromDisk(): string[] {
  const snippets = readFromDisk<Snippet>("allSnippets.js")
  const content = computeContent([], snippets, SITE)
  return ["/snippets", ...content.snippets.routes]
}
