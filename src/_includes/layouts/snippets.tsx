export const layout = "layouts/base.tsx";

export default function SnippetsLayout(props: Lume.Data) {
  const snippets = props.page.data.snippets ?? [];
  return (
    <>
      <div className="prose overflow-x-hidden py-10">{props.children}</div>
      <div>
        <ul>
          {snippets.map(s => (
            <li
              className="flex border-b border-b-cat-surface0 last-of-type:border-none"
              key={s.outputPath}
            >
              <a
                href={s.outputPath}
                className="flex w-full px-6 py-4 text-cat-text hover:text-cat-blue"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
