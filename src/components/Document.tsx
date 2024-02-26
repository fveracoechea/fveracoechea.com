import { Child } from "https://deno.land/x/hono@v3.12.8/middleware.ts";
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
          href="/public/css/main.css"
          title="main-tailwindcss"
        />
        <link rel="stylesheet" href="/public/css/catppuccin.css" />
      </head>
      <body class="bg-cat-crust text-cat-text">
        {props.children}
      </body>
    </html>
  );
}
