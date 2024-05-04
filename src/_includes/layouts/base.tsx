import { cx } from "npm:class-variance-authority";

import { SocialLinks } from "../components/SocialLinks.tsx";

export const layout = "layouts/document.tsx";

function Header() {
  return (
    <header className={cx("border-b border-cat-surface0")}>
      <div className="container flex items-center justify-between gap-2 py-8">
        <a href="/">
          <h1
            className={cx(
              "bg-gradient-to-r from-cat-blue to-cat-mauve bg-clip-text text-transparent",
              "text-lg font-semibold md:text-2xl",
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

        <SocialLinks size="md" />
      </div>
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
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <p className="text-lg font-medium text-cat-subtext0"></p>
          <SocialLinks size="sm" />
        </div>
      </div>
    </footer>
  );
}

export default function MainLayout(props: Lume.Data) {
  const { children } = props;
  return (
    <>
      <Header />
      <div className={cx("min-h-[calc(100vh-202px)]")}>
        <div className="container">
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
