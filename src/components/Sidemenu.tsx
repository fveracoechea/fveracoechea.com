import { useRequestContext } from "hono/middleware";
import { loadBlog } from "../shared/loadContent.ts";
import clsx from "npm:clsx";

export async function Sidemenu() {
  const ctx = useRequestContext();
  const url = new URL(ctx.req.url);

  const posts = await loadBlog();

  return (
    <div class="flex flex-1">
      <aside class="p-2 flex flex-col gap-4 flex-1 sticky top-0">
        <h5 class="text-cat-subtext0 font-semibold">Articles</h5>
        <ul class="flex flex-col gap-2">
          {posts.map((post) => (
            <li>
              <a
                class={clsx(
                  "transition-colors flex flex-col hover:text-cat-blue",
                  url.pathname === post.url ? "text-cat-mauve" : "text-cat-subtext1",
                )}
                href={post.url}
              >
                <span class="text-sm">
                  {post.title}
                </span>
                <span class="text-xs">{post.date}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export function SidemenuLoader() {
  return (
    <aside class="p-2 flex flex-col gap-4 flex-1 cursor-wait">
      <h5>Articles</h5>
      <div class="flex flex-col gap-2">
        <div class="h-3 w-4/5 rounded-lg bg-cat-surface0" />
        <div class="h-3 w-2/5 rounded-lg bg-cat-surface0" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="h-3 w-4/5 rounded-lg bg-cat-surface0" />
        <div class="h-3 w-3/5 rounded-lg bg-cat-surface0" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="h-3 w-4/5 rounded-lg bg-cat-surface0" />
        <div class="h-3 w-2/5 rounded-lg bg-cat-surface0" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="h-3 w-4/5 rounded-lg bg-cat-surface0" />
        <div class="h-3 w-3/5 rounded-lg bg-cat-surface0" />
      </div>
    </aside>
  );
}
