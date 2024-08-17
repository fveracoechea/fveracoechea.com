import { type VariantProps, cva } from "cva";

import { IconButton } from "./IconButton.tsx";
import { Github, Linkedin, RSS } from "./Icons.tsx";

const list = cva("not-prose flex", {
  variants: {
    size: {
      md: "gap-2 text-2xl",
      sm: "gap-2 text-xl",
    },
  },
});

type Props = VariantProps<typeof list> & { className?: string };

export default function SocialLinks(props: Props) {
  const { size = "sm", className } = props;
  const listClasname = list({ size, className });

  return (
    <ul className={listClasname}>
      <li className="justify-self-end">
        <IconButton
          as="a"
          title="Github"
          target="_blank"
          href="https://github.com/fveracoechea"
        >
          <Github />
        </IconButton>
      </li>
      <li className="justify-self-end">
        <IconButton
          as="a"
          title="LinkedIn"
          target="_blank"
          href="https://www.linkedin.com/in/fveracoechea/"
        >
          <Linkedin />
        </IconButton>
      </li>
      <li className="justify-self-end">
        <IconButton as="a" title="RSS" target="_blank" href="/blog.rss">
          <RSS />
        </IconButton>
      </li>
    </ul>
  );
}
