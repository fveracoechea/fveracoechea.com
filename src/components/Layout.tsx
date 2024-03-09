import { Child } from "hono/middleware";
import { Container } from "./Container.tsx";
import { Github } from "./svg/Github.tsx";
import { LinkedIn } from "./svg/LinkedIn.tsx";
import clsx from "npm:clsx";

type Props = {
  children?: Child;
};

function Icons(props: { variant: "md" | "sm"; class?: string; gap?: "2" | "4" }) {
  const { variant } = props;

  const container = clsx("flex", variant === "md" ? "gap-4" : "gap-2");
  const icons = clsx(
    "block transition-colors hover:text-cat-blue",
    variant === "md" ? "h-8 w-8" : "h-5 w-5",
  );

  return (
    <ul class={container}>
      <li class="justify-self-end">
        <a class={icons} href="https://github.com/fveracoechea">
          <Github />
        </a>
      </li>
      <li class="justify-self-end">
        <a class={icons} href="https://www.linkedin.com/in/fveracoechea/">
          <LinkedIn />
        </a>
      </li>
    </ul>
  );
}

function Header() {
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
            Frontend Engineer
          </span>
        </a>

        <Icons variant="md" />
      </Container>
    </header>
  );
}

function Footer() {
  return (
    <footer class="bg-cat-base">
      <Container class="flex justify-between">
        <div class="flex gap-2">
          <span>Copyright &copy; {new Date().getFullYear()}</span>
          <span>|</span>
          <span>All rights reserved.</span>
        </div>
        <div class="flex items-center gap-2">
          <h6 class="text-cat-subtext0 text-lg font-medium">Francisco Veracoechea</h6>
          <Icons variant="sm" />
        </div>
      </Container>
    </footer>
  );
}

export function Layout(props: Props) {
  return (
    <>
      <Header />
      <Container style={{ minHeight: "calc(100vh - 196px)" }}>
        <main>{props.children}</main>
      </Container>
      <Footer />
    </>
  );
}
