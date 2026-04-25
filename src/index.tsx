import hydrate from "preact-iso/hydrate";
import render from "preact-iso/prerender";

import { registerIslands } from "./lib/preact-islands.tsx";

import "./styles.css";

const isDEV = import.meta.env.MODE === "development";
const isBrowser = typeof window !== "undefined";

if (isBrowser && isDEV) {
  import("./App.tsx").then(({ App }) => {
    hydrate(<App />, document.getElementById("app"));
  });
}

if (isBrowser && !isDEV) {
  registerIslands({
    ThemeSwitcher: () => import("./components/ThemeSwitcher.tsx"),
    MobileMenu: () => import("./components/MobileMenu.tsx"),
  });
}

export async function prerender(data: { url: string }) {
  const { App } = await import("./App.tsx");
  return await render(<App url={data.url} />);
}
