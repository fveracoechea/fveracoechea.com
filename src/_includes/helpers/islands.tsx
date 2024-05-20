import { FunctionalComponent, hydrate } from 'preact';

const isBrowser = () => typeof document !== 'undefined';

export type IslandsConfig = Record<
  string,
  () => Promise<{ default: (props: IslandProps) => JSX.Element }>
>;

export function isIsland(
  k: unknown,
  islands: IslandsConfig,
): k is keyof typeof islands {
  return typeof k === 'string' && k in islands;
}

type IslandProps = {
  visible?: boolean;
  media?: string;
};

export function withIsland<C>(
  Component: FunctionalComponent,
  src: C extends IslandsConfig ? keyof C : string,
) {
  return (props: IslandProps) => {
    if (isBrowser()) return <Component />;

    return (
      <x-island src={String(src)} {...props}>
        <Component />
      </x-island>
    );
  };
}

export function hydrateIslands<C extends IslandsConfig>(config: C) {
  if (!isBrowser()) return;

  customElements.define(
    'x-island',
    class extends HTMLElement {
      async connectedCallback() {
        const src = this.getAttribute('src');
        if (!isIsland(src, config))
          throw new Error(`${src} is not a registered island`);

        if (this.hasAttribute('visible')) {
          await this.visible();
        }

        if (this.hasAttribute('media')) {
          await this.media(this.getAttribute('media')!);
        }

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
              mediaQuery.removeEventListener('change', mediaListener);
            }
          };

          if (mediaQuery.matches) resolve(true);
          else {
            mediaQuery.addEventListener('change', mediaListener);
          }
        });
      }
    },
  );
}

declare module 'preact/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'x-island': JSX.HTMLAttributes<HTMLElement>;
    }
  }
}
