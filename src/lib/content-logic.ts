import type { Post, Snippet } from "./schemas"

export interface SiteConfig {
  url: string
  title: string
  description: string
}

export interface Content {
  readonly posts: {
    readonly published: readonly Post[]
    readonly bySlug: ReadonlyMap<string, Post>
    readonly byUrl: ReadonlyMap<string, Post>
    readonly routes: readonly string[]
    readonly feedPosts: (limit?: number) => Post[]
  }
  readonly snippets: {
    readonly sorted: readonly Snippet[]
    readonly bySlug: ReadonlyMap<string, Snippet>
    readonly byUrl: ReadonlyMap<string, Snippet>
    readonly routes: readonly string[]
  }
  readonly sitemapUrls: readonly string[]
  readonly headMeta: (url: string) => { title: string; description: string; image?: string }
  readonly site: SiteConfig
}

export const SITE = {
  url: "https://fveracoechea.com",
  title: "Francisco Veracoechea",
  description: "Web engineering experimentation, learning, and ideas worth sharing",
} as const satisfies SiteConfig

export function computeContent(
  rawPosts: readonly Post[],
  rawSnippets: readonly Snippet[],
  config: SiteConfig,
): Content {
  const publishedPosts = rawPosts
    .filter((p) => p.published)
    .sort((a, b) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return b.date.localeCompare(a.date)
    })

  const postBySlug = new Map(publishedPosts.map((p) => [p.slug, p]))
  const postByUrl = new Map(publishedPosts.map((p) => [p.url, p]))

  const sortedSnippets = [...rawSnippets].sort((a, b) => b.order - a.order)
  const snippetBySlug = new Map(sortedSnippets.map((s) => [s.slug, s]))
  const snippetByUrl = new Map(sortedSnippets.map((s) => [s.url, s]))

  const postRoutes = publishedPosts.map((p) => p.url)
  const snippetRoutes = sortedSnippets.map((s) => s.url)

  const feedPosts = (limit?: number) =>
    publishedPosts.filter((p) => p.published && p.date).slice(0, limit)

  const sitemapUrls = [
    config.url,
    `${config.url}/bookmarks`,
    `${config.url}/snippets`,
    ...publishedPosts.map((p) => `${config.url}${p.url}`),
    ...sortedSnippets.map((s) => `${config.url}${s.url}`),
  ]

  const headMeta = (url: string) => {
    const post = postByUrl.get(url)
    if (post) {
      return {
        title: `${post.title} - ${config.title}`,
        description: post.description,
        image: `${config.url}${post.image}`,
      }
    }

    const snippet = snippetByUrl.get(url)
    if (snippet) {
      return {
        title: `${snippet.title} - ${config.title}`,
        description: snippet.description,
      }
    }

    if (url === "/bookmarks") {
      return {
        title: `Bookmarks - ${config.title}`,
        description: "My bookmarks",
        image: `${config.url}/images/open-graph.jpg`,
      }
    }

    if (url === "/snippets") {
      return {
        title: `Code snippets - ${config.title}`,
        description: "A curated collection of tips, tricks, and reusable code blocks",
        image: `${config.url}/images/open-graph.jpg`,
      }
    }

    return {
      title: config.title,
      description: config.description,
      image: `${config.url}/images/open-graph.jpg`,
    }
  }

  return {
    posts: {
      published: publishedPosts,
      bySlug: postBySlug,
      byUrl: postByUrl,
      routes: postRoutes,
      feedPosts,
    },
    snippets: {
      sorted: sortedSnippets,
      bySlug: snippetBySlug,
      byUrl: snippetByUrl,
      routes: snippetRoutes,
    },
    sitemapUrls,
    headMeta,
    site: config,
  }
}
