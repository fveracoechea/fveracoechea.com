import hydrate from "preact-iso/hydrate"
import render from "preact-iso/prerender"
import { getHeadMeta } from "./lib/content"
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
  registerIslands()
}

export async function prerender(data: { url: string }) {
  const { App } = await import("./App.tsx")
  const result = await render(<App />)

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
