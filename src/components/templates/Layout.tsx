import { Child } from "hono/middleware";
import { Container } from "../Container.tsx";
import { Github } from "../svg/Github.tsx";
import { LinkedIn } from "../svg/LinkedIn.tsx";
import clsx from "npm:clsx";

type Props = {
  children?: Child;
};

function Icons(props: { class?: string; gap?: "2" | "4" }) {
  const classNames = clsx("block", props.class ?? "h-8 w-8");
  const container = clsx("flex", `gap-${props.gap ?? "4"}`);
  return (
    <ul class={container}>
      <li class="justify-self-end">
        <a class={classNames} href="https://github.com/fveracoechea">
          <Github />
        </a>
      </li>
      <li class="justify-self-end">
        <a class={classNames} href="https://www.linkedin.com/in/fveracoechea/">
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
            Software Engineer
          </span>
        </a>

        <Icons />
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
          <h6 class="text-cat-subtext0 font-medium">Francisco Veracoechea</h6>
          <Icons class="h-5 w-5" gap="2" />
        </div>
      </Container>
    </footer>
  );
}

export function Layout(props: Props) {
  return (
    <>
      <Header />
      <Container style={{ minHeight: "calc(100vh - 175px)" }}>
        <main>{props.children}</main>
      </Container>
      <Footer />
    </>
  );
}
