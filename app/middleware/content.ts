import { HTTPException, MiddlewareHandler } from "hono";
import { html, raw } from "hono/middleware";
import { HtmlEscapedString } from "https://deno.land/x/hono@v3.10.0/utils/html.ts";

import { extract } from "https://deno.land/std@0.206.0/front_matter/any.ts";
import { render } from "https://deno.land/x/gfm@0.2.5/mod.ts";

type WithCotentVars = {
  Variables: {
    content: HtmlEscapedString | Promise<HtmlEscapedString>;
  };
};

export const contentMiddleware: MiddlewareHandler<WithCotentVars> = async (
  ctx,
  next
) => {
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
};
