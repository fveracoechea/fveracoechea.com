import { allPosts, allSnippets } from "content-collections"
import hydrate from "preact-iso/hydrate"
import render from "preact-iso/prerender"
import { ISLANDS } from "./islands.ts"
import { registerIslands } from "./lib/preact-islands.tsx"

import "./styles.css"

const isDEV = import.meta.env.MODE === "development"
const isBrowser = typeof window !== "undefined"

if (isBrowser && isDEV) {
  import("./App.tsx").then(({ App }) => {
    hydrate(<App />, document.getElementById("app")!)
  })
}

if (isBrowser && !isDEV) {
  registerIslands(ISLANDS)
}

const SITE_TITLE = "Francisco Veracoechea"
const SITE_DESCRIPTION = "Web engineering experimentation, learning, and ideas worth sharing"
const SITE_URL = "https://fveracoechea.com"

const postMap = new Map(allPosts.map((p) => [`/blog/${p.slug}`, p]))
const snippetMap = new Map(allSnippets.map((s) => [`/snippets/${s.slug}`, s]))

function getHeadMeta(url: string) {
  const post = postMap.get(url)
  if (post?.published) {
    return {
      title: `${post.title} - ${SITE_TITLE}`,
      description: post.description,
      image: `${SITE_URL}${post.image}`,
    }
  }

  const snippet = snippetMap.get(url)
  if (snippet) {
    return {
      title: `${snippet.title} - ${SITE_TITLE}`,
      description: snippet.description,
    }
  }

  if (url === "/bookmarks") {
    return {
      title: `Bookmarks - ${SITE_TITLE}`,
      description: "My bookmarks",
      image: `${SITE_URL}/images/open-graph.jpg`,
    }
  }

  if (url === "/snippets") {
    return {
      title: `Code snippets - ${SITE_TITLE}`,
      description: "A curated collection of tips, tricks, and reusable code blocks",
      image: `${SITE_URL}/images/open-graph.jpg`,
    }
  }

  return {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    image: `${SITE_URL}/images/open-graph.jpg`,
  }
}

export async function prerender(data: { url: string }) {
  const { App } = await import("./App.tsx")
  const result = await render(<App url={data.url} />)

  const meta = getHeadMeta(data.url)

  return {
    ...result,
    head: {
      title: meta.title,
      lang: "en-US",
      elements: new Set([
        { type: "meta", props: { name: "description", content: meta.description } },
        { type: "meta", props: { property: "og:title", content: meta.title } },
        { type: "meta", props: { property: "og:description", content: meta.description } },
        ...(meta.image
          ? [{ type: "meta" as const, props: { property: "og:image", content: meta.image } }]
          : []),
      ]),
    },
  }
}
