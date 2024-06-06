import { cx } from "cva";
import { ComponentProps } from "preact";

import SocialLinks from "../components/SocialLinks.tsx";
import ThemeSwitcher from "../components/ThemeSwitcher.tsx";

export const layout = "layouts/document.tsx";

function NavLink(props: ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={cx(
        "rounded px-3 py-2",
        "text-cat-text transition-colors hover:bg-cat-overlay2/20",
        "active:ring-2 active:ring-cat-overlay2",
        "focus-visible:ring-2 focus-visible:ring-cat-blue",
        props.className,
      )}
    />
  );
}

function Header() {
  return (
    <header className={cx("border-b border-cat-surface0")}>
      <nav className="container flex items-center justify-between gap-2 py-8">
        <a
          href="/"
          class={cx(
            "rounded border-4 border-transparent transition-shadow",
            "ring-cat-blue/60 ring-offset-cat-crust focus-visible:ring-2",
          )}
        >
          <h1
            className={cx(
              "bg-gradient-to-r from-cat-blue to-cat-mauve bg-clip-text",
              "text-lg font-semibold text-transparent transition-colors md:text-2xl",
            )}
          >
            Francisco Veracoechea
          </h1>
          <h2
            className={cx(
              "font-mono text-xs font-normal leading-tight",
              "md:text-base",
            )}
          >
            <span className="text-cat-red">{"()"}</span>
            <span className="text-cat-subtext0">{" => "}</span>
            <span className="text-cat-teal">{'"Frontend Engineer"'}</span>
          </h2>
        </a>
        <div className="flex items-center gap-2">
          <NavLink href="/blog/">Blog</NavLink>
          <NavLink href="/bookmars/">Bookmarks</NavLink>
          <NavLink href="/code-snippets/" className="mr-3">
            Snippets
          </NavLink>
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-cat-surface0">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span>Copyright &copy; {new Date().getFullYear()}</span>
          <span>|</span>
          <span>Francisco Veracoechea</span>
        </div>
        <SocialLinks size="sm" />
      </div>
    </footer>
  );
}

export default function MainLayout(props: Lume.Data) {
  const { children } = props;
  return (
    <>
      <Header />
      <div className={cx("min-h-[calc(100vh-202px)] bg-transparent")}>
        <div className="container">
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
