import { Child } from "https://deno.land/x/hono@v3.12.8/middleware.ts";

type Props = {
  children?: Child;
};

export function Layout(props: Props) {
  return (
    <div class="p-6">
      <header>
        <nav>Navigation</nav>
      </header>
      <div>{props.children}</div>
      <footer>Footer</footer>
    </div>
  );
}
