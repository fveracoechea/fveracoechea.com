import { HTTPException } from "hono";
import { extract } from "https://deno.land/std@0.213.0/front_matter/yaml.ts";

import { unified } from "https://esm.sh/unified@11.0.4";
import remarkParse from "https://esm.sh/remark-parse@11.0.0";
import remarkRehype from "https://esm.sh/remark-rehype@11.1.0";

import rehypeHighlight from "https://esm.sh/rehype-highlight@6.0.0";
import rehypeStringify from "https://esm.sh/rehype-stringify@10.0.0";

export async function loadContent(path: string) {
  const filename = path === "/" ? "./content/home.md" : `./content${path}.md`;

  try {
    const file = await Deno.readTextFile(filename);
    const result = extract(file);

    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify);

    const content = (await processor.process(result.body)) as unknown;

    return { attributes: result.attrs, content };
  } catch {
    throw new HTTPException(404, { message: "Page not found" });
  }
}
