export const layout = "layouts/base.tsx";

function HomeLayout(props: Lume.Data) {
  const Articles = props.comp.Articles;

  return (
    <>
      <section className="flex flex-col flex-wrap gap-8 pb-8 md:flex-row">
        <div className="flex flex-1 items-center justify-center md:max-w-[275px]">
          <img
            className="max-w-60 rounded border border-cat-surface0 md:max-w-full"
            src="/images/me.jpg"
          />
        </div>
        <div className="prose w-full flex-[2]">{props.children}</div>
      </section>
      <Articles />
    </>
  );
}

export default HomeLayout;
