import { loadBlog } from "../shared/loadContent.ts";

export async function Blog() {
  const posts = await loadBlog();

  return (
    <section class="pt-4" id="home-blog">
      <h2 class="text-xl font-semibold mb-6">Articles</h2>

      {posts.map((p) => (
        <article class="py-6 flex flex-col gap-2 [&:not(:first-child)]:border-t border-t-cat-surface0">
          <a href={p.url}>
            <h3 class="font-medium">{p.title}</h3>
          </a>
          <small>{p.date}</small>
          <p>{p.description}</p>
        </article>
      ))}
    </section>
  );
}
