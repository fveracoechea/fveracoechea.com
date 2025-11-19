import { cx } from "cva";
import { ComponentProps } from "preact";

import MobileMenu from "../components/MobileMenu.tsx";
import NavLogo from "../components/NavLogo.tsx";
import SocialLinks from "../components/SocialLinks.tsx";
import ThemeSwitcher from "../components/ThemeSwitcher.tsx";

export const layout = "layouts/document.tsx";

export const FULL_HEIGHT = "FULL_HEIGHT";

function NavLink(props: ComponentProps<"a"> & { isActive?: boolean }) {
  return (
    <a
      {...props}
      className={cx(
        "relative rounded px-2 py-2.5 font-medium",
        "after:absolute after:h-[2px] after:w-0 after:rounded after:bg-cat-blue",
        "after:bottom-0 after:left-0 after:transition-all",
        props.isActive ? "text-cat-blue after:w-full" : [
          "text-cat-text transition-colors hover:text-cat-blue hover:after:w-full",
          "focus-visible:ring-2 focus-visible:ring-cat-blue",
        ],
        props.className,
      )}
    />
  );
}

function Header(props: Lume.Data) {
  return (
    <div className="border-b border-cat-surface0">
      <header className="container hidden items-center justify-between gap-2 py-6 md:flex">
        <NavLogo />
        <nav className="flex items-center">
          <ul className="flex items-center gap-4">
            <li>
              <NavLink
                href="/snippets/"
                isActive={props.page.outputPath.includes("/snippets/")}
              >
                Snippets
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/bookmarks/"
                isActive={props.page.outputPath.includes("/bookmarks/")}
              >
                Bookmarks
              </NavLink>
            </li>
            <li className="ml-2">
              <ThemeSwitcher />
            </li>
          </ul>
        </nav>
      </header>
      <MobileMenu media="(max-width: 768px)" />
    </div>
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
      <div
        className={cx(
          FULL_HEIGHT,
          "max-w-[100vw] overflow-x-hidden bg-transparent md:overflow-x-visible",
        )}
      >
        <div className={cx(FULL_HEIGHT, "container")}>
          <main className={FULL_HEIGHT}>{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
