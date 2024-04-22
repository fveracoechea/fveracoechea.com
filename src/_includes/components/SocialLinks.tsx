import { DarkMode, GitHub, LightMode, LinkedIn } from "npm:@mui/icons-material";
import { cva, cx, type VariantProps } from "npm:class-variance-authority";

const icon = cva("block hover:text-cat-blue", {
  variants: {
    size: {
      md: "text-3xl md:text-4xl",
      sm: "text-2xl",
    },
  },
});

const list = cva("flex", {
  variants: {
    size: {
      md: "gap-3",
      sm: "gap-3",
    },
  },
});

type Props = VariantProps<typeof icon> & { className?: string };

export function SocialLinks(props: Props) {
  const { size = "sm", className } = props;

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
          <GitHub fontSize="inherit" />
        </a>
      </li>
      <li className="justify-self-end">
        <a
          title="LinkedIn"
          target="_blank"
          className={iconClassname}
          href="https://www.linkedin.com/in/fveracoechea/"
        >
          <LinkedIn fontSize="inherit" />
        </a>
      </li>
      <li className="justify-self-end">
        <button
          data-id="theme-toggler"
          className={cx(iconClassname, "appearance-none border-none")}
          title="Switch color theme"
        >
          <DarkMode fontSize="inherit" data-icon="dark" />
          <LightMode fontSize="inherit" data-icon="light" />
        </button>
      </li>
    </ul>
  );
}
