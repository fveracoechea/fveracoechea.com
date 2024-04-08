import BaseLayout from '../components/BaseLayout.tsx';

function BlogLayout(props: Lume.Data) {
  const { children, comp } = props;
  return (
    <BaseLayout>
      <div className="flex gap-4">
        <comp.Sidemenu {...props} />
        <article className="prose flex-[3] overflow-x-hidden py-4">{children}</article>
      </div>
    </BaseLayout>
  );
}

export default BlogLayout;
