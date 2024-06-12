function getCodeSnippetPages(pages: Lume.Page[]) {
  return pages
    .filter(p => p.data.type === "snippet")
    .toSorted((a, b) => (b.data.order ?? 0) - (a.data.order ?? 0))
    .map(p => ({
      path: p.src.path,
      outputPath: p.outputPath,
      title: p.data.title,
      code: p.document?.querySelector("pre code")?.innerHTML ?? "",
    }));
}

export default () => (site: Lume.Site) => {
  site.process([".html"], pages => {
    const snippets = getCodeSnippetPages(pages);
    const home = pages.find(page => page.data.type === "home");

    if (home && home.document) {
      const script = home.document.createElement("script");
      script.innerHTML = `window.__SNIPPETS__ = ${JSON.stringify(snippets)};`;
      home.document.body.appendChild(script);
    }
  });

  site.preprocess([".mdx"], pages => {
    const snippets = getCodeSnippetPages(pages);
    const snippetsPage = pages.find(
      page => page.data.type === "snippets-index-page",
    );

    if (snippetsPage) {
      snippetsPage.data.snippets = snippets;
    }
  });
};
