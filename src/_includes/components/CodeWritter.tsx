import { useEffect, useRef, useState } from "preact/hooks";

import { withIsland } from "../helpers/islands.tsx";

declare global {
  interface Window {
    __SNIPPETS__?: string[];
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

function CodeWritter() {
  const preRef = useRef<HTMLPreElement | null>(null);
  const [index, setIndex] = useState(0);
  const [code, setCode] = useState("");

  async function onClick() {
    const snippet = window.__SNIPPETS__?.at(index);

    if (!preRef.current) return console.warn("No ref");
    if (!snippet) return console.warn("NO snippet");

    for await (const char of typewriter(snippet)) {
      setCode(c => c + char);
      preRef.current.scrollTo(0, preRef.current.scrollHeight);
    }

    await animationFrame();
    preRef.current.scrollTo(0, preRef.current.scrollHeight);
  }

  useEffect(() => {
    const snippet = window.__SNIPPETS__?.at(1);

    async function generate() {
      if (!preRef.current) return console.warn("No ref");
      if (!snippet) return console.warn("NO snippet");

      for await (const char of typewriter(snippet)) {
        setCode(c => c + char);
        preRef.current.scrollTo(0, preRef.current.scrollHeight);
      }

      await animationFrame();
      preRef.current.scrollTo(0, preRef.current.scrollHeight);
    }

    generate();
  }, []);

  return (
    <div className="prose flex-[2]">
      <pre ref={preRef} className="h-72 overflow-y-auto">
        <code
          className="language-tsx hljs language-typescript"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </pre>
    </div>
  );
}

export default withIsland(CodeWritter, "CodeWritter");
