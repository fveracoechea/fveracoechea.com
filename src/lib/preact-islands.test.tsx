/**
 * @vitest-environment happy-dom
 */

import { h } from "preact"
import renderToString from "preact-render-to-string"
import { describe, expect, it, vi } from "vitest"
import {
  isBrowser,
  island,
  registerIslands,
  waitForMedia,
  waitForVisible,
} from "./preact-islands.tsx"

describe("isBrowser", () => {
  it("returns true in a browser environment", () => {
    expect(isBrowser()).toBe(true)
  })
})

describe("island", () => {
  function NamedComponent() {
    return h("div", null, "hello")
  }

  it("derives __islandName from function name", () => {
    const Wrapped = island(NamedComponent)
    expect(Wrapped.__islandName).toBe("NamedComponent")
  })

  it("throws for anonymous functions", () => {
    expect(() => island(() => h("div", null, "hello"))).toThrow(
      "island() requires a named component",
    )
  })

  it("uses displayName when provided", () => {
    function MyComponent() {
      return h("div", null, "hello")
    }
    MyComponent.displayName = "CustomName"

    const Wrapped = island(MyComponent)
    expect(Wrapped.__islandName).toBe("CustomName")
  })

  it("renders component directly in browser", () => {
    function TestComponent() {
      return h("span", null, "client")
    }
    const Wrapped = island(TestComponent)
    const html = renderToString(h(Wrapped, null))

    // In happy-dom environment, isBrowser() returns true, so no wrapper
    expect(html).not.toContain("<preact-island")
    expect(html).toContain("<span>client</span>")
  })

  it("passes runtime props through (omitting island props)", () => {
    function TestComponent(props: { message: string }) {
      return h("span", null, props.message)
    }
    const Wrapped = island(TestComponent)
    const html = renderToString(h(Wrapped, { message: "world", visible: true }))

    // In browser mode, visible should not be passed to the component
    expect(html).toContain("<span>world</span>")
  })
})

describe("registerIslands", () => {
  it("defines the custom element for valid islands", async () => {
    function ValidIsland() {
      return h("div", null, "ok")
    }
    const ValidIslandComponent = island(ValidIsland)

    // Clear any previously defined element
    // @ts-expect-error - happy-dom internal api
    if (customElements._registry) customElements._registry.delete("preact-island")

    registerIslands({
      ValidIsland: async () => ({ default: ValidIslandComponent }),
    })

    expect(customElements.get("preact-island")).toBeDefined()
  })

  it("is idempotent when called multiple times", () => {
    function IslandA() {
      return h("div", null, "a")
    }

    registerIslands({
      IslandA: async () => ({ default: island(IslandA) }),
    })

    // Second call should not throw
    expect(() =>
      registerIslands({
        IslandA: async () => ({ default: island(IslandA) }),
      }),
    ).not.toThrow()
  })

  it("throws on name mismatch during hydration", async () => {
    function WrongIsland() {
      return h("div", null, "oops")
    }
    const WrongIslandComponent = island(WrongIsland)

    // @ts-expect-error - happy-dom internal api
    if (customElements._registry) customElements._registry.delete("preact-island")

    registerIslands({
      RightIsland: async () => ({ default: WrongIslandComponent }),
    })

    const el = document.createElement("preact-island")
    el.setAttribute("src", "RightIsland")

    await expect(
      (el as HTMLElement & { connectedCallback(): Promise<void> }).connectedCallback(),
    ).rejects.toThrow("Island name mismatch")
  })

  it("throws when default export is not an island component", async () => {
    function PlainComponent() {
      return h("div", null, "plain")
    }

    // @ts-expect-error - happy-dom internal api
    if (customElements._registry) customElements._registry.delete("preact-island")

    registerIslands({
      PlainComponent: async () => ({ default: PlainComponent as never }),
    })

    const el = document.createElement("preact-island")
    el.setAttribute("src", "PlainComponent")

    await expect(
      (el as HTMLElement & { connectedCallback(): Promise<void> }).connectedCallback(),
    ).rejects.toThrow("does not export an island component")
  })

  it("throws when src attribute is missing", async () => {
    function SomeIsland() {
      return h("div", null, "hi")
    }
    const SomeIslandComponent = island(SomeIsland)

    // @ts-expect-error - happy-dom internal api
    if (customElements._registry) customElements._registry.delete("preact-island")

    registerIslands({
      SomeIsland: async () => ({ default: SomeIslandComponent }),
    })

    const el = document.createElement("preact-island")

    await expect(
      (el as HTMLElement & { connectedCallback(): Promise<void> }).connectedCallback(),
    ).rejects.toThrow("missing the 'src' attribute")
  })

  it("throws for unregistered island src", async () => {
    function RegIsland() {
      return h("div", null, "hi")
    }
    const RegIslandComponent = island(RegIsland)

    // @ts-expect-error - happy-dom internal api
    if (customElements._registry) customElements._registry.delete("preact-island")

    registerIslands({
      RegIsland: async () => ({ default: RegIslandComponent }),
    })

    const el = document.createElement("preact-island")
    el.setAttribute("src", "UnknownIsland")

    await expect(
      (el as HTMLElement & { connectedCallback(): Promise<void> }).connectedCallback(),
    ).rejects.toThrow("is not a registered island")
  })
})

describe("waitForVisible", () => {
  it("resolves when IntersectionObserver fires isIntersecting", async () => {
    const mockObserve = vi.fn()
    const mockDisconnect = vi.fn()

    let callback: ((entries: Array<{ isIntersecting: boolean }>) => void) | null = null

    globalThis.IntersectionObserver = class MockIntersectionObserver {
      constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
        callback = cb
      }
      observe = mockObserve
      disconnect = mockDisconnect
    } as unknown as typeof IntersectionObserver

    const el = document.createElement("div")
    const promise = waitForVisible(el)

    expect(mockObserve).toHaveBeenCalledWith(el)
    expect(callback).not.toBeNull()

    callback!([{ isIntersecting: true }])

    await expect(promise).resolves.toBeUndefined()
    expect(mockDisconnect).toHaveBeenCalled()
  })
})

describe("waitForMedia", () => {
  it("resolves immediately when media query already matches", async () => {
    const mockAddEventListener = vi.fn()
    const mockRemoveEventListener = vi.fn()

    globalThis.matchMedia = vi.fn(() => ({
      matches: true,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    })) as unknown as typeof matchMedia

    await expect(waitForMedia("(min-width: 768px)")).resolves.toBeUndefined()
    expect(mockAddEventListener).not.toHaveBeenCalled()
  })

  it("resolves when media query starts matching", async () => {
    const mockAddEventListener = vi.fn()
    const mockRemoveEventListener = vi.fn()
    let listener: ((e: MediaQueryListEvent) => void) | null = null

    globalThis.matchMedia = vi.fn(() => ({
      matches: false,
      addEventListener: (_event: string, cb: (e: MediaQueryListEvent) => void) => {
        listener = cb
        mockAddEventListener(_event, cb)
      },
      removeEventListener: mockRemoveEventListener,
    })) as unknown as typeof matchMedia

    const promise = waitForMedia("(min-width: 768px)")

    expect(mockAddEventListener).toHaveBeenCalled()
    expect(listener).not.toBeNull()

    listener!({ matches: true } as MediaQueryListEvent)

    await expect(promise).resolves.toBeUndefined()
    expect(mockRemoveEventListener).toHaveBeenCalled()
  })
})
