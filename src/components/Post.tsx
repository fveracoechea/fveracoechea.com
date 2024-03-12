import clsx from "npm:clsx";
import { loadArticle } from "../shared/loadContent.ts";
import { Suspense } from "hono/streaming";

type Props = {
  path: string;
  class?: string;
};

export async function Article(props: Props) {
  const { path, class: className } = props;
  const data = await loadArticle(path);

  return (
    <article
      class={clsx("prose", className)}
      id={path.replace("/", "")}
      dangerouslySetInnerHTML={{ __html: String(data.content) }}
    />
  );
}
