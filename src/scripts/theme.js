const LIGHT_THEME = 'cat-latte';
const DARK_THEME = 'cat-mocha';

const localTheme = localStorage.getItem('theme');
const prefersDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

let theme = localTheme || (prefersDarkMode() ? DARK_THEME : LIGHT_THEME);

document.querySelector('html').classList.add(theme);

function toggleTheme() {
  console.log('click');
  theme = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  const html = document.querySelector('html');
  localStorage.setItem('theme', theme);
  html.classList.remove(DARK_THEME, LIGHT_THEME);
  html.classList.add(theme);
}

globalThis.addEventListener('load', () => {
  const buttons = document.querySelectorAll('ul li button[data-id="theme-toggler"');
  buttons.forEach(btn => btn.addEventListener('click', toggleTheme));
});
