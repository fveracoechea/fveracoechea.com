import clsx from "clsx";

import Articles from "../components/Articles.tsx";

export const layout = "layouts/base.tsx";

export default function HomeLayout(props: Lume.Data) {
  const { search } = props;
  return (
    <div className="py-10">
      <section className="flex flex-col flex-wrap gap-10 pb-10 md:flex-row">
        <div className="relative flex items-center justify-center ">
          <img
            className={clsx(
              "h-80 rounded border border-cat-surface0",
              "object-cover  md:w-auto",
            )}
            src="/images/me.jpg"
          />
        </div>
        <div className="prose w-80 ">{props.children}</div>
      </section>
      <Articles search={search} />
    </div>
  );
}
