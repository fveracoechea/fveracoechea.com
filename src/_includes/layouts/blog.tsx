import BaseLayout from '../components/BaseLayout.tsx';

function BlogLayout(props: Lume.Data) {
  const Sidemenu = props.comp.Sidemenu;

  return (
    <BaseLayout {...props}>
      <div className="flex gap-4">
        <Sidemenu {...props} />
        <article className="prose flex-[3] overflow-x-hidden py-4">{props.children}</article>
      </div>
    </BaseLayout>
  );
}

export default BlogLayout;
