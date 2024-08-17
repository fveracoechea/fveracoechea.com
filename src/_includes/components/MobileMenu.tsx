import { cx } from "cva";
import { useRef, useState } from "preact/hooks";

import { withIsland } from "../islands/PreactIslands.tsx";
import { IconButton } from "./IconButton.tsx";
import { Close, Menu } from "./Icons.tsx";
import { NavLogo } from "./NavLogo.tsx";
import ThemeSwitcher from "./ThemeSwitcher.tsx";

function cubicBezier(x0: number, y0: number, x1: number, y1: number) {
  if (!(x0 >= 0 && x0 <= 1 && x1 >= 0 && x1 <= 1))
    throw new Error(
      `CubicBezier x1 & x2 values must be { 0 < x < 1 }, got { x1 : ${x0}, x2: ${x1} }`,
    );

  const ax = 1.0 - (x1 = 3.0 * (x1 - x0) - (x0 *= 3.0)) - x0,
    ay = 1.0 - (y1 = 3.0 * (y1 - y0) - (y0 *= 3.0)) - y0;

  let i = 0,
    r = 0.0,
    s = 0.0,
    d = 0.0,
    x = 0.0;

  return function (t: number) {
    for (r = t, i = 0; 32 > i; i++)
      if (1e-5 > Math.abs((x = r * (r * (r * ax + x1) + x0) - t)))
        return r * (r * (r * ay + y1) + y0);
      else if (1e-5 > Math.abs((d = r * (r * ax * 3.0 + x1 * 2.0) + x0))) break;
      else r -= x / d;
    if ((s = 0.0) > (r = t)) return 0;
    else if ((d = 1.0) < r) return 1;
    while (d > s)
      if (1e-5 > Math.abs((x = r * (r * (r * ax + x1) + x0)) - t)) break;
      else t > x ? (s = r) : (d = r), (r = 0.5 * (d - s) + s);
    return r * (r * (r * ay + y1) + y0);
  };
}

// function easeOutQuad(x: number): number {
//   return 1 - (1 - x) * (1 - x);
// }
//
// function easeOutCubic(x: number): number {
//   return 1 - Math.pow(1 - x, 3);
// }

const tailwindCubicBazier = cubicBezier(0, 0, 0.2, 1);

function animate(startTime: number, amountOfPixels: number, duration = 450) {
  const now = Date.now();
  // How long have we been animating in total?
  const runtime = now - startTime;
  // How much has our animation progressed relative to our duration goal?
  // The result is a number (float) between 0 and 1. So 0 is zero percent en 1 is one hundred percent.
  const progress = runtime / duration;
  // We transform our relative progress to something else based on the easing that we used
  const easedProgress = tailwindCubicBazier(progress);
  // 1. We're calculating a new position based on the relative progress we've made in time.
  // 2. We're using Math.min to ensure that the progress value will never more be more than 1 (one hundred percent).
  // That way the new animation value will never be more than the distance we want to cover. This is called "clamping".
  return Math.round(amountOfPixels * Math.min(easedProgress, 1));
}

async function* collapse(height: number) {
  let currentHeight = height;
  const startTime = Date.now();
  while (currentHeight > 0) {
    await new Promise(resolve => requestAnimationFrame(resolve));
    currentHeight = height - animate(startTime, height);
    yield currentHeight;
  }
}

async function* expand(height: number) {
  let currentHeight = 0;
  const startTime = Date.now();
  while (currentHeight < height) {
    await new Promise(resolve => requestAnimationFrame(resolve));
    currentHeight = animate(startTime, height);
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
        nav.style.height = `${newHeight}px`;
      }

      return;
    }

    for await (const newHeight of expand(max)) {
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
        className={cx("overflow-hidden bg-cat-surface0 md:hidden")}
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
            <hr className="border-t border-t-cat-surface2" />
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
            <hr className="border-t border-t-cat-surface2" />
          </li>
          <li className="mt-4">
            <ThemeSwitcher border="surface" fill />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default withIsland(MobileMenu, "MobileMenu");
