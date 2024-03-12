import { useRequestContext } from "hono/middleware";
import { loadBlog } from "../shared/loadContent.ts";
import clsx from "npm:clsx";

const posts = await loadBlog();

export function Sidemenu() {
  const ctx = useRequestContext();
  const url = new URL(ctx.req.url);

  return (
    <div class="flex-1 hidden lg:block">
      <aside class="p-2 flex flex-col gap-4 flex-1 sticky top-6">
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
