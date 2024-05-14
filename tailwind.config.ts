import catppuccin from '@catppuccin/tailwindcss';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./_includes/layouts/*.{html,ts,tsx}'],
  safelist: ['cat-latte', 'cat-mocha'],
  theme: {
    fontFamily: {
      sans: ["'Fira Sans'", 'sans-serif'],
      mono: ["'Fira Code'", 'monospace'],
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    extend: {
      backgroundImage: {
        'pattern-light': 'url(/images/px-light.png)',
        'pattern-grey': 'url(/images/px-grey.webp)',
      },
    },
  },
  plugins: [typography, catppuccin({ prefix: 'cat' })],
};

export default config;
