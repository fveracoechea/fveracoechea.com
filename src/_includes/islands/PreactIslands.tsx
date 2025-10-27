import { FunctionalComponent, hydrate } from "preact";

import { IslandProps, IslandsConfig, ObjectAny } from "./types.ts";

export function isBrowser() {
  return typeof document !== "undefined";
}

/**
 * Type guard.
 * Determines whether an object has a property with the specified name.
 */
export function isKeyOf<R extends Record<PropertyKey, unknown>>(
  record: R,
  key: unknown,
): key is keyof R {
  return (
    (typeof key === "string" ||
      typeof key === "number" ||
      typeof key === "symbol") &&
    Object.prototype.hasOwnProperty.call(record, key)
  );
}

export function withIsland<S, Props extends ObjectAny>(
  Component: FunctionalComponent<Props>,
  src: S extends IslandsConfig ? keyof S : string,
) {
  return (props: Props & IslandProps) => {
    const { visible, media, ...runTimeProps } = props;
    if (isBrowser()) return <Component {...(runTimeProps as Props)} />;

    return (
      <preact-island src={String(src)} visible={visible} media={media}>
        <Component {...(runTimeProps as Props)} />
      </preact-island>
    );
  };
}

export function registerIslands<C extends IslandsConfig>(config: C) {
  if (!isBrowser()) return;

  customElements.define(
    "preact-island",
    class PreactIsland extends HTMLElement {
      static config: IslandsConfig = config;

      async connectedCallback() {
        const src = this.getAttribute("src");

        if (!isKeyOf(PreactIsland.config, src)) {
          throw new Error(`${src} is not a registered island`);
        }

        if (this.hasAttribute("media")) {
          await this.media(this.getAttribute("media")!);
        }

        if (this.hasAttribute("visible")) await this.visible();

        const load = PreactIsland.config[src];
        const Component = await load();
        hydrate(<Component.default />, this);
      }

      visible() {
        return new Promise((resolve) => {
          const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                observer.disconnect();
                resolve(true);
              }
            }
          });
          observer.observe(this);
        });
      }

      media(query: string) {
        const mediaQuery = globalThis.matchMedia(query);

        return new Promise((resolve) => {
          function mediaListener(e: MediaQueryListEvent) {
            if (!e.matches) return;
            resolve(true);
            mediaQuery.removeEventListener("change", mediaListener);
          }

          if (mediaQuery.matches) resolve(true);
          else mediaQuery.addEventListener("change", mediaListener);
        });
      }
    },
  );
}

declare module "preact/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "preact-island": JSX.HTMLAttributes<HTMLElement> & {
        visible?: boolean | string;
        media?: string;
        src?: string;
      };
    }
  }
}
