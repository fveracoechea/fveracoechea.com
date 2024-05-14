import { hydrate } from 'preact';

globalThis.addEventListener('load', async () => {
  const island = document.querySelector('[data-island="ThemeSwitcher"]');
  if (!island) return;
  const ThemeSwitcher = await import(
    './_includes/components/ThemeSwitcher.tsx'
  );
  hydrate(<ThemeSwitcher.default />, island);
});
