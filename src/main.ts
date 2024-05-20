import { hydrateIslands } from './_includes/helpers/islands.tsx';

const islands = {
  ThemeSwitcher: () => import('./_includes/components/ThemeSwitcher.tsx'),
};

hydrateIslands(islands);
