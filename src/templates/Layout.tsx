import { Child, useRequestContext } from "hono/middleware";
import { Container } from "../components/Container.tsx";
import { Logo } from "../components/svg/Logo.tsx";
import { Github } from "../components/svg/Github.tsx";
import { LinkedIn } from "../components/svg/LinkedIn.tsx";

type Props = {
  children?: Child;
};

function Header() {
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
          <span class="text-xl text-dark font-medium">fveracoechea</span>
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
          <li class="justify-self-end text-light">
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

function HomeHeader() {
  return (
    <header class="bg-pattern-grey text-white bg-repeat">
      <Container class="flex justify-between items-center py-8">
        <a href="/">
          <h1 class="text-2xl font-medium">Francisco Veracoechea</h1>
          <span class="text-lg">Software Enginnier</span>
        </a>
        <ul class="flex p-2 gap-4">
          <li class="justify-self-end">
            <a class="block w-8 h-8" href="https://github.com/fveracoechea">
              <Github />
            </a>
          </li>
          <li class="justify-self-end">
            <a
              class="block w-8 h-8"
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
  const ctx = useRequestContext();
  const isHomepage = new URL(ctx.req.url).pathname === "/";

  return (
    <>
      <HomeHeader />
      <Container as="main" class="">
        <div>{props.children}</div>
      </Container>
      <Container as="footer">Footer</Container>
    </>
  );
}
