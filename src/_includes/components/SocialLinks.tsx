import { type VariantProps, cva, cx } from 'cva';
import { Github, Linkedin, Moon, Sun } from 'npm:lucide-preact';

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
      md: 'gap-3',
      sm: 'gap-3',
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
        <a
          title="Github"
          target="_blank"
          className={iconClassname}
          href="https://github.com/fveracoechea"
        >
          <Github fontSize="inherit" />
        </a>
      </li>
      <li className="justify-self-end">
        <a
          title="LinkedIn"
          target="_blank"
          className={iconClassname}
          href="https://www.linkedin.com/in/fveracoechea/"
        >
          <Linkedin fontSize="inherit" />
        </a>
      </li>
      <li className="justify-self-end">
        <button
          data-id="theme-toggler"
          className={cx(iconClassname, 'appearance-none border-none')}
          title="Switch color theme"
        >
          <Moon fontSize="inherit" data-icon="dark" />
          <Sun fontSize="inherit" data-icon="light" />
        </button>
      </li>
    </ul>
  );
}
