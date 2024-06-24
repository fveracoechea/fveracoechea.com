import Articles from "../components/Articles.tsx";
import CodeWritter from "../components/CodeWritter.tsx";
import Interests from "../components/Interests.tsx";
import SocialLinks from "../components/SocialLinks.tsx";

export const layout = "layouts/base.tsx";

export default function HomeLayout(props: Lume.Data) {
  const { search } = props;

  return (
    <div className="py-10">
      <section className="flex flex-col gap-6 pb-10 lg:flex-row">
        <article
          className="flex flex-1 flex-col justify-between gap-4"
          id="about-me"
        >
          <div className="prose">{props.children}</div>

          <SocialLinks className="self-end" />
        </article>

        <CodeWritter />
      </section>

      <Interests />
      <Articles search={search} />
    </div>
  );
}
