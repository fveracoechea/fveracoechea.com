import clsx from "npm:clsx";

export const layout = "layouts/base.tsx";

function HomeLayout(props: Lume.Data) {
  const Articles = props.comp.Articles;

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
      <Articles />
    </div>
  );
}

export default HomeLayout;
