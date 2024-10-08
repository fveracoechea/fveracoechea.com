import { useEffect, useRef, useState } from "preact/hooks";

import { Snippets } from "../../_plugins/snippets.ts";
import { withIsland } from "../islands/PreactIslands.tsx";
import { IconButton } from "./IconButton.tsx";
import { ChevronLeft, ChevronRight } from "./Icons.tsx";

declare global {
  interface Window {
    __SNIPPETS__?: Snippets;
  }
}

const animationFrame = () => new Promise(r => requestAnimationFrame(r));

async function* typewriter(text: string, start: number = 0) {
  for (let index = start; index < text.length; index++) {
    const char = text[index];

    await animationFrame();

    if (char === "<") {
      if (text.substring(index, index + 5) === "<span") {
        const initial = index;
        let next = "";

        while (next !== ">") {
          next = text.charAt(index);
          index++;
        }

        yield text.substring(initial, index);
        index--;
        continue;
      }

      if (text.substring(index, index + 7) === "</span>") {
        index = index + 6;
        yield "</span>";
        continue;
      }
    }

    yield char;
  }
}

function CodeWritter(props: { initialSnippet: Snippets[number] }) {
  const preRef = useRef<HTMLPreElement | null>(null);
  const codeRef = useRef<HTMLElement | null>(null);

  const indexRef = useRef(0);

  const current =
    props.initialSnippet ?? window.__SNIPPETS__![indexRef.current];

  const [code, setCode] = useState("");

  async function generateCode(newIndex: number) {
    if (!window.__SNIPPETS__) return;
    if (!codeRef.current || !preRef.current) return;

    const snippets = window.__SNIPPETS__;

    if (newIndex >= snippets.length) newIndex = 0;
    if (newIndex < 0) newIndex = snippets.length - 1;

    indexRef.current = newIndex;
    const snippet = snippets.at(newIndex)?.code;

    if (!snippet) return console.warn("NO snippet");

    await animationFrame();
    setCode("");

    for await (const char of typewriter(snippet)) {
      if (newIndex !== indexRef.current) break;
      if (codeRef.current.offsetHeight >= preRef.current.clientHeight) {
        setCode(snippet);
        break;
      }
      setCode(c => c + char);
    }
  }

  useEffect(() => {
    setCode(current.code);
  }, []);

  return (
    <figure className="flex flex-[2] flex-col gap-2">
      <figcaption className="flex items-end justify-between gap-4">
        <a
          href={current.outputPath}
          className="cursor-pointer text-base font-normal underline-offset-2 hover:underline focus-visible:underline"
        >
          {current.title}
        </a>
        <div className="flex gap-2">
          <IconButton onClick={() => void generateCode(indexRef.current - 1)}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={() => void generateCode(indexRef.current + 1)}>
            <ChevronRight />
          </IconButton>
        </div>
      </figcaption>
      <div className="prose">
        <pre ref={preRef} className="h-[300px] overflow-y-auto scrollbar-thin">
          <code
            ref={codeRef}
            className="language-tsx hljs language-typescript"
            dangerouslySetInnerHTML={{ __html: code }}
          />
        </pre>
      </div>
    </figure>
  );
}

export default withIsland(CodeWritter, "CodeWritter");
