import { hydrateIslands } from "./_includes/helpers/islands.tsx";

const islands = {
  CodeWritter: () => import("./_includes/components/CodeWritter.tsx"),
  ThemeSwitcher: () => import("./_includes/components/ThemeSwitcher.tsx"),
  MobileNav: () => import("./_includes/components/MobileMenu.tsx"),
};

hydrateIslands(islands);
