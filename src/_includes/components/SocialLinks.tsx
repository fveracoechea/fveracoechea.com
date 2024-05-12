import { type VariantProps, cva, cx } from 'cva';
import { Github, Linkedin, Moon, Sun } from 'npm:lucide-preact';

import { IconButton } from './IconButton.tsx';

const icon = cva('block hover:text-cat-blue', {
  variants: {
    size: {
      md: 'text-3xl md:text-4xl',
      sm: 'text-2xl',
    },
  },
});

const list = cva('flex', {
  variants: {
    size: {
      md: 'gap-1 md:gap-2',
      sm: 'gap-1',
    },
  },
});

type Props = VariantProps<typeof icon> & { className?: string };

export function SocialLinks(props: Props) {
  const { size = 'sm', className } = props;

  const iconClassname = icon({ size });
  const listClasname = list({ size, className });

  return (
    <ul className={listClasname}>
      <li className="justify-self-end">
        <IconButton
          as="a"
          title="Github"
          target="_blank"
          class={iconClassname}
          href="https://github.com/fveracoechea"
        >
          <Github fontSize="inherit" />
        </IconButton>
      </li>
      <li className="justify-self-end">
        <IconButton
          as="a"
          title="LinkedIn"
          target="_blank"
          className={iconClassname}
          href="https://www.linkedin.com/in/fveracoechea/"
        >
          <Linkedin fontSize="inherit" />
        </IconButton>
      </li>
      <li className="justify-self-end">
        <IconButton
          data-id="theme-toggler"
          className={cx(iconClassname, 'appearance-none border-none')}
          title="Switch color theme"
        >
          <Moon fontSize="inherit" data-icon="dark" />
          <Sun fontSize="inherit" data-icon="light" />
        </IconButton>
      </li>
    </ul>
  );
}
