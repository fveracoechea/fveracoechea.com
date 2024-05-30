export const layout = "layouts/base.tsx";

export default function SnippetsLayout(props: Lume.Data) {
  return <div className="prose overflow-x-hidden py-10">{props.children}</div>;
}
