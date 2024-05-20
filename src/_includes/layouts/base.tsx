import { cx } from "cva";

import { SocialLinks } from "../components/SocialLinks.tsx";
import ThemeSwitcher from "../components/ThemeSwitcher.tsx";

export const layout = "layouts/document.tsx";

function Header() {
  return (
    <header className={cx("border-b border-cat-surface0")}>
      <div className="container flex items-center justify-between gap-2 py-8">
        <a href="/" class="transition-transform focus-visible:scale-95">
          <h1
            className={cx(
              'bg-gradient-to-r from-cat-blue to-cat-mauve bg-clip-text',
              'text-lg font-semibold text-transparent transition-colors md:text-2xl',
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
        <ThemeSwitcher />
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
