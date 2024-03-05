import clsx from "npm:clsx";
import { loadArticle } from "../shared/loadContent.ts";

type Props = {
  path: string;
  className?: string;
};

export async function Post(props: Props) {
  const { path, className = null } = props;
  const data = await loadArticle(path);

  return (
    <article
      class={clsx("prose", className)}
      dangerouslySetInnerHTML={{ __html: String(data.content) }}
    />
  );
}
