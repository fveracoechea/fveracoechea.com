import { Child } from "https://deno.land/x/hono@v3.12.8/middleware.ts";

type Props = {
  children?: Child;
};

export function Document(props: Props) {
  return (
    <html lang="en-US">
      <head>
        <meta charset="UTF-8" />
        <link
          rel="stylesheet"
          href="/public/styles.css"
          title="main-tailwindcss"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css"
        />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
