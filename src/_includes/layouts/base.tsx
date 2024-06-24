import { cx } from "cva";
import { ComponentProps } from "preact";

import MobileMenu from "../components/MobileMenu.tsx";
import { NavLogo } from "../components/NavLogo.tsx";
import SocialLinks from "../components/SocialLinks.tsx";
import ThemeSwitcher from "../components/ThemeSwitcher.tsx";

export const layout = "layouts/document.tsx";

export const FULL_HEIGHT = "FULL_HEIGHT";

function NavLink(props: ComponentProps<"a"> & { isActive?: boolean }) {
  return (
    <a
      {...props}
      className={cx(
        "rounded px-3 py-2",
        props.isActive
          ? "border border-cat-blue bg-cat-blue/10 text-cat-blue"
          : [
              "text-cat-text transition-colors hover:bg-cat-overlay2/20",
              "active:ring-2 active:ring-cat-overlay2",
              "focus-visible:ring-2 focus-visible:ring-cat-blue",
            ],
        props.className,
      )}
    />
  );
}

function Header(props: Lume.Data) {
  return (
    <header className={cx("border-b border-cat-surface0")}>
      <nav className="container hidden items-center justify-between gap-2 py-8 md:flex">
        <NavLogo />
        <div className="flex items-center gap-2">
          <NavLink
            href="/bookmarks/"
            isActive={props.page.outputPath.includes("/bookmarks/")}
          >
            Bookmarks
          </NavLink>
          <NavLink
            href="/snippets/"
            isActive={props.page.outputPath.includes("/snippets/")}
            className="mr-3"
          >
            Snippets
          </NavLink>
          <ThemeSwitcher />
        </div>
      </nav>
      <MobileMenu media="(max-width: 768px)" />
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
      <Header {...props} />
      <div className={cx(FULL_HEIGHT, "bg-transparent")}>
        <div className={cx(FULL_HEIGHT, "container")}>
          <main className={FULL_HEIGHT}>{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
