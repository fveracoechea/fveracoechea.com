import { registerIslands } from "./_includes/islands/PreactIslands.tsx";

registerIslands({
  ThemeSwitcher: () => import("./_includes/components/ThemeSwitcher.tsx"),
  MobileMenu: () => import("./_includes/components/MobileMenu.tsx"),
});
