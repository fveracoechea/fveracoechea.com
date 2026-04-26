import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import RSS from "rss"
import type { Plugin } from "vite"

type Post = {
  title: string
  description: string
  image: string
  date: string
  url: string
  published: boolean
}

type Snippet = {
  title: string
  description: string
  slug: string
  url: string
}

const SITE_URL = "https://fveracoechea.com"
const SITE_TITLE = "Francisco Veracoechea"
const SITE_DESCRIPTION = "Web engineering experimentation, learning, and ideas worth sharing"

function stripExport(content: string): string {
  const match = content.match(/export\s+default\s+(\[[\s\S]*\])\s*;?\s*$/)
  return match?.[1] ?? "[]"
}

function readCCData<T>(filename: string): T[] {
  try {
    const content = readFileSync(`.content-collections/generated/${filename}`, "utf-8")
    return JSON.parse(stripExport(content)) as T[]
  } catch {
    return []
  }
}

export function feedsPlugin(): Plugin {
  return {
    name: "feeds-sitemap",
    async closeBundle() {
      const posts = readCCData<Post>("allPosts.js")
      const snippets = readCCData<Snippet>("allSnippets.js")

      const publishedPosts = posts
        .filter((p) => p.published && p.date)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 8)

      const distDir = "dist"
      mkdirSync(distDir, { recursive: true })

      // RSS feed
      const feed = new RSS({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        feed_url: `${SITE_URL}/blog.rss`,
        site_url: SITE_URL,
        language: "en",
        pubDate: new Date().toUTCString(),
      })

      for (const post of publishedPosts) {
        feed.item({
          title: post.title,
          description: post.description,
          url: `${SITE_URL}${post.url}`,
          date: new Date(post.date),
          enclosure: post.image ? { url: `${SITE_URL}${post.image}` } : undefined,
        })
      }

      writeFileSync(`${distDir}/blog.rss`, feed.xml())

      // JSON feed
      const jsonFeed = {
        version: "https://jsonfeed.org/version/1.1",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        home_page_url: SITE_URL,
        feed_url: `${SITE_URL}/blog.json`,
        language: "en",
        items: publishedPosts.map((post) => ({
          id: `${SITE_URL}${post.url}`,
          url: `${SITE_URL}${post.url}`,
          title: post.title,
          content_html: post.description,
          date_published: new Date(post.date).toISOString(),
          image: post.image ? `${SITE_URL}${post.image}` : undefined,
        })),
      }

      writeFileSync(`${distDir}/blog.json`, JSON.stringify(jsonFeed, null, 2))

      // Sitemap
      const pages = [
        SITE_URL,
        `${SITE_URL}/bookmarks`,
        `${SITE_URL}/snippets`,
        ...posts.filter((p) => p.published).map((p) => `${SITE_URL}${p.url}`),
        ...snippets.map((s) => `${SITE_URL}${s.url}`),
      ]

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`

      writeFileSync(`${distDir}/sitemap.xml`, sitemap)

      console.log("Generated blog.rss, blog.json, sitemap.xml")
    },
  }
}
