export const THEME = {
  DARK: "cat-mocha",
  LIGHT: "cat-latte",
  SYSTEM: "system-theme",
} as const;

export type Theme = keyof typeof THEME;
