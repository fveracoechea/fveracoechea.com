import { cx } from "cva";
import { useRef, useState } from "preact/hooks";

import { withIsland } from "../helpers/islands.tsx";
import { IconButton } from "./IconButton.tsx";
import { Close, Menu } from "./Icons.tsx";
import { NavLogo } from "./NavLogo.tsx";
import ThemeSwitcher from "./ThemeSwitcher.tsx";

// import ThemeSwitcher from "./ThemeSwitcher.tsx";

// function initFalling(ball: HTMLElement) {
//   const ballHeight = 100;
//   const acceleration = 9.8 / 60;
//   const { innerHeight } = window;
//   let fallingSpeed = 0;
//   const animateFall = () => {
//     const top = parseInt(ball.style.top);
//     const newTop = `${top + fallingSpeed}px`;
//     /* To break the fall, when the ball is near the surface */
//     if (parseInt(newTop) >= innerHeight - ballHeight) {
//       ball.style.top = this.innerHeight - ballHeight + "px";
//       ball.style.background = "red";
//       return null;
//     }
//
//     /* Else set the top to the new value */
//     ball.style.top = newTop;
//     fallingSpeed = fallingSpeed + acceleration;
//     requestAnimationFrame(animateFall);
//   };
//   requestAnimationFrame(animateFall);
// }
//

const steps = 8;

async function* expand(height: number) {
  let currentHeight = 0;
  while (currentHeight < height) {
    await new Promise(resolve => requestAnimationFrame(resolve));
    currentHeight += steps;
    yield currentHeight;
  }
}

async function* collapse(height: number) {
  let currentHeight = height;
  while (currentHeight > 0) {
    await new Promise(resolve => requestAnimationFrame(resolve));
    currentHeight -= steps;
    yield currentHeight;
  }
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  async function onClick() {
    setOpen(!open);

    const nav = navRef.current;
    const ul = ulRef.current;
    if (!nav || !ul) return;

    const max = ul.clientHeight;

    if (open) {
      for await (const newHeight of collapse(max)) {
        if (!open) break;
        nav.style.height = `${newHeight}px`;
      }

      return;
    }

    for await (const newHeight of expand(max)) {
      if (open) break;
      nav.style.height = `${newHeight}px`;
    }
  }

  return (
    <>
      <div className="container flex items-center justify-between gap-2 py-4 md:hidden">
        <NavLogo />
        <IconButton onClick={onClick} rounded className="text-2xl md:hidden">
          {open ? <Close /> : <Menu />}
        </IconButton>
      </div>
      <nav
        ref={navRef}
        style={{ height: 0 }}
        className={cx("overflow-hidden md:hidden")}
      >
        <ul ref={ulRef} className="flex flex-col gap-2 p-4">
          <li className="">
            <a
              href="/bookmarks/"
              className="flex flex-1 rounded px-4 py-2 text-base hover:bg-cat-overlay2/20 active:text-cat-blue active:ring-2 active:ring-cat-overlay2"
            >
              Bookmarks
            </a>
          </li>
          <li>
            <hr className="border-t border-t-cat-surface0" />
          </li>
          <li>
            <a
              href="/snippets/"
              className="flex flex-1 rounded px-4 py-2 text-base hover:bg-cat-overlay2/20 active:text-cat-blue active:ring-2 active:ring-cat-overlay2"
            >
              Snippets
            </a>
          </li>
          <li>
            <hr className="border-t border-t-cat-surface0" />
          </li>
          <li className="mt-4">
            <ThemeSwitcher fill />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default withIsland(MobileMenu, "MobileMenu");
