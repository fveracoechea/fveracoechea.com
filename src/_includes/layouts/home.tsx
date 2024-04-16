export const layout = 'layouts/base.tsx';

function HomeLayout(props: Lume.Data) {
  const Articles = props.comp.Articles;

  return (
    <>
      <section className="prose pb-8">{props.children}</section>
      <Articles />
    </>
  );
}

export default HomeLayout;
