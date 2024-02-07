import { loadArticle } from "../shared/loadContent.ts";

type Props = {
  path: string;
};

export async function Post(props: Props) {
  const data = await loadArticle(props.path);

  return (
    <article
      class="prose"
      dangerouslySetInnerHTML={{ __html: String(data.content) }}
    />
  );
}
