export default function Document(props: Lume.Data) {
  const { children } = props;

  const isHomepage = props.page.outputPath === "/index.html";

  return (
    <html
      lang="en-US"
      className="bg-cat-crust scrollbar scrollbar-track-cat-surface0 scrollbar-thumb-cat-overlay0 hover:scrollbar-thumb-cat-overlay2"
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {isHomepage ? props.title : `${props.title} - Francisco Veracoechea`}
        </title>

        <link
          rel="preload"
          href="/fonts/FiraCode-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/FiraSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/FiraSans-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/FiraSans-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/FiraSans-MediumItalic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />

        <link rel="stylesheet" href="/styles.css" title="main-tailwindcss" />
        <script src="/theme.js" />
      </head>
      <body className="relative bg-cat-base text-cat-text">
        <div className="relative z-10">{children}</div>
        <script type="module" src="/main.js" />
      </body>
    </html>
  );
}
