import {
  Child,
  useRequestContext,
} from "https://deno.land/x/hono@v3.12.8/middleware.ts";
import { Container } from "../components/Container.tsx";
import { Logo } from "../components/svg/Logo.tsx";
import { Github } from "../components/svg/Github.tsx";
import { LinkedIn } from "../components/svg/LinkedIn.tsx";

type Props = {
  children?: Child;
};

function Header() {
  const ctx = useRequestContext();

  const isHomepage = new URL(ctx.req.url).pathname === "/";

  return (
    <header>
      <Container as="nav" class="flex justify-between">
        <a
          href="/"
          class="flex gap-2 items-center"
          title="Home - Francisco Veracoechea"
        >
          <span class="block w-12 h-12">
            <Logo />
          </span>
          {!isHomepage && (
            <span class="text-xl text-dark font-medium">fveracoechea</span>
          )}
        </a>
        <ul class="flex p-2 gap-4">
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li class="justify-self-end">
            <a
              class="block w-7 h-7 hover:text-primary"
              href="https://github.com/fveracoechea"
            >
              <Github />
            </a>
          </li>
          <li class="justify-self-end">
            <a
              class="block w-7 h-7 hover:text-primary"
              href="https://www.linkedin.com/in/fveracoechea/"
            >
              <LinkedIn />
            </a>
          </li>
        </ul>
      </Container>
    </header>
  );
}

export function Layout(props: Props) {
  return (
    <>
      <Header />
      <Container size="mobile" as="main">
        <div>{props.children}</div>
      </Container>
      <Container as="footer">Footer</Container>
    </>
  );
}
