import { h } from "preact"
import renderToString from "preact-render-to-string"
import { describe, expect, it } from "vitest"
import { island } from "./preact-islands.tsx"

describe("island SSR rendering", () => {
  it("renders <preact-island> wrapper when isBrowser returns false", () => {
    function TestComponent() {
      return h("span", null, "content")
    }
    const Wrapped = island(TestComponent)
    const html = renderToString(h(Wrapped, null))

    // In node environment (no window/customElements), isBrowser() returns false
    expect(html).toContain("<preact-island")
    expect(html).toContain('src="TestComponent"')
    expect(html).toContain("<span>content</span>")
  })

  it("passes visible and media attributes in SSR", () => {
    function TestComponent() {
      return h("span", null, "hi")
    }
    const Wrapped = island(TestComponent)
    const html = renderToString(h(Wrapped, { visible: true, media: "(min-width: 768px)" }))

    expect(html).toContain("<preact-island")
    expect(html).toContain("visible")
    expect(html).toContain('media="(min-width: 768px)"')
  })
})
