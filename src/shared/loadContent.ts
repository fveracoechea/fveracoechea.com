import { HTTPException } from "hono";
import { extract } from "https://deno.land/std@0.213.0/front_matter/yaml.ts";

import { unified } from "https://esm.sh/unified@11.0.4";
import remarkParse from "https://esm.sh/remark-parse@11.0.0";
import remarkRehype from "https://esm.sh/remark-rehype@11.1.0";

import rehypeHighlight from "https://esm.sh/rehype-highlight@7.0.0";
import rehypeStringify from "https://esm.sh/rehype-stringify@10.0.0";
import rehypeAutolinkHeadings from "https://esm.sh/rehype-autolink-headings@7.1.0";
import rehypeSlug from "https://esm.sh/rehype-slug@6.0.0";

import { z } from "zod";

const AttributeSchema = z.object({
  title: z.string(),
  date: z.string(),
  image: z.string().optional(),
  description: z.string(),
});

export async function loadArticle(path: string) {
  const filename = path === "/" ? "./content/home.md" : `./content${path}.md`;

  try {
    const file = await Deno.readTextFile(filename);
    const result = extract(file);

    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings)
      .use(rehypeHighlight)
      .use(rehypeStringify);

    const content = (await processor.process(result.body)).toString();

    return { attributes: await AttributeSchema.parseAsync(result.attrs), content };
  } catch {
    throw new HTTPException(404, { message: "Page not found" });
  }
}

export type PostAttributes = z.infer<typeof AttributeSchema> & {
  url: string;
};

export async function loadBlog() {
  try {
    const posts: PostAttributes[] = [];

    for await (const file of Deno.readDir("./content/blog")) {
      if (!file.isFile) continue;
      const content = await Deno.readTextFile(`./content/blog/${file.name}`);
      const result = extract(content);
      posts.push({
        ...await AttributeSchema.parseAsync(result.attrs),
        url: `/blog/${file.name.replace(".md", "")}`,
      });
    }

    return posts;
  } catch {
    return [];
  }
}
