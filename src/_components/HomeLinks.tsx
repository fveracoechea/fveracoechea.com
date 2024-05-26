import { IconButton } from "../_includes/components/IconButton.tsx";
import { Github, Linkedin, RSS } from "../_includes/components/Icons.tsx";

export default function HomeLinks() {
  return (
    <div className="prose">
      <h4>Links</h4>
      <ul className="not-prose flex flex-col gap-2.5">
        <li className="">
          <IconButton
            as="a"
            title="Github"
            target="_blank"
            className="items-center justify-stretch gap-2.5"
            href="https://github.com/fveracoechea"
          >
            <span className="text-xl">
              <Github />
            </span>
            <span className="text-sm">GitHub</span>
          </IconButton>
        </li>
        <li>
          <IconButton
            as="a"
            title="LinkedIn"
            target="_blank"
            className="items-center justify-stretch gap-2.5"
            href="https://www.linkedin.com/in/fveracoechea/"
          >
            <span className="text-xl">
              <Linkedin />
            </span>
            <span className="text-sm">LinkedIn</span>
          </IconButton>
        </li>
        <li>
          <IconButton
            as="a"
            title="RSS"
            className="items-center justify-stretch gap-2.5"
            target="_blank"
            href="/blog.rss"
          >
            <span className="text-xl">
              <RSS />
            </span>
            <span className="text-sm">RSS</span>
          </IconButton>
        </li>
      </ul>
    </div>
  );
}
