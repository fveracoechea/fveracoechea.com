import { cx } from "cva";

export default function Document(props: Lume.Data) {
  const { children } = props;

  const isHomepage = props.page.outputPath === "/index.html";

  return (
    <html
      lang="en-US"
      className={cx(
        "bg-cat-crust scrollbar",
        "scrollbar-track-cat-surface0 scrollbar-thumb-cat-overlay0",
        "hover:scrollbar-thumb-cat-overlay2",
      )}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {isHomepage ? props.title : `${props.title} - Francisco Veracoechea`}
        </title>
        <link rel="stylesheet" href="/styles.css" title="main-tailwindcss" />
        <script src="/theme.js" />
      </head>
      <body className={cx("relative bg-cat-base text-cat-text")}>
        <div
          className={cx(
            "absolute left-0 top-0 z-0 h-[30vh] w-full md:h-[20vh]",
            "from-cat-crust to-cat-base",
            "bg-gradient-to-b",
          )}
        />
        <div className="relative z-10">{children}</div>
        <div
          className={cx(
            "absolute bottom-0 left-0 z-0 h-[30vh] w-full md:h-[20vh]",
            "from-cat-base to-cat-crust",
            "bg-gradient-to-b",
          )}
        />
        <script type="module" src="/main.js" />
      </body>
    </html>
  );
}
