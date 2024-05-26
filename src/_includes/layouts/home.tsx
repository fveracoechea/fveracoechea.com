import clsx from "clsx";

import Articles from "../components/Articles.tsx";

export const layout = "layouts/base.tsx";

export default function HomeLayout(props: Lume.Data) {
  const { search } = props;
  return (
    <div className="py-10">
      <section className="flex flex-row gap-10 pb-10">
        <div className="">
          <img
            className={clsx("h-auto w-96 rounded border border-cat-surface0")}
            src="/images/me.jpg"
          />
        </div>
        <div>
          <div className="prose">{props.children}</div>
        </div>
      </section>
      <Articles search={search} />
    </div>
  );
}
