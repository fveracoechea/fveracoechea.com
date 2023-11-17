import { Child } from "hono/middleware";
import { env } from "../shared/env.ts";

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
      </head>
      <body>
        {props.children}
        {env.ENV === "dev" && <script src="/public/main.js" type="module" />}
      </body>
    </html>
  );
}
