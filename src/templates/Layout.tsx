import { Child } from "hono/middleware";
import { Container } from "../components/Container.tsx";
import { Github } from "../components/svg/Github.tsx";
import { LinkedIn } from "../components/svg/LinkedIn.tsx";
import clsx from "npm:clsx";

type Props = {
  children?: Child;
};

function HomeHeader() {
  return (
    <header class="bg-cat-base">
      <Container class="flex justify-between items-center py-8">
        <a href="/">
          <h1
            class={clsx(
              "bg-gradient-to-r from-cat-blue to-cat-mauve text-transparent bg-clip-text",
              "text-2xl font-semibold",
            )}
          >
            Francisco Veracoechea
          </h1>
          <span class="text-lg text-cat-subtext1 leading-tight font-normal">
            Software Engineer
          </span>
        </a>
        <ul class="flex p-2 gap-4 text-cat-">
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
