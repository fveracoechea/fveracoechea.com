import { cx } from "cva";
import { useEffect, useRef, useState } from "preact/hooks";

import { withIsland } from "../helpers/islands.tsx";
import { IconButton } from "./IconButton.tsx";
import { Computer, Moon, Sun } from "./Icons.tsx";

const THEME = {
  DARK: "cat-mocha",
  LIGHT: "cat-latte",
  SYSTEM: "system-theme",
} as const;

type Theme = keyof typeof THEME;

function checkRadio(element: HTMLLabelElement) {
  element.tabIndex = 0;
  element.setAttribute("aria-checked", "true");
  element.focus();
  // We click it to "check", so that the radio change event fires.
  element.click();
}

function uncheckRadio(element: HTMLLabelElement) {
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
  collection: HTMLLabelElement[],
  element: HTMLLabelElement,
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
function checkNext(collection: HTMLLabelElement[], element: HTMLLabelElement) {
  const idx = collection.indexOf(element);
  const next = collection.at(idx >= collection.length - 1 ? 0 : idx + 1);
  if (next) {
    uncheckRadio(element);
    checkRadio(next);
  }
}

function ThemeSwitcher(props: { fill?: boolean }) {
  const { fill = false } = props;
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
    if (!(target instanceof HTMLLabelElement)) return;
    if (!radiogroupRef.current) return;

    const collection = Array.from<HTMLLabelElement>(
      radiogroupRef.current.querySelectorAll('label[role="radio"]'),
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
      class={cx(
        "flex bg-cat-base text-xl md:text-2xl",
        "rounded border border-cat-surface0 text-cat-text",
      )}
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
          fill && "flex-1 justify-center",
          "!rounded-bl !rounded-tl",
        )}
        aria-checked={theme === "LIGHT"}
      >
        <span>
          <Sun />
        </span>
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
        className={cx(fill && "flex-1 justify-center")}
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
          fill && "flex-1 justify-center",
          "!rounded-br !rounded-tr",
        )}
        aria-checked={theme === "SYSTEM"}
      >
        <Computer />
      </IconButton>
    </div>
  );
}

export default withIsland(ThemeSwitcher, "ThemeSwitcher");
