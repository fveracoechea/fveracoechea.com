import clsx from "clsx";

import Articles from "../components/Articles.tsx";

export const layout = "layouts/base.tsx";

export default function HomeLayout(props: Lume.Data) {
  const { search } = props;
  return (
    <div className="py-10">
      <section className="flex flex-col flex-wrap gap-10 pb-10 md:flex-row">
        <div className="relative flex flex-1 items-center justify-center">
          <img
            className={clsx(
              "h-full w-full max-w-80 rounded border border-cat-surface0",
              "object-cover md:absolute md:max-w-none",
            )}
            src="/images/me.jpg"
          />
        </div>
        <div className="prose w-full flex-1 lg:flex-[2]">{props.children}</div>
      </section>
      <props.comp.Interests />
      <Articles search={search} />
    </div>
  );
}
