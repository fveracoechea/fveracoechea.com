import { registerIslands } from "./_includes/islands/PreactIslands.tsx";

registerIslands({
  CodeWritter: () => import("./_includes/components/CodeWritter.tsx"),
  ThemeSwitcher: () => import("./_includes/components/ThemeSwitcher.tsx"),
  MobileMenu: () => import("./_includes/components/MobileMenu.tsx"),
});
