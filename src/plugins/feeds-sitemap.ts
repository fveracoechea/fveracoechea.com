import { mkdirSync, writeFileSync } from "node:fs"
import RSS from "rss"
import type { Plugin } from "vite"
import { readFromDisk, SITE } from "../lib/content-build"
import { computeContent, type RawPost, type RawSnippet } from "../lib/content-logic"

export function feedsPlugin(): Plugin {
  return {
    name: "feeds-sitemap",
    async closeBundle() {
      const posts = readFromDisk<RawPost>("allPosts.js")
      const snippets = readFromDisk<RawSnippet>("allSnippets.js")

      const content = computeContent(posts, snippets, SITE)
      const feedPosts = content.posts.feedPosts(8)

      const distDir = "dist"
      mkdirSync(distDir, { recursive: true })

      // RSS feed
      const feed = new RSS({
        title: SITE.title,
        description: SITE.description,
        feed_url: `${SITE.url}/blog.rss`,
        site_url: SITE.url,
        language: "en",
        pubDate: new Date().toUTCString(),
      })

      for (const post of feedPosts) {
        feed.item({
          title: post.title,
          description: post.description,
          url: `${SITE.url}${post.url}`,
          date: new Date(post.date!),
          enclosure: post.image ? { url: `${SITE.url}${post.image}` } : undefined,
        })
      }

      writeFileSync(`${distDir}/blog.rss`, feed.xml())

      // JSON feed
      const jsonFeed = {
        version: "https://jsonfeed.org/version/1.1",
        title: SITE.title,
        description: SITE.description,
        home_page_url: SITE.url,
        feed_url: `${SITE.url}/blog.json`,
        language: "en",
        items: feedPosts.map((post) => ({
          id: `${SITE.url}${post.url}`,
          url: `${SITE.url}${post.url}`,
          title: post.title,
          content_html: post.description,
          date_published: new Date(post.date!).toISOString(),
          image: post.image ? `${SITE.url}${post.image}` : undefined,
        })),
      }

      writeFileSync(`${distDir}/blog.json`, JSON.stringify(jsonFeed, null, 2))

      // Sitemap
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${content.sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`

      writeFileSync(`${distDir}/sitemap.xml`, sitemap)

      console.log("Generated blog.rss, blog.json, sitemap.xml")
    },
  }
}
