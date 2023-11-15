import { Child } from "hono/middleware";

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
