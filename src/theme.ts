const THEME = {
  DARK: "cat-mocha",
  LIGHT: "cat-latte",
  SYSTEM: "system-theme",
} as const;

const theme = localStorage.getItem("theme");
const html = document.querySelector("html")!;

if (theme === THEME.DARK || theme === THEME.LIGHT || theme === THEME.SYSTEM) {
  html.classList.add(theme);
} else {
  localStorage.setItem("theme", THEME.SYSTEM);
  html.classList.add(THEME.SYSTEM);
}
