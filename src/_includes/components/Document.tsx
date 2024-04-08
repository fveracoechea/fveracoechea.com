type Props = React.PropsWithChildren;

export function Document(props: Props) {
  const { children } = props;

  return (
    <html lang="en-US">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" title="main-tailwindcss" />

        <script src="/scripts/theme.js" />
      </head>
      <body className="bg-cat-crust text-cat-text">{children}</body>
    </html>
  );
}
