export const THEME = {
  DARK: "mocha",
  LIGHT: "latte",
  SYSTEM: "system-theme",
} as const;

export type Theme = keyof typeof THEME;
