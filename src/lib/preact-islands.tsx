import type { FunctionalComponent } from "preact"
import hydrate from "preact-iso/hydrate"

// ── Internal types ──────────────────────────────────────────────

type ObjectAny = Record<PropertyKey, unknown>

type IslandProps = {
  visible?: boolean
  media?: string
}

type IslandComponent<P extends ObjectAny = ObjectAny> = FunctionalComponent<P & IslandProps> & {
  __islandName: string
}

// ── Browser detection ───────────────────────────────────────────

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof customElements !== "undefined"
}

// ── Public API ────────────────────────────────────────────────────

export function island<P extends ObjectAny>(
  Component: FunctionalComponent<P> & { displayName?: string; name?: string },
): IslandComponent<P> {
  const name = Component.displayName || Component.name

  if (!name) {
    throw new Error(
      "island() requires a named component. Anonymous functions are not allowed. " +
        "Use a named function or set Component.displayName.",
    )
  }

  const Wrapper: IslandComponent<P> = (props: P & IslandProps) => {
    const { visible, media, ...runtimeProps } = props

    if (isBrowser()) {
      return <Component {...(runtimeProps as P)} />
    }

    return (
      <preact-island src={name} visible={visible} media={media}>
        <Component {...(runtimeProps as P)} />
      </preact-island>
    )
  }

  Wrapper.__islandName = name

  return Wrapper
}

let islandsConfig: Record<string, () => Promise<{ default: IslandComponent }>> = {}

function createPreactIslandClass(): typeof HTMLElement {
  return class PreactIsland extends HTMLElement {
    async connectedCallback() {
      const src = this.getAttribute("src")
      if (!src) {
        throw new Error("preact-island element is missing the 'src' attribute")
      }

      if (!Object.hasOwn(islandsConfig, src)) {
        throw new Error(`${src} is not a registered island`)
      }

      if (this.hasAttribute("media")) {
        await waitForMedia(this.getAttribute("media")!)
      }

      if (this.hasAttribute("visible")) {
        await waitForVisible(this)
      }

      const load = islandsConfig[src]
      if (!load) throw new Error(`${src} loader is undefined`)

      const mod = await load()
      const Component = mod.default

      if (!Component.__islandName) {
        throw new Error(
          `Island "${src}" does not export an island component. ` +
            `Make sure the component is wrapped with island().`,
        )
      }

      if (Component.__islandName !== src) {
        throw new Error(
          `Island name mismatch: registry key is "${src}" ` +
            `but component.__islandName is "${Component.__islandName}".`,
        )
      }

      hydrate(<Component />, this)
    }
  }
}

export function registerIslands<
  C extends Record<string, () => Promise<{ default: IslandComponent }>>,
>(config: C): void {
  islandsConfig = config
  if (!isBrowser()) return
  if (customElements.get("preact-island")) return

  customElements.define("preact-island", createPreactIslandClass())
}

// ── Testable helpers ────────────────────────────────────────────

export function waitForVisible(element: Element): Promise<void> {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.disconnect()
          resolve()
        }
      }
    })
    observer.observe(element)
  })
}

export function waitForMedia(query: string): Promise<void> {
  const mediaQuery = globalThis.matchMedia(query)

  return new Promise((resolve) => {
    function mediaListener(e: MediaQueryListEvent) {
      if (!e.matches) return
      resolve()
      mediaQuery.removeEventListener("change", mediaListener)
    }

    if (mediaQuery.matches) resolve()
    else mediaQuery.addEventListener("change", mediaListener)
  })
}

// ── JSX intrinsic element declaration ─────────────────────────────

declare module "preact/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "preact-island": JSX.HTMLAttributes<HTMLElement> & {
        visible?: boolean | string
        media?: string
        src?: string
      }
    }
  }
}
