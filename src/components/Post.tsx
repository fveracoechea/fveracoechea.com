import clsx from "npm:clsx";
import { loadArticle } from "../shared/loadContent.ts";
import { Suspense } from "hono/streaming";

type Props = {
  path: string;
  className?: string;
};

export async function Article(props: Props) {
  const { path, className = null } = props;
  const data = await loadArticle(path);

  return (
    <article
      class={clsx("prose", className)}
      dangerouslySetInnerHTML={{ __html: String(data.content) }}
    />
  );
}

export function ArticleLoader(props: { className?: string }) {
  return (
    <div class={clsx("cursor-wait flex flex-col gap-6 w-full", props.className)}>
      <div class="h-6 rounded bg-cat-surface0 w-2/5" />
      <div class="flex flex-col gap-3">
        <div class="h-3 rounded bg-cat-surface0 w-full" />
        <div class="h-3 rounded bg-cat-surface0 w-4/5" />
        <div class="h-3 rounded bg-cat-surface0 w-3/5" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="h-3 rounded bg-cat-surface0 w-2/3" />
      </div>
      <div class="h-36 rounded bg-cat-surface0 w-full" />
    </div>
  );
}

export function Post(props: Props) {
  const { path, className } = props;
  return (
    <section id={path.replace("/", "")}>
      <Suspense fallback={<ArticleLoader className={className} />}>
        <Article {...props} />
      </Suspense>
    </section>
  );
}
