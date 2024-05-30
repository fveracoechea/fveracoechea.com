export default () => (site: Lume.Site) => {
  site.process([".html"], pages => {
    for (const page of pages) {
      if (page.data.type !== "home" || !page.document) continue;

      const snippets = pages
        .filter(p => p.data.type === "snippet")
        .toSorted((a, b) => (b.data.order ?? 0) - (a.data.order ?? 0))
        .map(p => p.document?.querySelector("pre code")?.innerHTML ?? "");

      const script = page.document.createElement("script");
      script.innerHTML = `window.__SNIPPETS__ = ${JSON.stringify(snippets)};`;

      page.document.body.appendChild(script);
    }
  });
};
