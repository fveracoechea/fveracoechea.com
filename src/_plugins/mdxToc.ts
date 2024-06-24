import rehypeSlug from "https://esm.sh/rehype-slug@6.0.0";
import { compile } from "npm:@mdx-js/mdx";
import withToc from "npm:@stefanprobst/rehype-extract-toc";
import withTocExport from "npm:@stefanprobst/rehype-extract-toc/mdx";

type TocData = {
  depth: number;
  value: string;
  id: string;
  children?: TocData[];
};

export default (pageType?: string) => (site: Lume.Site) => {
  site.preprocess([".mdx"], async pages => {
    for (const page of pages) {
      if (pageType && pageType !== page.data.type) continue;

      const file = await compile(page.data.content as string, {
        rehypePlugins: [rehypeSlug, withToc, withTocExport],
      });

      page.data.toc = file.data.toc ?? [];
    }
  });
};

/** Extends Data interface */
declare global {
  namespace Lume {
    export type TocEntry = TocData;
    export interface Data {
      /**
       * Extracted Table of contents
       */
      toc: TocData[];
      snippets?: {
        path: string;
        outputPath: string;
        title: string | undefined;
        code: string;
      }[];
    }
  }
}
