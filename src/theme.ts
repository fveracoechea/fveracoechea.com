import { THEME } from './_includes/types/theme.ts';

function isValidTheme(theme: string | null): theme is string {
  return (
    theme === THEME.DARK || theme === THEME.LIGHT || theme === THEME.SYSTEM
  );
}

const theme = localStorage.getItem('theme');
const html = document.querySelector('html');

if (!isValidTheme(theme)) {
  localStorage.setItem('theme', THEME.SYSTEM);
  html?.classList.add(THEME.SYSTEM);
} else {
  html?.classList.add(theme);
}
