import { faLinkedin, faSquareGithub } from 'npm:@fortawesome/free-brands-svg-icons';
import { faCircleHalfStroke } from 'npm:@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from 'npm:@fortawesome/react-fontawesome';
import { type VariantProps, cva, cx } from 'npm:class-variance-authority';

const icon = cva('block hover:text-cat-blue', {
  variants: {
    size: {
      md: 'h-6 w-6 lg:h-7 lg:w-7',
      sm: 'h-5 w-5',
    },
  },
});

const list = cva('flex', {
  variants: {
    size: {
      md: 'gap-3 lg:gap-4',
      sm: 'gap-2',
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
          <FontAwesomeIcon icon={faSquareGithub} />
        </a>
      </li>
      <li className="justify-self-end">
        <a
          title="LinkedIn"
          target="_blank"
          className={iconClassname}
          href="https://www.linkedin.com/in/fveracoechea/"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </li>
      <li className="justify-self-end">
        <button
          data-id="theme-toggler"
          className={cx(iconClassname, 'appearance-none border-none')}
          title="Switch color theme"
        >
          <FontAwesomeIcon icon={faCircleHalfStroke} />
        </button>
      </li>
    </ul>
  );
}
