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
  const indexRef = useRef(0);
  const [code, setCode] = useState("");

  async function onClick() {
    if (!window.__SNIPPETS__) return;

    let newIndex = indexRef.current + 1;

    if (window.__SNIPPETS__.length <= newIndex) newIndex = 0;

    indexRef.current = newIndex;
    const snippet = window.__SNIPPETS__.at(newIndex);

    if (!snippet) return console.warn("NO snippet");

    await animationFrame();

    setCode("");

    for await (const char of typewriter(snippet)) {
      if (newIndex === indexRef.current) setCode(c => c + char);
      else break;
    }
  }

  useEffect(() => {
    const snippet = window.__SNIPPETS__?.at(0);

    const initialIndex = indexRef.current;

    async function generate() {
      if (!snippet) return console.warn("NO snippet");

      for await (const char of typewriter(snippet)) {
        if (initialIndex === indexRef.current) setCode(c => c + char);
        else break;
      }
    }

    generate();
  }, []);

  return (
    <div className="prose flex-[2]">
      <button onClick={onClick}>Shuffle</button>
      <pre ref={preRef} className="h-[300px] overflow-y-auto">
        <code
          className="language-tsx hljs language-typescript"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </pre>
    </div>
  );
}

export default withIsland(CodeWritter, "CodeWritter");
