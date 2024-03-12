import {
  HTTPException,
  Context,
  Next,
} from "https://deno.land/x/hono@v3.12.8/mod.ts";

import { html, raw } from "https://deno.land/x/hono@v4.1.0/helper.ts";
import { HtmlEscapedString } from "https://deno.land/x/hono@v3.12.8/utils/html.ts";

import { extract } from "https://deno.land/std@0.206.0/front_matter/any.ts";
import { render } from "https://deno.land/x/gfm@0.2.5/mod.ts";

type WithCotentVars = {
  Variables: {
    content: HtmlEscapedString | Promise<HtmlEscapedString>;
  };
};

export async function contentMiddleware(
  ctx: Context<WithCotentVars>,
  next: Next,
) {
  const filename =
    ctx.req.path === "/" ? "./content/home.md" : `./content${ctx.req.path}.md`;

  try {
    const str = await Deno.readTextFile(filename);
    const result = extract(str);
    ctx.set("content", html`${raw(render(result.body))}`);
  } catch {
    throw new HTTPException(404, { message: "Page not found" });
  } finally {
    await next();
  }
}
