import BaseLayout from '../components/BaseLayout.tsx';

function HomeLayout(props: Lume.Data) {
  const { comp, children } = props;
  return (
    <BaseLayout>
      <section className="prose pb-8">{children}</section>
      <comp.Articles />
    </BaseLayout>
  );
}

export default HomeLayout;
