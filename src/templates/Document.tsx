import { Child } from "https://deno.land/x/hono@v3.12.8/middleware.ts";
const ENV = Deno.env.get("ENV");
type Props = {
  children?: Child;
};

export function Document(props: Props) {
  return (
    <html lang="en-US">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <body class="bg-pattern-light text-dark bg-repeat">
        <script
          crossorigin="anonymous"
          src="https://deno.land/x/refresh/client.js"
        />
        {props.children}
      </body>
    </html>
  );
}
