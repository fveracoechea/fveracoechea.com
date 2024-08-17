import { cx } from "cva";
import { useEffect, useRef, useState } from "preact/hooks";

import { withIsland } from "../islands/PreactIslands.tsx";
import { IconButton } from "./IconButton.tsx";
import { Computer, Moon, Sun } from "./Icons.tsx";

const THEME = {
  DARK: "cat-mocha",
  LIGHT: "cat-latte",
  SYSTEM: "system-theme",
} as const;

type Theme = keyof typeof THEME;

function checkRadio(element: HTMLButtonElement) {
  element.tabIndex = 0;
  element.setAttribute("aria-checked", "true");
  element.focus();
  // We click it to "check", so that the radio change event fires.
  element.click();
}

function uncheckRadio(element: HTMLButtonElement) {
  element.tabIndex = -1;
  element.setAttribute("aria-checked", "false");
  element.blur();
}

/**
 * Moves focus to the previous radio button in the group,
 * uncheck the previously focused button, and check the newly focused button.
 * If focus is on the first button, focus moves to the last button.
 * */
function checkPrevious(
  collection: HTMLButtonElement[],
  element: HTMLButtonElement,
) {
  const idx = collection.indexOf(element);
  const previous = collection.at(idx - 1);
  if (previous) {
    uncheckRadio(element);
    checkRadio(previous);
  }
}

/**
 * Moves focus to the next radio button in the group,
 * uncheck the previously focused button, and check the newly focused button.
 * If focus is on the last button, focus moves to the first button.
 * */
function checkNext(
  collection: HTMLButtonElement[],
  element: HTMLButtonElement,
) {
  const idx = collection.indexOf(element);
  const next = collection.at(idx >= collection.length - 1 ? 0 : idx + 1);
  if (next) {
    uncheckRadio(element);
    checkRadio(next);
  }
}

function ThemeSwitcher(props: { fill?: boolean; border?: "base" | "surface" }) {
  const { fill = false, border = "base" } = props;
  const [theme, setTheme] = useState<Theme | null>(null);
  const radiogroupRef = useRef<HTMLDivElement | null>(null);

  function saveTheme(t: Theme) {
    setTheme(t);
    for (const key in THEME) {
      if (Object.prototype.hasOwnProperty.call(THEME, key))
        document.querySelector("html")?.classList.remove(THEME[key as Theme]);
    }
    document.querySelector("html")?.classList.add(THEME[t]);
    localStorage.setItem("theme", THEME[t]);
  }

  function onKeyDownHandler(e: KeyboardEvent) {
    const target = e.currentTarget;
    if (!(target instanceof HTMLButtonElement)) return;
    if (!radiogroupRef.current) return;

    const collection = Array.from<HTMLButtonElement>(
      radiogroupRef.current.querySelectorAll('button[role="radio"]'),
    );

    const cases: Record<string, () => void> = {
      ArrowUp: () => checkPrevious(collection, target),
      ArrowLeft: () => checkPrevious(collection, target),
      ArrowDown: () => checkNext(collection, target),
      ArrowRight: () => checkNext(collection, target),
      " ": () => checkRadio(target),
      Enter: () => checkRadio(target),
    };

    const action = cases[e.key];

    if (action) {
      e.preventDefault();
      action();
    }
  }

  useEffect(function loadTheme() {
    const theme = localStorage.getItem("theme");
    switch (theme) {
      case THEME.DARK:
        return setTheme("DARK");
      case THEME.LIGHT:
        return setTheme("LIGHT");
      case THEME.SYSTEM:
        return setTheme("SYSTEM");
    }
  }, []);

  return (
    <div
      role="radiogroup"
      ref={radiogroupRef}
      class={cx("flex text-xl md:text-2xl", "text-cat-text")}
    >
      <IconButton
        role="radio"
        onKeyDown={onKeyDownHandler}
        rounded={false}
        title="Light theme"
        active={theme === "LIGHT"}
        tabIndex={theme === "LIGHT" ? 0 : -1}
        onClick={() => saveTheme("LIGHT")}
        className={cx(
          "rounded-bl rounded-tl border",
          fill && "flex-1 justify-center",
          theme === "LIGHT"
            ? "border-cat-blue"
            : border === "base"
              ? "border-cat-surface0"
              : "border-cat-surface2",
        )}
        aria-checked={theme === "LIGHT"}
        style={theme === "DARK" ? { borderRight: "none" } : {}}
      >
        <Sun />
      </IconButton>

      <IconButton
        role="radio"
        onKeyDown={onKeyDownHandler}
        rounded={false}
        title="Dark theme"
        active={theme === "DARK"}
        tabIndex={theme === "DARK" ? 0 : -1}
        onClick={() => saveTheme("DARK")}
        aria-checked={theme === "DARK"}
        className={cx(
          fill && "flex-1 justify-center",
          theme === "DARK"
            ? "border border-cat-blue"
            : [
                "border-y",
                border === "base"
                  ? "border-y-cat-surface0"
                  : "border-y-cat-surface2",
              ],
        )}
      >
        <Moon />
      </IconButton>

      <IconButton
        role="radio"
        rounded={false}
        onKeyDown={onKeyDownHandler}
        title="System theme"
        active={theme === "SYSTEM"}
        tabIndex={theme === "SYSTEM" ? 0 : -1}
        onClick={() => saveTheme("SYSTEM")}
        className={cx(
          "rounded-br rounded-tr border",
          fill && "flex-1 justify-center",
          theme === "SYSTEM"
            ? "border-cat-blue"
            : border === "base"
              ? "border-cat-surface0"
              : "border-cat-surface2",
        )}
        aria-checked={theme === "SYSTEM"}
        style={theme === "DARK" ? { borderLeft: "none" } : {}}
      >
        <Computer />
      </IconButton>
    </div>
  );
}

export default withIsland(ThemeSwitcher, "ThemeSwitcher");
