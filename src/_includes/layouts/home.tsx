import BaseLayout from '../components/BaseLayout.tsx';

function HomeLayout(props: Lume.Data) {
  const Articles = props.comp.Articles;

  return (
    <BaseLayout {...props}>
      <section className="prose pb-8">{props.children}</section>
      <Articles />
    </BaseLayout>
  );
}

export default HomeLayout;
