import { FunctionalComponent, hydrate } from "preact";

import { ObjectAny } from "../../../examples/types/polymorphic.ts";

const isBrowser = () => typeof document !== "undefined";

export type IslandsConfig = Record<
  string,
  () => Promise<{ default: (props: IslandProps) => JSX.Element }>
>;

/**
 * Type guard.
 * Determines whether an object has a property with the specified name.
 * */
function isKeyOf<R extends Record<PropertyKey, unknown>>(
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

type IslandProps = {
  visible?: boolean;
  media?: string;
};

export function withIsland<S, Props extends ObjectAny>(
  Component: FunctionalComponent<Props>,
  src: S extends IslandsConfig ? keyof S : string,
) {
  return (props: Props & IslandProps) => {
    const { visible, media, ...runTimeProps } = props;
    if (isBrowser()) return <Component {...(runTimeProps as Props)} />;

    return (
      <x-island src={String(src)} visible={visible} media={media}>
        <Component {...(runTimeProps as Props)} />
      </x-island>
    );
  };
}

export function hydrateIslands<C extends IslandsConfig>(config: C) {
  if (!isBrowser()) return;

  customElements.define(
    "x-island",
    class extends HTMLElement {
      async connectedCallback() {
        const src = this.getAttribute("src");

        if (!isKeyOf(config, src))
          throw new Error(`${src} is not a registered island`);

        if (this.hasAttribute("visible")) await this.visible();

        if (this.hasAttribute("media"))
          await this.media(this.getAttribute("media")!);

        const load = config[src];
        const Component = await load();
        hydrate(<Component.default />, this);
      }

      visible() {
        return new Promise(resolve => {
          const observer = new IntersectionObserver(entries => {
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
        return new Promise(resolve => {
          const mediaListener = (e: MediaQueryListEvent) => {
            if (e.matches) {
              resolve(true);
              mediaQuery.removeEventListener("change", mediaListener);
            }
          };

          if (mediaQuery.matches) resolve(true);
          else {
            mediaQuery.addEventListener("change", mediaListener);
          }
        });
      }
    },
  );
}

declare module "preact/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "x-island": JSX.HTMLAttributes<HTMLElement> & {
        visible?: boolean | string;
        media?: string;
      };
    }
  }
}
