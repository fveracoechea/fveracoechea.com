declare module "rss" {
  interface RSSOptions {
    title: string
    description?: string
    feed_url: string
    site_url: string
    image_url?: string
    language?: string
    pubDate?: Date | string
    ttl?: number
    custom_elements?: Record<string, unknown>[]
  }
  interface RSSItem {
    title: string
    description?: string
    url: string
    date: Date | string
    categories?: string[]
    author?: string
    enclosure?: { url: string }
    custom_elements?: Record<string, unknown>[]
  }
  class RSS {
    constructor(options: RSSOptions)
    item(item: RSSItem): void
    xml(): string
  }
  export = RSS
}
