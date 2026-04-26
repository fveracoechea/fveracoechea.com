import { cx } from "cva"
import { LocationProvider, Route, Router, useLocation } from "preact-iso/router"

import MobileMenu from "./components/MobileMenu.tsx"
import NavLogo from "./components/NavLogo.tsx"
import SocialLinks from "./components/SocialLinks.tsx"
import ThemeSwitcher from "./components/ThemeSwitcher.tsx"
import BlogPost from "./pages/BlogPost.tsx"
import Bookmarks from "./pages/Bookmarks.tsx"
import Home from "./pages/Home.tsx"
import NotFound from "./pages/NotFound.tsx"
import SnippetDetail from "./pages/SnippetDetail.tsx"
import SnippetsIndex from "./pages/SnippetsIndex.tsx"

export const FULL_HEIGHT = "FULL_HEIGHT"

type NavLinkProps = { children: preact.ComponentChildren; href: string; className?: string }

function NavLink(props: NavLinkProps) {
  const location = useLocation()
  const isActive = location.path.startsWith(props.href ?? "/")

  return (
    <a
      {...props}
      className={cx(
        "relative rounded px-2 py-2.5 font-medium transition-colors",
        "focus-visible:ring-2 focus-visible:ring-ctp-blue",
        isActive ? "text-ctp-blue" : "text-ctp-subtext0 hover:text-ctp-text",
        props.className,
      )}
    />
  )
}

function Header() {
  return (
    <div className="border-b border-ctp-surface0">
      <header className="container hidden items-center justify-between gap-2 py-6 md:flex">
        <NavLogo />
        <nav className="flex items-center">
          <ul className="flex items-center gap-4">
            <li>
              <NavLink href="/snippets">Snippets</NavLink>
            </li>
            <li>
              <NavLink href="/bookmarks">Bookmarks</NavLink>
            </li>
            <li className="ml-2">
              <ThemeSwitcher />
            </li>
          </ul>
        </nav>
      </header>
      <MobileMenu media="(max-width: 768px)" />
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-ctp-surface0">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span>Copyright &copy; {new Date().getFullYear()}</span>
          <span>|</span>
          <span>Francisco Veracoechea</span>
        </div>
        <SocialLinks size="sm" />
      </div>
    </footer>
  )
}

export function App() {
  return (
    <LocationProvider>
      <Header />
      <div
        className={cx(
          FULL_HEIGHT,
          "max-w-[100vw] overflow-x-hidden bg-transparent md:overflow-x-visible",
        )}
      >
        <div className={cx(FULL_HEIGHT, "container")}>
          <main className={FULL_HEIGHT}>
            <Router>
              <Route path="/" component={Home} />
              <Route path="/blog/:slug" component={BlogPost} />
              <Route path="/snippets" component={SnippetsIndex} />
              <Route path="/snippets/:slug" component={SnippetDetail} />
              <Route path="/bookmarks" component={Bookmarks} />
              <Route default component={NotFound} />
            </Router>
          </main>
        </div>
      </div>
      <Footer />
    </LocationProvider>
  )
}
